<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  html,
  div,
  body {
    background-color: #1a1a1a;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 16px;
    outline: none;
  }
  body {
    font-family: Helvetica, sans-serif;
  }
  a:hover{
      color: #A6C8FF;
      text-decoration: underline;
  }
  a:visited{
      color: #BE95FF;
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
    bottom: 90px;
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
  input {
    position: absolute;
    display: none;
    color: #fff !important;
  }
  .step2,.step3,.step4{
    cursor:not-allowed;
  }
  #icon{
    display:none;
  }
  .step2 a,.step3 a,.step4 a{
    opacity:0.5;
    pointer-events:none;
  }
  input:checked ~  a.button.is-dark.is-medium{
    background-color: #2a67f5;
  }
  input:checked ~ a span #icon{
    display:block;
  }
  .step1 input:checked ~ .step2 a#step2{
    opacity:1;
    pointer-events:auto;
  }
  .step1 input:checked ~ .step2 a#step2{
    opacity:1;
    pointer-events:auto;
  }
  .step1 input:checked ~ .step2{
    cursor:auto;
  }
  .step2 input:checked ~ .step3 a#step3{
    opacity:1;
    pointer-events:auto;
  }
  .step2 input:checked ~ .step3{
    cursor:auto;
  }
  .step3 input:checked ~ .step4 a#step4{
   opacity:1;
   pointer-events:auto;
  }
  .step3 input:checked ~ .step4{
    cursor:auto;
  }
  .footer {
    display: flex;
    background-color: #343A3E;
    margin-top: 20px;
    padding: 0px;
    max-width: 1200px;
    margin-left: 30px;
    margin-right: 30px;
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
    background-image: url('https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/anomaly.jpeg');
    background-position: right;
    width: 95%;
    min-height: 70px;
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 30px;
    margin-right: 30px;
    max-width: 1200px;
    background-repeat: no-repeat;
    background-size: 700px 500px;
  }
  .header .right-content
  {
    float: left;
    width: 50%;
    background-color: #525252;
    min-height: 270px;
    font-size: 16px;
  }
  .header .right-content h4
  {
    background: none;
    color:  #C1C7CD;
    padding-left: 25px;
    padding-right: 25px;
  }
  .header .right-content div
  {
    background: none;
    color:  #C1C7CD;
    padding-left: 15px;
    padding-right: 25px;
    font-size: 16px;
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
     color: #BE95FF;
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
  .no-hover:hover
  {
    background-color: #A6C8FF !important;
  }
  .section{
    margin-top: 5px;
    margin-bottom:-50px;
  }
</style>
</head>
<body>
  <div class="header">
      <div class="right-content" style="padding-top:35px;">
        <div class="apptitle" style="font-size: 28px; color: white;"> 
    Anomaly Detection 
  </div>
  <div class="subheading">
    Perform anomaly detection on a time-series dataset.
  </div>
     </div>
   </div>
    <div class="section" style="font-size:16px; margin-top:-20px">
  <p>Industrial applications need to be able to detect anomalies from unlabelled time series data which can be a painful process.  Machine learning tools use anomaly detection to identify data points, events, and observations that deviate from a dataset’s normal behavior.</p>
  <p>This anomaly detection API service can help users detect anomalies from the entire time series or predict anomaly status of the last data input. Currently the service supports both univariate and multivariate time series.This application allows you to experiment with the Anomaly Detection API on both univariate and multivariate time series datasets. The Anomaly Detection API packages state-of-the-art techniques for doing anomaly detection for a time-series dataset along with a unified framework to access these techniques.</p>
  </div>
   <div class="section">
    <p style="font-size:24px">Learning Resources</p>
    <div class="content-">
      <a href="https://developer.ibm.com/learningpaths/get-started-anomaly-detection-api/">Get Started with Anomaly Detection API</a></br>
    </div>
   </div>
   <div class="section">
      <p style="font-size:24px">Included APIs</p>
      <div class="content-">
          <p><a href="https://developer.ibm.com/apis/catalog/ai4industry--anomaly-detection-product/Introduction">Anomaly Detection API</a></p>
      </div>
   </div>
   <div class="section">
   <p style="font-size:24px">Pre-requisites</p>
    <div class="content-">
    <ol>
    <li><p>IBM Account - <a href="https://ibm.com/registration?cm_sp=ibmdev--developer-sandbox--cloudreg">Create</a> one for free.</p></li>
    <li>Obtain API credentials </li>
    <ul>
    <li><a href="https://www.ibm.com/account/reg/us-en/signup?formid=urx-51009">Subscribe</a> to the Anomaly Detection API.</li>
    <li>Check out <a href="https://developer.ibm.com/profile/myapis"> API Subscriptions</a>.</li>
    <li>Select subscription for Anomaly Detection API to proceed.</li>
    <li>Get the Client ID/Secret, if not, Generate an API Key.</li>
    </ul>
    </ol>
    </div>
   </div>
    <div class="section">
   <p style="font-size:24px">Instructions</p>
   <p style="margin-bottom:10px;">Please follow all the below steps in proper sequence.</p>
   </div>
   <div class="timeline">
      <div class="container right content step1" style="margin-top:0px;padding-top:0px;">
            <p>Clone the GitHub repository.</p>
            <input type="checkbox"><a id="step1" class="button is-dark is-medium" title="Get the Code" href="didact://?commandId=extension.sendToTerminal&text=AnomalyDetection%7Cclone%7Canomaly|git%20clone%20-b%20anomaly%20https://github.com/IBM/Developer-Playground.git%20${CHE_PROJECTS_ROOT}/anomaly" target="_blank"><span>Get Code <svg style="float:right;position:absolute;right:3px;bottom:30%;" fill="white" id="icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
                                                <defs>
                                                  <style>
                                                    .cls-1 {
                                                      fill: none;
                                                    }
                                                  </style>
                                                </defs>
                                                <polygon points="14 21.414 9 16.413 10.413 15 14 18.586 21.585 11 23 12.415 14 21.414"/>
                                                <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"/>
                                                <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/>
                                              </svg>
                            </span></a>
        <div class="container right content step2" style="margin-left:-10px;">
                <p>Install required dependencies for executing application.</p>
                <input type="checkbox"><a id="step2" class="button is-dark is-medium" title="Build the Application" href="didact://?commandId=extension.sendToTerminal&text=AnomalyDetection%7Cbuild%7Canomaly|cd%20${CHE_PROJECTS_ROOT}/anomaly%20%26%26%20npm%20install%20--production" target="_blank"><span>Install Dependencies <svg style="float:right;position:absolute;right:3px;bottom:30%;" fill="white" id="icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
                                                <defs>
                                                  <style>
                                                    .cls-1 {
                                                      fill: none;
                                                    }
                                                  </style>
                                                </defs>
                                                <polygon points="14 21.414 9 16.413 10.413 15 14 18.586 21.585 11 23 12.415 14 21.414"/>
                                                <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"/>
                                                <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/>
                                              </svg></span></a>
            <div class="container right content step3" style="margin-left:-10px;">
                    <p>Configure the application. See prerequisites.</p>
                    <input type="checkbox"><a id="step3" class="button is-dark is-medium" title="Open the File" href="didact://?commandId=extension.openFile&text=AnomalyDetection%7Cconfigure-application%7C${CHE_PROJECTS_ROOT}/anomaly/.env" target="_blank"><span>Configure Application <svg style="float:right;position:absolute;right:3px;bottom:30%;"fill="white" id="icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
                                                <defs>
                                                  <style>
                                                    .cls-1 {
                                                      fill: none;
                                                    }
                                                  </style>
                                                </defs>
                                                <polygon points="14 21.414 9 16.413 10.413 15 14 18.586 21.585 11 23 12.415 14 21.414"/>
                                                <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"/>
                                                <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/>
                                              </svg></span></a>
                <div class="container right content step4" style="margin-left:-10px;">
                        <p style="width:200%">Launch the application in the preview window.</p>
                        <input type="checkbox"><a id="step4" class="button is-dark is-medium" title="Launch the Application" href="didact://?commandId=extension.sendToTerminal&text=AnomalyDetection%7Claunch%7Canomaly|cd%20${CHE_PROJECTS_ROOT}/anomaly/%20%26%26%20npm%20run%20server" target="_blank"><span>Launch Application <svg style="float:right;position:absolute;right:3px;bottom:30%;" fill="white" id="icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
                                                <defs>
                                                  <style>
                                                    .cls-1 {
                                                      fill: none;
                                                    }
                                                  </style>
                                                </defs>
                                                <polygon points="14 21.414 9 16.413 10.413 15 14 18.586 21.585 11 23 12.415 14 21.414"/>
                                                <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"/>
                                                <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/>
                                              </svg></span></a>
                </div>
            </div>
        </div>
      </div>
   </div>
   <div class="footer" style="margin-left:30px;">
      <div class="content" style="padding:30px;padding-left:60px;margin-right:95px;padding-bottom:0px;">
         <p>To edit or explore the application, make sure to stop it first.</p>
         <a class="button is-dark is-medium" title="Stop Application" href="didact://?commandId=vscode.didact.sendNamedTerminalCtrlC&text=anomaly">Stop Application</a>
         <p class="afterbutton">Explore and update the code as per your requirement.</p>
         <a class="button is-dark is-medium" title="Explore the Code" href="didact://?commandId=extension.openFile&text=AnomalyDetection%7Cexplore-code%7C${CHE_PROJECTS_ROOT}/anomaly/src/App.js">Explore Code</a>
         <p class="afterbutton ">Re-launch the application to view the changes made.</p>
         <a class="button is-dark is-medium" title="Re-Launch the Application" href="didact://?commandId=extension.sendToTerminal&text=AnomalyDetection%7Cre-launch%7Canomaly|cd%20${CHE_PROJECTS_ROOT}/anomaly%20%26%26%20npm%20install%20--only=dev%20%26%26%20rm%20-rf%20build%20%26%26%20npm%20run%20build%20%26%26%20npm%20run%20server">Re-Launch Application</a>
      </div>
      <div class="image-div">
         <p class="image-content">Want to explore this project more?
            <span style="font-size:15px;margin-top:0px;display:block;">Head over to the <a href="https://github.com/IBM/Developer-Playground/tree/anomaly" target="_blank">Github Repository</a></span>
            <span style="font-size:15px;margin-top:0px;display:block;">For further assistance reach out to <a href="https://github.com/IBM/Technology-Sandbox-Support/issues/new/choose" target="_blank"> Help & Support</a></span>
            <span style="font-size:15px;margin-top:0px;display:block;">Check out our <a href="https://ibm.github.io/Technology-Sandbox-Support/" target="_blank">FAQs</a></span>
         </p>
         <div class="image-btn">
            <a class="image-link" href="didact://?commandId=extension.openURL&text=anomaly%7Cview-product-details%7Chttps://www.ibm.com/products
               " target="_blank">
               View Product Details 
               <span>
                  <svg style="position: absolute; right: 10px;" fill="#ffffff" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/  svg" width="25" height="25" viewBox="0 0 32 32" aria-hidden="true">
                     <path d="M18 6L16.6 7.4 24.1 15 3 15 3 17 24.1 17 16.6 24.6 18 26 28 16z"></path>
                     <title>Arrow right</title>
                  </svg>
               </span>
            </a>
            <a class="image-link" href="didact://?commandId=extension.openURL&text=anomaly%7Cget-trial-subscription%7Chttps://www.ibm.com/account/reg/us-en/signup?formid=urx-51009" target="_blank">
               Get Trial Subcription 
               <span>
                  <svg style="position: absolute; right: 10px;" fill="#ffffff" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/  svg" width="25" height="25" viewBox="0 0 32 32" aria-hidden="true">
                     <path d="M18 6L16.6 7.4 24.1 15 3 15 3 17 24.1 17 16.6 24.6 18 26 28 16z"></path>
                     <title>Arrow right</title>
                  </svg>
               </span>
            </a>
            <a class="image-link no-hover"></a>
         </div>
      </div>
   </div>
   <br><br>
</body>
</html>