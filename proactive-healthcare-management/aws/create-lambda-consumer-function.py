import os
import sys
import json
import dotenv
from dotenv import dotenv_values
import zipfile

config = dotenv_values("../../.env") 
iam_role = config["IAM_ROLE"]
apikey = config["API_KEY"]
iam_arn = config["IAM_ARN"]
kinesis_ARN = config["KINESIS_STREAM_ARN"]
endpoint_url = config["MODEL_URL"]
data = json.loads(os.popen("curl -X POST 'https://iam.cloud.ibm.com/oidc/token' -H 'Content-Type: application/x-www-form-urlencoded' -d 'grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey="+apikey+"'").read())
print(data)


string = "const https = require('https');\nconst token = '"+data["access_token"]+"';\nconst iamToken = "+" 'Bearer '"+"+ token;\nconst scoring_url = '"+endpoint_url+"'"

with open("Consumer.js",'r') as contents:
      save = contents.read()
with open("Consumer.js",'w') as contents:
      contents.write(string)
      contents.write(save)

#os.popen("aws s3 cp ../aws/Consumer.js s3://cp4dbucket --acl private")
with zipfile.ZipFile("Consumer.zip", mode="a") as archive:
    archive.write("Consumer.js")
data = json.loads(os.popen("aws lambda create-function --function-name Consumer --role "+iam_arn+" --runtime nodejs14.x --zip-file fileb://Consumer.zip --handler Consumer.js").read())

print(data)
function_arn = data["FunctionArn"]
dotenv.set_key("../../.env","LAMBDA_CONSUMER_ARN",data["FunctionArn"])'''

data = os.popen("aws lambda create-event-source-mapping --function-name Consumer --batch-size 100 --starting-position LATEST --event-source-arn "+kinesis_ARN).read()
print(data)


