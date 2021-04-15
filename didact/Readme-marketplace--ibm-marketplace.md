<html>
<style>
html,div,body{
    background-color:#1a1a1a;
    font-family: 'IBM Plex Sans', sans-serif;
}
.content h2,h3,h4
{
    font-family: 'IBM Plex Sans', sans-serif;
    background-color:#1a1a1a;
}
.content h2,p{
    color:#fff;
    font-family: 'IBM Plex Sans', sans-serif;
}
.content p{
  font-family: 'IBM Plex Sans', sans-serif;  
  font:15px;
  color: #fff;
}
pre{
    background-color:#d9dbde;
    color:#000;
    font-family: 'IBM Plex Sans', sans-serif;
    font:12px;
}
.content h4{
    color:#fff;
}
.content h6{
    font-family: 'IBM Plex Sans', sans-serif;
    background-color:#1a1a1a;
    color:#fff;
}
.content h3{
    font-family: 'IBM Plex Sans', sans-serif;
    color: #2a67f5;
    background-color:#1a1a1a;
}
ul, ol,b{ 
    font-family: 'IBM Plex Sans', sans-serif;
    color: #fff;
}
#ul1{
  font-family: 'IBM Plex Sans', sans-serif;
    color: #fff;
}
.button.is-dark.is-medium {
  font-family: 'IBM Plex Sans', sans-serif;
  background-color: #1a1a1a;
  border-color: white;
  color: #fff;
}
.button.is-dark.is-medium:hover {
  font-family: 'IBM Plex Sans', sans-serif;
  background-color: #2a67f5;
  border-color: white;
  color: #fff;
}
.title.is-3{
  font-family: 'IBM Plex Sans', sans-serif;
  color:#fff;
}
.subtitle.is-4{
    font-family: 'IBM Plex Sans', sans-serif;
    color:#fff;
}

</style>
<body style="font-family: 'IBM Plex Sans', sans-serif;background-color:#1a1a1a;">
<div style="font-family: 'IBM Plex Sans', sans-serif;background-color:#1a1a1a;">
<h2 class="title is-3 ">IBM Configuration for Partner Marketplace</h2>
<h3 class="subtitle is-4" style="color:#fff;">Integration Specification -V0.3</h3>

<h3>Business Value </h3>

<p>The proposed solution plans to address two problems faced with partner marketplaces</p>
<ul id="ul1">
<li>Often offerings have complex configuration rules related to add-ons and a maintenance overhead for partners to code and introduce in catalog.</li>
<li>Resellers may not know the details required to provision the service and would like to delegate the customer contact. This is currently not feasible.</li>
</ul>

<p>Business value to IBM's partners<br/>
<ul>
<li>Decouple  from implementing  product configuration  rules</li>
<li>Workflow to capture product  provisioning  details,  by end  customer or reseller</li>
<li>Expedited  product  introduction  and launch</li>
</ul>
</p>
<h3>Sample Application</h3>
<br/>
<p>Try out the Sample Application</p>

<ol>

<li>Before you configure and launch the application, it is necessary to retrieve the API credentials from <a href="https://developer.ibm.com/apis/catalog/marketplace--ibm-marketplace/api/API--marketplace--catalog#Get%20a%20product"> https://developer.ibm.com/apis/catalog/marketplace--ibm-marketplace/api/API--marketplace--catalog#Get%20a%20product</a>.
</li><br>

<li> Lets Start.</li><br/>
<a class="button is-dark is-medium" title="Start Terminal" href="didact://?commandId=terminal-for-nodejs-container:new">Start Terminal</a>
<br/>

<br/><li> Get the Code.</li><br/>
<a class="button is-dark is-medium" title="Get the Code" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=nodejs%20terminal%201$$cd%20${CHE_PROJECTS_ROOT}%20%26%26%20git%20clone%20-b%20playground%20https://github.ibm.com/digital-marketplace/ipm-pivot.git">Get the Code</a>
<br/>

