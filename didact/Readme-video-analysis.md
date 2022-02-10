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
    background-image: url('https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/video_insights.jpeg');
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
    font-size: 28px;
    color: white;
  }
  .subheading
  {
    margin-left: 25px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 16px;
    color: #c1c7cd;;
  }
  .no-hover:hover
  {
    background-color: #0062FF !important;
  }
  .section{
    margin-top: 5px;
    margin-bottom:-50px;
  }
  a:hover {
  color: #A6C8FF;
  text-decoration: underline;
  }
  a:visited {
  color: #BE95FF;
  }
  summary{
    float:left;
  }
  details > summary {
    list-style-image: url("https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/arrow-right.svg");
    direction:rtl;
  }
  .dropdown-icon{
    position:relative;
    left:50px; 
    top:4px;
  }
  details[open] > summary {
      list-style-image: url("https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/arrow-down.svg");
  }
}
</style>
</head>
<body>
    <div class="header">
      <div class="right-content" style="padding-top:40px;">
      <div class="apptitle" style="font-size: 28px; color: white;"> 
      Video Analysis Application
    </div>
    <div class="subheading">
            Extract meaningful insights from video files using Watson Speech to Text, Natural Language Processing, and Tone Analyzer services.
    </div>
     </div>
   </div>
   <div class="section" style="font-size:16px; margin-top:-20px">
  <p>The benefit of a virtually connected world is that important meetings and classes can be recorded, giving attendees more opportunities to stay connected and tune into important events. But with so much content to process, listening or watching all of this recorded content can be time-consuming and tedious.</p>
  <p>This application uses IBM Watson Services to analyze a video recording and to generate a detailed report highlighting its key points.</p>
  </div>
   <div class="section">
    <p style="font-size:24px">Architecture Diagram</p>
         <img class="flow-image" src="https://developer.ibm.com/developer/default/patterns/extract-textual-insights-from-a-given-video/images/extract-textual-insights-from-a-given-video-flow.png">
   </div>
    <div class="section">
    <p style="font-size:24px">Execution Flow</p>
        <ol>
        <li>User uploads recorded video file of the virtual meeting or a virtual classroom in the application.</li>
        <li>FFMPG Library extracts audio from the video file.</li>
        <li>Watson Speech To Text transcribes the audio to give a diarized textual output.</li>
        <li>Watson Language Translator (Optionally) translates other languages into English transcript.</li>
        <li>Watson Tone Analyzer analyses the transcript and highlights the top positive statements from the transcript.</li>
        <li>Watson Natural Language Understanding reads the transcript to identify key points and record the sentiments and emotions.</li>
        <li>The key points and a summary of the video is then presented to the user in the application.</li>
        <li>The user can then download the textual insights.</li>
        </ol>
    </div>
    <div class="section">
    <p style="font-size:24px">Learning Resources</p>
        <div class="content-">
        <a href="https://developer.ibm.com/articles/text-mining-and-analysis-from-webex-recordings/">Understanding the Extract insights from videos Asset</a>
        </div>
   </div>
   <div class="section">
    <p style="font-size:24px">Included Components</p>
      <div >
         <div class="content">
            <p>This Asset uses the following IBM Watson Services:</p>
            <p><a href="https://cloud.ibm.com/catalog/services/natural-language-understanding">Watson Natural Language Understanding</a>: Use advanced NLP to analyze text and extract meta-data from content such as concepts, entities, keywords, categories, sentiment, emotion, relations, and semantic roles.</p>
            <p><a href="https://cloud.ibm.com/catalog/services/tone-analyzer">Watson Tone Analyzer</a>: Tone Analyzer leverages cognitive linguistic analysis to identify a variety of tones at both the sentence and document level.</p>
            <p><a href="https://cloud.ibm.com/catalog/services/speech-to-text">Watson Speech to Text</a>: The Speech to Text service converts the human voice into the written word.</p>
         </div>
      </div>
   </div>
    <div class="section">
    <p style="font-size:24px">Pre-requisites</p>
    <div class="content-">
    <p>IBM Cloud Account - <a href="https://cloud.ibm.com/registration/trial?cm_sp=ibmdev--developer-sandbox--cloudreg"> Create</a>  one for free.</p>
   </div>
   </div>
    <div class="section">
    <p style="font-size:24px">Instructions</p>
    <p style="margin-bottom:10px;"> Please follow all the below steps in proper sequence.</p>
   </div>   
   <div class="timeline">
      <div style="margin-top:0px; padding-top:0px;"class="container right">
         <div class="content">
            <p>Open the sandbox terminal.</p>
            <a class="button is-dark is-medium" title="Open Terminal" href="didact://?commandId=terminal-for-sandbox-container:new">Open Terminal</a>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>Clone the GitHub repository.</p>
            <a class="button is-dark is-medium" title="Clone the Repo" href="didact://?commandId=extension.sendToTerminal&text=VideoAnalysis%7Cget-code%7Csandbox%20terminal%7Cgit%20clone%20-b%20video-insights%20https%3A%2F%2Fgithub.com%2FIBM%2FDeveloper-Playground.git%20${CHE_PROJECTS_ROOT}/video-analysis%20%26%26%20cd%20${CHE_PROJECTS_ROOT}/video-analysis%2F%20%26%26%20pip3.8%20install%20-r%20requirements.txt" >Get Code</a>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>Log in to your IBM Cloud account.</p>
            <a class="button is-dark is-medium" title="Login to IBM Cloud" href="didact://?commandId=extension.sendToTerminal&text=VideoAnalysis%7Clogin-ibm-cloud%7Csandbox%20terminal%7Ccd%20${CHE_PROJECTS_ROOT}/video-analysis%20%26%26%20chmod%20%2Bx%20.%2Flogin.sh%20%26%26%20.%2Flogin.sh">Login to IBM Cloud</a>
      </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>Create services on IBM Cloud.</p>
            <a class="button is-dark is-medium" title="Create IBM Watson Services" href="didact://?commandId=extension.sendToTerminal&text=VideoAnalysis%7Ccreate-ibm-watson-service%7Csandbox%20terminal%7Ccd%20${CHE_PROJECTS_ROOT}/video-analysis%20%26%26%20chmod%20%2Bx%20.%2Fcreate-ibm-cloud-services.sh%20%26%26%20.%2Fcreate-ibm-cloud-services.sh" >Create  Services</a>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>Launch the application in the preview window.</p>
            <a class="button is-dark is-medium" title="Launch the Application" href="didact://?commandId=extension.sendToTerminal&text=VideoAnalysis%7Claunch-application%7Csandbox%20terminal%7Cpython3.8%20app.py">Launch Application</a>
         </div>
      </div>
   </div>
   <div class="footer" style="margin-left:30px;">
     <div class="content" style="padding:30px;padding-left:60px;margin-right:80px;padding-bottom:0px;">
         <p>To edit or explore the application, make sure to stop it first.</p>
         <a class="button is-dark is-medium" title="stop application" href="didact://?commandId=vscode.didact.sendNamedTerminalCtrlC&text=sandbox%20terminal">Stop Application</a>
         <p style="margin-top:10px;">
            Click on <bold>Clean up</bold> to delete the IBM Cloud services that were created.
         </p>
         <a class="button is-dark is-medium" title="Delete services from IBM Cloud" href="didact://?commandId=extension.sendToTerminal&text=VideoAnalysis%7Cdelete-services%7Csandbox%20terminal%7Ccd%20${CHE_PROJECTS_ROOT}/video-analysis%20%26%26%20chmod%20%2Bx%20.%2Fdeleteservice.sh%20%26%26%20.%2Fdeleteservice.sh">Clean Up</a>
         <p style="margin-top:10px;">You can also manage the services in <a href="https://cloud.ibm.com/resources">IBM Cloud Dashboard</a>.</p>
      </div>
      <div class="image-div">
         <p class="image-content">Want to explore this project more?
            <span style="font-size:15px;margin-top:0px;display:block;">Head over to the <a href="https://github.com/IBM/Developer-Playground/tree/video-insights">Github Repository</a></span>
        <span style="font-size:15px;margin-top:0px;display:block;">For further assistance reach out to <a href="https://github.com/IBM/Technology-Sandbox-Support/issues/new/choose" target="_blank"> Help & Support</a></span>
        <span style="font-size:15px;margin-top:0px;display:block;">Check out our <a href="https://ibm.github.io/Technology-Sandbox-Support/" target="_blank">FAQs</a></span>
          </p>
         <a class="image-link" href="https://developer.ibm.com/patterns/extract-textual-insights-from-a-given-video/" target="_blank">
         <div class="image-btn">
               <p class="image-link">View Product Details</p>
               <p class="image-link">   </p>
               <p class="image-link">
               <span>
                  <svg style="position: absolute; right: 10px;" fill="#ffffff" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/  svg" width="25" height="25" viewBox="0 0 32 32" aria-hidden="true">
                     <path d="M18 6L16.6 7.4 24.1 15 3 15 3 17 24.1 17 16.6 24.6 18 26 28 16z"></path>
                     <title>Arrow right</title>
                  </svg>
               </span>
               </p>
         </div>
         </a>
      </div>
   </div>
   <br><br>
</body>
</html>
