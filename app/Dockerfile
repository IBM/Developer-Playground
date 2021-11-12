##
## This will build app container for backend only running on port (3000)
## Author: Gurvinder Singh (gurvsin3@in.ibm.com)
##
## docker build -t my-watson-assistant-backend:latest .
## docker run -it -d -p 3000:3000 --network my-network --name my-watson-assistant-backend --env-file .env my-watson-assistant-backend:latest
##

FROM node:12-alpine

RUN mkdir -p /app
WORKDIR /app
ENV NODE_ENV production
ENV PORT 3000

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    git \
    --update bash && rm -rf /var/cache/apk/*

RUN apk del build-dependencies

COPY . /app

EXPOSE 3000

RUN npm install -g node-gyp
RUN npm install
CMD ["node", "."]
