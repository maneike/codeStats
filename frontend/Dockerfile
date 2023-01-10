FROM node:lts AS development

# Set working directory
WORKDIR /code

# 
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

# Same as npm install
RUN npm ci

COPY . /code

ENV CI=true
ENV PORT=3000

CMD [ "npm", "start" ]

FROM development AS build

RUN npm run build
