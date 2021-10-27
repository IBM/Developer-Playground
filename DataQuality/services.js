require('dotenv/config');
var request = require('request');
var fs = require('fs');

var env_var = JSON.stringify(process.env.PLAYGROUND_ENVIRONMENT);
env_var = env_var.substring(1,8);

const clientid = process.env.CLIENT_ID;
const clientsecret = process.env.CLIENT_SECRET;

 var globalsv_filename = 'datafolder/data.csv';

exports.getclassoverlap = function (label='', fpath = '', fname = '') {
 
  label = label.toString();

  if((fpath === "") && (fname === "")){
    fpath = globalsv_filename ;
    fname = 'data.csv'
  }
  else{
     fpath = fpath.toString();
     fname = fname.toString();
  }

return new Promise((resolve, reject) => {
var options = {
  'method': 'POST',
  'url': process.env[env_var.concat("_").concat("coverlap")],
  'headers': {
    'X-IBM-Client-Id': clientid,
    'X-IBM-Client-Secret': clientsecret,
    'accept': 'application/json',
    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
  },
  formData: {
    'data_file': {
      'value': fs.createReadStream(fpath),
      'options': {
        'filename': fname,
        'contentType': null
      }
    },
    'label_column': label
  }
};

    var c_overlap = {};
    request(options, function (error, response) {
      if (error) {
        reject(error)
      }
      try{
        const jsondata1 = JSON.parse(response.body);
        
        c_overlap["JobID"] = jsondata1["job_id"];
        c_overlap["message"] = jsondata1["message"];

        resolve(c_overlap);
      }

      catch(err){
        console.log("error in inputs provided");
      }
    
    });
    
  })
  .catch(() => {});
}

exports.getclassparity = function (label = '', fpath = '', fname='') {

  label = label.toString();

  if((fpath === "") && (fname === "")){
    fpath = globalsv_filename ;
    fname = 'data.csv'
  }
  else{
     fpath = fpath.toString();
     fname = fname.toString();
  }

  return new Promise((resolve, reject) => {

    var options = {
      'method': 'POST',
      'url': process.env[env_var.concat("_").concat("cparity")],
      'headers': {
        'X-IBM-Client-Id': clientid,
        'X-IBM-Client-Secret': clientsecret,
        'accept': 'application/json',
        'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
      },
      formData: {
        'data_file': {
          'value': fs.createReadStream(fpath),
          'options': {
            'filename': fname,
            'contentType': null
          }
        },
        'label_column': label
      }
    };

    var c_parity = {};
    request(options, function (error, response) {
      if (error) {reject(error)}

      try{
      const jsondata0 = JSON.parse(response.body);
      if(jsondata0 === undefined){
        console.log("Undefined");
        alert('Undefined');
      }
      
      c_parity["JobID"] = jsondata0["job_id"];
      c_parity["message"] = jsondata0["message"];

      resolve(c_parity);
    }
     catch(err){
        console.log("error in inputs provided");
      }

    });
    
  })
  .catch(() => {});
}

exports.getlabelpurity = function (label = "",fpath = "", fname="") {

  label = label.toString();

  if((fpath === "") && (fname === "")){
    fpath = globalsv_filename ;
    fname = 'data.csv'
  }
  else{
     fpath = fpath.toString();
     fname = fname.toString();
  }

  return new Promise((resolve, reject) => {

    var options = {
      'method': 'POST',
      'url': process.env[env_var.concat("_").concat("labelpurity")],
      'headers': {
        'X-IBM-Client-Id': clientid,
        'X-IBM-Client-Secret': clientsecret,
        'accept': 'application/json',
        'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
      },
      formData: {
        'data_file': {
          'value': fs.createReadStream(fpath),
          'options': {
            'filename': fname,
            'contentType': null
          }
        },
        'label_column': label
      }
    };

    var l_purity = {};
    request(options, function (error, response) {
      if (error) {
        reject(error)
      }
        
      try{
        const jsondata2 = JSON.parse(response.body);
         l_purity["JobID"] = jsondata2["job_id"];
         l_purity["message"] = jsondata2["message"];

         resolve(l_purity);
      }
      
      catch(err){
        console.log("error in inputs provided");
      }
     

    });
    
  })
   .catch(() => {});
   
}

