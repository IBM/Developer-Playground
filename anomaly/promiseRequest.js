const request = require('request');

const promiseRequest = (options) => {
    return new Promise(function (resolve, reject) {
      request(options, function (error, res, body) {
        if (!error && res.statusCode == 200) {
          resolve(body);
        } else {
          reject(res);
        }
      });
    });
  }

module.exports = promiseRequest;