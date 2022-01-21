ibmcloud fn action delete ml
ibmcloud fn namespace delete smart-assistant

servicename="cp-cos"
ibmcloud resource service-instance-delete $servicename -f --recursive

servicename="cp-wmachinelearning"
ibmcloud resource service-instance-delete $servicename -f --recursive

servicename="cp-wassistant"
ibmcloud resource service-instance-delete $servicename -f --recursive
