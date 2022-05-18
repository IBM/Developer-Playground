import json
import os
from dotenv import dotenv_values
import time


config = dotenv_values("../../.env") 


BUCKET_NAME = config["BUCKET_NAME"]
#get the log Stream Name from AWS

logStream=os.popen("aws logs describe-log-streams --log-group-name /aws/lambda/Consumer | grep logStreamName | sed 's/^.*: //'|sed 's/..$//'|sed 's/^.\{1\}//'").read()
##Error handling 
while(len(logStream)==0):
    print("\n##################################################################\nThere seems to be an issue with retrieving the data. Retrying....\n##################################################################\n")
    os.system("aws s3 cp ../data/test-file.csv s3://"+BUCKET_NAME)
    logStream=os.popen("aws logs describe-log-streams --log-group-name /aws/lambda/Consumer | grep logStreamName | sed 's/^.*: //'|sed 's/..$//'|sed 's/^.\{1\}//'").read()
    time.sleep(6)
    
#Edit the format of the log Stream Name
logStream = logStream[:12] + '\\' + logStream[12:]
#Get the log Stream events
x=os.popen("aws logs get-log-events --log-group-name /aws/lambda/Consumer --log-stream-name "+logStream).read()
#save the log Stream events in a file
with open('logs.json', 'w') as f:
    f.write(x)
#Print the logs in the terminal
with open("logs.json",'r') as contents:
    logs = contents.read()
logs = json.loads(logs)
for event in logs["events"]:
    with open("logs.txt",'a') as contents:
        contents.write(event["message"])
print("\nLogs fetching completed successfully.\n")
#print(event["message"])
