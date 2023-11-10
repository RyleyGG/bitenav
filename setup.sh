#!/bin/bash

if [ ! -f .env ]; then
    echo "Creating docker .env file with default values..."

    postgres_password=$(dd if=/dev/urandom bs=32 count=1 2>/dev/null | base64)
    auth_secret=$(dd if=/dev/urandom bs=32 count=1 2>/dev/null | base64)

    echo "postgres_password=$postgres_password" >> .env
    echo "auth_secret=$auth_secret" >> .env
    echo "API_URL=http://127.0.0.1:8000" >> .env
fi

if [ ! -d ./backend/.venv ]; then
    echo "Creating and initializing python virtual environment..."
    python -m venv ./backend/.venv
    echo "Activating the virtual environment..."
    source ./backend/.venv/bin/activate
    pip install -r backend/requirements.txt
fi

if [ -f "./backend/api_start.sh" ]; then
    chmod u+rwx "./backend/api_start.sh"
    unix2dos "./backend/api_start.sh"
else
    echo "Could not find api_start.sh file. Your repository may be corrupted, or need to be re-pulled."
fi
