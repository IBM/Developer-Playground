//importing dependencies 
const express = require("express");
const mongo =require('mongodb');
const mongoose =require('mongoose')
var fs = require('fs');
var request = require( 'request' );
const assert =require('assert');
const bodyParser=require("body-parser");
const path = require("path")

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var Kafka = require('node-rdkafka');

const app=express();
const {apiKey,Scoring_url,mongoDb_url,Broker_list,Kafka_Api_key,Topic_name}=require('./config.js')

const url=mongoDb_url
//console.log(apiKey)
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
var version='?'+date
console.log(version)
app.use('/', express.static('./client/build'));
app.get('/',function(req,res){
    res.send("express")
})

app.use(bodyParser.json());
//console.log(Scoring_url)
//creating a post query when the form is submitted
app.post('/submit', function (req, res) {
   
    var newUser = {
      "ID":Math.floor(Math.random()*10000),
      "Age":parseInt(req.body.age),
      "Experience":parseInt(req.body.experience),
      "Income":parseInt(req.body.income),
      "ZipCode":parseInt(req.body.Zipcode),
      "Family":parseInt(req.body.familySize),
      "CCavg":parseInt(req.body.Ccavg),
      "Mortgage":parseInt(req.body.mortgage),
      "Education":parseInt(req.body.education),
      "PersonalLoan":parseInt(req.body.personal_loan),
      "SecuritiesAccount":parseInt(req.body.security_account),
      "CDAccount":parseInt(req.body.CdAccount),
      "Online":parseInt(req.body.online),
      "CreditCard":parseInt(req.body.credit_card),
      'PersonalLoan':req.body.loanStatus,
                
       
    }
    console.log(newUser)
    //users.push(newUser)
    //console.log(users);
    var producer = new Kafka.Producer({
      //'debug' : 'all',
      'metadata.broker.list': Broker_list,
      'dr_cb': true , //delivery report callback
      'security.protocol': 'sasl_ssl',
      'sasl.mechanisms': 'PLAIN',
      'sasl.username': 'token',
      'sasl.password': Kafka_Api_key,
      'broker.version.fallback': '0.10.0',
      'log.connection.close' : false,
      'client.id': 'Es-NodeJS-101'
    });
    
    var topicName = Topic_name;
    
    //logging debug messages, if debug is enabled
    producer.on('event.log', function(log) {
      console.log(log);
    });
    
    //logging all errors
    producer.on('event.error', function(err) {
      console.error('Error from producer');
      console.error(err);
    });
    
    //counter to stop this sample after maxMessages are sent
    
    
    producer.on('delivery-report', function(err, report) {
      console.log('delivery-report: ' + JSON.stringify(report));
      
    });
    
    //Wait for the ready event before producing
    producer.on('ready', function(arg) {
      console.log('producer ready.' + JSON.stringify(arg));
     var msg=newUser
      i=0
        var value = Buffer.from(JSON.stringify(msg));
        console.log(value)
        var key = "key-"+i;
        console.log(key) 
        // if partition is set to -1, librdkafka will use the default partitioner
        var partition = -1;
        var headers = [
          { header: "header value" }
        ]
        producer.produce(topicName, partition, value, key, Date.now(), "", headers);
      
    
      //need to keep polling for a while to ensure the delivery reports are received
      var pollLoop = setInterval(function() {
          producer.poll();
         
            clearInterval(pollLoop);
            producer.disconnect();
          
        }, 1000);
    
    });
    
    producer.on('disconnected', function(arg) {
      console.log('producer disconnected. ' + JSON.stringify(arg));
    });
    
    //starting the producer
    producer.connect()
    //starting consumer
    var consumer= new Kafka.KafkaConsumer({
  
      'metadata.broker.list': Broker_list,
      'sasl.mechanisms': 'PLAIN',
     
      'security.protocol': 'sasl_ssl',
      'sasl.username': 'token',
      'sasl.password': Kafka_Api_key,
      'broker.version.fallback': '0.10.0',
      'log.connection.close' : false,
      'client.id': 'Es-NodeJS-101',
      'group.id': 'kafka',
    });
    consumer.connect();
    
    consumer.on('ready', function() {
        consumer.subscribe([`${Topic_name}`]);
        console.log('consumer is ready !!!!!!!!!!!')
        
        consumer.consume();
      })
      .on('data', function(msg) {
        // Output the actual message contents
        console.log("consumed message")
        console.log(msg.value.toString());
        const dbName = 'loanApp';
        var certFileBuf = fs.readFileSync("./mongodb.pem");
        var options = {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          replset: { sslCA: certFileBuf }
        }
         mongo.connect(url,options,function(err,client){
          assert === (null,err);
          const db=client.db(dbName);
          db.collection('user-data').insertOne(newUser,function(err,result){
            assert === (null,err);
            console.log(result);
          var query = { ID: newUser.ID };
          db.collection("user-data").find(query).toArray(function(err, output) {  
            if (err) throw err;
            // console.log(output)
            // console.log(output[0].Loan_ID);
            //res.send('loan approved')
               
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
              console.log(access_token)
              payload_scoring = `{
                "input_data": [
                  {
                  "values": [
      [
          ${output[0].Age},
          ${output[0].Income},
          ${output[0].ZipCode},
          ${output[0].Family},
          ${output[0].CCavg},
          ${output[0].Education},
          ${output[0].Mortgage},
          ${output[0].SecuritiesAccount},
          ${output[0].CDAccount},
          ${output[0].Online},
          ${output[0].CreditCard}
      ]
    ]
    }
  ]
  }`
  console.log(payload_scoring)
  let version="?version=2021-05-16"
 var option={
  url:Scoring_url+version,
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
            console.log(parsedPostResponse)
            
            console.log(parsedPostResponse["predictions"][0]['values'][0]);
            predictedvalue=parsedPostResponse["predictions"][0]['values'][0][0]
           db.collection('user-data').updateOne(
              {ID : `${output[0].ID}`},
              {$set: { PersonalLoan : `${predictedvalue}`}},function(err,res){
                if(err) throw err;
                console.log('updated the document')
              }); 
                db.collection("user-data").find(query).toArray(async(err, output)=> {  
                  if (err) throw err;
                  // console.log(output)
                   
                   PredResult=output[0].PersonalLoan
                   
                })
              // ReverseDataFlow(output[0].Loan_ID).then(resposeObj => {
              //     console.log('prediction object response is :' ,resposeObj)
                  
              //   }).catch(err => console.log(err))
            
              
             
              if(predictedvalue == 1){
                console.log("predicted value is " ,predictedvalue);
                res.send('loan approved')
              }
              else{
                console.log("predicted value is " ,predictedvalue);
                res.send('loan denied')
              }
            
          }, 
          function (error) {
            console.log(error);
          });
          
        })
          
          
              //client.close();
              
            });

        });
       
      });
     // client.close();
    })
    
    });

app.get('*', (req, res) => res.sendFile(path.resolve('client','build', 'index.html')));
app.listen(8080,function(){
    //console.log('express server is running on port')
})