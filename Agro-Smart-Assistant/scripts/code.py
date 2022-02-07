# main() will be run when you invoke this action
#
# @param Cloud Functions actions accept a single parameter, which must be a JSON object.
#
# @return The output of this action, which must be a JSON object.
#

import sys
import json
import requests

def main(dic):
    # NOTE: you must manually set API_KEY below using information retrieved from your IBM Cloud account.
    API_KEY = dic["api_key"]
    token_response = requests.post('https://iam.cloud.ibm.com/identity/token', data={"apikey": API_KEY, "grant_type": 'urn:ibm:params:oauth:grant-type:apikey'})
    mltoken = token_response.json()["access_token"]
    
    header = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mltoken}
    
    # NOTE: manually define and pass the array(s) of values to be scored in the next line
    payload_scoring = {
	"input_data": [
		{
			"fields": [
				"N",
				"P",
				"K",
				"temperature",
				"humidity",
				"pH",
				"rainfall"
			],
			"values": [
				[
					dic["N"],
					dic["P"],
					dic["K"],
					dic["temperature"],
					dic["humidity"],
					dic["pH"],
					dic["rainfall"]
				]
			]
		}
	]
}
    response_scoring = requests.post('model_url', json=payload_scoring, headers={'Authorization': 'Bearer ' + mltoken})
    print("Scoring response")
    print(response_scoring.json())
    result = response_scoring.text
    result_json = json.loads(result)

    result_keys = result_json['predictions'][0]['fields']
    result_vals = result_json['predictions'][0]['values']
   
    result_dict = dict(zip(result_keys, result_vals[0]))
    
  
    final = ('You should try planting ' + result_vals[0][0] + ' as your next crop.')
    print("final: ", final)
    return { 'message': final }
    