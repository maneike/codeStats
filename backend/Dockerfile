# syntax=docker/dockerfile:1.4

FROM python:3.8 AS builder
LABEL "mainteiner"="Mateusz Babul"
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
EXPOSE 8000
WORKDIR /code 
COPY requirements.txt /code
RUN apt-get update && \
 apt-get install gcc python3-dev musl-dev build-essential cmake pkg-config libicu-dev zlib1g-dev libcurl4-openssl-dev libssl-dev ruby-dev ruby-github-linguist -y  && \
 pip3 install -r requirements.txt --no-cache-dir
COPY . /code 
RUN ["python3", "manage.py", "collectstatic", "--noinput"]
CMD ["gunicorn", "codestatsapi.wsgi:application", "--bind", "0.0.0.0:8000"]
# docker compose run backend python3 manage.py makemigrations && python3 manage.py migrate && python3 manage.py createsuperuser

FROM builder as development
EXPOSE 8000
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD ["gunicorn", "codestatsapi.wsgi:application", "--bind", "0.0.0.0:8000"]


