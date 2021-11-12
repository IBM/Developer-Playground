'use strict';

const logger = require("../../server/handlers/logger");

module.exports = function(Conversation) {

	const handlersFactory = require('../../server/handlers/handlersFactory')(Conversation.app);

	Conversation.remoteMethod('doconversation', {
		    	accepts: [
		            { arg: 'req', type: 'object', http: function(ctx) {
		              return ctx.req;
		            }
		          }],
		         http: {path: '/converse', verb: 'post'},
		         returns: {arg: 'response', type: 'object', root: true}
	});

	Conversation.remoteMethod('publishToSocket', {
		    	accepts: [
		            { arg: 'req', type: 'object', http: function(ctx) {
		              return ctx.req;
		            }
		          }],
		         http: {path: '/publish', verb: 'post'},
		         returns: {arg: 'response', type: 'object'}
	});

	Conversation.remoteMethod('getLogs', {
		    	accepts: [
		            { arg: 'req', type: 'object', http: function(ctx) {
		              return ctx.req;
		            }
		          }],
		         http: {path: '/logs', verb: 'post'},
		         returns: {arg: 'logs', type: 'object'}
	});

	Conversation.remoteMethod('getSTTToken', {
		    	accepts: [
		            { arg: 'req', type: 'object', http: function(ctx) {
		              return ctx.req;
		            }
		          }],
		         http: {path: '/stt/token', verb: 'get'},
		         returns: {arg: 'response', type: 'object', root: true}
	});

	Conversation.doconversation = function(req, next) {
		console.info("In Conversation.doconversation : >>>> %s ", JSON.stringify(req.body));
		var reqPayload = req.body;
		var params;
		// console.info("\n\nCONTEXT: >>> ", reqPayload.context)
		reqPayload = updateForVoiceCall(reqPayload, next);
		reqPayload = updateForGoogleAction(reqPayload);
		if(reqPayload && reqPayload.params){
			params = reqPayload.params;
		}else{
			params = reqPayload;
		}
		handlersFactory.getAssistantHandler().callVirtualAssistant(params).then((responseJson) => {
				var defaultVGW = [
						{
							"command": "vgwActUnPauseSTT"
						},
						{
							"command": "vgwActPlayText"
						}
					];
				// if vgwActionSequence not in response, push the default one
				if(responseJson.output){
					if (!responseJson.output.hasOwnProperty('vgwActionSequence')) {
						responseJson.output.vgwActionSequence = defaultVGW;
				  	}

				  	if (!responseJson.output.text && responseJson.output.generic && responseJson.output.generic.length > 0) {
					  	responseJson.output.text = [responseJson.output.generic[0].text];
				  	}
				}
				// logger.info("\n\nIBM WATSON RESPONSE: >>> ", responseJson);
				next(null, responseJson);
			}).catch(function(error) {
					next(error, null);
			});

	};

	Conversation.publishToSocket = function(req, next){
		var reqPayload = req.body;
		handlersFactory.getAssistantHandler().publishData(reqPayload).then((responseJson) => {
				next(null, responseJson);
			}).catch(function(error) {
					next(error, null);
			});
	};

	Conversation.getLogs = function(req, next) {
			logger.log("info","In Conversation.getLogs : >>>> %s ", req.body);
			var reqPayload = req.body;

			handlersFactory.getAssistantHandler().getLogs(reqPayload).then((responseJson) => {
		      next(null, responseJson);
		    }).catch(function(error) {
			      next(error, null);
			  });
	};

	Conversation.getSTTToken = function(req, next){
		logger.log("info","In Conversation.getSTTToken : >>>> ");
		handlersFactory.getSTTHandler().fetchToken().then((token) => {
			next(null, token);
		}).catch(function(error) {
			next(error, null);
		});

	};

	function updateForVoiceCall(reqPayload, next){
		if(reqPayload && reqPayload.context && reqPayload.context.vgwSIPRequestURI){
			delete reqPayload.context.vgwSTTResponse;
		  if (!reqPayload.context['skills'] || !reqPayload.context['skills']['main skill']){
			  console.info('<<<<<<<<< NEW VOICE CONVERSATION STARTED >>>>>>>>>> ', JSON.stringify(reqPayload));
			  reqPayload.context['skills'] = {
				  'main skill': {
					  'user_defined': {
						  'initConversation': true,
						  'locale': 'en',
						  'channel': 'VOICE',
						  'save_in_db': false
					  }
				  }
			  };
		  }

			  // reqPayload.context.emailId = "mine@gmail.com";
			  reqPayload.context.vgwConversationFailedMessage = "Sorry, we're having some delays at our server end. Please try again later.";
			  reqPayload.context.vgwPostResponseTimeoutCount = 20000;
		  // console.info("Its a Voice Call To Watson Assistant: >>>> ", reqPayload);
			  if(!reqPayload.input.text || reqPayload.input.text.trim() == '') {
				  reqPayload.context.initConversation = true;
			  }else if(reqPayload.input.text.indexOf("vgw") != -1){
				  //TODO: This needs to be handled later
				  console.info("DO NOTHING, VOICE Message: >> ", reqPayload.input.text);
				  // return false;
			  }

			  if(reqPayload.context.vgwHangUp && reqPayload.context.vgwHangUp == 'Yes'){
				  console.log("Call Ended with Watson Assistant: >>>> ");
				  var responseJson = {
									  "output": {
											  "text": [
												  "Thanks for your call."
											  ]
									  }
								  };
					//   next(null, responseJson);
					  return false;
			  }
			//   params = reqPayload;
			return reqPayload;
	  }else{
		  if(reqPayload && reqPayload.params){
			  return reqPayload.params;
		  }

		  return reqPayload;
	  }
	}

	function updateForGoogleAction(reqPayload){
		if(!reqPayload.inputs || reqPayload.inputs.length == 0 || !reqPayload.inputs[0].intent){
			return reqPayload;
		}
		console.log('IN updateForGoogleAction, reqPayload: >>  ', reqPayload);
		let input = reqPayload.inputs[0].rawInputs[0].query;
		const intent = reqPayload.inputs[0].intent;
		const conversationType = reqPayload.conversation.type;
		console.log('Conversation type:' + conversationType);
		console.log('Google intent:' + intent);
		console.log('Input text:' + input);

		let context = {}; // Clear context and conditionally set it with stashed context
		if (intent === 'actions.intent.CANCEL') {
		  input = "good bye"; // Say goodbye
		} else if (conversationType === 'NEW') {
		  // Input might be "Talk to <name>". Ignore that and trigger a fresh start.
		  input = "";
		} else if (reqPayload.conversation && reqPayload.conversation.conversationToken) {
		  // Use conversationToken to continue the conversation.
		  // Decode/verify the incoming conversationToken and use it as context.
		  context = handlersFactory.getCommonHandler().jwtVerify(reqPayload.conversation.conversationToken);
		  console.log('Incoming context: ');
		  console.log(context);
		}

		if (!context['skills'] || !context['skills']['main skill']){
			console.info('<<<<<<<<< NEW GOOGLE ACTION CONVERSATION STARTED >>>>>>>>>> ', JSON.stringify(context));
			context['skills'] = {
				'main skill': {
					'user_defined': {
						'initConversation': true,
						'locale': 'en',
						'channel': 'GOOGLE',
						'save_in_db': false
					}
				}
			};
		}

		let params = {
			input: { text: input },
			context: context
		  };
		return params;

	}


};
