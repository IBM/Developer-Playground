servicename="cp-stt"
service="speech-to-text"
region="us-south"
plan="lite"
filename="speechtotext.json"
python3.8 gather_service_info.py $service $servicename $region $plan $filename|| exit 1


servicename="cp-nlu"
service="natural-language-understanding"
region="us-south"
plan="free"
filename="naturallanguageunderstanding.json"
python3.8 gather_service_info.py $service $servicename $region $plan $filename|| exit 1


servicename="cp-ta"
service="tone-analyzer"
region="us-south"
plan="lite"
filename="toneanalyzer.json"
python3.8 gather_service_info.py $service $servicename $region $plan $filename|| exit 1

