# IBM Flask Assignment

This repository contains a small Flask web application created as part of an IBM Flask course project (IBM Developer Skills Network). The app demonstrates basic Flask features and templating using HTML pages in the `templates/` folder.

## What this project contains

- `app.py` — the Flask application entrypoint.
- `templates/` — HTML templates used by the app. Includes:
  - `form.html`
  - `edit.html`
  - `search.html`
  - `transactions.html`

The app is intended for educational purposes as part of the IBM Flask course and illustrates routing, forms, rendering templates, and simple request handling.

## Prerequisites

- Python 3.8+ (using the same Python version you used for development is recommended)
- PowerShell (Windows) — commands below assume PowerShell is used

## Recommended setup (Windows PowerShell)

1. Open PowerShell and change to the project directory:

```powershell
cd C:\Users\dell\obmnl-flask_assignment
```

2. Create a virtual environment (if you don't already have one):

```powershell
python -m venv .venv
```

3. Activate the virtual environment for this session:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned -Force
.\.venv\Scripts\Activate.ps1
```

4. Upgrade pip and install dependencies. If a `requirements.txt` exists, install from it. Otherwise, install Flask:

```powershell
python -m pip install --upgrade pip
# If you have requirements.txt
pip install -r requirements.txt
# Otherwise
pip install Flask
```

5. (Optional) Create a `requirements.txt` to lock dependency versions for others:

```powershell
pip freeze > requirements.txt
```

## How to run the app

You can run the app two ways depending on how `app.py` is written:

- Run directly with Python:

```powershell
# Make sure the venv is activated
python app.py
```

- Or use the Flask CLI (set `FLASK_APP` then run):

```powershell
$env:FLASK_APP = 'app.py'
flask run
```

When started with the Flask development server the app will usually be available at `http://127.0.0.1:5000/` by default.

## Troubleshooting

- If you see `ModuleNotFoundError: No module named 'flask'`, make sure you activated the virtual environment used to install Flask (see steps above).
- Confirm which Python is active in your session:

```powershell
python -c "import sys; print(sys.executable)"
```

- If PowerShell denies running the activation script, the `Set-ExecutionPolicy ... -Scope Process` command above sets a temporary policy for the current PowerShell session.

## Notes

- This project was created for the IBM Flask course and is intended for learning and demonstration. It is not intended to be production-ready.

If you'd like, I can:

- Add a `requirements.txt` automatically and commit it.
- Start the Flask server and verify key pages (if you'd like me to run it now).
- Add a short CONTRIBUTING or USAGE section with example screenshots.
