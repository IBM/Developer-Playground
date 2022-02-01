import os
from dotenv import dotenv_values


config = dotenv_values(".env") 
updated_cos = config["CLOUD-OBJECT-STORAGE_UPDATED"]
updated_wml = config["PM-20_UPDATED"]
cos_crn = config["CLOUD-OBJECT-STORAGE_CRN"]
wml_crn = config["PM-20_CRN"]

if(updated_cos=="True"):
    data = os.popen("ibmcloud resource service-instance-delete "+cos_crn+" -f --recursive").read()
    print(data)

if(updated_wml=="True"):
    data = os.popen("ibmcloud resource service-instance-delete "+wml_crn+" -f --recursive").read()
    print(data)
