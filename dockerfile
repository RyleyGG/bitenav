FROM tiangolo/uvicorn-gunicorn-fastapi:latest

COPY ./backend /app
RUN pip install -r /app/requirements.txt