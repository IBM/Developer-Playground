# servicename="cp-stt"
# service="speech-to-text"
# region="eu-gb"
# ibmcloud resource service-instance-create $servicename $service lite $region
# ibmcloud resource service-key-create "$servicename-creds" Manager --instance-name $servicename > "$servicename.txt"  2>&1
# apikey=$(cat $servicename.txt | awk '$1 == "apikey:" {print $2}')
# url=$(cat $servicename.txt | awk '$1 == "url:" {print $2}')
# JSON_STRING='{"apikey":"'"$apikey"'","url":"'"$url"'"}'
# echo $JSON_STRING > speechtotext.json

# servicename="cp-wd"
# service="discovery"
# region="eu-gb"
# ibmcloud resource service-instance-create $servicename $service lite $region
# ibmcloud resource service-key-create "$servicename-creds" Manager --instance-name $servicename > "$servicename.txt"  2>&1
# apikey=$(cat $servicename.txt | awk '$1 == "apikey:" {print $2}')
# url=$(cat $servicename.txt | awk '$1 == "url:" {print $2}')
# JSON_STRING='{"apikey":"'"$apikey"'","url":"'"$url"'"}'
# echo $JSON_STRING > watsondiscovery.json

servicename="cp-cdb"
service="cloudantnosqldb"
region="us-east"
ibmcloud resource service-instance-create $servicename $service lite $region -p '{"legacyCredentials": true}'

############# Time required by cloudant from provisioning #############
status=FAILED
while [ "$status" != "OK" ]
do
  echo "CloudantDB: Provision in progress..."
  sleep 5
  ibmcloud resource service-key-create "$servicename-creds" Manager --instance-name $servicename > "$servicename.txt"  2>&1
  status=$(sed '2q;d' $servicename.txt)
done
############# Done #############

apikey=$(cat $servicename.txt | awk '$1 == "apikey:" {print $2}')
url=$(cat $servicename.txt | awk '$1 == "url:" {print $2}')
JSON_STRING='{"apikey":"'"$apikey"'","url":"'"$url"'"}'
echo $JSON_STRING > cloudant.json

############# Append cloudant url to .env file #############
echo "CLOUDANT_URL="$url >> app/.env

############# Create DataSources #############
curl -X PUT "$url/accounts?partitioned=false"
curl -X PUT "$url/identities?partitioned=false"
curl -X PUT "$url/mappings?partitioned=false"
curl -X PUT "$url/conversations?partitioned=false"
curl -X PUT "$url/roles?partitioned=false"
curl -X PUT "$url/rolemappings?partitioned=false"

servicename="cp-wa"
service="conversation"
region="eu-gb"
ibmcloud resource service-instance-create $servicename $service free $region
ibmcloud resource service-key-create "$servicename-creds" Manager --instance-name $servicename > "$servicename.txt"  2>&1
apikey=$(cat $servicename.txt | awk '$1 == "apikey:" {print $2}')
url=$(cat $servicename.txt | awk '$1 == "url:" {print $2}')
JSON_STRING='{"apikey":"'"$apikey"'","url":"'"$url"'"}'
echo $JSON_STRING > watsonassistant.json

############# link to assistant #############
link=$(sed '3q;d' cp-wa.txt)
link=$(echo $link | sed 's/Service key //')
link=${link%resource*}
# link=${link//['/']/'%2F'}
# link=${link//[:]/'%3A'}
link=$(echo $link | sed  -e 's/\//%2F/g' -e 's/:/%3A/g')

export home="https://$region.assistant.watson.cloud.ibm.com/$link%3A"

echo
echo "#################### Configure Assistant ####################"
echo "Copy the URL to launch Assistant in your Browser: $home"

############# Done #############