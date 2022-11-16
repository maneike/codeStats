# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM python:3.7-alpine AS builder
EXPOSE 8000
WORKDIR /code 
COPY requirements.txt /code
RUN apk update && \
 apk add postgresql-dev gcc python3-dev musl-dev  && \
 pip3 install -r requirements.txt --no-cache-dir
COPY . /code 
CMD ["gunicorn", "codestatsapi.wsgi:application", "--bind", "0.0.0.0:8000"]
# python3 manage.py collectstatic --noinput && python3 manage.py makemigrations --noinput && python3 manage.py migrate --noinput && python3 manage.py createsuperuser

FROM builder as development
EXPOSE 8000
RUN <<EOF
apk add git
addgroup -S docker
adduser -S --shell /bin/bash --ingroup docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD ["gunicorn", "codestatsapi.wsgi:application", "--bind", "0.0.0.0:8000"]

