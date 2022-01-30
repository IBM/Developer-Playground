from ibm_watson_machine_learning import APIClient
import json, os
from dotenv import dotenv_values

#bring apikey, model id and deployment space name from .env file
config = dotenv_values(".env") 
apikey=config["API_KEY"]
published_model_id=config["MODEL_ID"]
deployment_space_name=config["DEPLOYMENT_SPACE_NAME"]
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
space_id=config["SPACE_ID"]
client.set.default_space(space_id)

#delete asset in deployment space
client.data_assets.delete(published_model_id)

#no need to delete the ML model deployment directly delete the whole deployment space
client.spaces.delete(space_id)
print('Deleted deployment')