exports.getoutlierdetection = function (label = "",fpath = "", fname="") {

  label = label.toString();

  if((fpath === "") && (fname === "")){
    fpath = globalsv_filename ;
    fname = 'data.csv'
  }
  else{
     fpath = fpath.toString();
     fname = fname.toString();
  }

  return new Promise((resolve, reject) => {

    var options = {
      'method': 'POST',
      'url': process.env[env_var.concat("_").concat("outlierdetect")],
      'headers': {
        'X-IBM-Client-Id': clientid,
        'X-IBM-Client-Secret': clientsecret,
        'accept': 'application/json',
        'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
      },
      formData: {
        'data_file': {
          'value': fs.createReadStream(fpath),
          'options': {
            'filename': fname,
            'contentType': null
          }
        },
        'label_column': label
      }
    };

    var o_detect = {};
    request(options, function (error, response) {
      if (error) {reject(error)}

      try{
      const jsondata3 = JSON.parse(response.body);
      
      o_detect["JobID"] = jsondata3["job_id"];
      o_detect["message"] = jsondata3["message"];

      resolve(o_detect);
      }
      
      catch(err){
        console.log("error in inputs provided");
      }

    });
    
  })
  .catch(() => {});

}

exports.chkdatacompleteness = function (fpath = "", fname = "") {


  if((fpath === "") && (fname === "")){
    fpath = globalsv_filename ;
    fname = 'data.csv'
  }
  else{
     fpath = fpath.toString();
     fname = fname.toString();
  }

  return new Promise((resolve, reject) => {

    var options = {
      'method': 'POST',
      'url': process.env[env_var.concat("_").concat("dcompleteness")],
      'headers': {
        'X-IBM-Client-Id': clientid,
        'X-IBM-Client-Secret': clientsecret,
        'accept': 'application/json',
        'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
      },
      formData: {
        'data_file': {
          'value': fs.createReadStream(fpath),
          'options': {
            'filename': fname,
            'contentType': null
          }
        }
      }
    };
    
    var d_complete = {};
    request(options, function (error, response) {
      if (error) {reject(error)}

      try{
      const jsondata4 = JSON.parse(response.body);
      
      d_complete["JobID"] = jsondata4["job_id"];
      d_complete["message"] = jsondata4["message"];

      resolve(d_complete);
      }
       catch(err){
        console.log("error in inputs provided");
      }

    });
    
  })
  .catch(() => {});

}

exports.chkdataduplicates = function (fpath = "", fname="") {

  if((fpath === "") && (fname === "")){
    fpath = globalsv_filename ;
    fname = 'data.csv'
  }
  else{
     fpath = fpath.toString();
     fname = fname.toString();
  }

  return new Promise((resolve, reject) => {

    var options = {
      'method': 'POST',
      'url': process.env[env_var.concat("_").concat("dduplicates")],
      'headers': {
        'X-IBM-Client-Id': clientid,
        'X-IBM-Client-Secret': clientsecret,
        'accept': 'application/json',
        'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
      },
      formData: {
        'data_file': {
          'value': fs.createReadStream(fpath),
          'options': {
            'filename': fname,
            'contentType': null
          }
        }
      }
    };
    
    var d_duplicate = {};
    request(options, function (error, response) {
      if (error) {reject(error)}

      try{
      const jsondata5 = JSON.parse(response.body);
      
      d_duplicate["JobID"] = jsondata5["job_id"];
      d_duplicate["message"] = jsondata5["message"];

      resolve(d_duplicate);
      }
       catch(err){
        console.log("error in inputs provided");
      }
    });
    
  })
  .catch(() => {});

}

exports.chkdatahomogeneity = function (fpath = "", fname="") {

  if((fpath === "") && (fname === "")){
    fpath = globalsv_filename ;
    fname = 'data.csv'
  }
  else{
     fpath = fpath.toString();
     fname = fname.toString();
  }
  return new Promise((resolve, reject) => {

    var options = {
      'method': 'POST',
      'url': process.env[env_var.concat("_").concat("dhomogeneity")],
      'headers': {
        'X-IBM-Client-Id': clientid,
        'X-IBM-Client-Secret': clientsecret,
        'accept': 'application/json',
        'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
      },
      formData: {
        'data_file': {
          'value': fs.createReadStream(fpath),
          'options': {
            'filename': fname,
            'contentType': null
          }
        }
      }
    };
    
    var d_homogen = {};
    request(options, function (error, response) {
      if (error) {reject(error)}

      try{
      const jsondata6 = JSON.parse(response.body);
      
      d_homogen["JobID"] = jsondata6["job_id"];
      d_homogen["message"] = jsondata6["message"];

      resolve(d_homogen);
      }
       catch(err){
        console.log("error in inputs provided");
      }

    });
    
  })
  .catch(() => {});
}

