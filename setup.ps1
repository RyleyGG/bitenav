if (-Not (Test-Path .env)) {
    Write-Host "Creating docker .env file with default values..."
    
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    $bytes = New-Object byte[] 32
    $rng.GetBytes($bytes)
    $postgres_password = [System.Convert]::ToBase64String($bytes)

    $rng.GetBytes($bytes)
    $auth_secret = [System.Convert]::ToBase64String($bytes)

    "postgres_password=$postgres_password" | Out-File -FilePath .env -Append
    "auth_secret=$auth_secret" | Out-File -FilePath .env -Append
}

if (-Not (Test-Path ./frontend/.env)) {
    Write-Host "Creating frontend .env file with default values..."
    "API_URL=127.0.0.1" | Out-File -FilePath ./frontend/.env -Append
}

if (-Not (Test-Path ./backend/.venv)) {
    Write-Host "Creating and initializing python virtual environment..."
    python -m venv ./backend/.venv
    Write-Host "Activating the virtual environment..."
    . ./backend/.venv/Scripts/Activate.ps1
    pip install -r backend/requirements.txt
}

icacls "C:\path\to\your\file.exe" /grant:r "%USERNAME%:R"