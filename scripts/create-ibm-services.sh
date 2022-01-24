servicename="cp-cos"
service="cloud-object-storage"
region="global"
ibmcloud resource service-instance-create $servicename $service lite $region | tee -a /projects/cp4d-smart-virtual-assistant/services-data.txt

servicename="cp-wmachinelearning"
service="pm-20"
region="us-south"
ibmcloud resource service-instance-create $servicename $service lite $region | tee -a /projects/cp4d-smart-virtual-assistant/services-data.txt


servicename="cp-wassistant"
service="conversation"
region="us-south"
ibmcloud resource service-instance-create $servicename $service free $region

python3.8 update_crn.py
rm services-data.txt