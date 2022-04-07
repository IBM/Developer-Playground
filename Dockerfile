FROM node:14.16.0-slim
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD ["npm", "start"]

EXPOSE 8081
