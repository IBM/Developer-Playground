ibmcloud config --check-version=false
ibmcloud login -r us-south --sso
ibmcloud target -r us-south --cf
var=$(ibmcloud resource groups --default --output json |grep "name" | sed 's/"name": "\(.*\)"/\1/' | sed 's/.$//')                  
ibmcloud target -r us-south -g ${var##*( )}