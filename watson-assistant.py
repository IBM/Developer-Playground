import json
from ibm_watson import AssistantV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from dotenv import dotenv_values
import dotenv
from types import SimpleNamespace


config = dotenv_values(".env") 
apikey = config["API_KEY"]

authenticator = IAMAuthenticator(apikey)
assistant = AssistantV1(
    version='2022-01-10',
    authenticator = authenticator
)

with open("./Dialog-Skill.json", "r") as f :
  jsondata = json.loads(f.read())

response=assistant.create_workspace(
    name='API test',
    description='Example workspace created via API',
    language="en",
    metadata=jsondata["metadata"],
    learning_opt_out=False,
    system_settings=jsondata["system_settings"],
    intents=jsondata["intents"],
    entities=jsondata["entities"],
    dialog_nodes=jsondata["dialog_nodes"],
    counterexamples=jsondata["counterexamples"],
    webhooks=jsondata["webhooks"]
).get_result()

print(json.dumps(response, indent=2))