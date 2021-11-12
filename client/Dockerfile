##
## This will build front end container running nginx
## Author: Gurvinder Singh (gurvsin3@in.ibm.com)
##
## docker build --build-arg CLIENT_BUILD_ENV=docker -t my-watson-assistant-client:latest .
## docker run -it -d -p 80:80 --network my-network --name my-watson-assistant-client my-watson-assistant-client:latest
##

FROM node:12-alpine as client-build

RUN mkdir -p /app
WORKDIR /app
ARG CLIENT_BUILD_ENV=prod
ENV PORT 80

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    git \
    --update bash && rm -rf /var/cache/apk/*

COPY . /app

COPY ./build.sh /app/
RUN chmod 755 /app/build.sh
RUN /app/build.sh $CLIENT_BUILD_ENV
RUN apk del build-dependencies

FROM nginx:1.13.5
COPY --from=client-build app/dist/ui /usr/share/nginx/html
COPY --from=client-build app/src/config/nginx.conf /etc/nginx/nginx.conf
# COPY --from=client-build ./.nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE $PORT

CMD nginx -g "daemon off;";
