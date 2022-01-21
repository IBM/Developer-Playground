echo "Select Account Type:
1. IBM Internal
2. External"
read -p 'Enter a number> ' account_type
if (($account_type==1))
then
    echo "Internal Account Selected"
    ibmcloud config --check-version=false
    ibmcloud login -r us-south --sso
    ibmcloud target -r us-south --cf
    ibmcloud target -r us-south -g Default
else
    echo "External Account Selected"
    ibmcloud config --check-version=false
    ibmcloud login -r us-south
    ibmcloud target -r us-south --cf
    ibmcloud target -r us-south -g Default
fi
