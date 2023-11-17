#!/bin/bash

sleep 5
python /app/db.py
uvicorn api:app --host 0.0.0.0 --reload