exports.chkdataprofile = function (fpath = "", fname="") {

  if((fpath === "") && (fname === "")){
    fpath = globalsv_filename ;
    fname = 'data.csv'
  }
  else{
     fpath = fpath.toString();
     fname = fname.toString();
  }

  return new Promise((resolve, reject) => {

    var options = {
      'method': 'POST',
      'url': process.env[env_var.concat("_").concat("dprofile")],
      'headers': {
        'X-IBM-Client-Id': clientid,
        'X-IBM-Client-Secret': clientsecret,
        'accept': 'application/json',
        'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
      },
      formData: {
        'data_file': {
          'value': fs.createReadStream(fpath),
          'options': {
            'filename': fname,
            'contentType': null
          }
        }
      }
    };
    
    var d_profile = {};
    request(options, function (error, response) {
      if (error) {reject(error)}

      try{
      const jsondata7 = JSON.parse(response.body);
      
      d_profile["JobID"] = jsondata7["job_id"];
      d_profile["message"] = jsondata7["message"];

      resolve(d_profile);
      }
       catch(err){
        console.log("error in inputs provided");
      }

    });
    
  })
  .catch(() => {});
}


exports.getresults = function (jobid = "") {

 jobid = jobid.toString();

  return new Promise((resolve, reject) => {

    var request = require('request');
    var options = {
      'method': 'POST',
      'url': process.env[env_var.concat("_").concat("results")],
      'headers': {
        'X-IBM-Client-Id': clientid,
        'X-IBM-Client-Secret': clientsecret,
        'accept': 'application/json',
        'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
      },
      formData: {
        'job_id': jobid
      }
};

    var finalresult = {}
    request(options, function (error, response) {
      if (error) {reject(error)}

      try{
      const jsondata1 = JSON.parse(response.body);

      if(jsondata1["message"] == "Job Finished"){

        if(jsondata1["response"]["results"]["title"] == "Data Profiler"){
          finalresult["Job ID"] = jsondata1["job_id"];
          finalresult["Message"] = jsondata1["message"];
          finalresult["Metric"] = jsondata1["response"]["results"]["title"];
          finalresult["Methodology"] = jsondata1["response"]["metadata"]["method_details"]["definition"];
          //finalresult["Dataset"] = jsondata1["response"]["metadata"]["dataset_details"][0]["name"];

          finalresult["Number of Columns"] = jsondata1["response"]["results"]["details"]["Basic_Profile"]["num_columns"]
          finalresult["Number of Samples"] = jsondata1["response"]["results"]["details"]["Basic_Profile"]["num_samples"]

          // var ky = "Date Columns" + ": " + JSON.stringify(jsondata1["response"]["results"]["details"]["Basic_Profile"]["date_columns"]["count"]);
          if(JSON.stringify(jsondata1["response"]["results"]["details"]["Basic_Profile"]["date_columns"]["column_names"]) === JSON.stringify({})){
            finalresult["Date Col"] = "N/A"
          }
          else{
            finalresult["Date Col"] = jsondata1["response"]["results"]["details"]["Basic_Profile"]["date_columns"]["column_names"]
          }
          // ky = "Numerical Columns" + ": " + JSON.stringify(jsondata1["response"]["results"]["details"]["Basic_Profile"]["numerical_columns"]["count"]);
          finalresult["Numerical Col"] = jsondata1["response"]["results"]["details"]["Basic_Profile"]["numerical_columns"]["column_names"]

          //var sc = "String Columns".concat(": ").concat(JSON.stringify(jsondata1["response"]["results"]["details"]["Basic_Profile"]["string_columns"]["count"]));
          
          finalresult["String Col"] = jsondata1["response"]["results"]["details"]["Basic_Profile"]["string_columns"]["column_names"]


          finalresult["Score"] = jsondata1["response"]["results"]["score"];
          resolve(finalresult)
        }

      else{

      finalresult["Job ID"] = jsondata1["job_id"];
      finalresult["Message"] = jsondata1["message"];
      finalresult["Metric"] = jsondata1["response"]["results"]["title"];
      finalresult["Methodology"] = jsondata1["response"]["metadata"]["method_details"]["definition"];
      //finalresult["Dataset"] = jsondata1["response"]["metadata"]["dataset_details"][0]["name"];
      finalresult["Result"] = jsondata1["response"]["results"]["explanation"];
      finalresult["Score"] = jsondata1["response"]["results"]["score"];

      if(JSON.stringify(jsondata1["response"]["results"]["explanation"]) == JSON.stringify({})){
        finalresult["Result"] = "--"
      }
      resolve(finalresult)
      }
    }
    
    else{
        finalresult = {};
        resolve(finalresult);
      }
    }
     catch(err){
        console.log("error in inputs provided");
      }
});

  })
  .catch(() => {});
}
