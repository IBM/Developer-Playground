servicename="cp-cos"
service="cloud-object-storage"
region="global"
plan="lite"
python3.8 gather_service_info.py $service $servicename $region $plan || exit 1


servicename="cp-wmachinelearning"
service="pm-20"
region="us-south"
plan="lite"
python3.8 gather_service_info.py $service $servicename $region $plan || exit 1