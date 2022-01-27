ibmcloud fn action delete ml
ibmcloud fn namespace delete smart-assistant

python3.8 delete_services.py

# delete APIKEY using its id to avoid incorrect APIkey deletion 
new_filename=$(echo "$a" | sed '2!d' key_file )
id=$(echo "$a" | cut -c 9-51 <<< $new_filename)
#delete the API key
ibmcloud iam api-key-delete $id -f
rm ${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant/key_file

python3.8 delete_space.py