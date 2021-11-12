require('cls-hooked');

// var appmetrics = require('appmetrics');
// var monitoring = appmetrics.monitor();
// require('appmetrics-dash').attach();
// require('appmetrics-prometheus').attach();

require('events').EventEmitter.defaultMaxListeners = Infinity;

var loopback = require('loopback');
// var LoopBackContext = require('loopback-context');
var boot = require('loopback-boot');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
// var path = require('path');
// var fs = require('fs');

const http = require('http');
const https = require('https');
const sslConfig = require('./ssl-config');

const logger = require("./handlers/logger");

// import bodyParser;

// require('paint-console');
require('dotenv').config();
// require('dotenv').config({path: path.join(__dirname, '../.env')})

var app = module.exports = loopback();

process.env.PORT = process.env.PORT || 80;

// process.env.VCAP_SERVICES = process.env.VCAP_SERVICES;
/*
fs.stat('./credentials.json', function(err, stat) {
    console.log("In reading credentials.json file response....");
    if(err == null) {
        console.log("credentials.json file exists....");
        process.env.VCAP_SERVICES = process.env.VCAP_SERVICES || fs.readFileSync('./credentials.json', 'utf-8');
    } else if(err.code == 'ENOENT') {
        console.log("credentials.json file not found !!! ");
    }else{
        console.log("credentials.json file not found !!! ");
    }
});
*/

logger.log("info", "<<<<<<< RUNNING ON %s ", process.env.NODE_ENV + " ENVIRONMENT >>>>>>>>>>");

//Passport configurators..
var PassportConfigurator = require('loopback-component-passport').PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var flash = require('express-flash');

//attempt to build the providers/passport config
var config = {};
try {
  if(process.env.GOOGLE_LOGIN_CLIENT_ID){
      config = require('../server/providers.js');
  }
} catch (err) {
  console.error("ERROR in loading Providers: >>>> ");
  console.error(err);
  process.exit(1); // fatal
}

// app.use(function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", 'http://localhost:4200');
//    res.header("Access-Control-Allow-Credentials", true);
//    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//    res.header("Access-Control-Allow-Headers",
//  'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,Authorization');
//    next();
//  });

bootOptions = { "appRootDir": __dirname};

  boot(app, bootOptions, function(err) {
    if (err) throw err;
  
    //start the server if `$ node server.js`
    if (require.main === module){
      try{
        logger.log("info","\n\n<<<<<<<< IN SERVER BOOT >>>>>>> ");
        const ioOptions = {
          cors: {
            origin: "*",
            // methods: ["GET", "POST"],
            // allowedHeaders: ["my-custom-header"],
            transports: ['websocket', 'polling'],
            credentials: true
          }
          // allowEIO3: true
        };
        // app.io = require('socket.io')(app.start(process.env.HTTPS), ioOptions);
        // app.io.origins(allowedOrigins);
        app.io = require('socket.io')(app.start(process.env.HTTPS), ioOptions);
        app.io.on('connection', function(socket){
          logger.log('info', 'a user connected');
          socket.removeAllListeners();
          // socket.on('CHAT', function(msg){
          //   logger.info('\n\n\n\nmessage:>>>>>>>> %s', msg);
          //   // app.io.emit('CHAT', msg);
          // });
          socket.on('disconnect', function(){
              console.warn('\n\n<<<<<<<< USER DISCONNECTED >>>>>> \n\n');
          });
        });
      }catch(err){
        console.log('ERROR IN Server Start: >>>> ');
        logger.info(err);
      }
    }
  });
 

passportConfigurator.init(false);

//app.use(loopback.cookieParser(app.get('cookieSecret')));
app.use(cookieParser(app.get('cookieSecret')));

app.middleware('session:before', cookieParser(app.get('cookieSecret')));
app.middleware('session', expressSession({
  secret: 'kitty',
  saveUninitialized: true,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  resave: true,
  httpOnly: true,
  ephemeral: true
}));

//We need flash messages to see passport errors
app.use(flash());

// var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

  passportConfigurator.setupModels({
	  userModel: app.models.MyUser,
	  userIdentityModel: app.models.MyUserIdentity,
	  userCredentialModel: app.models.UserCredential,
		applicationCredential: app.models.ApplicationCredential
	});

  // passportConfigurator.setupModels({
	//   userModel: app.models.User,
	//   userIdentityModel: app.models.UserIdentity,
	//   userCredentialModel: app.models.UserCredential,
	// 	applicationCredential: app.models.ApplicationCredential
	// });

function customProfileToUser(provider, profile, options) {
  // logger.info("IN customProfileToUser: >>> ", profile);
	var userObj = profile["_json"];
	delete userObj["_raw"];

  var userInfo = {
    provider: provider,
    providerId: profile.id,
    username: provider+"."+profile.id,
    password: 'secret',
    email: profile.id+"@loopback."+provider+".com",
    profile: userObj
  };
  return userInfo;
}

for (var s in config) {
	var c = config[s];
	c.session = c.session !== false;
  c.profileToUser = customProfileToUser;
	passportConfigurator.configureProvider(s, c);
}

app.on('uncaughtException', function(err) {
    if(err.errno === 'EADDRINUSE')
         console.error('err: >>>>' , err);
    else
         console.error(err);
    app.exit(1);
});


  app.start = function(enableHTTPS) {
        if (enableHTTPS === undefined || enableHTTPS == false || enableHTTPS == 'false' || process.env.NODE_ENV == 'production') {
          enableHTTPS = false;
        }else{
          enableHTTPS = true;
        }
        let server = null;
        if (enableHTTPS) {
          secureKeys = sslConfig.getSecureKeys();
          const options = {
            key: secureKeys.privateKey,
            cert: secureKeys.certificate,
            requestCert: false,
            rejectUnauthorized: false,
          };
          // console.log(options);
          server = https.createServer(options, app);
        } else {
          server = http.createServer(app);
        }
        console.log('enableHTTPS: >> ', enableHTTPS, ', PORT: >> ', app.get('port'));
        // start the web server
        return server.listen(process.env.PORT, function() {
          // var baseUrl = app.get('url').replace(/\/$/, '');
          const baseUrl = (enableHTTPS ? 'https://' : 'http://') + app.get('host') + ':' + app.get('port');
          logger.info('Web server listening at: %s', baseUrl);
          app.emit('started');
          if (app.get('loopback-component-explorer')) {
            var explorerPath = app.get('loopback-component-explorer').mountPath;
            logger.info('Browse your REST API at %s%s', baseUrl, explorerPath);
          }
        });

    };

  

