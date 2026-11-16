# Rohit & Aditi wedding invitation

## Run locally

Python 3.10 or newer is required. On Windows, double-click `Start-Local.cmd`, then open http://127.0.0.1:3000 in your browser. Keep the server window open. Close it to stop the preview.

If port 3000 is already running this invitation, use the existing browser link. To choose another port, run `python serve.py --port 3001` and open the printed address.

## Included

The active invitation is `index.html` with `resources/` and `wedding-data.js`. Styling and interaction improvements are in `resources/premium.css`, `resources/premium.js`, `resources/temple-flags.js` and `resources/falling-petals.js`.

Photoreal decorative scenes were generated with ImageGen. The active ceremony card automatically loads and plays its original illustrated film muted and inline. Off-screen films pause. Photoreal scenes remain visible while videos load, on errors, or when reduced motion is enabled. Prompts are recorded in `resources/ASSET-PROMPTS.txt`.

## Wedding details and RSVP

The existing active-template date is 22 August 2027, 7 PM IST. Maps links search for Taj Palace, Jaipur. Confirm the date and exact venue pin before sharing a hosted invitation.

RSVP responses save on this computer in `.local/rsvp.sqlite3`. The server listens on this computer only. Saved responses are excluded from the ZIP. The local preview does not send responses to the family or a cloud service.

## Verification

JavaScript syntax, asset references, calendar timestamps, server responses, gzip transfers, RSVP validation, repeat submission handling and private database access were checked. Browser visual, mobile viewport and measured page-load testing remain unverified because the in-app browser denied localhost access through its saved permission policy.
