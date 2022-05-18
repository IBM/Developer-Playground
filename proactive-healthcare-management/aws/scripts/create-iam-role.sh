servicename=proactivehealthcarecp4diam;
servicename+=$CHE_WORKSPACE_ID;
aws iam create-role --role-name $servicename --assume-role-policy-document file://Test-Role-Trust-Policy.json;
aws iam attach-role-policy --role-name $servicename --policy-arn arn:aws:iam::aws:policy/CloudWatchFullAccess;
aws iam attach-role-policy --role-name $servicename --policy-arn arn:aws:iam::aws:policy/AmazonKinesisFullAccess;
aws iam attach-role-policy --role-name $servicename --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess;
IAM_ARN=`aws iam get-role --role-name $servicename | grep Arn| sed 's/^.*: //'|sed 's/.$//'`;
sleep 5;
echo >> ../../../.env;
IAM_Name='IAM_ROLE='$servicename;
echo $IAM_Name >> ../../../.env;
IAM_ARN='IAM_ARN='$IAM_ARN;
echo $IAM_ARN >> ../../../.env;
