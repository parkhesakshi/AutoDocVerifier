FROM node:16.19.0-alpine3.17 as base

WORKDIR /app

RUN apk update && \
    apk add --no-cache python3 make g++ && \
    apk add openjdk11 && \
    apk add --no-cache bash && \
    apk add --no-cache build-base cairo-dev pango-dev jpeg-dev giflib-dev librsvg-dev

ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk

COPY package.json ./

RUN npm i -g node-gyp

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node","server.js"]
