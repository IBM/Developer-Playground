import os
from dotenv import dotenv_values


config = dotenv_values("../../.env") 
UUID = config["TRIGGER_UUID"]
BUCKET_NAME = config["BUCKET_NAME"]
IAM_ROLE= config["IAM_ROLE"]
KINESIS_STREAM_NAME= config["KINESIS_STREAM_NAME"]

os.system("aws lambda delete-event-source-mapping --uuid " +UUID)
print("###########################################################\n Event source mapping deletion complete\n###########################################################")
os.system("aws lambda delete-function --function-name Consumer")
print("###########################################################\n Consumer Lambda deletion complete\n###########################################################")
os.system("aws lambda delete-function --function-name Producer")
print("###########################################################\n Producer Lambda deletion complete\n###########################################################")
os.system("aws kinesis delete-stream --stream-name "+KINESIS_STREAM_NAME)
print("###########################################################\n Kinesis dataStream deletion complete\n###########################################################")
os.system("aws s3 rb s3://"+IAM_ROLE+" --force")
print("###########################################################\n S3 Bucket deletion complete\n###########################################################")
os.system("aws iam detach-role-policy --role-name "+IAM_ROLE+" --policy-arn arn:aws:iam::aws:policy/CloudWatchFullAccess")
os.system("aws iam detach-role-policy --role-name "+IAM_ROLE+" --policy-arn arn:aws:iam::aws:policy/AmazonKinesisFullAccess")
os.system("aws iam detach-role-policy --role-name "+IAM_ROLE+" --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess")
os.system("aws iam delete-role --role-name "+IAM_ROLE)
print("###########################################################\n IAM Role deletion complete\n###########################################################")
os.system("aws logs delete-log-group --log-group-name /aws/lambda/Consumer")
print("###########################################################\n Cloudwatch Consumer Logs deletion complete\n###########################################################")
os.system("aws logs delete-log-group --log-group-name /aws/lambda/Producer")
print("###########################################################\n Cloudwatch Producer Logs deletion complete\n###########################################################")
