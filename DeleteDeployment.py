from ibm_watson_machine_learning import APIClient
import json, os
from dotenv import dotenv_values

#bring apikey, model id and deployment space name from .env file
config = dotenv_values(".env") 
apikey=config["API_Key"]
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

#delete asset in deployment space
client.data_assets.delete(published_model_id)

#no need to delete the ML model deployment directly delete the whole deployment space
client.spaces.delete(space_id)
print('Deleted deployment')
