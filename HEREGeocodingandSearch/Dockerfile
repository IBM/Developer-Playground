FROM node:14.15.4-slim

WORKDIR /heregc

COPY ./package.json /heregc/ 

RUN npm install

COPY . /heregc

EXPOSE 3000
