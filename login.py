import os
import json


data = json.loads(os.popen("ibmcloud resource groups --default --output json").read())
resource_group = data[0]["name"]
data = os.popen("ibmcloud target -r us-south -g "+resource_group).read()
print(data)