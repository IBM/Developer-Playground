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
    background-image: url('https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/agro-chatbot.jpeg');
    width: 100%;
    height: auto;
    min-height: 350px;
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 30px;
    margin-right: 30px;
    background-size: contain;
    max-width: 1200px;
  }
  .header .right-content
  {
    float: right;
    width: 45%;
    background-color:#0072C3;
    min-height: 350px;
    padding: 20px;
    padding-top: 5%;
    font-size: 14px;
    justify-content:center;
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
    padding-left: 15px;
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
    font-size: 20px;
    color: white;
  }
  .subheading
  {
    margin-left: 25px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 16px;
    color: grey;
  }
  .no-hover:hover
  {
    background-color: #0062FF !important;
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
  a:hover {
  color: #0062FF;
  }
  a:visited {
color: #8C43FC;
}
</style>
</head>
<body>
  <div class="apptitle"> 
    Agro Smart Assistant
  </div>
  <div class="subheading">
    Use Machine Learning in Virtual Assistants to automate crop recommendation.
  </div>
  <div class="header">
      <div class="right-content">
         <div>
          Precision agriculture is in trend nowadays. It helps the farmers to get informed decision about the farming strategy. Precision agriculture is a modern farming technique that uses research data of soil characteristics, soil types, crop yield data collection and suggests the farmers the right crop based on their site-specific parameters. This reduces the wrong choice on a crop and increase in productivity.
        </div>
        <div>
          Now a days businesses also use chatbots to increase productivity and provide a better customer experience. This demo aims to automate the crop selection process using Watson Machine Learning and Cloud functions.
        </div>
     </div>
   </div>
   <div class="section">
    <p style="font-size:20px">Learning Resources</p>
    <div class="content-">
      <a href="https://developer.ibm.com/learningpaths/learning-path-machine-learning-for-developers/">Get Started with Machine Learning</a></br>
    </div>
   </div>
   <div class="section">
      <p style="font-size:20px">Included Components</p>
      <div class="content-">
          <p>This sample application uses the following IBM Services:</p>
          <p><a href="https://cloud.ibm.com/objectstorage">Cloud Object Storage</a>: IBM Cloud Object Storage is a highly scalable cloud storage service, designed for high durability, resiliency and security.</p>
          <p><a href="https://cloud.ibm.com/catalog/services/watson-assistant">Watson Assistant</a>: Watson Assistant lets you build conversational interfaces into any application, device, or channel.</p>
          <p><a href="https://cloud.ibm.com/catalog/services/machine-learning">Watson Machine Learning</a>: Deploy, manage and integrate machine learning models into your applications and services in as little as one click.</p>
      </div>
   </div>
   <div class="section">
   <p style="font-size:20px">Pre-requisites</p>
    <div class="content-">
    <p>IBM Cloud Account -  Do not have an IBM Cloud Account?<a href="https://cloud.ibm.com/registration"> click here</a> to create one for free.</p>
    </div>
   </div>
    <div class="section">
   <p style="font-size:20px">Instructions</p>
   <p>Please follow all the below steps in proper sequence to avoid failure.</p>
   </div>
   <div class="timeline">
   <div style="margin-top:0;"class="container right">
            <div class="content">
                <p>To begin, open a pre-configured terminal.</p>
                <a class="button is-dark is-medium" title="Open Terminal" href="didact://?commandId=terminal-for-nodejs-container:new">Open Terminal</a><br>
            </div>
        </div>
      <div class="container right">
         <div class="content">
            <p>Click `Get the code` to clone the code to your playground session as application's source code is needed.</p>
            <a class="button is-dark is-medium" title="Get the Code" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Cclone-repo%7Cnodejs%20terminal|git%20clone%20-b%20agro-chatbot%20https://github.com/IBM/Developer-Playground.git%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant">Get the Code</a>
         </div>
      </div>
      <div class="container right">
        <div class="content">
          <p>Create and Configure IBM Services</p>
          <p>You need to be logged in to your IBM Cloud account in the Developer Playground to create and configure services.</p>
          <a class="button is-dark is-medium" title="Login to IBM Cloud" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Cibm-login%7Cnodejs%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20chmod%20%2Bx%20.%2Fscripts%2Flogin.sh%20%26%26%20.%2Fscripts%2Flogin.sh">Login to IBM Cloud</a>
        </div>
      </div>
      <div class="container right">
        <div class="content">
          <p>Create these services with just a click of button.</p>
          <a class="button is-dark is-medium" title="Create IBM Watson Services" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Ccreate-services%7Cnodejs%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20chmod%20%2Bx%20.%2Fscripts%2Fcreate-ibm-services.sh%20%26%26%20.%2Fscripts%2Fcreate-ibm-services.sh">Create IBM Watson Services</a>
        </div>
      </div>
      <div class="container right">
        <div class="content">
          <p>Go to <a href="https://dataplatform.cloud.ibm.com/">IBM CloudPak for Data</a> and login with your IBM id. </p> Once you login follow the below steps to create a new project.
        </div>
      </div>
      <div class="container right">
        <div class="content">
        <details>
         <summary>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Create a New Deployment Space</summary></br></br>
          <div class="step">
            <p>Step 1 : Download the deployment zip file.</p>
            <a class="button is-dark is-medium" href="https://github.com/IBM/Developer-Playground/blob/agro-chatbot/crop-recommendation-space.zip?raw=true">Download</a>
          </div>
          <div class="step">
            <p>Step 2 : Go to the hamburger (☰) menu and click Deployment > View all spaces as shown in the figure below.</p></p>
            <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_1.1_create_space.png" width = "250" height= "250">
          </div>
          <div class="step">
          <p>Step 3 : Click on "New Deployment space".</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_1.2_create_space.png" width = "750" height= "750">
         </div>
          <div class="step">
         <p>Step 4 : Upload the zip file that was just downloaded in Step 1, select the storage and machine learning service instances, click on "Create" button.</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_1.3_create_space.png" width = "750" height= "750">
          </div>
          <div class="step">
          <p>Step 5 : After the space is created, click on "View new space".</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_1.4_create_space.png" width = "750" height= "750">
          </div>
        </details>
        </div>
      </div>
      <div class="container right">
        <div class="content">
          <details>
         <summary>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Deploy Model and Get URL</summary></br></br>
          <div class="step">
          <p>Step 1 : Once the Deployment Space is created click on "Assets" Tab and in the "Models" section click on Deploy icon.</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_2.1_deploy.png" width = "750" height= "750">
          </div>
          <div class="step">
          <p>Step 2 : Select "Online", give the deployment a name and click on "Create" button. This may take a while. </p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_2.2_deploy.png" width = "550" height= "550">
          </div>
          <div class="step">
          <p>Step 3 : Click on "Deployments" tab, once the deployment is created open it.</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_2.3_deploy.png" width = "750" height= "750">
          </div>
          <div class="step">
          <p>Step 4 : Copy the Model endpoint URL.</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_2.4_deploy.png" width = "750" height= "750">
          </div>
          <div class="step">
          <p>Step 5 : Paste the URL in the following script file.</p>
          <a class="button is-dark is-medium" href="didact://?commandId=extension.openFile&text=loan%7Capi-key%7C${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant/scripts/add_model_url.sh">Open file</a>
          </div>
          <div class="step">
          <p>Step 6 : Run the script to update the code file.</p>
          <a class="button is-dark is-medium" title="Update Model URL" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Ccreate-services%7Cnodejs%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20chmod%20%2Bx%20.%2Fscripts%2Fadd_model_url.sh%20%26%26%20.%2Fscripts%2Fadd_model_url.sh">Update Model URL</a>
          </div>
          </details>
        </div>
      </div>
      <div class="container right">
        <div class="content">
          <details>
         <summary>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Configure Cloud Functions</summary></br></br>
          <div class="step">
           <p>Step 1 : Create an Action in cloud functions with web action enabled.</p>
           <a class="button is-dark is-medium" title="Create Action" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Ccreate-action%7Cnodejs%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20chmod%20%2Bx%20.%2Fscripts%2Fcreate_action.sh%20%26%26%20.%2Fscripts%2Fcreate_action.sh">Create Action</a>
           </div>
          <div class="step">
           <p>Step 2: Generate an API Key in the IBM account by clicking this button.</p>
           <a class="button is-dark is-medium" title="Generate API key" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Cgenerate-api-token%7Cnodejs%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant;ibmcloud%20iam%20api-key-create%20ApiKey-SVA%20-d%20'this is API key for Smart Virtual Assitant'%20--file%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant/key_file">Generate API key</a><br> 
           </div>
          <div class="step">
           <p>Step 3 : Run the script to add api_key parameter in the Action.</p>
           <a class="button is-dark is-medium" title="Create Parameter" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Ccreate-services%7Cnodejs%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20chmod%20%2Bx%20.%2Fscripts%2Fadd_parameter.sh%20%26%26%20.%2Fscripts%2Fadd_parameter.sh">Add Paramter</a>
           </div>
          <div class="step">
           <p>Step 4 : Run the script to update Dialog skill file with the webhook URL that was just created.</p>
           <a class="button is-dark is-medium" title="Update" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Ccreate-services%7Cnodejs%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20chmod%20%2Bx%20.%2Fscripts%2Fupdate_dialog.sh%20%26%26%20.%2Fscripts%2Fupdate_dialog.sh">Update Dialog Skill</a>
          </div>
          </details>
        </div>
      </div>
      <div class="container right">
        <div class="content">
          <details>
         <summary>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Integrate the Machine Learning Model with Watson Assistant</summary></br></br>
          <div class="step">
          <p>Step 1 : Go to <a href="https://cloud.ibm.com">your IBM Cloud Account</a>. From the "Resources" tab on the left, select "Services and software" and click on your Watson Assistant service.Click on "Launch Watson Assistant" button.</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_4.1_assistant.png" width = "750" height= "750">
          </div>
          <div class="step">
          <p>Step 2 : If the below screen is displayed, click on the profile icon and select "Switch to classic experience".</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_4.2_assistant.png" width = "750" height= "750">
          </div>
          <div class="step">
          <p>Step 2 : Click on "Create assistant".</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_4.3_assistant.png" width = "550" height= "550">
          </div>
          <div class="step">
          <p>Step 3 : Give the assistant a name and click on "Create assistant".</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_4.4_assistant.png" width = "550" height= "550">
          </div>
          <div class="step">
          <p>Step 4 : Once the Assistant is created, click on "add an action or dialog skill".</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_4.5_assistant.png" width = "750" height= "750">
          </div>
          <div class="step">
          <p>Step 5 : Load the Dialog Skill.</p>
          <a class="button is-dark is-medium" href="didact://?commandId=extension.openFile&text=loan%7Cload-skill%7C${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant/Dialog-Skill.json">Load Skill</a>
          </div>
          <div class="step">
          <p>Step 6 : Download the Dialog Skill.</p>
          <a class="button is-dark is-medium" title="Launch the Application" href="didact://?commandId=file.download">Download</a>
          </div>
          <div class="step">
          <p>Step 7 : Upload the skill that was just downloaded. When the skill file is uploaded, click on "Upload" Button.</p>
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
           <p>Step 1 : Once the skill is created, click on (⋮) on top right and Click on "Assitant Settings".</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_5.1_chatbot.png" width = "450" height= "450">
          </div>
          <div class="step">
          <p>Step 2 : Copy the Assistant ID, Assistant URL and API key in env .file.</p>
          <img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/section_5.2_chatbot.png" width = "750" height= "750">
          </div>
          <div class="step">
          <p>Step 3 : Paste it in env file.</p>
          <a class="button is-dark is-medium" href="didact://?commandId=extension.openFile&text=loan%7Cload-skill%7C${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant/.env">Open file</a>
          </div>
          </details>
        </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>You've successfully cloned the code, so click `Build the application` to start the build process.
            </p>
            <a class="button is-dark is-medium" title="Build the Application" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Cbuild%7Cnodejs%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20npm%20install">Build the Application</a>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>You're all set to get started! </p>
            <a class="button is-dark is-medium" title="Launch the Application" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Cstart%7Cnodejs%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20npm%20start">Launch the Application</a>
         </div>
      </div>
   </div>
   <div class="footer">
      <div class="content" style="padding:30px;padding-left:60px;padding-bottom:0px;">
         <p>If you'd like to make changes and explore the application, make sure to stop it first!</p>
         <a class="button is-dark is-medium" title="Stop Application" href="didact://?commandId=vscode.didact.sendNamedTerminalCtrlC&text=nodejs%20terminal">Stop Application</a>
         <p class="afterbutton">The stage is yours!</p>
         <a class="button is-dark is-medium" title="Explore the Code" href="didact://?commandId=extension.openFile&text=loan%7Copen-file%7C${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant/public/index.html">Explore the Code</a>
         <p class="afterbutton ">To view the changes you've made, re-launch the application</p>
         <a class="button is-dark is-medium" title="Launch the Application" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20launch%7Cbuild%7Cnodejs%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20npm%20start">Re-Launch the Application</a>
         <p style="margin-top:10px;"> Completed the tutorial? Click on
          <bold>Clean up</bold> to delete the IBM Cloud services that were created. Make sure to stop the application first!
        </p>
        <a class="button is-dark is-medium" title="Delete services from IBM Cloud" href="didact://?commandId=extension.sendToTerminal&text=nodejs%20terminal%7Cdelete-services%7Cnodejs%20terminal|cd%20${CHE_PROJECTS_ROOT}/cp4d-smart-virtual-assistant%20%26%26%20chmod%20%2Bx%20.%2Fscripts%2Fdelete_services.sh%20%26%26%20.%2Fscripts%2Fdelete_services.sh">Clean up</a>
        <p style="margin-top:10px;">You can also manage the services in
          <a href="https://cloud.ibm.com/resources">IBM Cloud Dashboard</a>.
        </p>
      </div>
      <div class="image-div">
         <p class="image-content">Want to explore this project more?
            <span style="font-size:15px;margin-top:0px;display:block;">Head over to the <a href="https://github.com/Anam-Mahmood/Unlock-the-Power-of-Machine-Learning-in-Virtual-Assistants-to-automate-Loan-Applications" target="_blank">Github Repository</a></span>
         </p>
      </div>
   </div>
   <br><br>
</body>
</html>