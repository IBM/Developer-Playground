'use strict';

/* eslint-disable no-console */
/* eslint-disable array-callback-return */

const logger = require("./logger");
const assert = require('assert');
const AssistantV2 = require('ibm-watson/assistant/v2');
const { BasicAuthenticator, IamAuthenticator } = require('ibm-watson/auth');
const AssistantV1 = require('ibm-watson/assistant/v1');

var request = require('request'),
  // format = require('util').format,
  // sessionId,
  myAssistantV2,
  myAssistantV1,
  pubsub = require('../pubsub.js'),
  socket,
  ENABLE_DISCOVERY = false,
  APP_CONFIG;

// var CONFIG = require('../../common/config/config').get(),

let Conversation;

module.exports = function(app) {
  const handlersFactory = require('./handlersFactory')(app);
  var DEFAULT_ASSISTANT;

  var methods = {};

  methods.init = function() {
    APP_CONFIG = handlersFactory.getCacheHandler().get('APP_CONFIG');
    const WA_CONFIG = APP_CONFIG.WATSON_ASSISTANT;
    const WD_CONFIG = APP_CONFIG.WATSON_DISCOVERY;
    if(!WA_CONFIG || !WA_CONFIG.ASSISTANTS || WA_CONFIG.ASSISTANTS.length < 1 ){
      return false;
    }else {
      for (let ASSISTANT of WA_CONFIG.ASSISTANTS){
        console.log('ASSISTANT: >> ', ASSISTANT);
        if(ASSISTANT.default){
          DEFAULT_ASSISTANT = ASSISTANT;
        }

      }
    }

    var assistantCredentials = {};

    if (WA_CONFIG.USERNAME && WA_CONFIG.PASSWORD) {
      assistantCredentials = {
        authenticator: new BasicAuthenticator({
          username: WA_CONFIG.USERNAME,
          password: WA_CONFIG.PASSWORD,
        }),
        version: '2021-06-14',
        serviceUrl: WA_CONFIG.URL
      };
    }

    if (WA_CONFIG.API_KEY) {
      assistantCredentials = {
        authenticator: new IamAuthenticator({
          apikey: WA_CONFIG.API_KEY,
        }),
        version: '2021-06-14',
        serviceUrl: WA_CONFIG.URL
      };
    }
    // console.log(assistantCredentials);
    myAssistantV2 = new AssistantV2(assistantCredentials);
    myAssistantV1 = new AssistantV1(assistantCredentials);
    Conversation = app.models.Conversation;

    if (WD_CONFIG && WD_CONFIG.ENABLE) {
      ENABLE_DISCOVERY = (WD_CONFIG.ENABLE === 'true' || WD_CONFIG.ENABLE == true);
    }
  };

  methods.listWorkspaces = function() {
    myAssistantV1.listWorkspaces().then(res => {
      console.log(JSON.stringify(res, null, 2));
    })
    .catch(err => {
      console.log(err)
    });
  }

  methods.createWorkspace = function(workspaceJson) {
    myAssistantV1.createWorkspace(workspaceJson).then(res => {
      console.log(JSON.stringify(res, null, 2));
    })
    .catch(err => {
      console.log(err)
    });
  }

  methods.callVirtualAssistant = function(params) {
    function logError(e) {
      logger.error(e);
      throw e; // reject the Promise returned by then
    }

    assert(params, 'params cannot be null');
    // console.log('IN callVirtualAssistant with params: >> ', JSON.stringify(params));
    if (params.context && params.context['skills']['main skill']['user_defined']) {
      params.context['skills']['main skill']['user_defined']['next_action'] = null;
    } else {
      console.log('********* STARTING NEW CONVERSATION *************')
      params.context = {
        'skills': {
          'main skill': {
            'user_defined': {
              'initConversation': true,
              'locale': 'en',
              'channel': 'WEB',
              'save_in_db': false
            }
          }
        }
      };
    }

    if ((!params.input || !params.input.text) && !params.context['skills']['main skill']['user_defined']['initConversation']) {
      return reject(new Error('Input text cannot be null or empty !'));
    }

    if(!params.assistantId){
      params.assistantId = DEFAULT_ASSISTANT.id || '<assiatant-id>';
    }
    if (!params.assistantId || params.assistantId === '<assiatant-id>') {
      return reject(new Error('The app has not been configured with a <b>DEFAULT_ASSISTANT</b> environment variable. Please refer to the ' + '<a href="https://github.com/sinny777/conversation">README</a> documentation on how to set this variable. <br>' + 'Once a workspace has been defined the intents may be imported from ' + '<a href="https://github.com/sinny777/conversation/blob/master/training/conversation/car_workspace.json">here</a> in order to get a working application.'));
    }

    console.log('sessionId: >>> ', params.sessionId);
    console.log('assistantId: >>> ', params.assistantId);
    console.log('initConversation: >>> ', params.context['skills']['main skill']['user_defined']['initConversation']);
    if (params.context['skills']['main skill']['user_defined']['initConversation'] || !params.sessionId) {
      return createSession(params)
        .then(callWatsonAssistant)
        .then(callWatsonDiscovery)
        .then(updateWatsonResponse)
        .then(methods.formatWatsonResponse)
        .then(null, logError);
    } else {
      return callWatsonAssistant(params)
        .then(callWatsonDiscovery)
        .then(updateWatsonResponse)
        .then(methods.formatWatsonResponse)
        .then(null, logError);
    }
  };

  function createSession(params) {
    // console.log('IN createSession with assistantId: >>> ', params.assistantId);
    return new Promise(function(resolve, reject) {
      myAssistantV2.createSession({
        assistantId: params.assistantId
      })
        .then(res => {
          // console.log(JSON.stringify(res.result, null, 2));
          params.sessionId = res.result['session_id'];
          return resolve(params);
        })
        .catch(err => {
          // console.log(err);
          return reject(err);
        });
    });
  }

  /**
   * This method is used to call IBM Watson Assistant (formerly Conversation)
   * and based on the response it handles business logic and even call watson
   * Discovery Service for fetching response.
   * @param  {[type]} params       Payload for calling Watson Assistant
   * @param  {[type]} Conversation Loopback Model for CRUD operations in DB
   * @return {[type]}              API Response with Context, Output and more
   */
  function callWatsonAssistant(params) {
    logger.info('IN assistantHandler.callConversation with params: ');
    // logger.info(params);
    return new Promise(function (resolve, reject) {
      var payload = {
        assistantId: params.assistantId,
        sessionId: params.sessionId,
        context: params.context || {},
        input: params.input || {
          'text': '',
          'message_type': 'text',
          'options': {
            'alternate_intents': false,
            'return_context': true,
            'debug': true,
          }
        }
      };
      if (!payload.input.options) {
        payload.input.options = {
          'alternate_intents': false,
          'return_context': true,
          'debug': true,
        };
      }
      payload.input['message_type'] = 'text';
      payload.input.options['return_context'] = true;
      payload.input.options['debug'] = true;
      logger.info('Calling Watson Assistant with payload: >> ', payload);

      myAssistantV2.message(payload).then(resp =>{
        var conversationResp = resp.result;
        conversationResp.input = payload.input;
        conversationResp.context['skills']['main skill']['user_defined']['initConversation'] = false;
        // conversationResp.context['skills']['main skill']['user_defined']['save_in_db'] = true;
        conversationResp.datetime = new Date();
        conversationResp.sessionId = params.sessionId;
        conversationResp.assistantId = params.assistantId;
        let returnJson = conversationResp;
        delete returnJson.environment_id;
        delete returnJson.collection_id;
        delete returnJson.username;
        delete returnJson.password;
        // logger.info("Watson Assistant RESPONSE: >>> ", conversationResp);
        return resolve(conversationResp);
      }).catch(err => {
        console.log(err);
        return reject(err);
      });

      // myAssistantV2.message(payload, function(err, resp) {
      //   if (err) {
      //     return reject(err);
      //   }
      //   var conversationResp = resp.result;
      //   conversationResp.input = payload.input;
      //   conversationResp.context['skills']['main skill']['user_defined']['initConversation'] = false;
      //   // conversationResp.context['skills']['main skill']['user_defined']['save_in_db'] = true;
      //   conversationResp.datetime = new Date();
      //   conversationResp.sessionId = params.sessionId;
      //   conversationResp.assistantId = params.assistantId;
      //   let returnJson = conversationResp;
      //   delete returnJson.environment_id;
      //   delete returnJson.collection_id;
      //   delete returnJson.username;
      //   delete returnJson.password;
      //   logger.info("Watson Assistant RESPONSE: >>> ", conversationResp);
      //   return resolve(conversationResp);

      // });
    });

  };

  function callWatsonDiscovery(conversationResp) {
    // logger.info("IN callWatsonDiscovery, conversationResp: ", conversationResp);
    return new Promise(function(resolve, reject) {
      if (conversationResp.output['user_defined'] && conversationResp.output['user_defined'].hasOwnProperty('action') && conversationResp.output['user_defined'].action.hasOwnProperty('call_discovery')) {
        if (ENABLE_DISCOVERY) {
            logger.log('info', 'Calling Discovery for responses >>>> ');
            handlersFactory.getDiscoveryHandler().callDiscovery(conversationResp).then((discoveryResults) => {
                // conversationResp.output.discoveryResults = discoveryResults;
            conversationResp.output['generic'] = [{
              'response_type': 'search',
              'results': discoveryResults
            }];

            delete conversationResp.username;
            delete conversationResp.password;
            return resolve(conversationResp);
          }).catch(function(error) {
            return reject(error);
          });
        } else {
          logger.info('\n\n<<<<<<< DISCOVERY SERVICE IS DISABLED >>>>>>>>>>\n\n');
          return resolve(conversationResp);
        }
      } else {
        return resolve(conversationResp);
      }
    });
  }

  function updateWatsonResponse(response) {
    return new Promise(function(resolve, reject) {
      var responseText;
      if (!response.output) {
        response.output = {};
      }

      if (response.output.intents && response.output.intents[0]) {
        var intent = response.output.intents[0];
        if (intent.confidence <= 0.5 && (!response.output.generic || response.output.generic.length == 0 || response.output.generic[0].text == '')) {
          responseText = 'I did not understand your intent, please rephrase your question';
          response.output["generic"] = [{ "response_type": "text", "text": responseText }];
          return resolve(response);
        }
      } else if (!response.output.generic || response.output.generic.length == 0 || response.output.generic[0].text == '') {
        responseText = 'I did not understand your intent, please rephrase your question';
          response.output["generic"] = [{ "response_type": "text", "text": responseText }];
          return resolve(response);
      }

      if (response.context && response.context.skills &&
        response.context.skills["main skill"] && response.context.skills["main skill"]["user_defined"] &&
        response.context.skills["main skill"]["user_defined"]["next_action"]) {
        var next_action = response.context.skills["main skill"]["user_defined"]["next_action"];
        if (next_action && next_action != null && next_action.constructor === Object &&
          next_action.hasOwnProperty('action') && next_action.action == "external_call") {
          logger.info("NEXT ACTION OBJECT: >>> ", next_action);
          setTimeout(function () {
            handlersFactory.getExternalCallHandler().handleResponse(response, function (err, response) {
              logger.log("info", "External Call Response: >> %s ", JSON.stringify(response.output.generic));
              // logger.log("info","External Call Context: >> %s ", response.context);
              handlersFactory.getCommonHandler().getEventEmitter().emit("external_call", err, response);
            });
          }, 2000);
        } else {
          return resolve(response);
        }
      } else {
          if(!response.output.generic || response.output.generic.length == 0 || response.output.generic[0].text == ''){
            if(responseText){
              response.output["generic"] = [{ "response_type": "text", "text": responseText }];
            }
          }

        return resolve(response);
      }

      // if(response.output.text){
      return resolve(response);
      // }

    });

  }

  methods.formatWatsonResponse = function(response) {
    return new Promise(function(resolve, reject) {
      handlersFactory.getResponseHandler().formatResponse(response, function(err, formattedResp) {
        updateDBIfRequired(formattedResp);
        return resolve(formattedResp);
      });
    });
  };

  function updateDBIfRequired(conversationResp) {
    if(!conversationResp || !conversationResp.context || !conversationResp.context['skills']
      || !conversationResp.context['skills']['main skill'] || !conversationResp.context['skills']['main skill']['user_defined'] ){
      return false;
    }
    if (conversationResp.context['skills']['main skill']['user_defined'].hasOwnProperty('save_in_db') && conversationResp.context['skills']['main skill']['user_defined']['save_in_db'] == true) {
      logger.info("IN updateDBIfRequired: >>> ", conversationResp.context['skills']['main skill']['user_defined']['save_in_db']);
      conversationResp.context['skills']['main skill']['user_defined']['save_in_db'] = false;
      if (!Conversation) {
        Conversation = app.models.Conversation;
      }

      if(conversationResp.output && conversationResp.output.generic
        && conversationResp.output.generic.length > 0
        && conversationResp.output.generic[0].results){
          delete conversationResp.output.generic[0].results;
      }

      Conversation.upsert(conversationResp, function (err, savedConversation) {
        if (err) {
          logger.info("ERROR IN SAVING CONVERSATION: >> ", err);
        } else {
          logger.info("<<<< CONVERSATION SAVED IN DB SUCCESSFULLY >>>>>>> ");
        }
      });
    }
  }

  methods.publishResponse = function (formattedResp) {
    if (formattedResp.context['skills']['main skill']['user_defined']['next_action'] == "append") {
      if (!formattedResp.context['skills']['main skill']['user_defined']['channel'] || formattedResp.context['skills']['main skill']['user_defined']['channel'] == "WEB") {
        if (!socket) {
          socket = Conversation.app.io;
        }

        // var conversation = {"conversation": formattedResp};
        var collectionName = 'CHAT'; // DEFAULT collectionName
        if (formattedResp["sessionId"]) {
          collectionName = formattedResp["sessionId"];
        }

        // logger.log("info", "PUBLISHING CONVERSATION RESPONSE TO collectionName: >>>> %s ", collectionName);
        pubsub.publish(socket, {
          collectionName: collectionName,
          data: formattedResp,
          method: 'POST'
        });
      } else {
        logger.info("NOTHING TO APPEND Channel: >>>> ", formattedResp.context['skills']['main skill']['user_defined']['channel']);
      }
    }
  }

  methods.publishData = function (publishReq) {
    return new Promise(function (resolve, reject) {
      if (!socket) {
        socket = Conversation.app.io;
      }
      logger.info("IN assistantHandler.publishData, publishReq: >>> ", publishReq);
      socket.emit(publishReq.collectionName, publishReq.data);
      return resolve({
        "response": "PUBLISHED"
      });
    });
  };

  methods.getLogs = function (payload) {
    return new Promise(function (resolve, reject) {
      logger.info("IN assistantHandler.getLogs, payload: >>> ", payload);
      myAssistantV1.listLogs(payload, function (err, logsResp) {
        if (err) {
          return reject(err);
        }
        return resolve(logsResp);
      });
      // return resolve({"response": "LOGS_FETCHED"});
    });

  };

  return methods;

}
