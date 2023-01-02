FROM python:3.8 AS builder

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Expose port 8000
EXPOSE 8000

# Set working directory
WORKDIR /code 

# Copy requirements file and install dependencies
COPY requirements.txt /code
RUN apt-get update && \
    apt-get install gcc python3-dev musl-dev build-essential cmake pkg-config libicu-dev zlib1g-dev libcurl4-openssl-dev libssl-dev ruby-dev ruby-github-linguist -y && \
    pip3 install -r requirements.txt --no-cache-dir

# Copy source code
COPY . /code 

# Run collectstatic command
RUN ["python3", "manage.py", "collectstatic", "--noinput"]

# Set entrypoint for the builder stage
CMD ["gunicorn", "codestatsapi.wsgi:application", "--bind", "0.0.0.0:8000"]

FROM builder as development

# Expose port 8000
EXPOSE 8000

# Copy Docker tools from another image
COPY --from=gloursdocker/docker / /

# Set entrypoint for the development stage
CMD ["gunicorn", "codestatsapi.wsgi:application", "--bind", "0.0.0.0:8000"]