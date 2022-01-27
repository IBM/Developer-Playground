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
    position: relative;
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
    text-decoration: none;
  }
  .footer {
    display: flex;
    background-color: #343A3E;
    margin-top: 20px;
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
    width: 300px;
    padding: 0px;
    padding-bottom: 20px;
  }
  .image-link span 
  {
    float: right;
    font-size: 32px;
    padding-right: 20px;
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
    background-position: right;
    width: 100%;
    height: auto;
    min-height: 320px;
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 30px;
    margin-right: 30px;
    max-width: 1200px;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .header .left-content
  {
    float: left;
    width: 45%;
    padding-top:40px;
    background-color:#2a67f5;
    min-height: 320px;
    padding: 20px;
    padding-top: 2.5%;
    font-size: 16px;
  }
  .header .left-content h4
  {
    background: none;
    color: white;
    padding-left: 25px;
    padding-right: 25px;
  }
  .header .left-content div
  {
    background: none;
    color: white;
    padding-left: 15px;
    padding-right: 25px;
    font-size: 16px;
    margin-bottom: 10px;
    margin-top:10px;
  }
  .header .left-content ul
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
    font-size: 28px;
    color: white;
  }
  .subheading
  {
    margin-left: 25px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 16px;
    color: #c1c7cd;
  }
  .assetdetails{
    margin-left: 30px;
    padding-bottom: 20px;
    margin-top: 16px;
}
  a:hover{
      color: #A6C8FF;
      text-decoration: underline;
  }
  a:visited{
      color: #BE95FF;
  }

