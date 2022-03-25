
const scoring_hostname = scoring_url.split('://')[1].split('.com')[0] + ".com";
const path = scoring_url.split('.com')[1];
let port=0;

scoring_url.split('://')[0] === "https" ? port=443 : port=80;

// API call setup

const APIcall = async (options, payload) => {

    const promise = new Promise(function(resolve, reject) {
        var req = https.request(options, function(res) {
          res.setEncoding('utf8');
    
          res.on('data', function (data) {
            let result = JSON.parse(data);
            resolve(result.predictions[0].values[0]);
          });
        });
        
        req.on('error', function(e) {
          reject('problem with request: ' + e.message);
        });
        
        req.write(JSON.stringify(payload));
        
        req.end();
    });
      return promise;
};

// Convert the Kinesis Stream into an array

const processData = (data) => {
    const regex = /[0-9]+(\.[0-9]+)?/g;
    let array_of_values_to_be_scored = [];
    let datarefined = data.data.split('\r\n');
    for(let i = 1; i < datarefined.length-1; i++){
        let temp = datarefined[i].match(regex);
        // parse int the string to int
        
        if (temp != null) {
            for(let j = 0; j < temp.length; j++){
                temp[j] = parseFloat(temp[j]);
            }
            array_of_values_to_be_scored.push(temp); 
        }
    }

    return (array_of_values_to_be_scored);
};

// AWS Lambda event handler

exports.handler = async function(event) {
    
    let scoringpayload = [];
    
    for (const records of event.Records){
        const data = JSON.parse(Buffer.from(records.kinesis.data, 'base64'));
        
        console.log('\n\n' +'--------------------------\n'
            +'Amazon Kinesis stream data\n' +'--------------------------\n'
            + ' ',data);
        
        scoringpayload = processData(data); 
    }
        
    // Prepare the API to make a request
  
    const array_of_input_fields = ["age","sex","cp","trtbps","chol","fbs","restecg","thalachh","exng","oldpeak","slp","caa","thall","spO2"];
    
    const array_of_values_to_be_scored = scoringpayload;
    
    let options = {
        hostname: scoring_hostname,
        port: port,
        path: path,
        method: "POST",
        headers: {
            'Authorization': iamToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        rejectUnauthorized: false
    };
    
    // Handle the API response
    
    let result = {
      "labels": [...array_of_input_fields, "model_output","output_confidence"],
      "values": []
    };
    
    let tableView = [];
    let output = [];
    
    for (let i=0; i<array_of_values_to_be_scored.length; i++){
        let input = array_of_values_to_be_scored[i];
        let temp = {};
        const payload = {"input_data": [{"fields": array_of_input_fields, "values": [input]}]};
        let modelScores = await APIcall(options, payload);
      
        output = [...input, modelScores[0], modelScores[1]];
        
        for (let k=0; k<result.labels.length; k++){
            temp[result.labels[k]] =  output[k];
        }
        tableView.push(temp);
      
        result.values.push([...input, modelScores[0], modelScores[1]]);
    }
    
    // Print the results
    
    console.log('\n\n' +'---------------------------------------------------\n'
      +'IBM Cloud Pak for Data Machine Learning Predictions \n' +'---------------------------------------------------\n');
    
    console.table(tableView);
    
    return result;
};