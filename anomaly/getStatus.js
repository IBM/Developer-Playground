const promiseRequest = require("./promiseRequest");
const storeResult = require("./storeResult")

const getStatus = async (jobId) => {
    return new Promise(async function (resolve, reject) {
        let apiEndpoint;
        if (process.env.PLAYGROUND_ENVIRONMENT.trim() !== 'production')
            apiEndpoint = `https://dev.api.ibm.com/ai4industry/test/result/${jobId}`
        else
            apiEndpoint = `https://api.ibm.com/ai4industry/run/result/${jobId}`

        const options = {
            method: 'GET',
            url: apiEndpoint,
            headers: {
                'X-IBM-Client-Id': process.env.CLIENT_ID,
                'X-IBM-Client-Secret': process.env.CLIENT_SECRET,
                accept: 'application/json'
            }
        };

        try {
            let response = await promiseRequest(options)
            let result = JSON.parse(response.replace(/\bNaN\b/g, "null"));
            let status = result.status
            if (status === "done" && result.summary.error)
                reject(result.summary.error)
            if (status === "done")
                storeResult(jobId, result)
            console.log(status, result)
            resolve([status, result])
        } catch (err) {
            reject(JSON.parse(err.body).error)
        }
    })
}


module.exports = getStatus;