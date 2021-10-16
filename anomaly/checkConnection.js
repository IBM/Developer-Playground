const {clientId, clientSecret} = require("./credentials.js")
const promiseRequest = require("./promiseRequest")
let apiEndpoint;
if(process.env.PLAYGROUND_ENVIRONMENT === 'production') 
  apiEndpoint = 'https://api.ibm.com/ai4industry/run/connection-check'
else
  apiEndpoint = `https://dev.api.ibm.com/ai4industry/test/connection-check`

const options = {
  method: 'GET',
  url: apiEndpoint,
  headers: {
    'X-IBM-Client-Id': clientId,
    'X-IBM-Client-Secret': clientSecret,
    accept: 'application/json'
  }
};

(async () => {
  try{
  const response = await promiseRequest(options)
  console.log(response)
  } catch(err) {
      console.log(err)
  }
})();