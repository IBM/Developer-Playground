const promiseRequest = require('./promiseRequest');
const fs = require('fs');
const strftime = require('strftime');
const getDataCarbonCharts = require("./getDataCarbonCharts")

const getTarget = (data) => {
    let targetData = '['
    data.forEach(({ name }) => {
        targetData += `"${name}",`
    })
    targetData = targetData.slice(0, -1)
    targetData += "]"
    return targetData
}

const anomalyDetect = async ({
    dataset_type,
    filename,
    target_column,
    prediction_type,
    algorithm_type,
    anomaly_estimator,
    lookback_window,
    observation_window,
    labeling_method,
    labeling_threshold,
    time_column,
}) => {
    return new Promise(async function (resolve, reject) {
        try {
            fs.mkdirSync("./data")
        } catch {

        }
        let apiEndpoints = ["https://api.ibm.com/ai4industry/run/anomaly-detection/timeseries/univariate/batch", "https://api.ibm.com/ai4industry/run/anomaly-detection/timeseries/multivariate/batch"]
        let filepath = ""
        let apiEndpoint = apiEndpoints[0]
        if (dataset_type === 'customdt')
            filepath = "./data/customfile.json"
        else {
            filepath = `./sample-datasets/${filename}`
        }
        let fileData = JSON.parse(fs.readFileSync(filepath))

        for (let i = 0; i < fileData.length; i++) {
            fileData[i][time_column] = strftime('%F %T', new Date(fileData[i][time_column]))
        }
        fs.writeFileSync(filepath, JSON.stringify(fileData))
        let formData = {
            data_file: fs.createReadStream(filepath),
            time_column,
            time_format: "%Y-%m-%d %H:%M:%S",
            target_column,
            prediction_type,
            algorithm_type,
            anomaly_estimator,
            lookback_window,
            observation_window,
            labeling_method,
            labeling_threshold
        }
        if (Object.keys(fileData[0]).length > 2) {
            apiEndpoint = apiEndpoints[1]
            target_columns = getTarget(target_column)
            formData = {
                data_file: fs.createReadStream(filepath),
                time_column,
                time_format: "%Y-%m-%d %H:%M:%S",
                target_columns,
                prediction_type,
                algorithm_type,
                anomaly_estimator,
                lookback_window,
                observation_window,
                labeling_method,
                labeling_threshold
            }
        }
        console.log(formData)
        const options = {
            method: 'POST',
            url: apiEndpoint,
            headers: {
                'X-IBM-Client-Id': process.env.CLIENT_ID,
                'X-IBM-Client-Secret': process.env.CLIENT_SECRET,
                'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
                accept: 'application/json'
            },
            formData
        };
        try {
            const response = await promiseRequest(options)
            console.log(response)
            let jobId = JSON.parse(response).jobId
            fs.writeFileSync(`./data/${jobId}.json`, JSON.stringify(getDataCarbonCharts(fileData,time_column)))
            resolve({ jobId, status: "submitted" })
        } catch (err) {
            reject(JSON.parse(err.body).moreInformation)
        }
    })
}

module.exports = anomalyDetect
