from ibm_watson_machine_learning import APIClient
import json, os
from dotenv import dotenv_values


#bring model id and deployment space name from .env file
config = dotenv_values(".env") 
published_model_id=config["MODEL_ID"]
deployment_space_name=config["DEPLOYMENT_SPACE_NAME"]
apikey=config["API_KEY"]
model_name = config["MODEL_NAME"]
loc = config["PM-20_LOC"]

#get connected to watson ML
wml_credentials = {
  "apikey": apikey,
  "url": "https://"+loc+".ml.cloud.ibm.com"
}
client = APIClient(wml_credentials)

MODEL_NAME = model_name
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

with open("./scripts/add_model_url.sh", "r") as f :
  filedata = f.read()

filedata = filedata.replace('ADD_YOUR_MODEL_URL', modelurl)

with open('./scripts/add_model_url.sh', 'w') as f:
  f.write(filedata)
