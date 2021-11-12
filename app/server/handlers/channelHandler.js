'use strict'

const logger = require("./logger");
// var { Botkit } = require('botkit');
const { BotFrameworkAdapter, MemoryStorage, ConversationState, UserState, TurnContext } = require('botbuilder');
const { SlackAdapter } = require('botbuilder-adapter-slack');
const { ActivityTypes } = require('botbuilder-core');

    let botSubscribed = false,
    APP_CONFIG,
    bots,
    previousActivityId;

module.exports = function(app) {

  const handlersFactory = require('./handlersFactory')(app);

  var methods = {};

  const memoryStorage = new MemoryStorage();
  const conversationState = new ConversationState(memoryStorage);
    // const userState = new UserState(memoryStorage);

  methods.init = function(){
    const appConfigKey = process.env.APP_CONFIG_KEY || 'APP_CONFIG';
    APP_CONFIG = handlersFactory.getCacheHandler().get(appConfigKey);
    bots = {"SLACK": {}, "MS_BOT": {}};
    if(APP_CONFIG && APP_CONFIG.ENABLE_SLACK && APP_CONFIG.SLACK_BOT_USER_TOKEN){
        methods.initSlackChannel();
    }

    if(APP_CONFIG && APP_CONFIG.ENABLE_MS_BOT && APP_CONFIG.MS_BOT_APP_ID && APP_CONFIG.MS_BOT_APP_PASSWORD){
        methods.initMSBotChannel();
    }

    methods.subscribeToResponse();
  }

  methods.subscribeToResponse = function(){
    if(!botSubscribed){
      logger.log("info","IN ChannelHandler.subscribeToResponse, botSubscribed >> %s ", botSubscribed);
      botSubscribed = true;
      handlersFactory.getCommonHandler().getEventEmitter().on('external_call', async (error, response) => {
        var context = response.context["skills"]["main skill"]["user_defined"];
        if(!context || !context.channel){
          return false;
        }
        logger.log("info","External Call Event Received in channelHandler for Channel: >> %s ", context["channel"]);
            if(context.channel == "WEB"){
              logger.log("info","External Call Event Received in channelHandler: >> ");
              handlersFactory.getAssistantHandler().formatWatsonResponse(response)
              .then((formattedResp) =>{
                handlersFactory.getAssistantHandler().publishResponse(formattedResp);
              })
              .catch(function(error) {
                logger.error(error);
              });
            }else{
              var channelMsg;
              if(context){
                channelMsg = context.channelMsg
              }
              if(!channelMsg){
                channelMsg = response;
              }
              console.log('CHANNEL: >> ', context.channel);
              await handlersFactory.getAssistantHandler().formatWatsonResponse(response).then( async (watsonResp) => {
                context = watsonResp.context.skills["main skill"]["user_defined"];
                var bot = handlersFactory.getCacheHandler().get(context.channel);
                if(!bot){
                  console.log('NO BOT FOUND: >>> ');
                  return;
                }

                var reference = TurnContext.getConversationReference(bot.activity);
                // console.log(reference);

                if(watsonResp && watsonResp.output && watsonResp.output.generic){
                  await bot.adapter.continueConversation(reference, async(new_context) => {
                    await new_context.sendActivity(joinText(watsonResp, true));
                  });
                  logger.log("info", " %s BOT Replied: >>> %s ", context.channel,  watsonResp.output.generic[0].text);
                }else{
                   await bot.adapter.continueConversation(reference, async(new_context) => {
                    await new_context.sendActivity("Sorry, I did not understand.");
                  });
                }
                // cb(null, watsonResp);
              }).catch( async error => {
                logger.error(error);
                var bot = handlersFactory.getCacheHandler().get(context.channel);
                if(!bot){
                  console.log('NO BOT FOUND: >>> ');
                  return;
                }else{
                  await bot.adapter.continueConversation(reference, async function (new_context) {
                      await new_context.sendActivity("Sorry, there are technical problems.");
                    });
                }
              });
            }
      });
    }
  };

  methods.initSlackChannel = function(){
    console.log('IN initSlackChannel: >>>>> ');
        if(!APP_CONFIG || !APP_CONFIG.SLACK_BOT_USER_TOKEN || !APP_CONFIG.SLACK_SIGNIN_SECRET){
          return false;
        }

        const adapter = new SlackAdapter({
          clientSigningSecret: APP_CONFIG.SLACK_SIGNIN_SECRET,
          botToken: APP_CONFIG.SLACK_BOT_USER_TOKEN,
          // json_file_store: './data/botkit',
          debug: true
        });

        adapter.onTurnError = async (context, error) => {
          console.error('\n [onTurnError]: ${ error }');
          context.sendActivity('Oops. Something went wrong!');
          conversationState.clear(context);
        };

        app.get('/api/slack/events/', (req, res) => {
          console.log('IN get METHOD for Slack Events testing..... ', req.body);
          res.json({"res": "SUCCESS"});
        });

        app.post('/api/slack/events/', (req, res) => {
          adapter.processActivity(req, res, async(context) => {
            if (context.activity.type === 'message') {
              await postMessage("SLACK", context).then(async(watsonResp) => {
                await context.sendActivity(watsonResp);
                handlersFactory.getCacheHandler().set('SLACK', context);
              });
            }
          });
        });
  };

  methods.initMSBotChannel = function(){
      if(!APP_CONFIG || !APP_CONFIG.MS_BOT_APP_ID || !APP_CONFIG.MS_BOT_APP_PASSWORD){
        return false;
      }

      const adapter = new BotFrameworkAdapter({
        appId: APP_CONFIG.MS_BOT_APP_ID,
        appPassword: APP_CONFIG.MS_BOT_APP_PASSWORD
      });

      adapter.onTurnError = async (context, error) => {
        // Create a trace activity that contains the error object
        const traceActivity = {
            type: ActivityTypes.Trace,
            timestamp: new Date(),
            name: 'onTurnError Trace',
            label: 'TurnError',
            value: `${ error }`,
            valueType: 'https://www.botframework.com/schemas/error'
        };
        console.error(`\n [onTurnError] unhandled error: ${ error }`);
        // Send a trace activity, which will be displayed in Bot Framework Emulator
        await context.sendActivity(traceActivity);
        // Send a message to the user
        await context.sendActivity(`The bot encounted an error or bug.`);
        await context.sendActivity(`To continue to run this bot, please fix the bot source code.`);
    };

    // Create the bot that will handle incoming messages.
    // const bot = new TeamsConversationBot();

    // Listen for incoming requests.
    app.post('/api/msbot/messages', (req, res) => {
      adapter.processActivity(req, res, async(context) => {
        if (context.activity.type === 'message') {
          console.log('MSBOT EVENT RECEIVED: >>> ', context.activity);
          await postMessage('MS_BOT', context).then(async(watsonResp) => {
            await context.sendActivity(watsonResp);
            // bots["MS_BOT"] = {"context": context};
            handlersFactory.getCacheHandler().set('MS_BOT', context);
            console.log('watsonResp: >>> ', watsonResp);
          });
        }else{
          console.log('I CAN HEAR MYSELF TALKING!!!');
        }
      });
    });

  };

   function postMessage(channel, botCtx){
    let message = botCtx.activity;
    logger.log("info","In channelHandler.postMessage: >>> channel: %s, text: %s,  ", channel, message.text);
    return new Promise(async function(resolve, reject) {
        var params = {
                    'input': {'text': message.text, 'message_type': 'text', 'options': {'alternate_intents': false, 'return_context': true} }
                 };
        // console.log(' message.from.id:>>> ', message.from.id);
        let history = await handlersFactory.getCacheHandler().get(message.from.id);
        // console.log(' FETCHED HISTORY :>>> ', history);
        if (!history || !history.context || !history.context["skills"] || !history.context["skills"]['main skill'] || message.text == "reset"){
          let context = {
            'skills': {
              'main skill': {
                'user_defined': {
                  'initConversation': true,
                  'locale': 'en',
                  'channel': channel,
                  'save_in_db': false
                }
              }
            }
          };
          params.context = context;
        }else{
          params.context = history.context;
          if(history && history.sessionId){
            params.sessionId = history.sessionId;
          }
          if(history && history.assistantId){
            params.assistantId = history.assistantId;
          }
        }

        // console.log('params: >> ', params);
        return handlersFactory.getAssistantHandler().callVirtualAssistant(params).then((watsonResp) => {
            history = {'context': watsonResp.context};
            if(watsonResp.sessionId){
              history.sessionId = watsonResp.sessionId;
            }
            if(watsonResp.assistantId){
              history.assistantId = watsonResp.assistantId;
            }
            // console.log('SET HISTORY: >>> ', history);
            handlersFactory.getCacheHandler().set(message.from.id, history);
            watsonResp.context.channelMsg = message;
            resolve(joinText(watsonResp, false));
        }).catch(function(error) {
          logger.error(error);
          reject(error);
        });
      });
  }

  function joinText(watsonResp, externalResp){
      var joinedReply = "";
      if(watsonResp && watsonResp.output && watsonResp.output["generic"]) {
        let generic = watsonResp.output.generic;
        if(!externalResp){
          for(var reply of generic){
            if(reply["response_type"] == "text"){
              joinedReply = joinedReply + reply.text + ". ";
            }else{
              joinedReply = joinedReply + reply.type + " response type is currently not supported for this channel \n";
            }
          }
        }else{
          let genericResp;
          if(generic.length > 1){
            genericResp = generic[1];
          }else{
            genericResp = generic[0];
          }

          if(genericResp["response_type"] == "text"){
            if(genericResp.text.constructor.toString().indexOf('Array') > -1){
              for(var text of genericResp.text){
                joinedReply = joinedReply + text;
              }
            }else{
              joinedReply = joinedReply + genericResp.text;
            }
          }else{
            joinedReply = joinedReply + genericResp["response_type"] + " response type is currently not supported for this channel \n";
          }

        }
        return joinedReply;
      } else{
        return 'No Response found !';
      }
  }

  return methods;

}
