import os
import sys
import json
import dotenv
from dotenv import dotenv_values
import zipfile



config = dotenv_values("../../.env") 

kinesis_stream_name = config["KINESIS_STREAM_NAME"]
iam_role = config["IAM_ROLE"]
iam_arn = config["IAM_ARN"]
string = "const AWS = require('aws-sdk');\nconst KinesisStreamsName = '"+kinesis_stream_name+"';\nconst Region = 'us-east-1'; "

with open("Producer/index.js",'r') as contents:
      save = contents.read()
with open("index.js",'w') as contents:
      contents.write(string)
      contents.write(save)

# os.popen("aws s3 cp Producer.js s3://proactivehealthcarecp4d --acl private")
with zipfile.ZipFile("Producer.zip", mode="a") as archive:
    archive.write("index.js")
data = json.loads(os.popen("aws lambda create-function --function-name Producer --role "+iam_arn+" --runtime nodejs14.x --zip-file fileb://Producer.zip --handler index.handler").read())
print(data)
os.popen("rm -rf index.js")
function_arn = data["FunctionArn"]
dotenv.set_key("../../.env","LAMBDA_PRODUCER_ARN",data["FunctionArn"])

os.popen("sed -i 's,LAMBDA_PRODUCER_ARN,'"+function_arn+"',g' event-notif-config.json")
os.popen("aws lambda add-permission  --function-name Producer --action lambda:InvokeFunction --statement-id lambda --principal s3.amazonaws.com").read()