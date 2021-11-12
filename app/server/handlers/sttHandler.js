'use strict'

const logger = require('./logger');
// const assert = require('assert');
var SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamTokenManager } = require('ibm-watson/auth');


module.exports = function(app) {

	var APP_CONFIG;
	var sttAuthenticator;
	const handlersFactory = require('./handlersFactory')(app);

var methods = {};

		methods.init = function(){
			APP_CONFIG = handlersFactory.getCacheHandler().get('APP_CONFIG');
			if(APP_CONFIG && APP_CONFIG.WATSON_STT_API_KEY && APP_CONFIG.WATSON_STT_API_KEY !== ''){
				sttAuthenticator = new IamTokenManager({
					apikey: APP_CONFIG.WATSON_STT_API_KEY,
				});
			}
		}


  	methods.fetchToken = function() {
  		return new Promise(function(resolve, reject){
			logger.log('info','IN sttHandler.fetchToken: >>> ');
			if(!sttAuthenticator) {
        reject('STT_NOT_CONFIGURED');
			}

			 sttAuthenticator
				.requestToken()
				.then(({ result }) => {
					return resolve(result.access_token);
				})
				.catch(err => {
           reject(err);
				});
  		});

  	};

  return methods;

}
