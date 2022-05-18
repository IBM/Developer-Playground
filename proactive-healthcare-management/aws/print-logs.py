import json
import os

#get the log Stream Name from AWS
logStream=os.popen("aws logs describe-log-streams --log-group-name /aws/lambda/Consume | grep logStreamName | sed 's/^.*: //'|sed 's/..$//'|sed 's/^.\{1\}//'").read()
##Error handling 
if(len(logStream)==0):
    print('\nCONNECTION FAILED!!\n')
    print("\n########################################################\nPlease click the previous CTA to Upload the data again.\n########################################################\n")
else:
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
        #print(event["message"])
