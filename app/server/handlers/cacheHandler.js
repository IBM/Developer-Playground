
var NodeCache = require( "node-cache" );
var myCache = new NodeCache();

module.exports = function(app) {
    
var methods = {};
  	
	  methods.set = function(key, value, callback){
    	  myCache.set( key, value, function(err, success){
    		  if(callback){
    			  callback(err, success);
    		  }else{
    			  return success;
    		  }
    	  });
      };
      
      methods.get = function(key, callback){
    	  return myCache.get( key, function(err, value){
    		  if(callback){
    			  callback(err, value);
    		  }else{
    			  return value;
    		  }
    	  });
      };
      
      methods.del = function(key, callback){
    	  return myCache.del(key, function( err, count ){
    		  if(callback){
    			  callback(err, count);
    		  }else{
    			  return count;
    		  }
    		});
      };
      
      methods.flushAll = function(){
    	  myCache.flushAll();
      };
      
      methods.close = function(){
    	  myCache.close();
      };
      
    return methods;
    
}