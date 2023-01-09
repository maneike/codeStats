# syntax=docker/dockerfile:1.4

FROM node:lts AS builder

# Set the working directory
WORKDIR /code

# Copy the package.json file to the working directory
COPY package.json /code/package.json

# Install project dependencies
RUN npm ci

# Copy the rest of the source code to the working directory
COPY . /code

# Build the project
RUN npm run build