</style>
</head>
<body>
  <div class="apptitle"> 
    HERE Technologies - Geocoding & Search
  </div>
  <div class="subheading">
    HERE Geocoding and Search APIs
  </div>
   <div class="header">
      <div class="left-content">
         <div> Here - What is Geocoding?
          It is the process of converting addresses (like "Taj Mahal in Agra, Uttar Pradesh, India") into geographic spatial coordinates (like latitude 27.1751° N and longitude 78.0421° E), which you can use to place markers on a map or position the map. Reverse geocoding is the process of converting geographic coordinates into a human-readable postal address.</div>
         <div> Want to know where you are? Head straight to the sample application developed using Here Geocoding and Search API, try it out yourself.</div>
         <div> With the HERE Geocoding and Search API, users will be able to search for  </div>
         <ul>
            <li>points of interest with 400+ categories and address objects at different levels(house number, street, city, state, postal code, ...)</li>
            <li>forward and reverse geocode address </li>
            <li>geo-positions from the HERE map, and </li>
            <li>access and analyse with Bring Your Own Data (BYOD)</li>
         </ul>
      </div>
   </div>
   <br/>
   <br/>
    <div class="assetdetails">
            <p style="font-size: 24px;">Learning Resources</p>
            <li>Get started with HERE Geocoding and Search API <a href="https://developer.ibm.com/apis/catalog/heremaps--geocoding-and-search-api-v7/Introduction">here</a></li>
        <br>
            <p style="font-size: 24px;">Included components</p>
            <li><a href="https://developer.ibm.com/apis/catalog/heremaps--geocoding-and-search-api-v7/Introduction">HERE Geocoding and Search API</a></li>
            <br>
            <p style="font-size: 24px;">Prerequisites</p>
            <li>To run this application you will need to execute the following steps:</li><br>
            <p>Obtain API credentials</p>
            <li>Subscribe to the <a title="HEREGeocoding" href="https://developer.ibm.com/apis/catalog/heremaps--geocoding-and-search-api-v7/Introduction">HERE Geocoding and Services API</a></li>
            <li>Sign up for HERE Developer </li>
            <li>Once you're logged into your HERE account. Go to 'Projects' </li>
            <li>Proceed to the 'REST' section </li>
            <li>Click 'Generate App'. Under 'OAuth2.0' -> click 'Create credentials' </li>
            <li>'Access Key ID' and 'Access Key Secret' would be your Client ID and Secret </li>
            <br>
            <br>
            <p style="font-size: 24px;">Instructions</p>
        </div>

   <div class="timeline">
      <div class="container right" style="margin-top:0px;padding-top:0px;">
         <div class="content">
            <p>To begin, you will need the application's source code. Click `Get the code` to clone the code to your playground session.</p>
            <a class="button is-dark is-medium" title="Get the Code" href="didact://?commandId=extension.sendToTerminal&text=HEREGeocodingandSearch%7Cget-code%7CHEREGeocodingandSearch|git%20clone%20-b%20HERE%20--sparse%20https://github.com/IBM/Developer-Playground.git%20${CHE_PROJECTS_ROOT}/here-geocoding/%20%26%26%20cd%20${CHE_PROJECTS_ROOT}/here-geocoding/%20%26%26%20git%20sparse-checkout%20init%20--cone%20%26%26%20git%20sparse-checkout%20add%20HEREGeocodingandSearch">Get the Code</a> 
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>You've successfully cloned the code, so click `Build the application` to start the build process.</p>
            <a class="button is-dark is-medium" title="Build the Application" href="didact://?commandId=extension.sendToTerminal&text=HEREGeocodingandSearch%7CBUILD-APPLICATION%7CHEREGeocodingandSearch|cd%20${CHE_PROJECTS_ROOT}/here-geocoding/HEREGeocodingandSearch%20%26%26%20npm%20install%20--production">Build the Application</a>
            <p class="afterbutton">  To obtain credentials and configure the application, complete the prerequisites</p>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>Let's configure the application with our credentials</p>
            <a class="button is-dark is-medium" title="Open the File" href="didact://?commandId=extension.openFile&text=HEREGeocodingandSearch%7Cconfigure-application%7C${CHE_PROJECTS_ROOT}/here-geocoding/HEREGeocodingandSearch/.env">Configure the Application</a> 
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>You're all set to get started! </p>
            <a class="button is-dark is-medium" title="Launch the Application" href="didact://?commandId=extension.sendToTerminal&text=HEREGeocodingandSearch%7Claunch-application%7CHEREGeocodingandSearch|cd%20${CHE_PROJECTS_ROOT}/here-geocoding/HEREGeocodingandSearch%20%26%26%20node%20token.js%20%26%26%20node%20server.js">Launch the Application</a> 
         </div>
      </div>
   </div>
   <div class="footer">
      <div class="content" style="padding:30px;padding-left:60px;padding-bottom: 0px;">
         <p>If you'd like to make changes and explore the application, make sure to stop it first!</p>
         <a class="button is-dark is-medium" title="Stop Application" href="didact://?commandId=vscode.didact.sendNamedTerminalCtrlC&text=HEREGeocodingandSearch">Stop Application</a>
         <p class="afterbutton">The stage is yours!</p>
         <a class="button is-dark is-medium" title="Explore the Code" href="didact://?commandId=extension.openFile&text=HEREGeocodingandSearch%7Cexplore-code%7C${CHE_PROJECTS_ROOT}/here-geocoding/HEREGeocodingandSearch/src/App.js">Explore the Code</a>
         <p class="afterbutton ">To view the changes you've made, re-launch the application</p>
         <a class="button is-dark is-medium" title="Re-Launch the Application" href="didact://?commandId=extension.sendToTerminal&text=HEREGeocodingandSearch%7Crelaunch-application%7CHEREGeocodingandSearch|cd%20${CHE_PROJECTS_ROOT}/here-geocoding/HEREGeocodingandSearch%20%26%26%20npm%20install%20%26%26%20export%20REACT_APP_mode=dev%20%26%26%20npm%20start">Re-Launch the Application</a> 
      </div>
      <div class="image-div">
         <p class="image-content">Want to explore this project more? <span style="font-size:15px;margin-top:0px;display:block;">Head over to the <a href="https://github.com/IBM/Developer-Playground/tree/HERE/HEREGeocodingandSearch">Github Repository</a></span> </p>
         <div class="image-btn">
            <a class="image-link" href="didact://?commandId=extension.openURL&text=HEREGeocodingandSearch%7Cview-product-details%7Chttps://developer.here.com/documentation/geocoding-search-api/dev_guide/index.html" target="_blank">
               View Product Details 
               <span>
                  <svg style="position: absolute; right: 10px;" fill="#ffffff" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/  svg" width="25" height="25" viewBox="0 0 32 32" aria-hidden="true">
                     <path d="M18 6L16.6 7.4 24.1 15 3 15 3 17 24.1 17 16.6 24.6 18 26 28 16z"></path>
                     <title>Arrow right</title>
                  </svg>
               </span>
            </a>
            <a class="image-link" href="didact://?commandId=extension.openURL&text=HEREGeocodingandSearch%7Cbuy-this-product%7Chttps://developer.here.com/pricing" target="_blank">
               Buy this API 
               <span>
                  <svg style="position: absolute; right: 10px;" fill="#ffffff" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/  svg" width="25" height="25" viewBox="0 0 32 32" aria-hidden="true">
                     <path d="M18 6L16.6 7.4 24.1 15 3 15 3 17 24.1 17 16.6 24.6 18 26 28 16z"></path>
                     <title>Arrow right</title>
                  </svg>
               </span>
            </a>
            <a class="image-link" href="didact://?commandId=extension.openURL&text=HEREGeocodingandSearch%7Cget-trial-subscription%7Chttps://developer.here.com/sign-up?create=Freemium-Basic&keepState=true&step=account" target="_blank">
               Get Trial Subscription 
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
   <br>
   <br>
</body>
</html>
