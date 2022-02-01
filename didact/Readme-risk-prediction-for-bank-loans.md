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
    border-radius: 0px;
    min-width: 180px;
    font-size: 16px;
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
    margin-left: 30px;
    margin-right: 30px;
  }
  .github-icon {
    min-height: 100%;
    min-width: 100%;
    object-fit: cover;
    object-position: 2500% 1000px;
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
    background-position: -100px 120px;
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
    color: white;
    padding-left: 25px;
    padding-right: 25px;
  }
  .header .right-content div
  {
    background: none;
    color: #C1C7CD;
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
  summary{
    float:left;
  }
  details > summary { 
    list-style-image: url("https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/arrow-right.svg");
    direction:rtl;
  }
  details[open] > summary {
      list-style-image: url("https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/arrow-down.svg");
  }
  .step{
      margin-bottom: 50px;
  }
  details{
      margin-bottom: 20px;
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
    <div class="header">
      <div class="right-content" style="padding-top:35px;">
        <div class="apptitle" style="font-size: 28px; color: white; padding-top: 5px">
          Risk Prediction for Bank Loans application
        </div>
        <div class="subheading">
        An application using Python Flask to analyze risks involved when trying to approve loans.
        </div>
      </div>
    </div>
      <div class="section" style="font-size: 16px ; margin-top: -20px">
        A loan offers a huge sigh of financial relief to any individual. In a bank, when the loan department receives an application from a customer, <br>the respective agent considers several factors to arrive at a decision on whether to approve or reject the loan. <br>To help ease the decision-making process, this solution will help you build a web-based application using Python Flask to consider risk and help make decisions. <br>It will enables you to analyze the risk involved while trying to approve the loan.
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
    <p>IBM Cloud Account -  Do not have an IBM Cloud Account?<a href="https://cloud.ibm.com/registration/trial"> click here</a> to create one for free.</p>
    <p><a href="https://dataplatform.cloud.ibm.com/home2?context=cpdaas">Click Here</a> to login to your Cloud Pak for Data account or <a href="https://dataplatform.cloud.ibm.com/registration/stepone?context=cpdaas&apps=all">Click Here</a> to create one for free.</p>   
    </div>
   </div>
    <div class="section">
   <p style="font-size:24px">Instructions: Please follow all the below steps in proper sequence.</p>
   </div>
    <div class="timeline">
        <div style="margin-top:0px;padding-top:0px;"class="container right">
            <div class="content">
                <p>Launch the sandbox terminal to start building the application.</p>
                <a class="button is-dark is-medium" title="Open Terminal" href="didact://?commandId=terminal-for-sandbox-container:new">Open Terminal</a><br>
            </div>
        </div>
   <div class="container right">
         <div class="content">
            <p>Clone the application source code.</p>
          <a class="button is-dark is-medium" title="Clone the Repo" href="didact://?commandId=extension.sendToTerminal&text=BankLoanApp%7Cget-code%7Csandbox%20terminal|git%20clone%20-b%20bank-loan%20https://github.com/IBM/Developer-Playground.git%20${CHE_PROJECTS_ROOT}/bank-loan/%20%26%26%20cd%20${CHE_PROJECTS_ROOT}/bank-loan/">Get Code</a>
         </div>
      </div>
     <div class="container right">
        <div class="content">
          <p>Install dependencies.</p>
          <a class="button is-dark is-medium" title="Install Requirements" href="didact://?commandId=extension.sendToTerminal&text=BankLoanApp%7Cinstall-requirements%7Csandbox%20terminal|cd%20bank-loan;pip3.8%20install%20-r%20requirements.txt">Install Dependencies</a>
        </div>
     </div>
      <div class="container right">
        <div class="content">
          <p>Create IBM Services</p>
          <p>Login to your IBM Cloud account to create services.</p>
          <a class="button is-dark is-medium" title="Login to IBM Cloud" href="didact://?commandId=extension.sendToTerminal&text=BankLoanApp%7Cibm-login%7Csandbox%20terminal|cd%20${CHE_PROJECTS_ROOT}/bank-loan%20%26%26%20chmod%20%2Bx%20.%2Flogin.sh%20%26%26%20.%2Flogin.sh">Login to IBM Cloud</a>  
        </div>
      </div>
      <div class="container right">
        <div class="content">
          <p>Create these services with just the click of a button.</p>
          <a class="button is-dark is-medium" title="Create IBM Services" href="didact://?commandId=extension.sendToTerminal&text=BankLoanApp%7Ccreate-ibm-services%7Csandbox%20terminal|chmod%20%2Bx%20.%2Fcreate-ibm-cloud-services.sh%20%26%26%20.%2Fcreate-ibm-cloud-services.sh">Create IBM Services</a>
        </div>
      </div>
      <div class="container right">
        <div class="content">
            <p>IBM Cloud API key is required to deploy the model in the deployment space.</p>
            <p>Generate API key which will be saved in a key_file.</p>
            <a class="button is-dark is-medium" title="Generate API key" href="didact://?commandId=extension.sendToTerminal&text=BankLoanApp%7Cgenerate-api-token%7Csandbox%20terminal|cd%20${CHE_PROJECTS_ROOT}/bank-loan;ibmcloud%20iam%20api-key-create%20ApiKey-bankLoan%20-d%20'this is API key for bankLoan'%20--file%20${CHE_PROJECTS_ROOT}/bank-loan/key_file">Generate API key</a>
        </div>
      </div>
      <div class="container right">
        <div class="content">
            <p>Create a new deployment space with the pre-loaded model.</p>
            <a class="button is-dark is-medium" href="didact://?commandId=extension.sendToTerminal&text=BankLoanApp%7Ccreate-deployment-space%7Csandbox%20terminal|cd%20${CHE_PROJECTS_ROOT}/bank-loan%20%26%26%20python3.8%20create_space.py">Create Deployment Space</a>
        </div>
       </div>
      <div class="container right">
        <div class="content">
       <details>
         <summary>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Incase <b>Importing the Model Fails</b>, follow the steps below</summary></br></br>
          <div class="step">
           <p>Step 1 : Download the project zip file.</p>
          <a class="button is-dark is-medium" href="https://github.com/IBM/Developer-Playground/raw/bank-loan/bankLoan.zip">Download</a>
           </div>
           <div class="step">
           <p>Step 2 : Login to your <a href="https://dataplatform.cloud.ibm.com/">CloudPak for Data</a> account with the <b>Region</b> given in your Sandbox terminal. Click on <b>Create a Project</b>.</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_error_1.png" width = "750" height= "750">
           </div>
           <div class="step">
           <p>Step 3 : Click on <b>Create a project from sample or file</b>.</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_error_2.png" width = "750" height= "750">
           </div>
           <div class="step">
           <p>Step 4 : <b>Upload</b> the zip file that was downloaded in Step 1. Enter the name of the project and click on <b>Create</b> button.</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_error_3.png" width = "750" height= "750">
           </div>
           <div class="step">
           <p>Step 5 : After the project is created, click on <b>View new project</b>.</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_error_4.png" width = "750" height= "750">
           </div>
           <div class="step">
           <p>Step 6 : Click on the <b>Assets</b> tab.</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_error_5.png" width = "750" height= "750">
           </div>
           <div class="step">
           <p>Step 7 : Click on the <b>(⋮)</b> icon corresponding to the <b>Model</b> and Click on <b>Promote</b>.</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_error_6.png" width = "750" height= "750">
           </div>
           <div class="step">
           <p>Step 8 : <b>Target Space</b> will be the deployment space which was created earlier. To get the deployment space name check your Sandbox terminal.</p>
           <p>Once done click on <b>Promote</b>.</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_error_7.png" width = "750" height= "750">
           </div>
           </details>
        </div>
       </div>
      <div class="container right">
        <div class="content">
          <p>Click on the below button to deploy the model to the deployment space.</p>
           <a class="button is-dark is-medium" title="Open File" href="didact://?commandId=extension.sendToTerminal&text=BankLoanApp%7Cdeploy-model%7Csandbox%20terminal|python3.8%20DeployModel/DeploySavedModel.py">Deploy Model</a>
        </div>
      </div>  
      <div class="container right">
         <div class="content">
          <p>Launch the Application</p>
          <a class="button is-dark is-medium" title="Launch Application" href="didact://?commandId=extension.sendToTerminal&text=BankLoanApp%7Cstart-app%7Csandbox%20terminal|python3.8%20app.py">Launch Application</a>
         </div>
      </div>
   </div>
   <div class="footer" style="margin-left:30px;">      
      <div class="content" style="padding:30px;padding-left:60px;padding-bottom: 0px;">
        <p>If you'd like to make changes and explore the application, make sure to stop it first!</p>
        <a class="button is-dark is-medium" title="Stop Application" href="didact://?commandId=vscode.didact.sendNamedTerminalCtrlC&text=sandbox%20terminal">Stop Application</a>
        <p class="afterbutton">The stage is yours!</p>
        <a class="button is-dark is-medium" title="Explore the Code" href="didact://?commandId=extension.openFile&text=BankLoanApp%7Copen-file%7C${CHE_PROJECTS_ROOT}/bank-loan/templates/input.html">Explore the Code</a>
        <p class="afterbutton ">To view the changes you've made, re-launch the application</p>
        <a class="button is-dark is-medium" title="Re-Launch Application" href="didact://?commandId=extension.sendToTerminal&text=BankLoanApp%7Crestart-app%7Csandbox%20terminal|python3.8%20app.py">Re-Launch Application</a>
        <p style="margin-top:10px;"> Click on
          <bold>Clean up</bold> to delete the IBM Cloud services that were created.
        </p>
        <a class="button is-dark is-medium" title="Delete services from IBM Cloud" href="didact://?commandId=extension.sendToTerminal&text=BankLoanApp%7Cclean-up%7Csandbox%20terminal|chmod%20%2Bx%20.%2Fdeleteservice.sh%20%26%26%20.%2Fdeleteservice.sh">Clean up</a>
        <p style="margin-top:10px;">You can also manage the services in
          <a href="https://cloud.ibm.com/resources">IBM Cloud Dashboard</a>.
        </p> 
      </div>
      <div class="image-div">
        <p class="image-content">Want to explore this project more?
          <span style="font-size:15px;margin-top:0px;display:block;">Head over to the
            <a href="https://github.com/IBM/Developer-Playground/tree/bank-loan">Github Repository</a>
          </span>
          <span style="font-size:15px;margin-top:0px;display:block;">For further assistance reach out to <a href="https://github.com/IBM/Technology-Sandbox-Support/issues/new/choose" target="_blank"> Help & Support</a></span>
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
