servicename=proactivehealthcarecp4d_
servicename+=$CHE_WORKSPACE_ID
aws s3api put-bucket-notification-configuration --bucket $servicename --notification-configuration file://event-notif-config.json
