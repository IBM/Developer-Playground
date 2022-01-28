import os
from dotenv import dotenv_values


config = dotenv_values(".env") 
updated_cos = config["CLOUD-OBJECT-STORAGE_UPDATED"]
updated_wml = config["PM-20_UPDATED"]
cos_name = config["CLOUD-OBJECT-STORAGE_NAME"]
wml_name = config["PM-20_NAME"]

if(updated_cos=="True"):
    data = os.popen("ibmcloud resource service-instance-delete "+cos_name+" -f --recursive").read()
    print(data)

if(updated_wml=="True"):
    data = os.popen("ibmcloud resource service-instance-delete "+wml_name+" -f --recursive").read()
    print(data)