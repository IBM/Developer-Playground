ibmcloud fn action delete ml
ibmcloud fn namespace delete smart-assistant

python3.8 delete_services.py

ibmcloud iam api-key-delete ApiKey-SVA -f
rm ${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant/key_file

python3.8 delete_space.py