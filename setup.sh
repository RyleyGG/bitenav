#!/bin/bash

if [ ! -f .env ]; then
    echo "Creating .env file with a random Postgres password..."
    echo "postgres_password=$(openssl rand -base64 32)" > .env
fi