<br/><li> Configure the Appilication. It  will create a <b>.env</b> file to enter your API credentials i.e Client_ID and Client_Secret.</li><br/>
<a class="button is-dark is-medium" title="Configure the Appilication" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=nodejs%20terminal%201$$cd%20${CHE_PROJECTS_ROOT}/ipm-pivot%20%26%26%20cp%20%20.env.stage%20.env&completion=The%20.env%20file%20is%20created">Configure the Application</a><br><br>

<li>Now, you must open the file by clicking the  "Open the File" button in order to enter the API Credentials in the <b>.env</b> file.</li>
<br>

<a class="button is-dark is-medium" title="Open the File" href="didact://?commandId=file-search.openFile&projectFilePath=ipm-pivot/.env">Open the File</a>
<br>

<br/><li>Build the Application.</li><br/>
<a class="button is-dark is-medium" title="Build the Appilication" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=nodejs%20terminal%201$$cd%20${CHE_PROJECTS_ROOT}/ipm-pivot%20%26%26%20npm%20install">Build the Application</a>
<br/>

<br/><li>Launch the Application.</li><br/>
<a class="button is-dark is-medium" title="Launch the Application" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=Marketplace$$cd%20${CHE_PROJECTS_ROOT}/ipm-pivot%20%26%26%20npm%20run%20start&completion=The%20application%20has%20been%20launched.">Launch the Application</a><br><br>

<p>You will see a dialog box saying " The application has been launched." </p>

<br/><li>Explore the Code.</li><br/>
<a class="button is-dark is-medium" title="Explore the Code" href="didact://?commandId=workbench.view.explorer">Explore the Code</a><br><br>


</ol>
<h3>User experience</h3>

<p>Two integration models are proposed: </p>
<ul>
<li><b>Punchout:</b> User navigates to configuration wizard at ibm.com and back
<a href="https://ibm.invisionapp.com/share/67O0AC93UKZ">https://ibm.invisionapp.com/share/67O0AC93UKZ</a> </li>
<li><b>Embed:</b> User stays at partner’s domain, configuration widget is embedded
<a href="https://ibm.invisionapp.com/share/E5O0ACBCJ4R">https://ibm.invisionapp.com/share/E5O0ACBCJ4R</a></li>
</ul>
<p>
To provide resellers appropriate context, the punch out model will include a textual representation of partner on configuration page. </p>

<h3> Sequence Diagrams</h3>

<h6> 1. Buy New Flow </h6><br/>

![3PM Punchout Approach](3PM_Punchout.png){.imageCenter}

<p style="font:10px; font-family: 'IBM Plex Sans', sans-serif;"><b>Note:</b>  See <a href="#Appendix">appendix [1]</a> for a detailed sequence diagram</p>

<p>
Steps A thru D represent reseller’s interaction with the IPM app<br/>
Steps 1 thru 6 is the browser interaction between the IPM app and IBM APIs
</p>

<p> -   When a user requests a checkout using IBM Checkout, the 3PM app makes 2 XHR requests </p>
<ol>
<li>The first one to IBM Marketplace APIs to get a JWT token containing a unique id ipmConfigID to be used as an identifier for the configuration.</li><br/>

![ipmConfigID](3PM_Code1.png){.imageCenter}

<li>The second one to IBM Config app to request for the checkout url. The IPM app passes a target return url as a query parameter which is used as a return url after the checkout is complete on the IBM Checkout side.</li>
</ol>
<p>
-	On success of second request, IPM redirects to the checkout url which displays the customized Checkout Configuration page.</p>
<p>
-	User fills out the configurations on the IBM checkout page and clicks Save and Price. This saves the configuration and redirects back to the target url</p>
<p>-	3PM can then invoke the getConfig API to retrieve the saved configuration and price.</p>
<br/>
<h6> 2. Buy New - Embed </h6><br/>

![3PM Embed](3PM_Embed.png){.imageCenter}

