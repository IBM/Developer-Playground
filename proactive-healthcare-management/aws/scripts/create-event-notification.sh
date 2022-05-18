servicename=proactivehealthcarecp4d
servicename+=$CHE_WORKSPACE_ID
aws s3api put-bucket-notification-configuration --bucket $servicename --notification-configuration file://../event-notif-config.json
