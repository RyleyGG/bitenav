#!/bin/bash

if [ ! -f .env ]; then
    echo "Creating .env file with default values..."
    echo -e "postgres_password=$(openssl rand -base64 32)" >> .env
    echo "auth_secret=$(openssl rand -base64 32)" >> .env
fi