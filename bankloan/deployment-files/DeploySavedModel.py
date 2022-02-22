from ibm_watson_machine_learning import APIClient
import json, os
from dotenv import dotenv_values
import dotenv


#bring model id and deployment space name from .env file
config = dotenv_values("../.env") 
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
space_id=config["SPACE_ID"]

client.set.default_space(space_id)
asset_details = client.repository.get_details()
for resource in asset_details["models"]["resources"] :
    if(resource["metadata"]["name"] == model_name):
        dotenv.set_key("../.env","MODEL_ID",resource["metadata"]["id"])
config = dotenv_values("../.env") 
published_model_id=config["MODEL_ID"]
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

with open("../.env", "a") as f:
    f.write("\n#MODEL URL\nMODEL_URL=\""+modelurl+"\"\n")
print('end point url is :' + modelurl)
