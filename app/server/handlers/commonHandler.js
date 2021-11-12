'use strict'


require('events').EventEmitter.defaultMaxListeners = Infinity;
const EventEmitter = require('events');
class ResponseEmitter extends EventEmitter {};
var respEmitter = new ResponseEmitter();

respEmitter.removeAllListeners();
respEmitter.setMaxListeners(100);

const jwt = require('jsonwebtoken');
const secret = 'notsecret';

module.exports = function() {

var methods = {};

	methods.getEventEmitter = function(){
    return respEmitter;
  }

  methods.jwtSign = function(data){
    return jwt.sign(data, secret);
  }

  methods.jwtVerify = function(data){
    return jwt.verify(data, secret);
  }

    return methods;

}
