'use strict'

var commonHandler,
  cacheHandler,
  assistantHandler,
  discoveryHandler,
  sttHandler,
  nluHandler,
  externalCallHandler,
  responseHandler,
  feedsHandler,
  channelHandler,
googleHandler;

commonHandler = require("./commonHandler")();
cacheHandler = require("./cacheHandler")();
feedsHandler = require("./feedsHandler")();

module.exports = function (app) {

  var methods = {};

  methods.resetHandlers = function () {
    console.log('IN handlersFactory.resetHandlers: >>>> ');
    assistantHandler = require("./assistantHandler")(app);
    discoveryHandler = require("./discoveryHandler")(app);
    sttHandler = require("./sttHandler")(app);
    nluHandler = require("./nluHandler")(app);
    responseHandler = require("./responseHandler")(app);
    externalCallHandler = require("./externalCallHandler")(app);
    channelHandler = require("./channelHandler")(app);
    googleHandler = require('./googleHandler')(app);
    methods.initHandlers();
  }

  methods.initHandlers = function () {
    assistantHandler.init();
    discoveryHandler.init();
    sttHandler.init();
    nluHandler.init();
    externalCallHandler.init();
    channelHandler.init();
    googleHandler.init();
  }

  methods.getCommonHandler = function () {
    return commonHandler;
  }

  methods.getCacheHandler = function () {
    return cacheHandler;
  }

  methods.getFeedsHandler = function () {
    return feedsHandler;
  }

  methods.getExternalCallHandler = function () {
    return externalCallHandler;
  }

  methods.getAssistantHandler = function () {
    return assistantHandler;
  }

  methods.getDiscoveryHandler = function () {
    return discoveryHandler;
  }

  methods.getSTTHandler = function () {
    return sttHandler;
  }

  methods.getResponseHandler = function () {
    return responseHandler;
  }

  methods.getChannelHandler = function () {
    return channelHandler;
  }

  methods.getGoogleHandler = function () {
    return googleHandler;
  }

  return methods;

}
