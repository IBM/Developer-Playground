import os
import sys
import json
import dotenv
from dotenv import dotenv_values


config = dotenv_values("../../.env") 
iam_role = config["IAM_ROLE"]
apikey = config["API_KEY"]

data = json.loads(os.popen("curl -X POST 'https://iam.cloud.ibm.com/oidc/token' -H 'Content-Type: application/x-www-form-urlencoded' -d 'grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey="+apikey).read())

endpoint_url = ""

string = "const https = require('https');\nconst token = "+data["accessToken"]+";\nconst iamToken = "+"Bearer "+"+ token;\nconst scoring_url = "+endpoint_url

with open("../aws/Consumer.js",'r') as contents:
      save = contents.read()
with open("../aws/Consumer.js",'w') as contents:
      contents.write(string)
      contents.write(save)

os.popen("aws s3 cp ../aws/Consumer.js s3://cp4dbucket --acl private")
data = json.loads(os.popen("awscli lambda create-function --function-name Consumer --role "+iam_role+" --runtime nodejs14.x --code s3://cp4dbucket/Consumer.js").read())
print(data)
function_arn = data["FunctionArn"]
dotenv.set_key("../../.env","LAMBDA_CONSUMER_ARN",data["FunctionArn"])

data = os.popen("aws lambda create-event-source-mapping --function-name Consumer --batch-size 100 --starting-position latest --event-source-arn "+kinesis_ARN).read()
print(data)


