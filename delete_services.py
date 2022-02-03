import os
from dotenv import dotenv_values


config = dotenv_values(".env") 
updated_cos = config["CLOUD-OBJECT-STORAGE_UPDATED"]
updated_wml = config["PM-20_UPDATED"]
updated_wa = config["CONVERSATION_UPDATED"]
updated_ws = config["DATA-SCIENCE-EXPERIENCE_UPDATED"]
cos_crn = config["CLOUD-OBJECT-STORAGE_CRN"]
wml_crn = config["PM-20_CRN"]
wa_crn = config["CONVERSATION_CRN"]
ws_crn = config["DATA-SCIENCE-EXPERIENCE_CRN"]
cos_service_key = config["CLOUD-OBJECT-STORAGE_SERVICE_KEY"]
wml_service_key = config["PM-20_SERVICE_KEY"]
wa_service_key = config["CONVERSATION_SERVICE_KEY"]
ws_service_key = config["DATA-SCIENCE-EXPERIENCE_SERVICE_KEY"]

if(updated_cos=="True"):
    data = os.popen("ibmcloud resource service-instance-delete "+cos_crn+" -f --recursive").read()
    print(data)
if(cos_service_key!=""):
    data = os.popen("ibmcloud resource service-key-delete "+cos_service_key+" -f").read()
    print(data)

if(updated_wml=="True"):
    data = os.popen("ibmcloud resource service-instance-delete "+wml_crn+" -f --recursive").read()
    print(data)
if(wml_service_key!=""):
    data = os.popen("ibmcloud resource service-key-delete "+wml_service_key+" -f").read()
    print(data)

if(updated_wa=="True"):
    data = os.popen("ibmcloud resource service-instance-delete "+wa_crn+" -f --recursive").read()
    print(data)
if(wa_service_key!=""):
    data = os.popen("ibmcloud resource service-key-delete "+wa_service_key+" -f").read()
    print(data)

if(updated_ws=="True"):
    data = os.popen("ibmcloud resource service-instance-delete "+ws_crn+" -f --recursive").read()
    print(data)
if(ws_service_key!=""):
    data = os.popen("ibmcloud resource service-key-delete "+ws_service_key+" -f").read()
    print(data)