<ol>
<li>Get Products for a Reseller (getAResellerProduct) – changes to existing API, update in response to denote supportedByIbmConfigurator at purchasePlan level</li>
<li>Get plan configuration for a plan - changes to existing API, update in response to denote supportedByIbmConfigurator</li>
<li>JWT Generation (requestJWT) – new API</li>
<li>Get Checkout Url (getCheckoutUrl) – new API</li>
<li>Get Checkout Config (getIPMConfig) – new API</li>
<li>Create Order (createOrder) – changes to existing API, simplified schema taking config id</li>
<li>Get Order API – changes to existing API, update in response for delegated provisioning form</li>
<li>Update Order – changes to existing API, simplified schema taking config id</li>
</ol>

<ol>
<li><b><u>Get Products for a Reseller (getAResellerProduct)- changes to existing API, update in response to denote supportedByIbmConfigurator at purchase plan level</u></b></li><br/>

<p><b>GET on v2/catalog/reseller/products?locale=en-us</b></p><br/>
<pre>
{
	"data" :
	[
		{
			"availableForLocales" :
			[
				"en-uk",
				"en-us"
			],
			"locale": "en-us",
			"id": "7627f2ad502ad84e75188ecce0a698bb",
			"name": "IBM Cognos Analytics on Cloud",
			"purchasePlans" :
			[
				{
					"id": "EIDJMR3V",
					"name": "IBM Cognos Analytics Trial",
					"description": "The full functionality of Cognos Analytics available as an on-demand, cloud-based solution",
					"unit": "USD",
					"type": "Try"
				},
				{
					"id": "EID2RPAX",
                    				"name": "IBM Cognos Analytics on Cloud",
                    				"unit": "USD",
                    				"supportedByIbmConfigurator": true,
                    				"type": "Buy"
				}
			]
		}
	]
}
</pre>




<li><b><u>Get plan configuration for a plan - changes to existing API, update in response to denote supportedByIbmConfigurator</u></b></li><br/>

<p><b>GET on v2/catalog/reseller/products/7627f2ad502ad84e75188ecce0a698bb/plans/EID2RPAX/config?locale=en-us</b></p><br/>

<pre>
{
  "isSubscriptionManagementAllowed": true,
  "supportedByIbmConfigurator" : true,
  "type": "Buy",
  "allowedPlanChanges": [],
  "components": [
    {
      "partType": "bundle",
      "partIdentifier": "D2302LL",
      "name": "IBM Cognos Analytics on Cloud",
      "description": "Base",
      "currencyCode": "USD",
      "attributes": [
        {
          "unitOfMeasure": "users",
          "attributeName": "item_qty"
        }
      ]
    },
    {
      "partType": "option",
      "partIdentifier": "D20ENLL",
      "required": false,
      "name": "IBM Cognos Analytics on Cloud Standard",
      "description": "IBM Cognos Analytics on Cloud Standard",
      "currencyCode": "USD",
      "attributes": [
        {
          "unitOfMeasure": "users",
          "attributeName": "item_qty"
        }
      ]
    }
  ],
  "defaultBillingFrequency": "U",
  "allowedBillingFrequencies": [
    {
      "value": "U",
      "displayValue": "Upfront"
    }
  ]
} 
</pre>
<br/>
<li><b><u>	NEW API to get JWT token for Checkout Config</u></b></li><br/>

<p><b>POST on v2/reseller/orders/configuration</b></p><br/>

<p><b><u>NEW Order use-case</u></b></p><br/>

 <p><b>Payload :</b></p><br/>
 <pre>
{
    "orderType": "3PM",
    "countryCode" : "USA",	<Marketplace-Country-Code>
    "product": {
            "id": "5da645b0f36785f9889a9d3a350b5bec",
            "planId": "DK-SPSS-Statistics-Cloud-Base"
      }
}
</pre>
<br/>
<p><b>Response :</b></p><br/>
<pre>
{
    "token" :  {
        "type" : "JWT",
        "value" : "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJJQk0gTWFya2V0cGxhY2UiLCJpYXQiOjE1Njg4MTkyNTQsImp0aSI6IjEyYjFiNGJlNmVlMzQzYzFhNTFhYzdjYmM0ODdmNjc3In0.-oljk1aktCzVCCVnhg_aL__WLr38H4sEjLQbDPxq7As",
        "expiresAt" : 1582930261424
    },
    "ipmConfigId" : "8rdIW1SIhI9Kh6EktTtu"
}
</pre>
<br/>
<p><b><u>BUY MORE Order use-case</u></b></p><br/>

