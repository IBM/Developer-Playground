##
## This will build app container with both front end and backend running on one port (3000)
## Author: Gurvinder Singh (gurvsin3@in.ibm.com)
##
## docker build --build-arg CLIENT_BUILD_ENV=dev -t my-watson-assistant:latest .
## docker run -it -d -p 3000:3000 --network my-network --name my-watson-assistant --env-file ./app/.env my-watson-assistant:latest
## docker run -it -p 3000:3000 --name my-watson-assistant --env-file ./app/.env us.icr.io/gurudev/my-watson-assistant:10-master-35ce53d7-20200917143208 /bin/bash
## docker run -it -p 3000:3000 --name my-watson-assistant --env-file ./app/.env my-watson-assistant:latest

FROM node:12-alpine

RUN mkdir -p /app
WORKDIR /app
ENV NODE_ENV production
ARG CLIENT_BUILD_ENV=docker
ENV PORT 3000

RUN echo "RUNNING DOCKER BUILD FOR BOTH FRONTEND END AND BACKEND"

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add --update \
    python \
    make \
    g++ \
    git \
    curl \
    --update bash && rm -rf /var/cache/apk/*

COPY . /app

COPY ./installNBuild.sh /app
RUN chmod 755 /app/installNBuild.sh
RUN /app/installNBuild.sh $CLIENT_BUILD_ENV
COPY ./start-app.sh /app/

RUN apk del build-dependencies

EXPOSE 3000

CMD ["sh", "./start-app.sh"]
