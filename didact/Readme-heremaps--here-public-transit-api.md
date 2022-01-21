
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  html,
  div,
  body {
    background-color: #1a1a1a;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 18px;
    outline: none;
  }
  body {
    font-family: Helvetica, sans-serif;
  }
  /* The actual timeline (the vertical ruler) */
  .timeline {
    position: absolute;
    max-width: 1200px;
    margin: 0 auto;
    margin-left: 50px;
  }
  .content p {
    margin: 0px;
  }
  .content .afterbutton
  {
    padding-top: 16px;
  }
  /* The actual timeline (the vertical ruler) */
  .timeline::after {
    content: '';
    position: absolute;
    width: 1px;
    background-color: white;
    top: 15px;
    bottom: 80px;
    left: 18px;
    margin-left: -2px;
  }
  /* Container around content */
  .container {
    padding: 0px 0px;
    width: 70%;
    align-content: left;
    margin: 0px 0px 0px 0px;
    margin-left: 25px;
    margin-top: 32px;
  }
  /* The circles on the timeline */
  .container::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    right: -6px;
    background-color: white;
    border: 0px solid #FF9F55;
    top: 15px;
    border-radius: 50%;
    z-index: 1;
    margin: 0px 0px 0px 0px;
  }
  /* Place the container to the left */
  .left {
    left: 0px;
  }
  /* Place the container to the right */
  .right {
    left: 0px;
  }
  /* Add arrows to the left container (pointing right) */
  .left::before {
    content: " ";
    height: 0;
    top: 22px;
    width: 0;
    z-index: 1;
    right: 30px;
    border: medium solid white;
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent white;
  }
  /* Fix the circle for containers on the right side */
  .right::after {
    left: -13px;
  }
  /* The actual content */
  .content {
    padding: 5px 10px;
    color: white;
    background: transparent;
  }
  .button.is-dark.is-medium {
    font-family: 'IBM Plex Sans', sans-serif;
    background: transparent;
    border-color: white;
    color: #fff;
    border: 1px solid white;
    padding: 10px;
    padding-left: 20px;
    margin-bottom: 13px;
    border-radius: 0px;
    min-width: 180px;
    font-size: 14px;
    text-align: left;
    min-height: 48px;
    margin: 0px;
    justify-content:left;
  }
  .button.is-dark.is-medium:hover {
    font-family: 'IBM Plex Sans', sans-serif;
    background-color: #2a67f5;
    border-color: white;
    color: #fff;
  }
  .footer {
    display: flex;
    background-color: #343A3E;
    margin: 800px 0px 0px 20px;
    padding: 0px;
    max-width: 1200px;
  }
  .github-icon {
    min-height: 100%;
    min-width: 100%;
    object-fit: cover;
    object-position: 250% 100px;
    opacity: 15%;
    bottom: 15px;
  }
  .image-content {
    padding: 5px 10px;
    background: transparent;
    color: black;
    position: absolute;
    font-size: 27px;
  }
  .image-div {
    position: relative;
    background-color: white;
    min-width: 50%;
    background-image: linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url("https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/github.svg");
    background-position: -50% 60px;
    background-repeat: no-repeat;
    padding-top: 20px;
    padding-left: 20px;
  }
  .image-btn {
    position: absolute;
    right: 0;
    bottom: 0%;
    background-color: #0062FF;
    max-width: 300px;
    min-width: 100px;
    width: 300px;
    padding: 0px;
    padding-bottom: 20px;
  }
  .image-link span 
  {
    float: right;
    font-size: 32px;
    padding-right: 10px;
  }
  .image-btn .image-link:hover
  {   
    text-decoration: none;
    color: white;
    background-color: #0353E9;
  }
  .image-btn  a:hover
  {
    text-decoration: none;
    color: white;
  }
  .image-link {
    color: white;
    display: block;
    padding: 5px 10px 5px 10px;
    line-height: 28px;
    font-size: 16px;
  }
  .header
  {
    background-image: url('https://github.com/IBM/Developer-Playground/blob/master/didact/images/banner-image.jpg?raw=true');
    width: 100%;
    height: fixed;
    min-height: 300px;
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 30px;
    margin-right: 30px;
    background-size: contain;
    max-width: 1200px;
    background-size: cover;
  }
  .header .right-content
  {
    float: right;
    width: 45%;
    background-color:#2a67f5;
    min-height:400px;
    padding:20px;
    font-size: 14px;
  }
  .header .right-content h4
  {
    background: none;
    color: white;
    padding-left: 25px;
    padding-right: 25px;
  }
  .header .right-content div
  {
    background: none;
    color: white;
    padding-left: 25px;
    padding-right: 25px;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .header .right-content ul
  {
    margin: 0px;
    margin-left: 25px;
    margin-bottom: 10px;
    line-height: 16px;
  }
  .container a
  {
    color: #78A9FF;
    background-color: transparent;
    text-decoration: none;
  }
  .container a:visited
  {
    color: #8C43FC;
    background-color: transparent;
    text-decoration: none;
  }
  .apptitle
  {
    margin-left: 25px;
    margin-top: 20px;
    margin-bottom: 0px;
    font-size: 25px;
    color: white;
  }
.assetdetails{
    background:none;
    max-width: 1200px;
    margin: 0 auto;
    margin-left: 50px;
    padding-bottom: 24px;
}
  @media only screen and (max-width: 800px) {
    .footer {
      margin: 950px 0px 0px 20px;
    }
  }
  @media only screen and (max-width: 700px) {
    .footer {
      margin: 1050px 0px 0px 20px;
    }
  }
  @media only screen and (max-width: 600px) {
    .footer {
      margin: 1050px 0px 0px 20px;
    }
  }
  @media only screen and (max-width: 500px) {
    .footer {
      margin: 1100px 0px 0px 20px;
    }
  }
  @media only screen and (max-width: 400px) {
    .footer {
      margin: 1200px 0px 0px 20px;
    }
  }
}
</style>
</head>
<body>
  <div class="apptitle"> 
    HERE Technologies Asset - Public Transit
  </div>
   <div class="header">
      <div class="right-content">
         <div>
            Here Maps is one-stop solution to most of the problems in this domain. HERE Technologies provide comprehensive mapping content, an integrated suite of solutions, services and development tools and a marketplace for data to solve your complex location-based problems.
         </div>
         <div>
            Showcasing a sample application using `Here Public Transit API` by Here Maps:
         </div>
         <div>
            Are you at the crossroads trying to decide 
         </div>
         <ul>
            <li>Walking directions to stops.</li>
            <li>Pedestrian access points.</li>
            <li>Station locations.</li>
            <li>Transfer locations.</li>
         </ul>
         <div>
            Don't worry, you don't have to code to figure it out. It's just a few clicks away
         </div>
      </div>
   </div>
   <br>
   <br>
    <div class="assetdetails">
            <p style="font-size: 20px;"><b>Learning Resources</b></p>
            <li>Get started with HERE Public Transit API <a href="https://developer.ibm.com/apis/catalog/heremaps--here-public-transit-api/Introduction">here</a></li>
        <br>
            <p style="font-size: 20px;"><b>Included components</b></p>
            <li><a href="https://developer.ibm.com/apis/catalog/heremaps--geocoding-and-search-api-v7/Introduction">HERE Geocoding and Search API</a></li>
            <li><a href="https://developer.ibm.com/apis/catalog/heremaps--here-public-transit-api/Introduction">HERE Public Transit API</a></li>
            <br>
            <p style="font-size: 20px;"><b>Prerequisites</b></p>
            <li>To run this application you will need to execute the following steps:</li><br>
            <p>Obtain API credentials</p>
            <li>Subscribe to the <a title="HEREPublicTransit" href="https://developer.ibm.com/apis/catalog/heremaps--here-public-transit-api/Introduction">HERE Public Transit API</a></li>
            <li>Sign up for HERE Developer </li>
            <li>Once you're logged into your HERE account. Go to 'Projects' </li>
            <li>Proceed to the 'REST' section </li>
            <li>Click 'Generate App'. Under 'OAuth2.0' -> click 'Create credentials' </li>
            <li>'Access Key ID' and 'Access Key Secret' would be your Client ID and Secret </li>
            <li>Proceed to the 'API Keys' section and create your API Key </li>
            <br>
            <br>
            <p style="font-size: 20px;"><b>Instructions</b></p>
        </div>
   <div class="timeline">
      <div class="container right" style="margin-top:0px;padding-top:0px;">
         <div class="content">
            <p>To begin, you will need the application's source code. Click `Get the code` to clone the code to your playground session.</p>
            <a class="button is-dark is-medium" title="Get the Code" href="didact://?commandId=extension.sendToTerminal&text=HEREPublicTransit%7Cget-code%7CHEREPublicTransit|git%20clone%20-b%20HERE%20--sparse%20https://github.com/IBM/Developer-Playground.git%20${CHE_PROJECTS_ROOT}/here-public-transit/%20%26%26%20cd%20${CHE_PROJECTS_ROOT}/here-public-transit/%20%26%26%20git%20sparse-checkout%20init%20--cone%20%26%26%20git%20sparse-checkout%20add%20HEREPublicTransit">Get the Code</a>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>You've successfully cloned the code, so click `Build the application` to start the build process.
            </p>
            <a class="button is-dark is-medium" title="Build the Application" href="didact://?commandId=extension.sendToTerminal&text=HEREPublicTransit%7Cbuild-application%7CHEREPublicTransit%7Ccd%20${CHE_PROJECTS_ROOT}/here-public-transit/HEREPublicTransit%20%26%26%20npm%20config%20set%20@here:registry%20https://repo.platform.here.com/artifactory/api/npm/maps-api-for-javascript/%20%26%26%20npm%20install%20--production">Build Application</a>
            <p class="afterbutton">
               To obtain credentials and configure the application, complete the prerequisites
            </p>
         </div>
      </div>     
      <div class="container right">
         <div class="content">
            <p>Let's configure the application with our credentials</p>
            <a class="button is-dark is-medium" title="Open the File" href="didact://?commandId=extension.openFile&text=HEREPublicTransit%7Cconfigure-application%7C${CHE_PROJECTS_ROOT}/here-public-transit/HEREPublicTransit/.env">Configure Application</a>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>You're all set to get started! </p>
            <a class="button is-dark is-medium" title="Launch the Application" href="didact://?commandId=extension.sendToTerminal&text=HEREPublicTransit%7Claunch-application%7CHEREPublicTransit|cd%20${CHE_PROJECTS_ROOT}/here-public-transit/HEREPublicTransit%20%26%26%20node%20token.js%20%26%26%20node%20server.js">Launch Application</a>
         </div>
      </div>
   </div>
   <div class="footer">
      <div class="content" style="padding:30px;padding-left:60px;padding-bottom: 0px;">
         <p>If you'd like to make changes and explore the application, make sure to stop it first!</p>
         <a class="button is-dark is-medium afterbutton" title="Stop Application" href="didact://?commandId=vscode.didact.sendNamedTerminalCtrlC&text=HEREPublicTransit" >Stop Application</a>
         <p class="afterbutton">The stage is yours!</p>
         <a class="button is-dark is-medium afterbutton" title="Explore the Code" href="didact://?commandId=extension.openFile&text=HEREPublicTransit%7Cexplore-code%7C${CHE_PROJECTS_ROOT}/here-public-transit/HEREPublicTransit/src/App.js">Explore Code</a>
         <p class="afterbutton ">To view the changes you've made, re-launch the application</p>
         <a class="button is-dark is-medium afterbutton" title="Re-Launch the Application" href="didact://?commandId=extension.sendToTerminal&text=HEREPublicTransit%7Crelaunch-application%7CHEREPublicTransit|cd%20${CHE_PROJECTS_ROOT}/here-public-transit/HEREPublicTransit%20%26%26%20npm%20install%20%26%26%20export%20REACT_APP_mode=dev%20%26%26%20npm%20start">Re-Launch Application</a>
      </div>
      <div class="image-div">
         <p class="image-content">Want to explore this project more?
            <span style="font-size:15px;margin-top:0px;display:block;">Head over to the <a href="https://github.com/IBM/Developer-Playground/tree/HERE/HEREPublicTransit">Github Repository</a></span>
         </p>
         <div class="image-btn">
            <a class="image-link" href="didact://?commandId=extension.openURL&text=HEREPublicTransit%7Cview-product-details%7Chttps://developer.here.com/documentation/public-transit/dev_guide/index.html" target="_blank">
               View Product Details 
               <span>
                  <svg style="position: absolute; right: 10px;" fill="#ffffff" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/  svg" width="25" height="25" viewBox="0 0 32 32" aria-hidden="true">
                     <path d="M18 6L16.6 7.4 24.1 15 3 15 3 17 24.1 17 16.6 24.6 18 26 28 16z"></path>
                     <title>Arrow right</title>
                  </svg>
               </span>
            </a>
            <a class="image-link" href="didact://?commandId=extension.openURL&text=HEREPublicTransit%7Cbuy-this-product%7Chttps://developer.here.com/pricing" target="_blank">
               Buy this API 
               <span>
                  <svg style="position: absolute; right: 10px;" fill="#ffffff" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/  svg" width="25" height="25" viewBox="0 0 32 32" aria-hidden="true">
                     <path d="M18 6L16.6 7.4 24.1 15 3 15 3 17 24.1 17 16.6 24.6 18 26 28 16z"></path>
                     <title>Arrow right</title>
                  </svg>
               </span>
            </a>
            <a class="image-link" href="didact://?commandId=extension.openURL&text=HEREPublicTransit%7Cget-trial-subscription%7Chttps://developer.here.com/sign-up?create=Freemium-Basic&keepState=true&step=account" target="_blank">
               Get Trial Subcription 
               <span>
                  <svg style="position: absolute; right: 10px;" fill="#ffffff" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/  svg" width="25" height="25" viewBox="0 0 32 32" aria-hidden="true">
                     <path d="M18 6L16.6 7.4 24.1 15 3 15 3 17 24.1 17 16.6 24.6 18 26 28 16z"></path>
                     <title>Arrow right</title>
                  </svg>
               </span>
            </a>
         </div>
      </div>
   </div>
   <br><br>
</body>
</html>
