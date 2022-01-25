import os
import sys
from dotenv import dotenv_values


config = dotenv_values(".env") 
updated_cos = config["CLOUD-OBJECT-STORAGE_UPDATED"]
updated_wml = config["PM-20_UPDATED"]
updated_wa = config["COVERSATION_UPDATED"]
cos_name = config["CLOUD-OBJECT-STORAGE_NAME"]
wml_name = config["PM-20_NAME"]
wa_name = config["CONVERSATION_NAME"]

if(updated_cos):
    data = os.popen("ibmcloud resource service-instance-delete "+cos_name+" -f --recursive").read()
    print(data)

if(updated_wml):
    data = os.popen("ibmcloud resource service-instance-delete "+wml_name+" -f --recursive").read()
    print(data)

if(updated_wa):
    data = os.popen("ibmcloud resource service-instance-delete "+wa_name+" -f --recursive").read()
    print(data)
