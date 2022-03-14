import os
import sys
import json
import dotenv
from simple_term_menu import TerminalMenu

###function to delete a service
def delete_instance(crn, name):
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

###function to list & select existing instance
def existing_instance(service):
    options = []
    service_info = {}
    data = json.loads(os.popen("ibmcloud resource service-instances --service-name "+service+" --output json").read())
    #print(data)
    for i in range(0,len(data)):
        options.append(data[i]["name"])
        service_info[i] = {
            "name": data[i]["name"],
            "crn": data[i]["id"],
            "region": data[i]["region_id"]
        }
    # options.append("exit")
    terminal_menu = TerminalMenu(options,title = "\nSelect "+service+" instance to reuse\n", menu_cursor_style = ("fg_cyan", "bold"), menu_highlight_style =("bold",))
    menu_entry_index = terminal_menu.show()
    if(menu_entry_index != len(data)):
        return service_info[menu_entry_index]
    # else:
    #    raise Exception("Service creation stopped.")
###function to handle previously sandbox created instances
def previous_instance(service,data):
    previousName="idts_"+service+"_workspace"
    options=[]
    service_info = {}
    for i in range(0,len(data)):
        if(data[i]["name"].find(previousName)!=-1):
            options.append(data[i]["name"])
            service_info[i] = {
                "name": data[i]["name"],
                "crn": data[i]["id"],
                "region": data[i]["region_id"]
            }
    if(len(options)!=0):#if there are instances previously created via sandbox
        print("You did not clean up the IBM "+service+ " the last time you were here!!")
        options1=["Delete previous instance", "Reuse previous instance", "Create new"]
        terminal_menu = TerminalMenu(options1,title = "\nChoose an action\n", menu_cursor_style = ("fg_cyan", "bold"), menu_highlight_style =("bold",))
        menu1_entry_index = terminal_menu.show()
        # print(menu1_entry_index)
        if(menu1_entry_index==0): #if user wants to delete previous sandbox created instance
            # if(len(service_info)>1):
            #     options.append("Delete All")
            terminal_menu = TerminalMenu(options,title = "\nSelect "+service+" instance to delete\n", menu_cursor_style = ("fg_cyan", "bold"), menu_highlight_style =("bold",))
            menu2_entry_index = terminal_menu.show()
            if(menu2_entry_index <= len(options)): #delete single instance
                choice=0
                print(menu2_entry_index)
                while (choice!="n" and choice!="N"): #if the user wants to delete more be in the while loop
                    # print(service_info[menu_entry_index]["crn"])
                    delete_instance(service_info[menu2_entry_index]["crn"],service_info[menu2_entry_index]["name"])
                    del service_info[menu2_entry_index]
                    del options[menu2_entry_index-1]
                    choice='n'
                    if(len(service_info)>0): #check if there are more sandbox created instances
                        choice=input("Do you want to delete more instances?(Y/N) ")
                        if(choice=='y' or choice=='Y'): #if user wants to delete more instances 
                            terminal_menu = TerminalMenu(options,title = "\nSelect "+service+" instance to delete\n", menu_cursor_style = ("fg_cyan", "bold"), menu_highlight_style =("bold",))
                            menu2_entry_index = terminal_menu.show()+1 
                            choice=0
                if(len(service_info)==0):
                    return 0 # if users one by one deleted all sandbox instances 
                else: #once deleted if instance still exists ask for reuse
                    print("You still have IBM "+service+" from the last time you were here!!")
                    wish=input("Do you want to reuse the service instance?(Y/N) ")
                    if(wish=="y" or wish=="Y"):
                        terminal_menu = TerminalMenu(options,title = "\nSelect "+service+" instance to reuse\n", menu_cursor_style = ("fg_cyan", "bold"), menu_highlight_style =("bold",))
                        menu_entry_index = terminal_menu.show()+1
                        result = service_info[menu_entry_index]
                        dotenv.set_key("../.env",service.upper()+"_NAME",result["name"])
                        dotenv.set_key("../.env",service.upper()+"_LOC",result["region"])
                        data = os.popen("ibmcloud resource service-instance "+result["name"]+" --id").read()
                        dotenv.set_key("../.env",service.upper()+"_CRN",data.split("\n")[-2].split(" ")[0])
                        dotenv.set_key("../.env",service.upper()+"_UPDATED","True")
                        return 1 #done setting the instance
        elif(menu1_entry_index==1): #if user wants to reuse a previous sandbox created instance
            # print(service_info)
            terminal_menu = TerminalMenu(options,title = "\nSelect "+service+" instance to reuse\n", menu_cursor_style = ("fg_cyan", "bold"), menu_highlight_style =("bold",))
            menu_entry_index = terminal_menu.show()+1
            # print(menu_entry_index)
            # print(service_info[1])
            result = service_info[menu_entry_index]
            dotenv.set_key("../.env",service.upper()+"_NAME",result["name"])
            dotenv.set_key("../.env",service.upper()+"_LOC",result["region"])
            data = os.popen("ibmcloud resource service-instance "+result["name"]+" --id").read()
            dotenv.set_key("../.env",service.upper()+"_CRN",data.split("\n")[-2].split(" ")[0])
            dotenv.set_key("../.env",service.upper()+"_UPDATED","True")
            return 1 #done setting the instance
        elif(menu1_entry_index==2): #if user wants to create new instance
            return 2
    return 0 # no previous instances 
