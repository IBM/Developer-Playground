import os
import sys
import json


filename = sys.argv[1]
 
with open(filename, 'r') as f:
    data = json.loads(f.read())
    service_id = data.get('service_id')
    key_id = data.get('key_id')
    updated = data.get('updated')

data = os.popen("ibmcloud resource service-key-delete "+key_id+" -f").read()
print(data)

if(updated):
    data = os.popen("ibmcloud resource service-instance-delete "+service_id+" -f --recursive").read()
    print(data)
