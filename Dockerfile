FROM node:14.16.0-slim
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install --production
COPY . .
CMD ["npm", "run", "server"]

EXPOSE 3100