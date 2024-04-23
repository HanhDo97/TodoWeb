FROM node:21-alpine3.18

RUN mkdir /app

WORKDIR /app

COPY . .

CMD ["sh", "-c", "npm install && npm run dev -- --host"]
