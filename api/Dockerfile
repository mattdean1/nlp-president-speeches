FROM python:3.7-alpine

EXPOSE 5000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE 1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED 1

RUN apk add --no-cache postgresql-libs && \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev make && \
    pip install --upgrade pip setuptools 

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt && apk --purge del .build-deps

WORKDIR /app

# Switch to a non-root user, see https://aka.ms/vscode-docker-python-user-rights
RUN adduser -D appuser && chown -R appuser /app
USER appuser

CMD flask run -h 0.0.0.0