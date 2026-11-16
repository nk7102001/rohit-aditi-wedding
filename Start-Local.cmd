@echo off
cd /d "%~dp0"
echo Open http://127.0.0.1:3000 after the server starts.
python serve.py
pause
