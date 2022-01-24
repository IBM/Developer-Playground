
servicename="cp-cos"
# ibmcloud resource service-key-delete "$servicename-creds" -f
ibmcloud resource service-instance-delete $servicename -f --recursive
# rm cos.json
# rm cp-cos.txt

servicename="cp-wml"
# ibmcloud resource service-key-delete "$servicename-creds" -f
ibmcloud resource service-instance-delete $servicename -f
# rm watsonml.json
# rm cp-wml.txt

# servicename="cp-wstudio"
# ibmcloud resource service-key-delete "$servicename-creds" -f
# ibmcloud resource service-instance-delete $servicename -f
# rm watsonstudio.json
# rm cp-wstudio.txt

python3.8 DeleteDeployment.py
