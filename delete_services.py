import os
from dotenv import dotenv_values


config = dotenv_values(".env") 
updated_cos = config["CLOUD-OBJECT-STORAGE_UPDATED"]
updated_wml = config["PM-20_UPDATED"]
updated_ws = config["DATA-SCIENCE-EXPERIENCE_UPDATED"]
cos_crn = config["CLOUD-OBJECT-STORAGE_CRN"]
wml_crn = config["PM-20_CRN"]
ws_crn = config["DATA-SCIENCE-EXPERIENCE_CRN"]

if(updated_cos=="True"):
    status="FAILED"
    counter=0
    while(status=="FAILED"):
        data = os.popen("ibmcloud resource service-instance-delete "+cos_crn+" -f --recursive").read()
        if (data.find('OK') == -1):        
            status="FAILED"
            print("###########################################################\nCloud Object Storage deletion FAILED\n###########################################################\n\n###########################################################\nRestarting Cloud Object Storage deletion\n###########################################################")
            counter=counter+1
            if(counter==5):
                status="END"
        else:
            status="OK"
            print("###########################################################\nCloud Object Storage deletion complete\n###########################################################")
    if(status=="END"):
        print("###########################################################\nSorry we couldn't delete the Cloud Object Storage.\nPlease go to IBM Cloud Console to delete the Cloud Object Storage.\n###########################################################")
    else:
        print(data)

if(updated_wml=="True"):
    status="FAILED"
    counter=0
    while(status=="FAILED"):
        data = os.popen("ibmcloud resource service-instance-delete "+wml_crn+" -f --recursive").read()
        if (data.find('OK') == -1):        
            status="FAILED"
            print("###########################################################\nWatson ML deletion FAILED\n###########################################################\n\n###########################################################\nRestarting Watson ML deletion\n###########################################################")
            counter=counter+1
            if(counter==5):
                status="END"
        else:
            status="OK"
            print("###########################################################\nWatson ML deletion complete\n###########################################################")
    if(status=="END"):
        print("###########################################################\nSorry we couldn't delete the Watson ML service.\nPlease go to IBM Cloud Console to delete the Watson ML service.\n###########################################################")
    else:
        print(data)
    
if(updated_ws=="True"):
    status="FAILED"
    counter=0
    while(status=="FAILED"):
        data = os.popen("ibmcloud resource service-instance-delete "+ws_crn+" -f --recursive").read()
        if (data.find('OK') == -1):        
            status="FAILED"
            print("###########################################################\nWatson Studio deletion FAILED\n###########################################################\n\n###########################################################\nRestarting Watson Studio deletion\n###########################################################")
            counter=counter+1
            if(counter==5):
                status="END"
        else:
            status="OK"
            print("###########################################################\nWatson Studio deletion complete\n###########################################################")
    if(status=="END"):
        print("###########################################################\nSorry we couldn't delete the Watson Studio.\nPlease go to IBM Cloud Console to delete the Watson Studio.\n###########################################################")
    else:
        print(data)
