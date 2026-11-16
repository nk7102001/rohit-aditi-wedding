"""Local invitation preview with persistent RSVP storage on this computer."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import json
import sqlite3
import argparse
import gzip
from io import BytesIO
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parent
DATABASE = ROOT / '.local' / 'rsvp.sqlite3'

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_head(self):
        target = Path(self.translate_path(self.path))
        compressible = target.suffix in ('.html', '.js', '.css', '.json')
        if target.is_file() and compressible and 'gzip' in self.headers.get('Accept-Encoding', ''):
            body = gzip.compress(target.read_bytes(), compresslevel=6)
            self.send_response(200)
            self.send_header('Content-Type', self.guess_type(str(target)))
            self.send_header('Content-Encoding', 'gzip')
            self.send_header('Vary', 'Accept-Encoding')
            self.send_header('Content-Length', str(len(body)))
            self.send_header('Cache-Control', 'no-cache')
            self.end_headers()
            return BytesIO(body)
        return super().send_head()

    def do_GET(self):
        target = Path(self.translate_path(self.path)).resolve()
        if '.local' in target.parts or target.name == 'serve.py':
            self.send_error(404)
            return
        super().do_GET()

    def do_HEAD(self):
        target = Path(self.translate_path(self.path)).resolve()
        if '.local' in target.parts or target.name == 'serve.py':
            self.send_error(404)
            return
        super().do_HEAD()

    def reply(self, status, body):
        encoded = json.dumps(body).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)

    def do_POST(self):
        if self.path != '/api/rsvp':
            self.reply(404, {'ok': False, 'error': 'Unknown endpoint'})
            return
        origin = self.headers.get('Origin')
        if origin and origin != 'http://' + self.headers.get('Host', ''):
            self.reply(403, {'ok': False, 'error': 'Please submit from the invitation page.'})
            return
        try:
            size = int(self.headers.get('Content-Length', '0'))
            if not 0 < size <= 16384:
                raise ValueError('Invalid response size')
            payload = json.loads(self.rfile.read(size))
            fields = payload.get('fields', {})
            required = ('guestName', 'mobileNumber', 'attendance')
            if not isinstance(fields, dict) or any(not isinstance(fields.get(key), str) or not fields[key].strip() for key in required):
                raise ValueError('Please enter your name, mobile number and attendance.')
            if fields['attendance'] not in ('Attending', 'Not attending'):
                raise ValueError('Please select your attendance.')
            if any(not isinstance(value, str) or len(value) > 2000 for value in fields.values()):
                raise ValueError('Please shorten your response.')
            # Repeated submissions from the same guest update their response atomically.
            with sqlite3.connect(DATABASE, timeout=10) as db:
                db.execute('INSERT INTO responses (mobile, name, payload, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT(mobile, name) DO UPDATE SET payload=excluded.payload, updated_at=excluded.updated_at',
                    (fields['mobileNumber'].strip(), fields['guestName'].strip(), json.dumps(payload, ensure_ascii=False), datetime.now(timezone.utc).isoformat()))
            self.reply(200, {'ok': True})
        except (ValueError, TypeError, AttributeError):
            self.reply(400, {'ok': False, 'error': 'Please enter valid details and try again.'})
        except sqlite3.Error:
            self.reply(500, {'ok': False, 'error': 'Could not save your response. Please try again.'})

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=3000)
    args = parser.parse_args()
    DATABASE.parent.mkdir(exist_ok=True)
    with sqlite3.connect(DATABASE) as db:
        db.execute('CREATE TABLE IF NOT EXISTS responses (mobile TEXT, name TEXT, payload TEXT NOT NULL, updated_at TEXT NOT NULL, PRIMARY KEY(mobile, name))')
    server = ThreadingHTTPServer(('127.0.0.1', args.port), Handler)
    print(f'Invitation running at http://127.0.0.1:{args.port}', flush=True)
    server.serve_forever()
