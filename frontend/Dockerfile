# syntax=docker/dockerfile:1.4
FROM node:lts AS builder

# Set environment variables
ENV CI=true
ENV PORT=3000

# Set working directory
WORKDIR /code

# Copy package file and install dependencies
COPY package.json /code/package.json
RUN npm install

# Copy source code
COPY . /code

# Run the build command
RUN npm run build

# Set entrypoint for the development stage
CMD [ "npm", "start" ]

FROM builder as development

# Update package manager and install git
RUN apt-get update && apt-get install -y --no-install-recommends git

# Create vscode user and add it to the docker group
RUN useradd -s /bin/bash -m vscode && groupadd docker && usermod -aG docker vscode

# Copy Docker tools from another image
COPY --from=gloursdocker/docker / /

# Set entrypoint for the dev-envs stage
CMD [ "npm", "start" ]

