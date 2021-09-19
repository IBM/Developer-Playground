const { clientId, clientSecret } = require("./credentials")
const promiseRequest = require("./promiseRequest");
const fs = require("fs");

const getResult = async (jobId) => {
    return new Promise((resolve, reject) => {
        let requestInterval;
        const options = {
            method: 'GET',
            url: `https://api.ibm.com/ai4industry/run/result/${jobId}`,
            headers: {
                'X-IBM-Client-Id': clientId,
                'X-IBM-Client-Secret': clientSecret,
                accept: 'application/json'
            }
        };
        try {
            requestInterval = setInterval(async () => {
                let response = await promiseRequest(options)
                let result = JSON.parse(response.replace(/\bNaN\b/g, "null"));
                let status = result.status
                if (status === "done"){
                    clearInterval(requestInterval)
                    fs.writeFileSync("./data/result.json",JSON.stringify(result))
                    resolve(result)
                }
            }, 3000);
        } catch (err) {
            clearInterval(requestInterval)
            reject(err)
        }
    })
}
/*getResult('e03c6962-cd75-4b18-ba05-fd5550e4e59b').then(async(result) => {
   
    console.log(result)
})*/
module.exports = getResult;