def creation_check(service, servicename, region, plan):
    data = os.popen("ibmcloud resource service-instance-create "+servicename+" "+service+" "+plan+" "+region).read()
    if(data.find("OK")==-1):
        data = json.loads(os.popen("ibmcloud resource service-instances --service-name "+service+" --output json").read())
        # print(os.popen("ibmcloud resource service-instances --service-name "+service).read())
        result = [data[0]["region_id"],data[0]["name"].replace(" ", "%20")]
        choice = 0
        while (choice!="y" and choice!="Y" and choice!="n" and choice!="N"):
            print("Creating "+service+" Service Failed as you already have an instance.")
            choice = input("Do you want to use existing IBM "+service+" instance?(Y/N) ")
            if(choice=="n" or choice=="N"):
                confirm_choice = input("Are you sure? You won't be able to use the application if you proceed.(Y/N) ")
                if(confirm_choice=="y" or confirm_choice=="Y"):
                    raise Exception("Service creation stopped.")
                else:
                    choice=0
            else:
                result = {}
                result=existing_instance(service)
                dotenv.set_key("../.env",service.upper()+"_NAME",result["name"])
                dotenv.set_key("../.env",service.upper()+"_LOC",result["region"])
                data = os.popen("ibmcloud resource service-instance "+result["name"]+" --id").read()
                dotenv.set_key("../.env",service.upper()+"_CRN",data.split("\n")[-2].split(" ")[0])
                dotenv.set_key("../.env",service.upper()+"_UPDATED","False")
    else:
        print("### Created new instance for IBM "+service+" ####")
        print(data)
        dotenv.set_key("../.env",service.upper()+"_NAME",servicename)
        dotenv.set_key("../.env",service.upper()+"_LOC",region)
        data = os.popen("ibmcloud resource service-instance "+servicename+" --id").read()
        dotenv.set_key("../.env",service.upper()+"_CRN",data.split("\n")[-2].split(" ")[0])
        dotenv.set_key("../.env",service.upper()+"_UPDATED","True")
###start###        
service = sys.argv[1]
servicename=sys.argv[2]
region=sys.argv[3]
plan = sys.argv[4]
#list of all existing instances of the service
data = json.loads(os.popen("ibmcloud resource service-instances --service-name "+service+" --output json").read())
if(len(data)!=0):#if there are existing instances
    previous_state=previous_instance(service,data) # 0 => no previous instance # 1 => done setting the instance # 2 => create new instance if possible
    # result = {}
    # result=existing_instance(service)
    if(previous_state!=1):
        data = json.loads(os.popen("ibmcloud resource service-instances --service-name "+service+" --output json").read()) #check if there are other instances in the account
        if(len(data)!=0):
            existingChoice = input("Do you want to use your existing IBM "+service+" instance?(Y/N) ")
            if(existingChoice=="y" or existingChoice=="Y"):
                result = {}
                result=existing_instance(service)
                dotenv.set_key("../.env",service.upper()+"_NAME",result["name"])
                dotenv.set_key("../.env",service.upper()+"_LOC",result["region"])
                data = os.popen("ibmcloud resource service-instance "+result["name"]+" --id").read()
                dotenv.set_key("../.env",service.upper()+"_CRN",data.split("\n")[-2].split(" ")[0])
                dotenv.set_key("../.env",service.upper()+"_UPDATED","False")
            else:
                creation_check(service, servicename, region, plan)
        else:
            creation_check(service, servicename, region, plan)
else: #there are no existing instances
    print("### Created new instance for IBM "+service+" ####")   
    data = os.popen("ibmcloud resource service-instance-create "+servicename+" "+service+" "+plan+" "+region).read()
    print(data)
    dotenv.set_key("../.env",service.upper()+"_NAME",servicename)
    dotenv.set_key("../.env",service.upper()+"_LOC",region)
    data = os.popen("ibmcloud resource service-instance "+servicename+" --id").read()
    dotenv.set_key("../.env",service.upper()+"_CRN",data.split("\n")[-2].split(" ")[0])
    dotenv.set_key("../.env",service.upper()+"_UPDATED","True")
print("##############################################################")        
os.system("echo Updated "+service+" instance details successfully")
print("##############################################################")   
