const promiseRequest = require('./promiseRequest');
const dotenv = require('dotenv');
const fs = require('fs');
const strftime = require('strftime');

dotenv.config({path: './.env'})

let apiEndpoints = ["https://api.ibm.com/ai4industry/run/anomaly-detection/timeseries/univariate/batch", "https://api.ibm.com/ai4industry/run/anomaly-detection/timeseries/multivariate/batch"]

const getTarget = (data) => {
    let targetData = '['
    data.forEach(({name})=>{
        targetData += `"${name}",`
    })
    targetData = targetData.slice(0,-1)
    targetData += "]"
    return targetData
}

const anomalyDetect = async ({ 
    dataset_type,
    target_column,
    prediction_type,
    algorithm_type,
    anomaly_estimator,
    lookback_window,
    observation_window,
    labeling_method,
    labeling_threshold,
    time_column,
    recent_data}) => {

    let filepath = "./sample.json"
    let apiEndpoint = apiEndpoints[0]
    if(dataset_type === 'customdt')
        filepath = "./data/data.json"
    else{
        time_column = "time"
        target_column = "num"
    }
    let fileData = JSON.parse(fs.readFileSync(filepath))

    for(let i = 0; i <fileData.length; i++) {
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
    console.log(Object.keys(fileData[0]))
    if(Object.keys(fileData[0]).length > 2){
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
    console.log(options)
    try {
        const response = await promiseRequest(options)
        console.log(response)
        let jobId = JSON.parse(response).jobId
        return jobId
    } catch (err) {
        console.log('Error' ,err)
    }
}

module.exports = anomalyDetect
