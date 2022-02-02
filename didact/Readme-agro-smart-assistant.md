<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  html,
  div,
  body {
    background-color: #1a1a1a;
    font-family: "IBM Plex Sans", sans-serif;
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
    content: "";
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
    content: "";
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
    font-family: "IBM Plex Sans", sans-serif;
    background: transparent;
    border-color: white;
    color: #fff;
    border: 1px solid white;
    border-radius: 0px;
    min-width: 180px;
    font-size: 14px;
    text-align: left;
    min-height: 48px;
    margin: 0px;
    justify-content:left;
  }
  .button.is-dark.is-medium:hover {
    font-family: "IBM Plex Sans", sans-serif;
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
    background-image: url("https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/agro-chatbot.jpeg");
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
    color: #C1C7CD;
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
    color: #BE95FF;
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
      <div class="right-content" style="padding-top:40px;">
      <div class="apptitle" style="font-size: 28px; color: white;"> 
    Agro Smart Assistant
  </div>
  <div class="subheading">
    Use machine learning in a virtual assistant to get crop recommendations
  </div>
     </div>
   </div>
   <div class="section" style="font-size:16px; margin-top:-20px">
  <p>
          Precision agriculture is a technology-enabled approach to farming management that helps farmers make well-informed decisions about where and when to plant crops. This practice uses research data related to soil characteristics, soil types, and crop-yield data to help farmers determine the right crop to plant based on the location, weather, and soil-specific parameters
        </p>
        <p>
         Often, machine learning models are used to garner recommendations for what crop choice would increase productivity
        </p>
        <p>
         This application uses a chatbot to gather the soil characteristics and a machine learning model to provide the best crop recommendation
        </p>
   </div>
   <div class="section">
    <p style="font-size:24px">Execution Flow</p>
        <ol>
        <li>Create a deployment space using Watson Machine Learning in IBM Cloud Pak for Data platform and deploy a pre-trained machine learning model</li>
        <li>Create a Cloud Function to get output from the model using the model URL</li>
        <li>Create a chatbot in Watson Assistant</li>
        <li>Integrate the chatbot with the Cloud Function</li>
        <li>Prompt the user for soil characteristics via the chatbot and return crop recommendations</li>
        </ol>
    </div>
   <div class="section">
    <p style="font-size:24px">Learning Resources</p>
    <div class="content-">
      <a href="https://developer.ibm.com/articles/what-is-machine-learning/">Build robust machine learning-based solutions</a></br>
      <a href="https://developer.ibm.com/learningpaths/get-started-watson-assistant/">Get Started with Watson Assistant</a></br>
    </div>
   </div>
   <div class="section">
      <p style="font-size:24px">Included Components</p>
      <div class="content-">
          <p>This  application uses the following <a href=" https://www.ibm.com/products/cloud-pak-for-data">IBM Cloud Pak for Data services</a>:</p>
          <p><a href="https://cloud.ibm.com/objectstorage">Cloud Object Storage</a>: IBM Cloud Object Storage is a highly scalable cloud storage service, designed for high durability, resiliency and security</p>
          <p><a href="https://cloud.ibm.com/catalog/services/watson-assistant">Watson Assistant</a>: Watson Assistant lets you build conversational interfaces into any application, device, or channel</p>
          <p><a href="https://cloud.ibm.com/catalog/services/watson-studio">Watson Studio</a>: Develop sophisticated machine learning models using Notebooks and code-free tools to infuse AI throughout your business</p>
          <p><a href="https://cloud.ibm.com/catalog/services/machine-learning">Watson Machine Learning</a>: Deploy, manage and integrate machine learning models into your applications and services in as little as one click</p>
      </div>
   </div>
   <div class="section">
   <p style="font-size:24px">Pre-requisites</p>
    <div class="right-content">
   <p>IBM Cloud Account - <a href="https://cloud.ibm.com/registration/trial?cm_sp=ibmdev--developer-sandbox--cloudreg"> Create</a>  one for free</p>
      <p>IBM Cloud Pak for Data Account - <a href="https://dataplatform.cloud.ibm.com/home2?context=cpdaas?cm_sp=ibmdev--developer-sandbox--cloudreg">Login </a> or<a href="https://dataplatform.cloud.ibm.com/registration/stepone?context=cpdaas&apps=all?cm_sp=ibmdev--developer-sandbox--cloudreg"> Create</a> one for free</p>
    </div>
   </div>
    <div class="section">
   <p style="font-size:24px">Instructions</p>
   <p style="margin-bottom:10px;">Please follow all the below steps in proper sequence</p>
   </div>
   <div class="timeline">
   <div style="margin-top:0;"class="container right">
            <div class="content">
                <p>Open the sandbox terminal</p>
                <a class="button is-dark is-medium" title="Open Terminal" href="didact://?commandId=terminal-for-sandbox-container:new">Open Terminal</a><br>
            </div>
        </div>
      <div class="container right">
         <div class="content">
            <p>Clone the GitHub repository</p>
            <a class="button is-dark is-medium" title="Get the Code" href="didact://?commandId=extension.sendToTerminal&text=AgroSmartAssistant%7Cclone-repo%7Csandbox%20terminal|git%20clone%20-b%20agro-chatbot%20https://github.com/IBM/Developer-Playground.git%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant">Get Code</a>
         </div>
      </div>
      <div class="container right">
        <div class="content">
           <p>Install required dependencies for executing application
           </p>
           <a class="button is-dark is-medium" title="Build the Application" href="didact://?commandId=extension.sendToTerminal&text=AgroSmartAssistant%7Cbuild%7Csandbox%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20npm%20install%26%26pip3.8%20install%20-r%20requirements.txt">Install Dependenciess</a>
        </div>
     </div>
     <div class="container right">
        <div class="content">
           <p>Log in to your IBM Cloud account</p>
          <a class="button is-dark is-medium" title="Login to IBM Cloud" href="didact://?commandId=extension.sendToTerminal&text=AgroSmartAssistant%7Cibm-login%7Csandbox%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20chmod%20%2Bx%20.%2Fscripts%2Flogin.sh%20%26%26%20.%2Fscripts%2Flogin.sh">Login to IBM Cloud</a>
        </div>
     </div>
      <div class="container right">
        <div class="content">
          <p>Create services on IBM Cloud</p>
          <a class="button is-dark is-medium" title="Create IBM Watson Services" href="didact://?commandId=extension.sendToTerminal&text=AgroSmartAssistant%7Ccreate-services%7Csandbox%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20chmod%20%2Bx%20.%2Fscripts%2Fcreate-ibm-services.sh%20%26%26%20.%2Fscripts%2Fcreate-ibm-services.sh">Create Services</a>
          <p style="margin-top:50px">Follow the below steps to configure the asset</p>
        </div>
      </div>
      <div class="container right">
        <div class="content">
        <details>
         <summary>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Create a New Deployment Space and Deploy the Model</summary></br></br>
         <div class="step">
          <p>Step 1 : Generate an API Key in the IBM account</p>
          <a class="button is-dark is-medium" title="Generate API key" href="didact://?commandId=extension.sendToTerminal&text=sandbox%20terminal%7Cgenerate-api-token%7Csandbox%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant;ibmcloud%20iam%20api-key-create%20ApiKey-SVA%20-d%20'this is API key for Smart Virtual Assitant'%20--file%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant/key_file">Generate API key</a></br>
        </div>
          <div class="step">
            <p>Step 2 : Create a new deployment space with the pre-loaded model. Make sure your CP4D account is active in the region given in sandbox terminal.</p>
            <a class="button is-dark is-medium" href="didact://?commandId=extension.sendToTerminal&text=AgroSmartAssistant%7Cstart%7Csandbox%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20python3.8%20create_space.py">Create Deployment Space</a>
          <details style="margin-top:5px;">
         <summary>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Incase your model import failed, do the following steps</summary></br></br>
          <div class="step">
           <p>Step 1 : Download the project zip file</p>
          <a class="button is-dark is-medium" href="https://github.com/IBM/Developer-Playground/raw/agro-chatbot/crop-recommendation.zip">Download</a>
           </div>
           <div class="step">
           <p>Step 2 : Login to your <a href="https://dataplatform.cloud.ibm.com?cm_sp=ibmdev--developer-sandbox--cloudreg">Cloud Pak for Data</a> account with the region given in your sandbox terminal. Click on "Create a Project"</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_error_1.png" width = "750" height= "750">
           </div>
           <div class="step">
           <p>Step 3 : Click on "Create a project from sample or file"</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_error_2.png" width = "750" height= "750">
           </div>
           <div class="step">
           <p>Step 4: Upload the zip file that was just downloaded in Step 1 > Enter a project name > click "Create"</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_error_3.png" width = "750" height= "750">
           </div>
           <div class="step">
           <p>Step 5 : After the project is created, click on "View new project"</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_error_4.png" width = "750" height= "750">
           </div>
           <div class="step">
           <p>Step 6 : Click on the Assets tab</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_error_5.png" width = "750" height= "750">
           </div>
           <div class="step">
           <p>Step 7 : Click on the (⋮) on right hand side of the Model and Click on "Promote" button</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_error_6.png" width = "750" height= "750">
           </div><div class="step">
           <p>Step 8 : On the "Target Space" drop-down menu, select the deployment space you created (To get the deployment space name check your sandbox terminal), Once done click "Promote"</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_error_7.png" width = "750" height= "750">
           </div>
           </details>
           </div>
          <div class="step">
            <p>Step 3 : Deploy the model</p>
            <a class="button is-dark is-medium" href="didact://?commandId=extension.sendToTerminal&text=AgroSmartAssistant%7Cstart%7Csandbox%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20python3.8%20deploy_model.py">Deploy</a>
          </div>
          <div class="step">
            <p>Step 4 : Run the script to update the code file with Model URL</p>
            <a class="button is-dark is-medium" title="Update Model URL" href="didact://?commandId=extension.sendToTerminal&text=AgroSmartAssistant%7Ccreate-services%7Csandbox%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20chmod%20%2Bx%20.%2Fscripts%2Fadd_model_url.sh%20%26%26%20.%2Fscripts%2Fadd_model_url.sh">Update Model URL</a>
            </div>
        </details>
        </div>
      </div>
      <div class="container right">
        <div class="content">
          <details>
         <summary>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Configure Cloud Functions</summary></br></br>
          <div class="step">
           <p>Step 1 : Create an Action in cloud functions with web action enabled</p>
           <a class="button is-dark is-medium" title="Create Action" href="didact://?commandId=extension.sendToTerminal&text=AgroSmartAssistant%7Ccreate-action%7Csandbox%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20chmod%20%2Bx%20.%2Fscripts%2Fcreate_action.sh%20%26%26%20.%2Fscripts%2Fcreate_action.sh">Create Action</a>
           </div>
          <div class="step">
           <p>Step 2 : Run the script to add api_key parameter in the Action</p>
           <a class="button is-dark is-medium" title="Create Parameter" href="didact://?commandId=extension.sendToTerminal&text=AgroSmartAssistant%7Ccreate-services%7Csandbox%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20chmod%20%2Bx%20.%2Fscripts%2Fadd_parameter.sh%20%26%26%20.%2Fscripts%2Fadd_parameter.sh">Add Parameter</a>
           </div>
          <div class="step">
           <p>Step 3 : Run the script to update Dialog skill file with the webhook URL</p>
           <a class="button is-dark is-medium" title="Update" href="didact://?commandId=extension.sendToTerminal&text=AgroSmartAssistant%7Ccreate-services%7Csandbox%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20chmod%20%2Bx%20.%2Fscripts%2Fupdate_dialog.sh%20%26%26%20.%2Fscripts%2Fupdate_dialog.sh">Update Dialog Skill</a>
          </div>
          </details>
        </div>
      </div>
      <div class="container right">
        <div class="content">
          <details>
         <summary>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Integrate the Machine Learning Model with Watson Assistant</summary></br></br>
          <div class="step">
          <p>Step 1 : Navigate to your<a href="https://cloud.ibm.com">IBM Cloud Account</a>. On the left menu, select "Resource" tab > select "Services and software". Click your Watson Assistant service and then select "Launch Watson Assistant"</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_4.1_assistant.png" width = "750" height= "750">
          </div>
          <div class="step">
          <p>Step 2 : If the below screen is displayed, click on the profile icon and select "Switch to classic experience"</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_4.2_assistant.png" width = "750" height= "750">
          </div>
          <div class="step">
          <p>Step 2 : Click on "Create assistant"</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_4.3_assistant.png" width = "550" height= "550">
          </div>
          <div class="step">
          <p>Step 3 : Enter the name of the assistant and click "Create assistant"</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_4.4_assistant.png" width = "550" height= "550">
          </div>
          <div class="step">
          <p>Step 4 : Once the Assistant is created, click on "Add dialog skill"</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_4.5_assistant.png" width = "750" height= "750">
          </div>
          <div class="step">
          <p>Step 5 : Load the Dialog Skill</p>
          <a class="button is-dark is-medium" href="didact://?commandId=extension.openFile&text=AgroSmartAssistant%7Cload-skill%7C${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant/Dialog-Skill.json">Load Skill</a>
          </div>
          <div class="step">
          <p>Step 6 : Download the Dialog Skill</p>
          <a class="button is-dark is-medium" title="Launch the Application" href="didact://?commandId=file.download">Download</a>
          </div>
          <div class="step">
          <p>Step 7 : In the "Create dialog skill" window, select the "Dialog Skill" file and click "Upload"</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_4.6_assistant.png" width = "750" height= "750">
          </div>
          </details>
        </div>
      </div>
      <div class="container right">
        <div class="content">
          <details>
         <summary>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Configure the application</summary></br></br>
          <div class="step">
           <p>Step 1 : Once the skill is created, click on (⋮) on top right and Click on "Assitant Settings"</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_5.1_chatbot.png" width = "450" height= "450">
          </div>
          <div class="step">
          <p>Step 2 : Copy the Assistant ID, Assistant URL and API key in .env file</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_5.2_chatbot.png" width = "750" height= "750">
          </div>
          <div class="step">
          <p>Step 3 : Paste it in .env file</p>
          <a class="button is-dark is-medium" href="didact://?commandId=extension.openFile&text=AgroSmartAssistant%7Cload-skill%7C${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant/.env">Open file</a>
          </div>
          </details>
        </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>Launch the application in the preview window</p>
            <a class="button is-dark is-medium" title="Launch the Application" href="didact://?commandId=extension.sendToTerminal&text=AgroSmartAssistant%7Cstart%7Csandbox%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20npm%20start">Launch Application</a>
         </div>
      </div>
   </div>
   <div class="footer" style="margin-left:30px;">
      <div class="content" style="padding:30px;padding-left:60px;padding-bottom:0px;">
         <p>To edit or explore the application, make sure to stop it first</p>
         <a class="button is-dark is-medium" title="Stop Application" href="didact://?commandId=vscode.didact.sendNamedTerminalCtrlC&text=sandbox%20terminal">Stop Application</a>
         <p class="afterbutton">Explore and update the code as per your requirement</p>
         <a class="button is-dark is-medium" title="Explore the Code" href="didact://?commandId=extension.openFile&text=AgroSmartAssistant%7Copen-file%7C${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant/public/index.html">Explore Code</a>
         <p class="afterbutton ">Re-launch the application to view the changes made</p>
         <a class="button is-dark is-medium" title="Launch the Application" href="didact://?commandId=extension.sendToTerminal&text=AgroSmartAssistant%7Cbuild%7Csandbox%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20npm%20start">Re-Launch Application</a>
         <p style="margin-top:10px;">Click on
          <bold>Clean up</bold> to delete the IBM Cloud services that were created. Make sure to stop the application first!
        </p>
        <a class="button is-dark is-medium" title="Delete services from IBM Cloud" href="didact://?commandId=extension.sendToTerminal&text=AgroSmartAssistant%7Cdelete-services%7Csandbox%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20chmod%20%2Bx%20.%2Fscripts%2Fdelete_services.sh%20%26%26%20.%2Fscripts%2Fdelete_services.sh">Clean up</a>
        <p style="margin-top:10px;">You can also manage the services in
          <a href="https://cloud.ibm.com/resources">IBM Cloud Dashboard</a>
        </p>
      </div>
      <div class="image-div">
         <p class="image-content">Want to explore this project more?
            <span style="font-size:15px;margin-top:0px;display:block;">Head over to the <a href="https://github.com/Anam-Mahmood/Unlock-the-Power-of-Machine-Learning-in-Virtual-Assistants-to-automate-Loan-Applications" target="_blank">Github Repository</a></span>
            <span style="font-size:15px;margin-top:0px;display:block;">For further assistance reach out to <a href="https://github.com/IBM/Technology-sandbox-Support/issues/new/choose" target="_blank"> Help & Support</a></span>
            <span style="font-size:15px;margin-top:0px;display:block;">Check out our <a href="https://github.com/IBM/Technology-Sandbox-Support/blob/main/technology-sandbox-faq.html" target="_blank">FAQs</a></span>
         </p>
      </div>
   </div>
   <br><br>
</body>
</html>