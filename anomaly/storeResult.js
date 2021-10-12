const fs = require("fs");

const storeResult = async (jobId, result) => {
        try {
            fs.writeFileSync(`./data/${jobId}-result.json`, JSON.stringify(result))
            let jsonData = JSON.parse(fs.readFileSync(`./data/${jobId}.json`))
            let finalResultData = []
            for (let i = 0; i < jsonData.length; i++) {
                Object.keys(jsonData[i]).forEach(val => {
                    if (jsonData[i][val].toString().includes(":")) {
                        delete jsonData[i][val]
                    }
                })
                finalResultData.push({
                    time: result.summary.result[i].timestamp,
                    ...jsonData[i]
                })
                if (result.summary.result[i].value.anomaly_label && result.summary.result[i].value.anomaly_label[0] === -1) {
                    finalResultData[i].anomaly = true
                } else {
                    finalResultData[i].anomaly = false
                }
                finalResultData[i].anomaly_score = result.summary.result[i].value.anomaly_score[0]
            }
            fs.writeFileSync(`./data/${jobId}-data.json`, JSON.stringify(finalResultData))
        } catch (err) {
        }
}
/*getResult('e03c6962-cd75-4b18-ba05-fd5550e4e59b').then(async(result) => {
   
    console.log(result)
})*/
module.exports = storeResult;