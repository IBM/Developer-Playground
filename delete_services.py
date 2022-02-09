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
            print("#######Restarting COS Deletion#######")
            counter=counter+1
            if(counter==5):
                status="END"
        else:
            status="OK"
    if(status=="END"):
        print("##### Sorry we couldn't delete the COS instance. Please go to IBM Cloud Console to Delete the COS instance. #####")
    else:
        print(data)

if(updated_wml=="True"):
    data = os.popen("ibmcloud resource service-instance-delete "+wml_crn+" -f --recursive").read()
    print(data)
    
if(updated_ws=="True"):
    data = os.popen("ibmcloud resource service-instance-delete "+ws_crn+" -f --recursive").read()
    print(data)
 
