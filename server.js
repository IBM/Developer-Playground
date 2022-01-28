//importing dependencies 
const express = require("express");
var request = require( 'request' );
const bodyParser=require("body-parser");
const path = require("path")
const app=express();
const {apiKey,Scoring_url}=require('./config.js');

app.use('/', express.static('./client/build'));
app.get('/',function(req,res){
  res.sendFile(__dirname + "/client/build/index.html");
})


app.use(bodyParser.json());
app.post('/submit',  (req, res) =>{

  var newUser = {
      "ID": Math.floor(Math.random()*10000),
      "tenure": req.body.tenure,
      "security": req.body.security,
      "support": req.body.support,
      "contract": req.body.contract,
      "dependents": req.body.dependents,
      "phone": req.body.phone,
      "internet": req.body.internet,
      "payment": req.body.payment,
      "backup": req.body.backup,
      "charges": req.body.charges,
      "protection": req.body.protection,
      "paperless": req.body.paperless,
    }
    console.log("form input ")
    console.log(newUser)
    
                const API_KEY = apiKey;
              
                const getToken=async (api_key)=>{
                  var apikey=api_key
                  
                    var options = {
                        method:'POST',
                         url     : "https://iam.cloud.ibm.com/identity/token",
                   
                    body    : "apikey=" + apikey + "&grant_type=urn:ibm:params:oauth:grant-type:apikey" 
                  };
                    return await new Promise(async (resolve, reject) => {
                        await request(options, async (error, response, body)=> {
                          if (error) {
                            reject(error);
                          }
                          resolve(body);
                        });
                      })
                }
                getToken(API_KEY)
                .then((result) => {
                  var access_token=JSON.parse(result)["access_token"]
                  //console.log(access_token)
                  x = 
                [
                  parseFloat(newUser.tenure), // tenure
                  newUser.security === 0 ? 1 : 0, //OnlineSecurity_No
                  newUser.support === 0 ? 1 : 0, // TechSupport_No
                  newUser.contract === 3 ? 1 : 0, // Contract_Month-to-month
                  newUser.security === 0 ? parseFloat(newUser.charges) : 0, // MonthlyCharges_OnlineSecurity_No
                  newUser.support === 0 ? parseFloat(newUser.charges) : 0, // MonthlyCharges_TechSupport_No
                  newUser.contract === 3 ? parseFloat(newUser.charges) : 0, // MonthlyCharges_Contract_Month-to-month
                  newUser.dependents === 0 && newUser.security === 0 ? 1 : 0, // Dependents_No_OnlineSecurity_No
                  newUser.dependents === 0 && newUser.support === 0 ? 1 : 0, // Dependents_No_TechSupport_No
                  newUser.dependents === 0 && newUser.contract === 3 ? 1 : 0, // Dependents_No_Contract_Month-to-month
                  newUser.phone === 1 && newUser.contract === 3 ? 1 : 0, // PhoneService_Yes_Contract_Month-to-month
                  newUser.internet === 2 && newUser.security === 0 ? 1 : 0, // InternetService_Fiber optic_OnlineSecurity_No
                  newUser.internet === 2 && newUser.support === 0 ? 1 : 0, // InternetService_Fiber optic_TechSupport_No
                  newUser.internet === 2 && newUser.contract === 3 ? 1 : 0, // InternetService_Fiber optic_Contract_Month-to-month
                  newUser.internet === 2 && newUser.payment === 3 ? 1 : 0, // InternetService_Fiber optic_PaymentMethod_Electronic check
                  newUser.security === 0 && newUser.backup === 0 ? 1 : 0, // OnlineSecurity_No_OnlineBackup_No
                  newUser.security === 0 && newUser.support === 0 ? 1 : 0, // OnlineSecurity_No_TechSupport_No
                  newUser.security === 0 && newUser.contract === 3 ? 1 : 0, // OnlineSecurity_No_Contract_Month-to-month
                  newUser.security === 0 && newUser.payment === 3 ? 1 : 0, // OnlineSecurity_No_PaymentMethod_Electronic check
                  newUser.backup === 0 && newUser.contract === 3 ? 1 : 0, // OnlineBackup_No_Contract_Month-to-month
                  newUser.protection === 0 && newUser.contract === 3 ? 1 : 0, // DeviceProtection_No_Contract_Month-to-month
                  newUser.support === 0 && newUser.contract === 3 ? 1 : 0, // TechSupport_No_Contract_Month-to-month
                  newUser.support === 0 && newUser.payment === 3 ? 1 : 0, // TechSupport_No_PaymentMethod_Electronic check
                  newUser.contract === 3 && newUser.paperless === 1 ? 1 : 0, // Contract_Month-to-month_PaperlessBilling_Yes
                  newUser.contract === 3 && newUser.payment === 3 ? 1 : 0, // Contract_Month-to-month_PaymentMethod_Electronic check
                ]
                  payload_scoring = `{
                    "input_data": [{
                      "fields": [
                          "tenure",
                          "OnlineSecurity_No",
                          "TechSupport_No",
                          "Contract_Month-to-month",
                          "MonthlyCharges_OnlineSecurity_No",
                          "MonthlyCharges_TechSupport_No",
                          "MonthlyCharges_Contract_Month-to-month",
                          "Dependents_No_OnlineSecurity_No",
                          "Dependents_No_TechSupport_No",
                          "Dependents_No_Contract_Month-to-month",
                          "PhoneService_Yes_Contract_Month-to-month",
                          "InternetService_Fiber optic_OnlineSecurity_No",
                          "InternetService_Fiber optic_TechSupport_No",
                          "InternetService_Fiber optic_Contract_Month-to-month",
                          "InternetService_Fiber optic_PaymentMethod_Electronic check",
                          "OnlineSecurity_No_OnlineBackup_No",
                          "OnlineSecurity_No_TechSupport_No",
                          "OnlineSecurity_No_Contract_Month-to-month",
                          "OnlineSecurity_No_PaymentMethod_Electronic check",
                          "OnlineBackup_No_Contract_Month-to-month",
                          "DeviceProtection_No_Contract_Month-to-month",
                          "TechSupport_No_Contract_Month-to-month",
                          "TechSupport_No_PaymentMethod_Electronic check",
                          "Contract_Month-to-month_PaperlessBilling_Yes",
                          "Contract_Month-to-month_PaymentMethod_Electronic check"
                      ],
                      "values": [[${x}]]
                    }
                  ]
                }` 

      console.log(payload_scoring)
     var option={
      url:Scoring_url,
      headers:{
        'Content-Type': 'application/json',
        "Authorization":"Bearer "+ access_token   
      },
      body: payload_scoring
    }
    request.post( option, function( error, response, body )
    {
      var PredResult=''
      let parsedPostResponse;
      try {
        //console.log("respnse text" + this.responseText)
        parsedPostResponse = JSON.parse(response.body);
      } catch (ex) {
        // TODO: handle parsing exception
        console.log(ex)
      }
                console.log("Scoring response");
                
                console.log(parsedPostResponse["predictions"][0]['values'][0])
                predictedvalue=parsedPostResponse["predictions"][0]['values'][0][0]             
                 
                  if(predictedvalue == 1){
                    console.log("predicted value is" ,predictedvalue);
                    res.send('churn')
                  }
                  else{
                    console.log("predicted value is" ,predictedvalue);
                    res.send('notchurn')
                  }
                
              }, 
              function (error) {
                console.log(error);
              });
              
            })
      
        })

app.get('*', (req, res) => res.sendFile(path.resolve('client', 'build', 'index.html')));
app.listen(8081,function(){
    console.log('express server is running on port : 8081')
})
