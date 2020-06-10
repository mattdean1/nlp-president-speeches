FROM python:3.7-alpine

COPY requirements.txt requirements.txt

RUN apk add --no-cache postgresql-libs && \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev make && \
    pip install --upgrade pip setuptools && pip install -r requirements.txt && \
    apk --purge del .build-deps

COPY speeches speeches
COPY start.py start.py

CMD gunicorn --bind 0.0.0.0:8000 speeches.app:app
