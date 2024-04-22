FROM node:21-alpine3.18

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm install

CMD [ "npm","run","dev"]