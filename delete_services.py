import os
from dotenv import dotenv_values
import json


config = dotenv_values(".env") 
updated_cos = config["CLOUD-OBJECT-STORAGE_UPDATED"]
updated_wml = config["PM-20_UPDATED"]
# updated_ws = config["DATA-SCIENCE-EXPERIENCE_UPDATED"]
cos_crn = config["CLOUD-OBJECT-STORAGE_CRN"]
wml_crn = config["PM-20_CRN"]
# ws_crn = config["DATA-SCIENCE-EXPERIENCE_CRN"]
cos_service_key = config["CLOUD-OBJECT-STORAGE_SERVICE_KEY"]
# wml_service_key = config["PM-20_SERVICE_KEY"]
# ws_service_key = config["DATA-SCIENCE-EXPERIENCE_SERVICE_KEY"]

if(updated_cos=="True"):
    data = os.popen("ibmcloud resource service-key-delete "+cos_service_key+" -f").read()
    data = os.popen("ibmcloud resource service-instance-delete "+cos_crn+" -f --recursive").read()
    print(data)

if(updated_cos=="False" and cos_service_key!=""):
    data = os.popen("ibmcloud resource service-key-delete "+cos_service_key+" -f").read()
    print(data)

if(updated_wml=="True"):
    data = os.popen("ibmcloud resource service-instance-delete "+wml_crn+" -f --recursive").read()
    print(data)
# if(wml_service_key!=""):
#     data = os.popen("ibmcloud resource service-key-delete "+wml_service_key+" -f").read()
#     print(data)

# if(updated_ws=="True"):
#     data = os.popen("ibmcloud resource service-instance-delete "+ws_crn+" -f --recursive").read()
#     print(data)
# if(ws_service_key!=""):
#     data = os.popen("ibmcloud resource service-key-delete "+ws_service_key+" -f").read()
#     print(data)
# try:
#     data = os.popen("ibmcloud fn action get ml").read()
#     namespace = json.loads("".join(data.split("\n")[1:]))["namespace"]
#     data = os.popen("ibmcloud fn action delete ml").read()
#     print(data)
#     data = os.popen("ibmcloud fn action list").read()
#     if(len(data.split("\n"))<=3):
#         data = os.popen("ibmcloud fn namespace delete "+namespace).read()
#         print(data)
# except:
#     pass
