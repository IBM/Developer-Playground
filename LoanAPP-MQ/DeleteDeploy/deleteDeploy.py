import os
from dotenv import load_dotenv
from ibm_watson_machine_learning import APIClient
load_dotenv()

api=os.environ['API_Key']
did=os.environ['Deployment_ID']
spaceId=os.environ['Space_ID']
# print(api)
# print(did)
wml_credentials = {
    "apikey": api,
    "url": "https://us-south.ml.cloud.ibm.com"
}

client = APIClient(wml_credentials)
client.set.default_space(spaceId)
client.deployments.delete(did)
print('Deleted deployment')