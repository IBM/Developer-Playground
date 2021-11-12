#!/bin/bash
# Push app

cd app

cf set-env "${CF_APP}" NODE_ENV production
cf set-env "${CF_APP}" NODE_MODULES_CACHE false
cf set-env "${CF_APP}" CLOUDANT_URL ${CLOUDANT_URL}
cf set-env "${CF_APP}" GOOGLE_LOGIN_CLIENT_ID ${GOOGLE_LOGIN_CLIENT_ID}
cf set-env "${CF_APP}" GOOGLE_LOGIN_CLIENT_SECRET ${GOOGLE_LOGIN_CLIENT_SECRET}

cf push "$CF_APP"
# View logs
#cf logs "${CF_APP}" --recent
