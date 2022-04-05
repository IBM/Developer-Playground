FROM node:14.16.0-slim
WORKDIR /app
COPY package.json .
# COPY package-lock.json .
RUN npm config set @here:registry https://repo.platform.here.com/artifactory/api/npm/maps-api-for-javascript/
COPY . .
RUN npm install
RUN node token.js && export REACT_APP_mode=dev

CMD ["npm", "start"]
EXPOSE 3000