<p><b>Payload :</b></p><br/>
<pre>
{
    "orderReferenceNumber" : "order123",
    "product": {
            "id": "5da645b0f36785f9889a9d3a350b5bec",
            "planId": "DK-SPSS-Statistics-Cloud-Base"
      }
}
</pre>
<p><b>Response :</b></p><br/>
<pre>
{
    "token" :  {
        "type" : "JWT",
        "value" : "yyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJJQk0gTWFya2V0cGxhY2UiLCJpYXQiOjE1Njg4MTkyNTQsImp0aSI6IjEyYjFiNGJlNmVlMzQzYzFhNTFhYzdjYmM0ODdmNjc3In0.-oljk1aktCzVCCVnhg_aL__WLr38H4sEjLQbDPxq7Ap",
            "expiresAt" : 1582930261424    
    },
    "ipmConfigId" : "fjLGqhEG0dWSNZR5DXoK"
}
</pre>
<br/>
<p><b><u>REISSUE token use-case</u></b></p><br/>

<p><b>Payload :</b></p><br/>
<pre>
{
    "ipmConfigId" : "8rdIW1SIhI9Kh6EktTtu"
}
</pre>
<br/>
<p><b>Response :</b></p><br/>
<pre>
{
    "token" :  {
        "type" : "JWT",
        "value" : "ryJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJJQk0gTWFya2V0cGxhY2UiLCJpYXQiOjE1Njg4MTkyNTQsImp0aSI6IjEyYjFiNGJlNmVlMzQzYzFhNTFhYzdjYmM0ODdmNjc3In0.-oljk1aktCzVCCVnhg_aL__WLr38H4sEjLQbDPxq7At",
            "expiresAt" : 1582930261424    
    },
    "ipmConfigId" : "8rdIW1SIhI9Kh6EktTtu"
}
</pre>
<br/>
<li><b><u>NEW API – Get Checkout URL (getCheckoutUrl) by passing “token.value” as a token to get the url to IBM Checkout Config for the selected plan</u></b></li><br/>

<p><b>GET on https://www.ibm.com/marketplace/purchase/configuration/api/v1/jwt/ipm/checkout-url?target=https://3pm-checkoutPage-url&tk=< token.value></b></p><br/>

<p><b>Response:</b></p><br/>
<pre>
    {
      responseUrl: 'https://www.ibm.com/marketplace/purchase/configuration/en/us/checkout/ipm?editionID=EID18YXE&ipmConfigID=3em4y1597757XXXXXX&target=https://3pm-checkoutPage-url'
    }
</pre>
</br>
<li><b><u>NEW API - Get Checkout Config (getIPMConfig) by passing “ipmConfigId”</u></b></li><br/>
  
<p><b>Use-case 1 :</b><br/>
Exclude pricing estimates in API response.</p><br/>

<p><b>GET on v2/reseller/orders/configuration/8rdIW1SIhI9Kh6EktTtu</b></p><br/>

<pre>
{
  "contacts":
    [
        {
            "type": "PROVISIONING_CONTACT",
            "firstName": "ContactName",
            "lastName": "ContactLastname",
            "email": "contactemail@reseller.com"
        }
    ],
    "billingFrequency" : "U",
    "term" : 12,
    "currency" : "USD",
    "countryCode" : "USA",
    "isLocked" : false,
    "metadata" :
    {
        "created": 1594138507683,
        "modified": 1594138507683
    },
    "lineItems" :
    [
        {
            "itemNumber" : "1",
            "partIdentifier" : "D1P3GLL",
            "attributes" :
            {
                "item_qty" : 5,
                "maas-partner-id" : "1234",
                "MaaSAccountId" : "7890"
            } 
        }
    ]
}
</pre>
<br/>
<p><b>Use-case 2 :</b><br/>
Include pricing estimates in API response (Provide includePricingEstimates=true)</p><br/>

