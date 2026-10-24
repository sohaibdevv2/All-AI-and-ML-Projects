# Start server script: Activates venv and runs server.py
if (Test-Path .venv) {
    # Activate virtual env
    . .\.venv\Scripts\Activate.ps1
} else  Write-Host "No virtual environment found in .venv; create one with `python -m venv .venv`"

# Install requirements (optional)
pip install -r requirements.txt

# Run server
python server.py
