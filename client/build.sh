#!/bin/bash

# docker build --build-arg CLIENT_BUILD_ENV=docker -t my-watson-assistant-client:latest .
# docker run -it -p 80:80 my-watson-assistant-client:latest

BUILD_ENV="$1"
isProd="false"

case $1 in
  "dev") BUILD_ENV=""; isProd="false";;
  "docker") BUILD_ENV="docker"; isProd="false";;
  "prod") BUILD_ENV="production"; isProd="true";;
  "") BUILD_ENV=""; isProd="false";;
esac

echo "*********** RUNNING CLIENT BUILD WITH BUILD_ENV=$BUILD_ENV environment ************ "

function build_client {
  npm install -f
  npm install -g @angular/cli@8.1.0
  npm audit fix
  cp src/assets/js/core/browser.js node_modules/websocket/lib/browser.js && ng build --configuration=$BUILD_ENV && cp src/config/manifest.yml src/config/Staticfile dist/ui
  rm -rf node_modules
}

build_client
