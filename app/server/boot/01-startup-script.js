'use strict';

/*
  This file helps to perform operations that needs to be performed
  at server startup
*/

// require('events').EventEmitter.prototype._maxListeners = 0;

var debug = require('debug');
// debug.enable('*');
var error = debug('app:error');
var logger = debug('app:log');
// set this namespace to log via console.log
logger.log = console.log.bind(console);


var moment = require('moment'),
    request = require('request'),
    format = require('util').format,
    fs = require('fs');

module.exports = function(app) {

  const handlersFactory = require('../handlers/handlersFactory')(app);

  // var Conversation = app.models.Conversation;

     // uploadBulkDataToCloudant();

    // checkCredentialsFile();

    setupConfigurations();
    // .then(testFunction);

    function setupConfigurations(){
      return new Promise(function (resolve, reject) {

          console.log("CLOUDANT_URL: >>>>> ", process.env.CLOUDANT_URL);

          const appConfigKey = process.env.APP_CONFIG_KEY || 'APP_CONFIG';
          var findReq =  {where: {"key": appConfigKey}};
          logger.log("info", "IN StartupScrip, setupConfigurations with key: %s", appConfigKey);
          var Mapping = app.models.Mapping;

          Mapping.find(findReq, function(err, mappings) {
            // console.log(mappings);
                if(err){
                  logger.log("error", "Error in finding Mappings: >>> %s", err);
                  // return reject(err);
                }
                if(mappings && mappings.length > 0){
                    // logger.log("info","MAPPINGS OUTPUT: >>> %s ", mappings[0]);
                    handlersFactory.getCacheHandler().set(appConfigKey, mappings[0].output);
                    handlersFactory.resetHandlers();
                }else{
                    logger.log("info","NO MAPPINGS FOUND for key %s", appConfigKey);
                }

                return resolve();

          });
      });
    }

    function checkCredentialsFile(){
      fs.stat('../credentials.json', function(err, stat) {
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
    }

  /**
   * This method can be used to upload Master data to Cloudant on server startup
   * @param  {[type]} dataToUpload [description]
   * @param  {[type]} dbName       [description]
   * @return {[type]}              [description]
   */
  function uploadBulkDataToCloudant(dataToUpload, dbName){
    debug("IN uploadBulkDataToCloudant: >> ", dataToUpload.docs.length);

    let CLOUDANT_URL = process.env.SERVICES_CONFIG_CLOUDANT_credentials_url +dbName+"/_bulk_docs";

    try{
      var apiOptions = {
        url: CLOUDANT_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      };
      apiOptions.json = dataToUpload;
      request(apiOptions, function (err, resp, data) {
          if (err) {
              console.log("ERROR in Posting Bulk Data to Cloudant: >> ", err);
              return false;
          }
          if (resp.statusCode == 200) {
            console.log("Data uploaded successfully to Cloudant: >> ", dataToUpload.length);
          }
       });
    }catch(err){
      console.log("Error in Posting Data to Cloudant: >> ", err);
    }
  }

  function testFunction() {
    console.log('IN testFunction');
    // var now = moment(new Date()).add(1, 'days');
    // var departureDate = moment(new Date()).add(1, 'days').format("YYYY-MM-DD");
    // console.log("IN testDates, departureDate: >>> ", departureDate);
    // with request options

    const googleHandler = handlersFactory.getGoogleHandler();
    const options = {};

    googleHandler.getLatNLong({options, 'address': 'New Delhi'}).then(resp => {
      console.log(resp);
      // console.log(JSON.parse(resp)['results'][0]['geometry']['location']);
    }).catch(e => {
      console.error(e);
    });

  }


};
