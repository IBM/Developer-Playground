'use strict';

const path = require('path');
const fs = require('fs');


module.exports = {
  getSecureKeys: function(){
    let secureKeys = {'privateKey': '', 'certificate': '' };
    if (process.env.NODE_ENV && process.env.NODE_ENV == 'development') {
      secureKeys.privateKey = fs.readFileSync(path.join(__dirname, '../ssl/server.key')).toString();
      secureKeys.certificate = fs.readFileSync(path.join(__dirname, '../ssl/server.crt')).toString();
    }else{
      secureKeys.privateKey = fs.readFileSync(path.join(__dirname, '../ssl/server.key')).toString();
      secureKeys.certificate = fs.readFileSync(path.join(__dirname, '../ssl/server.crt')).toString();
    }
    return secureKeys;
  }
}

