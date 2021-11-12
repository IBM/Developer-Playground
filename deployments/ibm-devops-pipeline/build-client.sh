#!/bin/bash
 mkdir /home/pipeline/nvm
 export NVM_DIR=/home/pipeline/nvm
 export NODE_VERSION=12.0.0
 export NVM_VERSION=0.33.11

 npm config delete prefix \
   && curl https://raw.githubusercontent.com/creationix/nvm/v${NVM_VERSION}/install.sh | sh \
   && . $NVM_DIR/nvm.sh \
   && nvm install $NODE_VERSION \
   && nvm alias default $NODE_VERSION \
   && nvm use default \
   && node -v \
   && npm -v

cd client
npm install -g @angular/cli@8.1.0
npm install
cp src/assets/js/core/browser.js node_modules/websocket/lib/browser.js
ng build --configuration=production && cp src/static/manifest.yml src/static/Staticfile dist
