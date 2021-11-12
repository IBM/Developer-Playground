#!/bin/bash

cf set-env "${CF_APP}" NODE_ENV production

cd client
cd dist

cf push "${CF_APP}"

# View logs
# cf logs "${CF_APP}" --recent