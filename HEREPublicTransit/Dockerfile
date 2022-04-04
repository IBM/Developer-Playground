FROM node:14.16.0-slim
WORKDIR /app
COPY package.json .
# COPY package-lock.json .
RUN npm config set @here:registry https://repo.platform.here.com/artifactory/api/npm/maps-api-for-javascript/
RUN npm install
COPY . .
RUN node token.js

CMD ["node", "server.js"]

EXPOSE 3100