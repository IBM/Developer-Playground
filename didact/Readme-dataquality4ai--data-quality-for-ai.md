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
    top: 0;
    bottom: 0;
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
    margin: 1050px 0px 0px 20px;
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
    background-image: linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url("https://github.com/bodarajeshkumar/Developer-Playground/blob/master/didact/images/git.svg?raw=true");
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
    background-image: url('https://github.com/IBM/Developer-Playground/blob/development/didact/images/data-quality.png?raw=true');
    width: 100%;
    height: auto;
    min-height: 300px;
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
    color: #0072C3;
    background-color: transparent;
    text-decoration: none;
  }
  .container a:visited
  {
    color: #8C43FC;
    background-color: transparent;
    text-decoration: none;
  }
  @media only screen and (max-width: 800px) {
  .footer {
    margin: 1100px 0px 0px 20px;
  }
  @media only screen and (max-width: 700px) {
  .footer {
    margin: 1200px 0px 0px 20px;
  }
  @media only screen and (max-width: 600px) {
  .footer {
    margin: 1250px 0px 0px 20px;
  }
  @media only screen and (max-width: 500px) {
  .footer {
    margin: 1300px 0px 0px 20px;
  }
  @media only screen and (max-width: 400px) {
  .footer {
    margin: 1350px 0px 0px 20px;
  }
}
</style>
</head>
<body>
   <div class="header">
      <div class="right-content">
         <h4>Data Quality API Sample Application</h4>
         <div>
            The Secret Ingredient behind any crackerjack model of any AI or Data-driven Application is- DATA, no it's actually a Good Quality DATA. Insights are only as good as the data that informs them. The Statistics and the expert estimates shows that the Data Practitioners spend their 50% to 80%  of their time in Data Wrangling to be analysed. Data wrangling or data munging is the process of taking disorganised or incomplete raw data and standardising it so that you can easily access, consolidate, and analyse it. It is often a tedious task when done manually. 
         </div>
         <div>
            Introducing  `DATA Quality For AI`- The Data quality for AI is an integrated toolkit that provides various data profiling and quality estimation metrics that assess the quality of ingested data in a systematic and objective manner.
         </div>
         <div>
            Wait, Is it too much information to process?
         </div>
         <div>
            We got you! Let's wrangle, the above information with DATA Quality For AI in this sample application.
         </div>
      </div>
   </div>
   <div class="timeline">
      <div class="container right" style="margin-top:0px;padding-top:0px;">
         <div class="content">
            <p>To begin, we'll need the application's source code. Let's get that down!</p>
            <a class="button is-dark is-medium" title="Get the Code" href="didact://?commandId=extension.sendToTerminal&text=data-quality%7Cget-code%7Cdata-quality|git%20clone%20-b%20DART%20https://github.com/IBM/Developer-Playground.git%20${CHE_PROJECTS_ROOT}/data-quality/">Get the Code</a>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>Awesome! We've got the code! To see it in action, we've to build it first!
            </p>
            <a class="button is-dark is-medium" title="Build the Application" href="didact://?commandId=extension.sendToTerminal&text=data-quality%7Cbuild-application%7Cdata-quality|cd%20${CHE_PROJECTS_ROOT}/data-quality/DataQuality%20%26%26%20npm%20install">Build the Application</a>
            <p class="afterbutton">
               Halt! Identify yourself! Take the following steps to obtain your credentials and configure the application
            </p>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>Head over to <a title= "IBM API Hub" href="https://developer.ibm.com/apis/">IBM API Hub</a> and sign in with your IBM ID
            </p>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>Subscribe to the <a title= "Data Quality" href="https://developer.ibm.com/apis/catalog/dataquality4ai--data-quality-for-ai/Introduction">Data Quality for AI Product</a>
            </p>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>Now check out <a title= "My Subscriptions" href="https://developer.ibm.com/profile/myapis">API Subscriptions</a>
            </p>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>You should see a subscription for Data Quality for AI, select that and proceed
            </p>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>You can obtain your Client ID/Secret from here. If you don't see any, you can "Generate API Key"
            </p>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>Let's get the credentials by configuring the application</p>
            </p>
            <a class="button is-dark is-medium" title="Open the File" href="didact://?commandId=extension.openFile&text=AsperaonCloud%7Cconfigure-application%7C${CHE_PROJECTS_ROOT}/data-quality/DataQuality/.env">Configure the Application</a>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>You're all set to get started! </p>
            <a class="button is-dark is-medium" title="Launch the Application" href="didact://?commandId=extension.sendToTerminal&text=data-quality%7Claunch-application%7Cdata-quality|cd%20${CHE_PROJECTS_ROOT}/data-quality/DataQuality%20%26%26%20npm%20start">Launch the Application</a>
         </div>
      </div>
   </div>
   <div class="footer">
      <div class="content" style="padding:30px;padding-left:60px;padding-bottom: 0px;">
         <p>If you'd like to make changes and explore the application, make sure to stop it first!</p>
         <a class="button is-dark is-medium" title="Stop Application" href="didact://?commandId=vscode.didact.sendNamedTerminalCtrlC&text=data-quality" >Stop Application</a>
         <p class="afterbutton">The stage is yours!</p>
         <a class="button is-dark is-medium" title="Explore the Code" href="didact://?commandId=extension.openFile&text=AsperaonCloud%7Cexplore-code%7C${CHE_PROJECTS_ROOT}/data-quality/DataQuality/services/service.js">Explore the Code</a>
         <p class="afterbutton ">To view the changes you've made, re-launch the application</p>
         <a class="button is-dark is-medium" title="Re-Launch the Application" href="didact://?commandId=extension.sendToTerminal&text=data-quality%7Crelaunch-application%7Cdata-quality|cd%20${CHE_PROJECTS_ROOT}/data-quality/DataQuality%20%26%26%20npm%20start">Re-Launch the Application</a>
      </div>
      <div class="image-div">
         <p class="image-content">Want to explore this project more?
            <span style="font-size:15px;margin-top:0px;display:block;">Head over to the <a>Github Repository</a></span>
         </p>
         <div class="image-btn">
            <a class="image-link" href="didact://?commandId=extension.openURL&text=data-quality%7Cview-product-details%7Chttps://www.ibm.com/products/dqaiapi
               " target="_blank">View Product Details <span>&#8594;</span></a>
            <a class="image-link" href="didact://?commandId=extension.openURL&text=data-quality%7Cget-trial-subscription%7Chttps://www.ibm.com/account/reg/us-en/signup?formid=urx-50307" target="_blank">Get Trial Subcription <span>&#8594;</span></a>
         </div>
      </div>
   </div>
   <br><br>
</body>
</html>
