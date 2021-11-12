'use strict'

const logger = require("./logger");

module.exports = function(app) {

  let Mapping;
  const handlersFactory = require('./handlersFactory')(app);

var methods = {};

	methods.formatResponse = function(response, cb) {
    // logger.log("info","IN responseHandler.formatResponse: >>>> %s", response.output);
    if(response.output.hasOwnProperty('user_defined') && response.output["user_defined"]["type"]
         && response.output["user_defined"]["type"] == "CLOUDANT_MAPPING") {
         for(let textKey of response.output["user_defined"]["mappings"]){
           var findReq =  {where: {"key": textKey}};
           logger.log("info", "IN responseHandler.formatResponse, findMapping with key: %s", textKey);
           if(!Mapping){
             Mapping = app.models.Mapping;
           }
           Mapping.find(findReq, function(err, mappings) {
                 if(err){
                   logger.log("error", "Error in finding Mappings: >>> %s", err);
                   return;
                 }
                 if(mappings && mappings.length > 0){

                  var output_text = "";
                  if(response.context && response.context['skills']['main skill']['user_defined']["locale"]){
                    output_text = mappings[0].output[response.context['skills']['main skill']['user_defined']["locale"]];
                  }else{
                   output_text = mappings[0].output["en"];
                  }
                  
                  response.output["generic"] = [{"response_type": "text", "text": output_text}];
                  
                  logger.log("info","MAPPINGS OUTPUT: >>> %s ", response.output);
                  replaceContextVariables(response, cb);
                 }else{
                     replaceContextVariables(response, cb);
                 }

            });
         }

         delete response.output["user_defined"]["type"];
         delete response.output["user_defined"]["mappings"];

    }else{
      replaceContextVariables(response, cb);
    }

  };
  
  function replaceContextVariables(response, cb){
    if(response.context){
      var texts = [];
      for(let g of response.output["generic"]){
        if(g.text && g.text.indexOf("&") != -1){
          //TODO: This is currently only for $location, but needs to write
          // an engine that can replace all context variables
            if(g.text.indexOf("&location&") != -1){
              var location = response.context.skills["main skill"]["user_defined"]["location"];
              g.text = g.text.replace("&location&", location);
              logger.log("info", "AFTER REPLACEING Context variables: >> %s", g.text);
            }
        }
        texts.push(g);
      }
      response.output.generic = texts;
    }

    response = formatResponseForGoogleActions(response);

    return cb(null, response);
  }

  function formatResponseForGoogleActions(watsonResp){
    // console.log('IN formatResponseForGoogleActions: >> ', JSON.stringify(watsonResp));
    if (!watsonResp.context || !watsonResp.context['skills'] || !watsonResp.context['skills']['main skill'] 
      || !watsonResp.context['skills']['main skill']['user_defined'] 
      || !watsonResp.context['skills']['main skill']['user_defined']['channel'] 
      || watsonResp.context['skills']['main skill']['user_defined']['channel'] != 'GOOGLE'){
        return watsonResp;
		}

    const conversationToken = handlersFactory.getCommonHandler().jwtSign(watsonResp.context);
    var joinedReply = "";
    if(watsonResp && watsonResp.output && watsonResp.output["generic"]) {
      for(var reply of watsonResp.output["generic"]){
        if(reply["response_type"] == "text"){
          joinedReply = joinedReply + reply.text + ". ";
        }else{
          joinedReply = joinedReply + reply.type + " response type is currently not supported for this channel \n";
        }                
      }      
    }else{
      joinedReply = "Sorry, I did not understand.";
    }
    // Build the response JSON
    const richResponse = {
      items: [
        {
          simpleResponse: {
            textToSpeech: joinedReply
          }
        }
      ],
      suggestions: []
    };
    var expectUserResponse = true;
    const resp = {
      conversationToken: conversationToken,
      expectUserResponse: expectUserResponse
    };
  
    if (expectUserResponse) {
      resp.expectedInputs = [
        {
          inputPrompt: {
            richInitialPrompt: richResponse
          },
          possibleIntents: [
            {
              intent: 'actions.intent.TEXT'
            }
          ]
        }
      ];
    } else {
      const s = joinedReply.substring(0, 59); // Has to be < 60 chars.  :(
      resp.finalResponse = { speechResponse: { textToSpeech: s } };
    }
    return resp;
  }

    return methods;

}
