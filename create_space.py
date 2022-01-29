from ibm_watson_machine_learning import APIClient
import json, os
from dotenv import dotenv_values
from ibm_watson_machine_learning.deployment import WebService
import string
import random
  

deployment_space_name = ''.join(random.choices(string.ascii_uppercase +
                             string.digits, k = 15))
f = open("key_file", "r")
obj=json.loads(f.read())
apikey=obj["apikey"]

#add the apikey to .env file
with open(".env", "a") as f:
    f.write("\nAPI_KEY="+apikey)
with open(".env", "a") as f:
    f.write("\nDEPLOYMENT_SPACE_NAME="+deployment_space_name)

config = dotenv_values(".env") 
model_name = config["MODEL_NAME"]
cos_crn = config["CLOUD-OBJECT-STORAGE_CRN"]
wml_crn = config["PM-20_CRN"]
wml_name = config["PM-20_NAME"]
loc = config["PM-20_LOC"]
# assets_file_location = config["ASSETS_FILE_LOCATION"]

wml_credentials = {
  "url": "https://"+loc+".ml.cloud.ibm.com",
 "apikey": apikey
}
client = APIClient(wml_credentials)
metadata = {
 client.spaces.ConfigurationMetaNames.NAME: deployment_space_name,
 client.spaces.ConfigurationMetaNames.DESCRIPTION: 'spaces',
 client.spaces.ConfigurationMetaNames.STORAGE: {"resource_crn": cos_crn},
 client.spaces.ConfigurationMetaNames.COMPUTE: {"name": wml_name,
                                                "crn": wml_crn}
}
spaces_details = client.spaces.store(meta_props=metadata,background_mode=False)
space_id = client.spaces.get_id(spaces_details)

with open(".env", "a") as f:
    f.write("\nSPACE_ID="+space_id)

client.set.default_space(space_id)
i=0

# client.import_assets.start(space_id=space_id,
#                            file_path=assets_file_location)

# details = client.import_assets.get_details(space_id=space_id)
# print("Waiting for import to finish...")
# while details["resources"][0]["entity"]["status"]["state"] != "completed" and details["resources"][0]["entity"]["status"]["state"] != "failed":
#     details = client.import_assets.get_details(space_id=space_id)
# print("finished")

asset_details = client.repository.get_details()
for resource in asset_details["models"]["resources"] :
    if(resource["metadata"]["name"] == model_name):
        with open(".env", "a") as f:
            f.write("\nMODEL_ID="+resource["metadata"]["id"])

print("Deployment Space with ID " + space_id + " containing model " + model_name + " is created successfully.")