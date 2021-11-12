'use strict';

module.exports = function(Mapping) {

  Mapping.observe('before save', function updateTimestamp(ctx, next) {
		console.log('\n\nInside Mapping.js before save: ');
		  if (ctx.instance) {
			  if(!ctx.instance.audit){
				  ctx.instance.audit = {};
			  }
			  if(!ctx.instance.id){
				  ctx.instance.audit.created = new Date();
			  }
		    ctx.instance.audit.modified = new Date();
		  } else {
			  if(!ctx.data.audit){
				  ctx.data.audit = {};
			  }
			  ctx.data.audit.modified = new Date();
		  }
		 return next();
		});

    Mapping.observe('after save', function restApp(ctx, next) {
  	    // console.log('IN Mapping.js, after save:: >>> ', ctx.instance);
  	    try{
          var mapping = ctx.instance;
          const handlersFactory = require('../../server/handlers/handlersFactory')(Mapping.app);
          handlersFactory.getCacheHandler().set(mapping.key, mapping.output);
          handlersFactory.resetHandlers();
  	    }catch(err){
  	    	console.log("ERROR IN afterRemote.save of APP CONFIG: >>> ", err);
  	    }
  	     return next();
  	  });

};
