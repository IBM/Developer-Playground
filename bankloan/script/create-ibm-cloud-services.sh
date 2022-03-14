servicename="idts_cloud-object-storage_"
servicename+=$CHE_WORKSPACE_ID
servicename+="_bank-loan"
service="cloud-object-storage"
region="global"
plan="lite"
python3.8 gather_service_info.py $service $servicename $region $plan || exit 1

servicename="idts_pm-20_"
servicename+=$CHE_WORKSPACE_ID
servicename+="_bank-loan"
service="pm-20"
region="us-south"
plan="lite"
python3.8 gather_service_info.py $service $servicename $region $plan || exit 1

servicename="idts_data-science-experience_"
servicename+=$CHE_WORKSPACE_ID
servicename+="_bank-loan"
service="data-science-experience"
region="us-south"
plan="free-v1"
python3.8 gather_service_info.py $service $servicename $region $plan || exit 1
