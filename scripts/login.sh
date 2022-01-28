ibmcloud config --check-version=false
ibmcloud login -r us-south --sso
ibmcloud target -r us-south --cf
python3.8 login.py