<p><b>GET on v2/reseller/orders/configuration/8rdIW1SIhI9Kh6EktTtu?includePricingEstimates=true</b></p><br/>

<pre>
{
  "contacts":
    [
        {
            "type": "PROVISIONING_CONTACT",
            "firstName": "ContactName",
            "lastName": "ContactLastname",
            "email": "contactemail@reseller.com"
        }
    ],
    "billingFrequency" : "U",
    "term" : 12,
    "currency" : "USD",
    "countryCode" : "USA",
    "isLocked" : false,
    "metadata" :
    {
        "created": 1594138507683,
        "modified": 1594138507683
    },
    "lineItems" :
    [
        {
            "itemNumber" : "1",
            "partIdentifier" : "D1P3GLL",
            "attributes" :
            {
                "item_qty" : 5,
                "maas-partner-id" : "1234",
                "MaaSAccountId" : "7890"
            },
            "pricingEstimate" :
            {
                "debit" :
                {
                    "suggestedEndCustomerPrice" : 4.0,
                    "partnerExtendedPrice" : 2.0
                },
                "credit" :
                {
                }
            }
        }
    ]
}
</pre>

<li><b><u>Create Order (createOrder) API by passing “ipmConfigId” (Existing API endpoint)</u></b></li>

<p><b>Use-case 1 :</b></p>

<p>Use the values as defined in Checkout Configurator.<br/>
No need to pass "lineItems, term, billingFrequency, PROVISIONING_CONTACT, product, countryCode"<br/>
If “ipmConfigId” and any of the fields (lineItems, term, billingFrequency, product, countryCode, PROVISIONING_CONTACT) are provided then Bad-Request will be given back.</p>

<p><b>POST on v2/reseller/orders</b></p>

<pre>
{
  "orderType": "3PM",
  “ipmConfigId” : “8rdIW1SIhI9Kh6EktTtu”,
  "opportunityNumber” : ”opp1”,
  "purchaseOrderNumber” : ”PO-01”,
  "contacts": [{
        "type": "END_CUSTOMER",
        "firstName": "3PM",
        "lastName": "SpssTestUser_4",
        "email": "3SpssTestUser_4@yopmail.com",
        "addressLine1": "1225 Long Pond Rd",
        "city": "Rochester",
        "postalCode": "14626",
        "state": "NY",
        "country": "USA",
        "communicationLanguage": "EN",
        "isTelco": false
  }, {
         "type": "SOLD_THROUGH",
        ….
        ….
  }],
  "licenseAcceptance": {
    	"firstName": "3PM",
    	"lastName": "SpssTestUser_4",
    	"dateTime": 123456789,
    	"email": "3SpssTestUser_4@yopmail.com"
  }
}
</pre>

<p><b>Use-case 2 :</b><br/>

Ignore the values which are defined in Checkout Configurator and provide your own values in Create Order payload. Same request what is supported now.</p>

<p><b>POST on v2/reseller/orders</b></p>
<pre>
{
  "orderType": "3PM",
  "product": {
    "id": "5ecbfe02904b5825b600212439330143",
    "planId": "DK-MS-EMM-DEL-V2"
  },
  "term" : 3,
  "billingFrequency" : "U",
  "countryCode": "USA",
  "opportunityNumber" : "opp1",
  "purchaseOrderNumber" : "PO-01",
  "contacts": [{
        "type": "END_CUSTOMER",
        "firstName": "3PM",
        "lastName": "SpssTestUser_4",
        "email": "3SpssTestUser_4@yopmail.com",
        "addressLine1": "1225 Long Pond Rd",
        "city": "Rochester",
        "postalCode": "14626",
        "state": "NY",
        "country": "USA",
        "communicationLanguage": "EN",
        "isTelco": false
  }, {
         "type": "SOLD_THROUGH",
        ….
        ….
  }],
  "lineItems": [{
    "itemNumber": "1",
    "partIdentifier": "D1P3LLL",
    "attributes": {
      "item_qty": 1,
      "maas-partner-id" : "1234",
      "MaasAccountId" : "4567"
    }
  }],
  "licenseAcceptance": {
        "firstName": "3PM",
        "lastName": "SpssTestUser_4",
        "dateTime": 123456789,
        "email": "3SpssTestUser_4@yopmail.com"
  }
}
</pre>

