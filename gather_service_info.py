import os
import sys

service = sys.argv[1]
servicename=sys.argv[2]
region=sys.argv[3]
plan = sys.argv[4]
data = os.popen("ibmcloud resource service-instance-create "+servicename+" "+service+" "+plan+" "+region).read()
print(data)

if(len(data.split("\n"))<3):
    data = os.popen("ibmcloud resource service-instances --service-name "+service).read()
    print(data)
    result = []
    for services in data.split("\n")[3:]:
        resource = services.strip().split(" ")
        count=0
        for i in range(len(resource)-1,-1, -1):
            if(not resource[i]==""):
                count = count + 1
            if(count==4 and len(result)==0):
                result.append(resource[i])
            if(count==5):
                name="%20".join(resource[0:i+1])
                result.append(name)
                break
        break
    choice = 0
    while (choice!=1 and choice!=2) :
        os.system("echo Creating "+service+" Service Failed as you already have an instance. Please select an option:")
        os.system("echo 1. Delete the existing instance and create new instance.")
        os.system("echo 2. Use the existing instance.")
        try:
            choice = int(input("Enter a Number>"))
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