from ibm_vpc import VpcV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

apikey = '<apikey>'
authenticator = IAMAuthenticator(apikey)
service = VpcV1(authenticator=authenticator)
vpc_url = 'https://us-south.iaas.cloud.ibm.com'
service.set_service_url(vpc_url)
service = VpcV1('2020-04-10', authenticator=authenticator)

<codetoreplace>
print(response)