<li><b><u>Update Order API by passing “ipmConfigId” (Existing API endpoint)</u></b></li>

<p><b>Use-case 1 :</b><br/>
Use the values as defined in Checkout Configurator.<br/>
No need to pass "lineItems, term, billingFrequency, product, countryCode"<br/>
If “ipmConfigId” and any of the fields (lineItems, term, billingFrequency, product, countryCode) are provided then Bad-Request will be given back.</p>


<p><b>PUT on v2/reseller/orders/order123</b></p>
<pre>
{
  "orderType": "3PM",
  “ipmConfigId” : “8rdIW1SIhI9Kh6EktTtu”,
  "licenseAcceptance": {
    	"firstName": "3PM",
    	"lastName": "SpssTestUser_4",
    	"dateTime": 123456789,
    	"email": "3SpssTestUser_4@yopmail.com"
  }
}
</pre>

<p><b>Use-case 2 :</b><br/>
Ignore the values which are defined in Checkout Configurator and provide your own values in Update Order payload. Same request what is supported now.</p>

<p><b>PUT on v2/reseller/orders/order123</b></p>
<pre>
{
  "orderType": "3PM",
  "product": {
    "id": "5ecbfe02904b5825b600212439330143",
    "planId": "DK-MS-EMM-DEL-V2"
  },
  "term" : 3,
  "billingFrequency" : "M",
  "countryCode": "USA",
  "lineItems": [{
    "itemNumber": "1",
    "partIdentifier": "D1P3LLL",
    "attributes": {
      "item_qty": 1,
      "maas-partner-id" : "1234",
      "MaasAccountId" : "4567"
    }
  }],
  "licenseAcceptance": {
      "firstName": "3PM",
      "lastName": "SpssTestUser_4",
      "dateTime": 123456789,
      "email": "3SpssTestUser_4@yopmail.com"
  }
}
</pre>

<li><b><u>Get Order API – update in response for delegated provisioning form (Existing API endpoint)</u></b></li>

<p><b>GET on v2/reseller/orders/order123</b></p>
<pre>
{
    "lineItems": [
        {
            "itemNumber": "1",
            "partIdentifier": "D1P3LLL",
            "attributes": {
                "item_qty": 1
            }
        }
    ],
    "product": {
        "id": "5ecbfe02904b5825b600212439330143",
        "planId": "DK-MS-EMM-DEL-V2"
    },
    "licenseAcceptance": {
        "firstName": "3PM",
        "lastName": "SpssTestUser_4",
        "dateTime": 123456789,
        "email": "3SpssTestUser_4@yopmail.com"
    },
    "status": "IN_PROGRESS",
    "cancelOperationAllowed": "NONE",
    "detailedStatus": {
        "status": "PROVISION_IN_PROGRESS",
        "isProvisioningFormCompleted" : false
    }
}
</pre>
</ol>

<br/><br/>
<br/><br/>
<hr/>

<h3 id="Appendix">Appendix</h3>
<ol>
<p>1. To view the Buy-new (Punchout) Sequence diagram with Payloads and Responses paste the contents in  <a href="https://www.websequencediagrams.com/">https://www.websequencediagrams.com/</a>  or use the <a href="https://www.websequencediagrams.com/cgi-bin/cdraw?lz=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_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&s=modern-blue">direct link</a> to render a png image.
</ol>
<br/>

![3PM Appendix](3PM_Appendix.png){.imageCenter}
</div>
</body>
</html>
