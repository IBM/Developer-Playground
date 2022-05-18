servicename=proactivehealthcarecp4d;
servicename+=$CHE_WORKSPACE_ID;
aws s3api create-bucket --acl private --bucket $servicename
BucketName='BUCKET_NAME='$servicename
echo $BucketName >> ../../../.env;
