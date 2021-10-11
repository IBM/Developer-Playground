const promiseRequest = require("./promiseRequest");
const storeResult = require("./storeResult")

const getStatus = async (jobId) => {
    const options = {
        method: 'GET',
        url: `https://api.ibm.com/ai4industry/run/result/${jobId}`,
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
        if(status === "done")
            storeResult(jobId,result)
        console.log(status,result)
        return [status, result]

    } catch (err) {
        return err
    }
}


module.exports = getStatus;