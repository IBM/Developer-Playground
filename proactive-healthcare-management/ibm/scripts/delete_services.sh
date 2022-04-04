import os
from dotenv import dotenv_values


config = dotenv_values("../.env") 
updated_cos = config["CLOUD-OBJECT-STORAGE_UPDATED"]
updated_wml = config["PM-20_UPDATED"]
updated_ws = config["DATA-SCIENCE-EXPERIENCE_UPDATED"]
cos_crn = config["CLOUD-OBJECT-STORAGE_CRN"]
wml_crn = config["PM-20_CRN"]
ws_crn = config["DATA-SCIENCE-EXPERIENCE_CRN"]

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
