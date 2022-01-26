python3.8 DeleteDeployment.py
python3.8 delete_services.py

#delete the API key
ibmcloud iam api-key-delete ApiKey-bankLoan -f
rm ${CHE_PROJECTS_ROOT}/bank-loan/key_file
