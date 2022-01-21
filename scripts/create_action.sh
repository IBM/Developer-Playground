ibmcloud fn namespace create smart-assistant 
ibmcloud fn namespace target smart-assistant
ibmcloud fn action create ml code.py --kind python:3.7 --web true