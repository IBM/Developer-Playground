api=`cat key_file`
api=${api:370:44}
echo "Api key: $api is added successfully."
ibmcloud fn action update ml --param api_key $api