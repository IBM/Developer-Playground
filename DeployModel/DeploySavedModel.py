from ibm_watson_machine_learning import APIClient
import json, os
from dotenv import dotenv_values

#Bring the apikey from key_file
f = open("key_file", "r")
obj=json.loads(f.read())
apikey=obj["apikey"]

#add the apikey to .env file
with open(".env", "a") as f:
    f.write("\n#Api key\nAPI_Key=\""+apikey+"\"\n")

#bring model id and deployment space name from .env file
config = dotenv_values(".env") 
published_model_id=config["MODEL_ID"]
deployment_space_name=config["DEPLOYMENT_SPACE"]

#get connected to watson ML
wml_credentials = {
  "apikey": apikey,
  "url": "https://us-south.ml.cloud.ibm.com"
}
client = APIClient(wml_credentials)

MODEL_NAME = "Personal Loan Prediction model"
DEPLOYMENT_SPACE_NAME = deployment_space_name

#pick up the space id using the deployment space name
client.spaces.list()
all_spaces = client.spaces.get_details()['resources']
space_id = None
for space in all_spaces:
    if space['entity']['name'] == DEPLOYMENT_SPACE_NAME:
        space_id = space["metadata"]["id"]
        print("\nDeployment Space GUID: ", space_id)

if space_id is None:
    print("WARNING: Your space does not exist. Create a deployment space before proceeding to the next cell.")

client.set.default_space(space_id)

#deployment of the model
deploy_meta = {
     client.deployments.ConfigurationMetaNames.NAME: 'Deployment of '+ MODEL_NAME,
     client.deployments.ConfigurationMetaNames.ONLINE: {}
}
created_deployment = client.deployments.create(published_model_id, meta_props=deploy_meta)
scoring_endpoint = client.deployments.get_scoring_href(created_deployment)

#model URL is generated with the date of model creation.
from datetime import datetime
now = datetime.now() # current date and time
date=now.strftime("%Y")+"-"+now.strftime("%m")+"-"+now.strftime("%d")


modelurl = scoring_endpoint+"?version="+date

#add the model URL to .env file
with open(".env", "a") as f:
    f.write("\n#MODEL URL\nMODEL_URL=\""+modelurl+"\"\n")
