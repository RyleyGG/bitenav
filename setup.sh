#!/bin/bash

if [ ! -f .env ]; then
    echo "Creating docker .env file with default values..."
    echo -e "postgres_password=$(openssl rand -base64 32)" >> .env
    echo "auth_secret=$(openssl rand -base64 32)" >> .env
fi

if [ ! -f ./frontend/.env ]; then
    echo "Creating frontend .env file with default values..."
    echo -e "API_URL=127.0.0.1" >> frontend/.env
fi
