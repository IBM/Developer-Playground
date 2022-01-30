python3.8 DeleteDeploy.py
python3.8 delete_services.py

# delete APIKEY using it's id to avoid incorrect APIkey deletion 
new_filename=$(echo "$a" | sed '2!d' key_file )
id=$(echo "$a" | cut -c 9-51 <<< $new_filename)
#delete the API key
ibmcloud iam api-key-delete $id -f
rm ${CHE_PROJECTS_ROOT}/churn-prediction/key_file
