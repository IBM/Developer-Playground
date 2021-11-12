'use strict'

const logger = require('./logger');
// const assert = require('assert');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');


module.exports = function(app) {

	var APP_CONFIG;
  const handlersFactory = require('./handlersFactory')(app);
  var naturalLanguageUnderstanding;

var methods = {};

		methods.init = function(){
			APP_CONFIG = handlersFactory.getCacheHandler().get('APP_CONFIG');
			if(APP_CONFIG && APP_CONFIG.WATSON_NLU_API_KEY && APP_CONFIG.WATSON_NLU_API_KEY !== '' && APP_CONFIG.WATSON_NLU_URL){
				naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
          version: '2019-07-12',
          authenticator: new IamAuthenticator({
            apikey: APP_CONFIG.WATSON_NLU_API_KEY,
          }),
          url: APP_CONFIG.WATSON_NLU_URL,
        });
			}
		}


  	methods.analyze = function(payload) {
  		return new Promise(function(resolve, reject){
          logger.log('info','IN sttHandler.fetchToken: >>> ');
          if(!naturalLanguageUnderstanding) {
            reject('NLU_NOT_CONFIGURED');
          }

          naturalLanguageUnderstanding.analyze(analyzeParams)
          .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            resolve(analysisResults);
          })
          .catch(err => {
            reject(err);
          });

  		});

  	};

  return methods;

}
