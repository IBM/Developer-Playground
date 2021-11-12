
module.exports = function(MyUserIdentity) {

    MyUserIdentity.remoteMethod(
          'login',
          {
            accepts: [
                  { "arg": "provider", "type": "string", required: true},
                  { "arg": "authScheme", "type": "string", required: true},
                  { "arg": "profile", "type": "object", required: true, http: {source: 'body'}},
                  { "arg": "credentials", "type": "object", required: true, http: {source: 'body'}},
                  {"arg": "options", "type": "Object",http: {source: 'body'}}
                ],
            returns: [
                      {arg: 'user', type: 'object'},
                      {arg: 'info', type: 'object'},
                      {arg: 'identity', type: 'object'},
                      {arg: 'accessToken', type: 'object'}
                    ],
               http: {path: '/login', verb: 'post'}
          }

    );


    MyUserIdentity.observe('before save', function updateTimestamp(ctx, next) {
      // console.log('\n\nInside MyUserIdentity.js before save: ', ctx.instance);
        if (ctx.instance) {
          if(!ctx.instance.audit){
            ctx.instance.audit = {};
          }
          if(!ctx.instance.id){
            ctx.instance.audit.created = new Date();
          }
          ctx.instance.audit.modified = new Date();

          if(ctx.instance.profile){
              var profile = {id: ctx.instance.profile.id, emails: ctx.instance.profile.emails};
              ctx.instance.profile = profile;
          }

          delete ctx.instance["_raw"];
          delete ctx.instance["_json"];

        } else {
          if(!ctx.data.audit){
            ctx.data.audit = {};
          }
          ctx.data.audit.modified = new Date();
        }        

       return next();
      });

};
