servicename="cp-cos"
service="cloud-object-storage"
region="global"
plan="lite"
python3.8 gather_service_info.py $service $servicename $region $plan


servicename="cp-wmachinelearning"
service="pm-20"
region="us-south"
plan="lite"
python3.8 gather_service_info.py $service $servicename $region $plan


servicename="cp-wassistant"
service="conversation"
region="us-south"
plan="free"
python3.8 gather_service_info.py $service $servicename $region $plan