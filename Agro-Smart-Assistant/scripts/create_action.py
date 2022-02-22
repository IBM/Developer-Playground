import os
import dotenv
from dotenv import dotenv_values

config = dotenv_values("../../.env") 
namespace = config["DEPLOYMENT_SPACE_NAME"]
data = os.popen("ibmcloud fn namespace create "+namespace).read()
print(data)
data = os.popen("ibmcloud fn namespace target "+namespace).read()
print(data)
data = os.popen("ibmcloud fn action update ml code.py --kind python:3.7 --web true").read()
print(data)