<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  html,
  div,
  body {
    background-color: #1a1a1a;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    outline: none;
  }
  body {
    font-family: Helvetica, sans-serif;
  }
  a{
    color:#78A9FF;
  }
  a:visited{
    color: #8C43FC;
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
    margin: 900px 0px 0px 20px;
    padding: 0px;
    max-width: 1200px;
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
    background-position: -30% 50px;
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
    margin-right:5px;
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
    margin-bottom: 16px;
  }
  .flow{
    background-color: white;
    display: flex;
    flex-direction: row;
    max-width: 1200px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
  }
  .flow .content ol{
    justify-content: space-between;
    align-items: center;
    min-width: 40%;
  }
  .flow .content li{ 
    background-color: white;
    flex-direction:column;
    float: left;
    color: black;
    font-size: 14px;
    margin: 10px 0 10px 0;
  }
  .flow .content h3{
    background-color: white;
    float: left;
    color: black;
    margin: 30px 0 20px 20px;
  }
  .flow-image-div{
    background-color: white;
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .flow-image{
    background-color: transparent;
    height: auto;
    width: auto;
    max-width: 900px;
    margin-top: 30px;
    margin-bottom:30px;
    margin-left: -70px;
    margin-right: -60px;
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
  @media screen and (max-width: 1200px) {
    .footer {
      margin: 900px 0px 0px 20px;
    }
    .flow{
      flex-direction:column;
    }
    .flow .content ol{
        align-items: left;
        margin-top:80px;
    }
    .flow .content li{ 
        margin-right:200px
    }
    .flow-image-div{
      overflow:auto;
    }
  }
  @media screen and (max-width: 1000px) {
    .footer {
      margin: 950px 0px 0px 20px;
    }
    .flow{
      flex-direction:column;
    }
    .flow .content ol{
    justify-content: space-between;
    align-items: center;
    margin-top:80px;
    }
    .flow-image-div{
      overflow:auto;
    }
  }
  @media screen and (max-width: 900px) {
    .footer {
      margin: 1000px 0px 0px 20px;
    }
    .flow{
      flex-direction:column;
    }
    .flow .content ol{
    justify-content: space-between;
    align-items: center;
    min-width: 40%;
    margin-top:80px;
    }
    .flow .content li{ 
        margin-right:50px
    }
    .flow-image-div{
      overflow:auto;
    }
    .flow-image{
      margin-left:30px;
    }
  }
  @media screen and (max-width: 700px) {
    .footer {
      margin: 1050px 0px 0px 20px;
    }
    .flow{
      flex-direction:column;
    }
    .flow-image-div{
      overflow:auto;
    }
    .flow .content li{ 
        margin-right:50px
    }
    .flow-image{
      margin-left:150px;
    }
  }
  @media screen and (max-width: 650px) {
    .footer {
      margin: 1100px 0px 0px 20px;
    }
    .flow{
      flex-direction:column;
    }
    .flow-image-div{
      overflow:auto;
    }
    .flow .content li{ 
        margin-right:50px
    }
    .flow-image{
      margin-left:300px;
    }
  }
  @media screen and (max-width: 550px) {
    .footer {
      margin: 1250px 0px 0px 20px;
    }
    .flow{
        flex-direction:column;
    }
    .flow-image-div{
      overflow:auto;
    }
    .flow .content li{ 
        margin-right:50px
    }
    .flow-image{
      margin-left:400px;
    }
  }
  @media screen and (max-width: 400px) {
    .footer {
      margin: 1350px 0px 0px 20px;
    }
    .flow{
        flex-direction:column;
    }
    .flow-image-div{
      overflow:auto;
    }
    .flow .content li{ 
        margin-right:50px
    }
    .flow-image{
      margin-left:450px;
    }
  }
}
</style>
</head>
<body>
  <div style="margin-top:20px;margin-left: 40px;margin-bottom:40px;">
    <h2>Code Pattern: Extract insights from videos</h2>
    <div style="margin-left:5px;">
      <div>
       In this code pattern, learn how to extract speaker diarized notes and meaningful insights reports using IBM® Watson™ Speech To Text, Watson Natural Language Processing, anWatson Tone Analysis when given any video.
      </div>
      </br>
      <div>
        After completing the code pattern, you understand how to:
      </div>
      <ul style="margin-left:-2px;">
        <li>Use the Watson Speech to Text service to convert the human voice into the written word.</li>
        <li>Use advanced natural language processing to analyze text and extract metadata from content such as concepts, entities, keywords, categories, sentiment, and emotion.</li>
        <li>Leverage Watson Tone Analyzer cognitive linguistic analysis to identify a variety of tones at both the sentence and document level.</li>
      </ul>  
  </div>
  </div>
   <div class="flow">
    <div class="content">
       <h3>Flow</h3>
       <ol>
        <li> User uploads recorded video file of the virtual meeting or a virtual classroom in the application.</li>
        <li>FFMPG Library extracts audio from the video file.</li>
        <li>Watson Speech To Text transcribes the audio to give a diarized textual output.</li>
        <li>Watson Language Translator (Optionally) translates other languages into English transcript.</li>
        <li>Watson Tone Analyzer analyses the transcript and picks up top positive statements form the transcript.</li>
        <li>Watson Natural Language Understanding reads the transcript to identify key pointers from the transcript and get the sentiments and emotions.</li>
        <li>The key pointers and summary of the video is then presented to the user in the application.</li>
        <li>The user can then download the textual insights.</li>
      </ol>
    </div>
    <div class="flow-image-div">
      <img class="flow-image" src="https://developer.ibm.com/developer/default/patterns/extract-textual-insights-from-a-given-video/images/extract-textual-insights-from-a-given-video-flow.png">
    </div>
   </div>
   <div class="timeline">
      <div class="container right">
         <div class="content">
            <p>Clone the GitHub repository</p>
            <a class="button is-dark is-medium" title="Clone the Repo" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=nodejs%20terminal%202$$git%20clone%20https%3A%2F%2Fgithub.com%2FIBM%2Fextract-textual-insights-from-video.git%20%26%26%20cd%20extract-textual-insights-from-video%2F%20%26%26%20pip3.8%20install%20-r%20requirements.txt" >Get Code</a>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>Create and Configure IBM Watson Services</p>
            <p>You need to be logged in to your IBM Cloud account in the Developer Playground to create and configure services.</p>
            <a class="button is-dark is-medium" title="Login to IBM Cloud" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=nodejs%20terminal%202$$ibmcloud%20login%20--sso%20%26%26%20ibmcloud%20target%20--cf%20%26%26%20ibmcloud%20target%20-g%20Default">Login to IBM Cloud</a>
            <p style="margin-top:10px;">Do not have an IBM Cloud Account?<a href="https://cloud.ibm.com/registration">click here</a> to create one for free.</p>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>This code pattern uses the following IBM Watson Services:</p>
            <p><a href="https://cloud.ibm.com/catalog/services/natural-language-understanding">Natural Language Understanding</a>: Use advanced NLP to analyze text and extract meta-data from content such as concepts, entities, keywords, categories, sentiment, emotion, relations, and semantic roles.</p>
            <p><a href="https://cloud.ibm.com/catalog/services/tone-analyzer">Tone Analyzer</a>: Tone Analyzer leverages cognitive linguistic analysis to identify a variety of tones at both the sentence and document level.</p>
            <p><a href="https://cloud.ibm.com/catalog/services/speech-to-text">Speech to Text</a>: The Speech to Text service converts the human voice into the written word.</p>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>Create these services and configure the credentials in the code pattern with just a click of button.</p>
            <a class="button is-dark is-medium" title="Create IBM Watson Services" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=nodejs%20terminal%202$$chmod%20%2Bx%20.%2Fcreate-ibm-cloud-services.sh%20%26%26%20.%2Fcreate-ibm-cloud-services.sh" >Create IBM Watson Services</a>
         </div>
      </div>
      <div class="container right">
         <div class="content">
            <p>Build and Run the Application</p>
            <p>You can build and run the Application within the Developer Playground, click on <bold>Build and Run</bold> to start the application.</p>
            <a class="button is-dark is-medium" title="Build and Run" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=nodejs%20terminal%202$$python3%20app.py">Build and Run</a>
         </div>
      </div>
   </div>
   <div class="footer">
      <div class="content" style="padding:30px;padding-left:60px;padding-bottom: 0px;">
         <p>If you'd like to make changes and explore the application, make sure to stop it first!</p>
         <a class="button is-dark is-medium" title="Build and Run" href="didact://?commandId=vscode.didact.sendNamedTerminalCtrlC&text=nodejs%20terminal%202">Stop Running Application</a>
         <p style="margin-top:10px;">Completed the code pattern? Click on <bold>Clean up</bold> to delete the IBM Cloud services that were created.</p>
         <a class="button is-dark is-medium" title="Delete services from IBM Cloud" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=nodejs%20terminal%202$$chmod%20%2Bx%20.%2Fdeleteservice.sh%20%26%26%20.%2Fdeleteservice.sh">Clean up</a>
         <p style="margin-top:10px;">You can also manage the services in <a href="">IBM Cloud Dashboard</a>.</p>
      </div>
      <div class="image-div">
         <p class="image-content">Want to explore this project more?
            <span style="font-size:15px;margin-top:0px;display:block;">Head over to the <a>Github Repository</a></span>
         </p>
         <div class="image-btn">
            <a class="image-link" href="didact://?commandId=extension.openURL&text=HEREPublicTransit%7Cview-product-details%7Chttps://developer.here.com/documentation/public-transit/dev_guide/index.html" target="_blank">View Product Details <span>&#8594;</span></a>
            <a class="image-link" href="didact://?commandId=extension.openURL&text=HEREPublicTransit%7Cbuy-this-product%7Chttps://developer.here.com/pricing" target="_blank">Buy this API <span>&#8594;</span></a>
            <a class="image-link" style="margin-bottom:0px;" href="didact://?commandId=extension.openURL&text=HEREPublicTransit%7Cget-trial-subscription%7Chttps://developer.here.com/sign-up?create=Freemium-Basic&keepState=true&step=account" target="_blank">Get Trial Subcription <span>&#8594;</span></a>
         </div>
      </div>
   </div>
   <br><br>
</body>
</html>
