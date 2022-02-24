FROM node:14.15.4-slim

RUN mkdir heregc

COPY package*.json ./

RUN npm install 
RUN cd node_modules && cp -r . /usr/local/lib/node_modules/
