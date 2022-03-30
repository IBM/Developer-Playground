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
    background-image: url('https://s3.us.cloud-object-storage.appdomain.cloud/developer/default/patterns/create-a-web-based-intelligent-bank-loan-application-for-a-loan-agent/header.jpg');
    background-position: right;
    width: 100%;
    height: fixed;
    min-height: 320px;
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
    float: right;
    width: 45%;
    background-color:#525252;
    min-height: 320px;
    padding: 20px;
    padding-top: 2.5%;
    font-size: 16px;
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
    color: #c1c7cd;
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
  .no-hover:hover
  {
    color: #A6C8FF;
  }
  .section{
    margin-top: 5px;
    margin-bottom:-50px;
  }
  a:hover{
      color: #A6C8FF;
      text-decoration: underline;
  }
  a:visited{
      color: #BE95FF;
  }

}
</style>
</head>
  <body>
    <div class="apptitle">
      Intelligent Bank Loan application
    </div>
  <div class="subheading">
    Build a web application using Python Flask to analyze risks involved when trying to approve loans.
  </div>
    <div class="header">
      <div class="right-content" style="float: left; padding-top:40px;">
        <div>
            In a typical bank loan department, the loan agent receives an application from a customer. The agent then considers several factors to decide whether the loan can be approved or should be rejected. </br></br>To help ease this decision-making process, this solution explains how to build a web-based application using Python Flask, that the loan agent can use to make these decisions. This will enable the loan agent to analyze the risk involved while trying to approve the loan.
        </div>
      </div>
    </div>
   <div class="section">
    <p style="font-size:24px">Learning Resources</p>
    <div class="right-content">
      <a href="https://developer.ibm.com/learningpaths/learning-path-machine-learning-for-developers/">Get Started with Machine Learning</a></br>
    </div>
   </div>
   <div class="section">
      <p style="font-size:24px">Included Components</p>
        <div class="right-content">
          <p>This sample application uses the following IBM Services:</p>
          <p><a href="https://cloud.ibm.com/objectstorage">Cloud Object Storage</a>: IBM Cloud Object Storage is a highly scalable cloud storage service, designed for high durability, resiliency and security.</p>
          <p><a href="https://cloud.ibm.com/catalog/services/machine-learning">Watson Machine Learning</a>: Deploy, manage and integrate machine learning models into your applications and services in as little as one click.</p>
        </div>
   </div>
   <div class="section">
   <p style="font-size:24px">Pre-requisites</p>
    <div class="right-content">
    <p>IBM Cloud Account -  Do not have an IBM Cloud Account?<a href="https://cloud.ibm.com/registration"> click here</a> to create one for free.</p>
    </div>
   </div>
    <div class="section">
   <p style="font-size:24px">Instructions: Please follow all the below steps in proper sequence.</p>
   </div>
    <div class="timeline">
        <div style="margin-top:0px;padding-top:0px;" class="container right">
            <div class="content">
                <p>Begin with opening the custom terminal</p>
                <a class="button is-dark is-medium" title="Open Terminal" href="didact://?commandId=terminal-for-nodejs-container:new">Open Terminal</a><br>
            </div>
        </div>
      <div class="container right">
        <div class="content">
          <p>Clone the GitHub repository</p>
          <a class="button is-dark is-medium" title="Clone the Repo" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Cget-code%7Cnodejs%20terminal|git%20clone%20-b%20bank-loan%20https://github.com/IBM/Developer-Playground.git%20${CHE_PROJECTS_ROOT}/bank-loan/%20%26%26%20cd%20${CHE_PROJECTS_ROOT}/bank-loan/">Get Code</a>
        </div>
      </div>
      <div class="container right">
        <div class="content">
          <p>Create IBM Services</p>
          <p>Login to your IBM Cloud account to create services.</p>
          <a class="button is-dark is-medium" title="Login to IBM Cloud" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Cibm-login%7Cnodejs%20terminal|cd%20${CHE_PROJECTS_ROOT}/bank-loan%20%26%26%20chmod%20%2Bx%20.%2Flogin.sh%20%26%26%20.%2Flogin.sh">Login to IBM Cloud</a>        
        </div>
      </div>
      <div class="container right">
        <div class="content">
          <p>Create these services with just a click of button.</p>
          <a class="button is-dark is-medium" title="Create IBM Services" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Ccreate-ibm-services%7Cnodejs%20terminal|chmod%20%2Bx%20.%2Fcreate-ibm-cloud-services.sh%20%26%26%20.%2Fcreate-ibm-cloud-services.sh">Create IBM Services</a>
        </div>
      </div>
      <div class="container right">
        <div class="content">
            <p>IBM Cloud API key is required to deploy the model in the deployment space.</p>
            <p>Click the below button to generate API key via IBM Cloud CLI commands which will be saved in a key_file.</p>
            <a class="button is-dark is-medium" title="Generate API key" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Cgenerate-api-token%7Cnodejs%20terminal|cd%20${CHE_PROJECTS_ROOT}/bank-loan;ibmcloud%20iam%20api-key-create%20ApiKey-bankLoan%20-d%20'this is API key for bankLoan'%20--file%20${CHE_PROJECTS_ROOT}/bank-loan/key_file">Generate API key</a>
        </div>
      </div>
      <div class="container right">
        <div class="content">
          <p>Install requirements</p>
          <a class="button is-dark is-medium" title="Install Requirements" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Cinstall-requirements%7Cnodejs%20terminal|cd%20bank-loan;pip3.8%20install%20-r%20requirements.txt">Install Requirements</a>
        </div>
      </div>
      <div class="container right">
        <div class="content">
          <p>Create a Deployment Space on Cloud pak for Data</p>
          <a class="button is-dark is-medium" title="Create Deployment Space" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Ccreate-deployment-space%7Cnodejs%20terminal|cd%20bank-loan;python3.8%20create_space.py">Create Deployment Space</a>
        </div>
      </div>
      <div class="container right">
        <div class="content">
          <p>Click on the below button to deploy the model to the deployment space.</p>
           <a class="button is-dark is-medium" title="Open File" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Cdeploy-model%7Cnodejs%20terminal|python3.8%20DeployModel/DeploySavedModel.py">Deploy Model</a>
        </div>
      </div>
      <div class="container right">
        <div class="content">
          <p>Launch Application</p>
          <a class="button is-dark is-medium" title="Launch Application" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Cstart-app%7Cnodejs%20terminal|python3.8%20app.py">Launch Application</a>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="content" style="padding:30px;padding-left:60px;padding-bottom: 0px;">
        <p>If you'd like to make changes and explore the application, make sure to stop it first!</p>
        <a class="button is-dark is-medium" title="Stop Application" href="didact://?commandId=vscode.didact.sendNamedTerminalCtrlC&text=nodejs%20terminal">Stop Application</a>
        <p class="afterbutton">The stage is yours!</p>
        <a class="button is-dark is-medium" title="Explore the Code" href="didact://?commandId=extension.openFile&text=nodejs%20terminal%7Copen-file%7C${CHE_PROJECTS_ROOT}/bank-loan/templates/input.html">Explore the Code</a>
        <p class="afterbutton ">To view the changes you've made, re-launch the application</p>
        <a class="button is-dark is-medium" title="Re-Launch Application" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Crestart-app%7Cnodejs%20terminal|python3.8%20app.py">Re-Launch Application</a>
        <p style="margin-top:10px;"> Click on
          <bold>Clean up</bold> to delete the IBM Cloud services that were created.
        </p>
        <a class="button is-dark is-medium" title="Delete services from IBM Cloud" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Cget-code%7Cnodejs%20terminal|chmod%20%2Bx%20.%2Fdeleteservice.sh%20%26%26%20.%2Fdeleteservice.sh">Clean up</a>
        <p style="margin-top:10px;">You can also manage the services in
          <a href="https://cloud.ibm.com/resources">IBM Cloud Dashboard</a>.
        </p>
         <p style="margin-top:10px;">Click to push code to your own Github repository. You will need a personal access token to complete this action via the CLI. Refer to this <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token">guide</a> for generating your personal access token.</p>
            <a class="button is-dark is-medium" title="Delete services from IBM Cloud" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=sandbox%20terminal$$sh%20/github.sh ">Push code to your Github repository</a>
      </div>
      <div class="image-div">
        <p class="image-content">Want to explore this project more?
          <span style="font-size:15px;margin-top:0px;display:block;">Head over to the
            <a href="https://github.com/IBM/Developer-Playground/tree/bank-loan">Github Repository</a>
          </span>
        </p>
        <a class="image-link" href="https://developer.ibm.com/patterns/create-a-web-based-intelligent-bank-loan-application-for-a-loan-agent/" target="_blank">
          <div class="image-btn">
            <p class="image-link">View Product Details
            <p style="padding-top: 14px"></p>
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
