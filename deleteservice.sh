# servicename="cp-stt"
# ibmcloud resource service-key-delete "$servicename-creds" -f
# ibmcloud resource service-instance-delete $servicename -f
# rm speechtotext.json
# rm cp-stt.txt

servicename="cp-wa"
ibmcloud resource service-key-delete "$servicename-creds" -f
ibmcloud resource service-instance-delete $servicename -f
rm watsonassistant.json
rm cp-wa.txt

# servicename="cp-wd"
# ibmcloud resource service-key-delete "$servicename-creds" -f
# ibmcloud resource service-instance-delete $servicename -f
# rm watsondiscovery.json
# rm cp-wd.txt

servicename="cp-cdb"
ibmcloud resource service-key-delete "$servicename-creds" -f
ibmcloud resource service-instance-delete $servicename -f
rm cloudant.json
rm cp-cdb.txt
