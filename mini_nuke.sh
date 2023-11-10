#!/bin/bash

cd frontend
npm install
cd ../backend
docker compose down --volumes
docker compose build
cd ..
./setup.sh