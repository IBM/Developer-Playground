import os
import sys
import json
import dotenv
from dotenv import dotenv_values


config = dotenv_values("../../.env") 

kinesis_stream_name = config["KINESIS_STREAM_NAME"]
iam_role = config["IAM_ROLE"]

string = "const AWS = require('aws-sdk');\nconst KinesisStreamsName = "+kinesis_stream_name+"';\nconst Region = 'us-east-1'; "

with open("../aws/Producer.js",'r') as contents:
      save = contents.read()
with open("../aws/Producer.js",'w') as contents:
      contents.write(string)
      contents.write(save)

os.popen("aws s3 cp ../aws/Producer.js s3://cp4dbucket --acl private")
data = json.loads(os.popen("awscli lambda create-function --function-name Producer --role "+iam_role+" --runtime nodejs14.x --code s3://cp4dbucket/Producer.js").read())
print(data)
function_arn = data["FunctionArn"]
dotenv.set_key("../../.env","LAMBDA_PRODUCER_ARN",data["FunctionArn"])

os.popen("sed -i 's,FUNCTION_ARN,'"+function_arn+"',g' event-notif-config.json")

