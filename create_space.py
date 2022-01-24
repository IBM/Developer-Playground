from ibm_watson_machine_learning import APIClient
import json, os
from dotenv import dotenv_values

#get connected to watson ML
wml_credentials = {
  "apikey": "Yio3m3EgaKWCPhkj7QUeeZ2y5yJNS9-YW65K5RzAoupA",
  "url": "https://us-south.ml.cloud.ibm.com"
}
client = APIClient(wml_credentials)
client.spaces.ConfigurationMetaNames.get()
metadata = {
 client.spaces.ConfigurationMetaNames.NAME: 'crop-recommendation-space',
 client.spaces.ConfigurationMetaNames.DESCRIPTION: 'spaces',
}
spaces_details = client.spaces.store(meta_props=metadata)