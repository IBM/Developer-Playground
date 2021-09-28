const promiseRequest = require("./promiseRequest");
const fs = require("fs");

const getResult = async (jobId) => {
    return new Promise((resolve, reject) => {
        let requestInterval;
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
            requestInterval = setInterval(async () => {
                let response = await promiseRequest(options)
                let result = JSON.parse(response.replace(/\bNaN\b/g, "null"));
                let status = result.status
                if (status === "done"){
                    clearInterval(requestInterval)
                    fs.writeFileSync(`./data/${jobId}-result.json`,JSON.stringify(result))
                    let jsonData = JSON.parse(fs.readFileSync(`./data/${result.filename}`))
                    let finalResultData = []
                    for (let i = 0; i < jsonData.length; i++){
                        Object.keys(jsonData[i]).forEach(val => {
                            if(jsonData[i][val].toString().includes(":")){
                                delete jsonData[i][val]
                            }
                        })
                        finalResultData.push({
                            time: result.summary.result[i].timestamp,
                            ...jsonData[i]
                        })
                        if(result.summary.result[i].value.anomaly_label && result.summary.result[i].value.anomaly_label[0]===-1){
                            finalResultData[i].anomaly = true
                        } else {
                            finalResultData[i].anomaly = false
                        }
                        finalResultData[i].anomaly_score = result.summary.result[i].value.anomaly_score[0]
                    }
                    fs.writeFileSync(`./data/${jobId}-data.json`,JSON.stringify(finalResultData))
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