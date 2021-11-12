'use strict'

/* eslint-disable no-console */
/* eslint-disable array-callback-return */

const logger = require('./logger');
const assert = require('assert');
var DiscoveryV1 = require('ibm-watson/discovery/v1'), myDiscovery;
const { IamAuthenticator } = require('ibm-watson/auth');

module.exports = function(app) {

  var methods = {};

  const handlersFactory = require('./handlersFactory')(app);
  var ENABLE_DISCOVERY = false;
  var environmentId, collectionId;

  methods.init = function() {
    var APP_CONFIG = handlersFactory.getCacheHandler().get('APP_CONFIG');
    const WD_CONFIG = APP_CONFIG.WATSON_DISCOVERY;

    if (WD_CONFIG && WD_CONFIG.ENABLE) {
      ENABLE_DISCOVERY = (WD_CONFIG.ENABLE === 'true' || WD_CONFIG.ENABLE == true);
    }

    if (!ENABLE_DISCOVERY) {
      return false;
    }
    environmentId = WD_CONFIG.ENVIRONMENT_ID || '<environment-id>';
    collectionId = WD_CONFIG.COLLECTION_ID || '<collection-id>';
    if (!environmentId || environmentId === '<environment-id>' || !collectionId || collectionId === '<collection-id>') {
      return false;
    }

    var discovery_credentials = {
      authenticator: new IamAuthenticator({
        apikey: WD_CONFIG.API_KEY,
      }),
      url: 'https://gateway.watsonplatform.net/discovery/api/',
      version: '2017-09-01'
    }
    myDiscovery = new DiscoveryV1(discovery_credentials);
  }

  methods.callDiscovery = function (params) {
    logger.log('info', 'IN discoveryHandler.callDiscovery: >>> %s ', params);
    return new Promise(function (resolve, reject) {
      assert(params, 'params cannot be null');
      assert(params.input, 'params.input cannot be null');

      if (!environmentId || environmentId === '<environment-id>') {
        return reject(new Error('The app has not been configured with a <b>ENVIRONMENT_ID</b> environment variable for Discovery service.'));
      }

      if (!collectionId || collectionId === '<collection-id>') {
        return reject(new Error('The app has not been configured with a <b>COLLECTION_ID</b> environment variable for Discovery service.'));
      }

      var payload = {
        environmentId: environmentId,
        collectionId: collectionId,
        query: params.input.text
      };

      myDiscovery.query(payload, function (err, queryResponse) {
        if (err) {
          return reject(err);
        }
        var i = 0;
        var discoveryResults = [];
        var data = queryResponse.result;
        // console.log(data);
        while (data.results[i] && i < 3) {
          let body = data.results[i].contentHtml;
          discoveryResults[i] = {
            // body: body,
            bodySnippet: (body.length < 500 ? body : (body.substring(0, 500) + '...')).replace(/<\/?[a-zA-Z]+>/g, ''),
            confidence: data.results[i].score,
            id: data.results[i].id,
            url: data.results[i].sourceUrl,
            title: data.results[i].title
          };
          i++;
        }
        // console.log(discoveryResults);
        return resolve(discoveryResults);

      });

    });

  };

  return methods;

}
