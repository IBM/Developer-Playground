import json
from ibm_watson import AssistantV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from dotenv import dotenv_values





config = dotenv_values("../../.env") 
apikey = config["CONVERSATION_API_KEY"]
loc = config["CONVERSATION_LOC"]
crn = config["CONVERSATION_CRN"]


authenticator = IAMAuthenticator(apikey)

assistant = AssistantV1(
    version='2022-01-10',
    authenticator = authenticator
)
assistant.set_service_url("https://api."+loc+".assistant.watson.cloud.ibm.com")


with open("../data/Dialog-Skill.json", "r") as f :
  jsondata = json.loads(f.read())


assistant.create_workspace(
    name='Crop Recommender',
    description='The skill will recommend crops',
    language="en",
    metadata=jsondata["metadata"],
    learning_opt_out=False,
    system_settings=jsondata["system_settings"],
    intents=jsondata["intents"],
    entities=jsondata["entities"],
    dialog_nodes=jsondata["dialog_nodes"],
    counterexamples=jsondata["counterexamples"],
    webhooks=jsondata["webhooks"]
)
print("Skill created successfully!!")
crn = crn.replace(":","%3A")
crn = crn.replace("/","%2F")

assistant_url = "https://"+loc+".assistant.watson.cloud.ibm.com/"+crn+"/home"
print("\n############################################################\n")
print("ASSISTANT-URL : "+assistant_url)
print("\n############################################################")
