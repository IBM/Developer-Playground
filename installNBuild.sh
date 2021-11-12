#!/bin/bash

# docker build --build-arg CLIENT_BUILD_ENV=docker -t my-watson-assistant:latest .
# docker run -it -d -p 3000:3000 --network my-network --name my-watson-assistant-all --env-file .env my-watson-assistant:latest

BUILD_ENV="$1"
isProd="false"

case $1 in
  "dev") BUILD_ENV=""; isProd="false";;
  "docker") BUILD_ENV="docker"; isProd="false";;
  "prod") BUILD_ENV="production"; isProd="true";;
  "") BUILD_ENV=""; isProd="false";;
esac

echo "*********** RUNNING BUILD WITH BUILD_ENV=$BUILD_ENV environment ************ "

function setup_backend {
  echo "*********** SETUP BACKEND API BUILD ************ "
  cd app
  npm install -f
  npm audit fix
  npm install -g forever
  cd ..
}

function setup_client {
  echo "*********** SETUP CLIENT BUILD ************ "
  cd client
  npm install -f
  npm install -g @angular/cli@8.1.0
  npm install --only=dev
  npm audit fix
  cp src/assets/js/core/browser.js node_modules/websocket/lib/browser.js && ng build --configuration=$BUILD_ENV && cp src/static/manifest.yml src/static/Staticfile dist
  rm -rf node_modules
  cd ..

}


# run_local_cloudant
# create_datasources
setup_backend
setup_client
