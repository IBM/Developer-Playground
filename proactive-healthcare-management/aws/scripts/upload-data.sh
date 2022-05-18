servicename=proactivehealthcarecp4d;
servicename+=$CHE_WORKSPACE_ID;
aws s3 cp ../../data/test-file.csv s3://$servicename;
