FROM node:18.12.1-alpine as base

WORKDIR /app

COPY package.json ./

RUN npm i -g pnpm

RUN pnpm install

COPY . .

EXPOSE 4000

CMD ["node","server.js"]