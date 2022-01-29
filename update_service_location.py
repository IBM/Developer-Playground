import json, os
from dotenv import dotenv_values
import dotenv


config = dotenv_values(".env") 
wml_loc = config["PM-20_LOC"]
ws_loc = config["DATA-SCIENCE-EXPERIENCE_LOC"]
wml_name = config["PM-20_NAME"]
ws_name = config["DATA-SCIENCE-EXPERIENCE_NAME"]
choice = 0
if(wml_loc != ws_loc):
    while(choice != "1" and choice != "2" and choice != "3"):
        print("Region of Watson Studio Service and Watson Machine Learning Service is not same!!!\n")
        print("Please update the region of any one service so they match or you might get unexpected errors while running the application")
        print("1. Update Watson Studio Service.")
        print("2. Update Watson Machine Learning Service.")
        print("3. Proceed without updating.")
        choice = input("Enter a number>")
        if(choice == "3"):
            print("\nLocation not updated!")
            exit()
        else:
            confirm_choice = 0
            while (confirm_choice!="y" and confirm_choice!="Y" and confirm_choice!="n" and confirm_choice!="N") :
                confirm_choice = input("\nThis will delete the current service and create it in appropriate region. Are you sure?(Y/N)")
                if(confirm_choice=="n" or confirm_choice=="N"):
                    choice = 0
        if(choice == "1"):
            servicename = "cp-wstudio"
            service = "data-science-experience"
            plan="free-v1"
            print("ibmcloud resource service-instance-delete "+ws_name+" -f --recursive")
            data = os.popen("ibmcloud resource service-instance-delete "+ws_name+" -f --recursive").read()
            print(data)
            data = os.popen("ibmcloud resource service-instance-create "+servicename+" "+service+" "+plan+" "+wml_loc).read()
            print(data)
            dotenv.set_key("./.env",service.upper()+"_NAME",servicename)
            dotenv.set_key("./.env",service.upper()+"_LOC",wml_loc)
            data = os.popen("ibmcloud resource service-instance "+servicename+" --id").read()
            dotenv.set_key("./.env",service.upper()+"_CRN",data.split("\n")[-2].split(" ")[0])
            dotenv.set_key("./.env",service.upper()+"_UPDATED","True")
        else:
            servicename = "cp-wml"
            service = "pm-20"
            plan="lite"
            data = os.popen("ibmcloud resource service-instance-delete "+ws_name+" -f --recursive").read()
            print(data)
            data = os.popen("ibmcloud resource service-instance-create "+servicename+" "+service+" "+plan+" "+ws_loc).read()
            print(data)
            dotenv.set_key("./.env",service.upper()+"_NAME",servicename)
            dotenv.set_key("./.env",service.upper()+"_LOC",ws_loc)
            data = os.popen("ibmcloud resource service-instance "+servicename+" --id").read()
            dotenv.set_key("./.env",service.upper()+"_CRN",data.split("\n")[-2].split(" ")[0])
            dotenv.set_key("./.env",service.upper()+"_UPDATED","True")
            