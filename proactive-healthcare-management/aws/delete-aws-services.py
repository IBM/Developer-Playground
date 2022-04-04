import os
from dotenv import dotenv_values


config = dotenv_values("../../.env") 
UUID = config["UUID"]


os.popen("aws lambda delete-event-source-mapping --uuid " +UUID)
print("###########################################################\n Event source mapping deletion complete\n###########################################################")
os.popen("aws lambda delete-function --function-name Consumer")
print("###########################################################\n Consumer Lambda deletion complete\n###########################################################")
os.popen("aws lambda delete-function --function-name Producer")
print("###########################################################\n Producer Lambda deletion complete\n###########################################################")
os.popen("aws kinesis delete-stream --stream-name myDataStream")
print("###########################################################\n Kinesis dataStream deletion complete\n###########################################################")
os.popen("aws s3 rb s3://proactivehealthcarecp4d --force")
print("###########################################################\n S3 Bucket deletion complete\n###########################################################")
os.popen("aws iam detach-role-policy --role-name aws-healthcare-role --policy-arn arn:aws:iam::aws:policy/CloudWatchFullAccess")
os.popen("aws iam detach-role-policy --role-name aws-healthcare-role --policy-arn arn:aws:iam::aws:policy/AmazonKinesisFullAccess")
os.popen("aws iam detach-role-policy --role-name aws-healthcare-role --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess")
os.popen("aws iam delete-role --role-name aws-healthcare-role")
print("###########################################################\n IAM Role deletion complete\n###########################################################")
os.popen("aws logs delete-log-group --log-group-name /aws/lambda/Consumer")
print("###########################################################\n Cloudwatch Consumer Logs deletion complete\n###########################################################")
os.popen("aws logs delete-log-group --log-group-name /aws/lambda/Producer")
print("###########################################################\n Cloudwatch Producer Logs deletion complete\n###########################################################")
