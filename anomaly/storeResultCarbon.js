const fs = require("fs");

const storeResultCarbon = async (jobId, result) => {
        try {
            fs.writeFileSync(`./data/${jobId}-result.json`, JSON.stringify(result))
            let jsonData = JSON.parse(fs.readFileSync(`./data/${jobId}.json`))
            for (let i = 0; i < result.summary.result.length; i++) {
                jsonData.push({
                    group: "Anomaly Score",
                    time: result.summary.result[i].timestamp,
                    value: result.summary.result[i].value.anomaly_score[0]
                })
                if (result.summary.result[i].value.anomaly_label && result.summary.result[i].value.anomaly_label[0] === -1) {
                    jsonData[jsonData.length -1].anomaly = true
                    jsonData[i].anomaly = true
                } else {
                    jsonData[jsonData.length -1].anomaly = false
                    jsonData[i].anomaly = false
                }
            }
            fs.writeFileSync(`./data/${jobId}-data.json`, JSON.stringify(jsonData))
        } catch (err) {
            console.log(err)
            let finalResultData = []
            for (let i = 0; i < result.summary.result.length; i++) {
                finalResultData.push({
                    group: "Anomaly Score",
                    time: result.summary.result[i].timestamp,
                    value: result.summary.result[i].value.anomaly_score[0]
                })
                if (result.summary.result[i].value.anomaly_label && result.summary.result[i].value.anomaly_label[0] === -1) {
                    finalResultData[i].anomaly = true
                } else {
                    finalResultData[i].anomaly = false
                }
            }
            fs.writeFileSync(`./data/${jobId}-data.json`, JSON.stringify(finalResultData))
        }
}
/*getResult('e03c6962-cd75-4b18-ba05-fd5550e4e59b').then(async(result) => {
   
    console.log(result)
})*/
module.exports = storeResultCarbon;