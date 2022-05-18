servicename=proactivehealthcarecp4ddatastream
servicename+=$CHE_WORKSPACE_ID
aws kinesis create-stream --stream-name $servicename --shard-count 2;
StreamARN=`aws kinesis describe-stream --stream-name $servicename | grep StreamARN| sed 's/^.*: //'|sed 's/.$//'`;
echo >> ../../../.env;
StreamARN='KINESIS_STREAM_ARN='$StreamARN;
echo $StreamARN >> ../../../.env;
StreamName='KINESIS_STREAM_NAME='$servicename
echo $StreamName >> ../../../.env;
