import os
from dotenv import dotenv_values
import json

config = dotenv_values("../../.env") 
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
namespace = config["DEPLOYMENT_SPACE_NAME"]




def service_delete(updated, crn, name):
    if(updated=="True"):
        status="FAILED"
        counter=0
        while(status=="FAILED"):
            data = os.popen("ibmcloud resource service-instance-delete "+crn+" -f --recursive").read()
            if (data.find('OK') == -1):        
                status="FAILED"
                print("###########################################################\n"+name+" deletion FAILED\n###########################################################\n\n###########################################################\nRestarting "+name+" deletion\n###########################################################")
                counter=counter+1
                if(counter==5):
                    status="END"
            else:
                status="OK"
                print("###########################################################\n"+name+" deletion complete\n###########################################################")
        if(status=="END"):
            print("###########################################################\nSorry we couldn't delete the "+name+".\nPlease go to IBM Cloud Console to delete the "+name+".\n###########################################################")
        else:
            print(data)
            
service_delete(updated_cos, cos_crn, "Cloud Object Storage")
service_delete(updated_wml, wml_crn, "Watson ML")
service_delete(updated_ws, ws_crn, "Watson Studio")
service_delete(updated_wa, wa_crn, "Watson Assistant")

if(updated_cos=="False" and cos_service_key!=""):
    data = os.popen("ibmcloud resource service-key-delete "+cos_service_key+" -f").read()
    print(data)

if(updated_wml=="False" and wml_service_key!=""):
    data = os.popen("ibmcloud resource service-key-delete "+wml_service_key+" -f").read()
    print(data)

if(updated_wa=="False" and wa_service_key!=""):
    data = os.popen("ibmcloud resource service-key-delete "+wa_service_key+" -f").read()
    print(data)


if(updated_ws=="False" and ws_service_key!=""):
    data = os.popen("ibmcloud resource service-key-delete "+ws_service_key+" -f").read()
    print(data)

    
data = os.popen("ibmcloud fn namespace delete "+namespace).read()
print(data)

f = open("../../key_file", "r")
obj=json.loads(f.read())
api_key=obj["id"]
data = os.popen("ibmcloud iam api-key-delete "+api_key+" -f").read()
print(data)
