url=`ibmcloud fn action get ml --url` 
url=${url:18}
echo "URL: $url"
sed -i 's,YOUR_CLOUD_ACTION_URL,'$url',g' ../data/Dialog-Skill.json
echo "Dialog skill file is upadted successfully."