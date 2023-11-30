#!/bin/bash

cd backend
docker compose up &

cd ../frontend
npx expo start --web &

wait
