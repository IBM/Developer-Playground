import os
import sys
import json

service = sys.argv[1]
servicename=sys.argv[2]
region=sys.argv[3]
plan = sys.argv[4]
data = os.popen("ibmcloud resource service-instance-create "+servicename+" "+service+" "+plan+" "+region).read()
print(data)

if(len(data.split("\n"))<3):
    data = json.loads(os.popen("ibmcloud resource service-instances --service-name "+service+" --output json").read())
    print(os.popen("ibmcloud resource service-instances --service-name "+service).read())
    result = [data[0]["region_id"],data[0]["name"]]
    choice = 0
    while (choice!="1" and choice!="2") :
        os.system("echo Creating "+service+" Service Failed as you already have an instance. Please select an option:")
        os.system("echo 1. Delete the existing instance and create new instance.")
        os.system("echo 2. Use the existing instance.")
        try:
            choice = input("Enter a Number>")
        except:
            pass
    if(choice==1):
        data = os.popen("ibmcloud resource service-instance-delete "+result[1]+" -f --recursive").read()
        print(data)
        data = os.popen("ibmcloud resource service-instance-create "+servicename+" "+service+" "+plan+" "+region).read()
        print(data)
        with open(".env", "a") as f:
            f.write("\n"+service.upper()+"_NAME="+servicename)
        data = os.popen("ibmcloud resource service-instance "+servicename+" --id").read()
        with open(".env", "a") as f:
            f.write("\n"+service.upper()+"_CRN="+data.split("\n")[-2].split(" ")[0])
        with open(".env", "a") as f:
            f.write("\n"+service.upper()+"_LOC="+region)
        with open(".env", "a") as f:
            f.write("\n"+service.upper()+"_UPDATED=True")
    else:
        with open(".env", "a") as f:
            f.write("\n"+service.upper()+"_NAME="+result[1])
        data = os.popen("ibmcloud resource service-instance "+result[1]+" --id").read()
        with open(".env", "a") as f:
            f.write("\n"+service.upper()+"_CRN="+data.split("\n")[-2].split(" ")[0])
        with open(".env", "a") as f:
            f.write("\n"+service.upper()+"_LOC="+result[0])
        with open(".env", "a") as f:
            f.write("\n"+service.upper()+"_UPDATED=False")
else:
    with open(".env", "a") as f:
        f.write("\n"+service.upper()+"_NAME="+servicename)
    data = os.popen("ibmcloud resource service-instance "+servicename+" --id").read()
    with open(".env", "a") as f:
        f.write("\n"+service.upper()+"_CRN="+data.split("\n")[-2].split(" ")[0])
    with open(".env", "a") as f:
        f.write("\n"+service.upper()+"_LOC="+region)
    with open(".env", "a") as f:
        f.write("\n"+service.upper()+"_UPDATED=True")
print("###########################################################")        
os.system("echo Updated "+service+" instance details successfuly")
print("###########################################################")       