<html>
<style>
html,div,body{
    background-color:#1a1a1a;
    font-family: 'IBM Plex Sans', sans-serif;
}
.content h2,h3,h4
{
    font-family: 'IBM Plex Sans', sans-serif;
    background-color:#1a1a1a;
}
.content h2,p{
    color:#fff;
    font-family: 'IBM Plex Sans', sans-serif;
}
.content p{
  font-family: 'IBM Plex Sans', sans-serif;  
  font:15px;
  color: #fff;
}
pre{
    background-color:#d9dbde;
    color:#000;
    font-family: 'IBM Plex Sans', sans-serif;
    font:12px;
}
.content h4{
    font-family: 'IBM Plex Sans', sans-serif;
    color:#fff;
}
.content h6{
    font-family: 'IBM Plex Sans', sans-serif;
    background-color:#1a1a1a;
    color:#fff;
}
.content h3{
    font-family: 'IBM Plex Sans', sans-serif;
    color: #2a67f5;
    background-color:#1a1a1a;
}
ul, ol,b{ 
    font-family: 'IBM Plex Sans', sans-serif;
    color: #fff;
}
#ul1{
  font-family: 'IBM Plex Sans', sans-serif;
    color: #fff;
}
.button.is-dark.is-medium {
  font-family: 'IBM Plex Sans', sans-serif;
  background-color: #1a1a1a;
  border-color: white;
  color: #fff;
}
.button.is-dark.is-medium:hover {
  font-family: 'IBM Plex Sans', sans-serif;
  background-color: #2a67f5;
  border-color: white;
  color: #fff;
}
.title.is-3{
  font-family: 'IBM Plex Sans', sans-serif;
  color:#fff;
}
.subtitle.is-4{
    font-family: 'IBM Plex Sans', sans-serif;
    color:#fff;
}
</style>

<body style="font-family: 'IBM Plex Sans', sans-serif;background-color:#1a1a1a;">
<div style="font-family: 'IBM Plex Sans', sans-serif;background-color:#1a1a1a;">

<h2 class="title is-3 ">Data Quality for AI Sample Application</h2>

<h3>Data quality for AI provides an automated approach to analyze and remediate data</h3>

<h4>
Data practitioners spend a considerable amount of time in iterative pre-processing of data before it is considered to be of adequate quality for downstream machine learning tasks. This is because the quality of training data directly impacts the complexity as well as accuracy of machine learning models. Getting insights into the quality of data before it enters a machine learning pipeline can significantly reduce model building time, streamline data preparation efforts and improve the overall reliability of the AI pipeline. </h4>
<h4>
The Data quality for AI is an integrated toolkit that provides various data profiling and quality estimation metrics that assess the quality of ingested data in a systematic and objective manner.
</h4>


<br>

<p>Try out a Sample Application!</p>

<br>

<p>To begin, we'll need the application's source code. Let's get that down!</p>
<a class="button is-dark is-medium" title="Get the Code" href="didact://?commandId=extension.sendToTerminal&text=data-quality%7Cget-code%7Cdata-quality|git%20clone%20-b%20DART%20https://github.com/IBM/Developer-Playground.git%20${CHE_PROJECTS_ROOT}/data-quality/">Get the Code</a><br><br>

<br>

<p>Awesome! We've got the codes! In order to see it in action, we've to build it first!</p>
<a class="button is-dark is-medium" title="Build the Application" href="didact://?commandId=extension.sendToTerminal&text=data-quality%7Cbuild-application%7Cdata-quality|cd%20${CHE_PROJECTS_ROOT}/data-quality/DataQuality%20%26%26%20npm%20install">Build the Application</a><br><br>

<br>

<p>Halt! Identify yourself. Take the following steps to obtain your credentials and configure the application </p>
<ol>
 <li>Head over to <a title= "IBM API Hub" href="https://developer.ibm.com/apis/">IBM API Hub</a> and sign in with your IBM ID</li><br>
  <li>Subscribe to the <a title= "Data Quality" href="https://developer.ibm.com/apis/catalog/dataquality4ai--data-quality-for-ai/Introduction">Data Quality for AI Product</a></li><br>
   <li>Now check out <a title= "My Subscriptions" href="https://developer.ibm.com/profile/myapis">API Subscriptions</a></li><br>
  <li>You should see a subscription for Data Quality for AI, select that and proceed</li><br>
  <li>You can obtain your Client ID/Secret from here. If you don't see any, you can "Generate API Key"</li><br>
  <li>Let's get the credentials by configuring the application </li><br>
</ol>

<a class="button is-dark is-medium" title="Open the File" href="didact://?commandId=extension.openFile&text=AsperaonCloud%7Cconfigure-application%7C/projects/data-quality/DataQuality/.env">Configure the Application</a><br><br>
<br>

<p> You're all set to get started! </p>
<a class="button is-dark is-medium" title="Launch the Application" href="didact://?commandId=extension.sendToTerminal&text=data-quality%7Claunch-application%7Cdata-quality|cd%20${CHE_PROJECTS_ROOT}/data-quality/DataQuality%20%26%26%20npm%20start">Launch the Application</a><br><br>

<br>

<p> If you'd like to make changes and explore the application, make sure to stop it first! </p>
<a class="button is-dark is-medium" title="Stop Application" href="didact://?commandId=vscode.didact.sendNamedTerminalCtrlC&text=data-quality" >Stop Application</a><br><br>

<br>

<p> The stage is yours! </p>
<a class="button is-dark is-medium" title="Explore the Code" href="didact://?commandId=extension.openFile&text=AsperaonCloud%7Cexplore-code%7C/projects/data-quality/DataQuality/services/service.js">Explore the Code</a><br><br>
<br>

<p> To view the changes you've made, re-launch the application and refresh the preview </p>
<a class="button is-dark is-medium" title="Re-Launch the Application" href="didact://?commandId=extension.sendToTerminal&text=data-quality%7Crelaunch-application%7Cdata-quality|cd%20${CHE_PROJECTS_ROOT}/data-quality/DataQuality%20%26%26%20npm%20start">Re-Launch the Application</a><br><br>

<p> Want to explore this project more? Head over to <a href = "https://github.com/IBM/Developer-Playground/tree/master" > the GitHub Repository</a> </p>


</ol>
<br/>

<a class="button is-dark is-medium" title="View product details" href="didact://?commandId=extension.openURL&text=data-quality%7Cview-product-details%7Chttps://www.ibm.com/products/dqaiapi
" target="_blank">View product details</a>
&nbsp;&nbsp;
<a class="button is-dark is-medium" title="Get trial subscription" href="didact://?commandId=extension.openURL&text=data-quality%7Cget-trial-subscription%7Chttps://www.ibm.com/account/reg/us-en/signup?formid=urx-50307" target="_blank">Get trial subscription</a>
<br><br>
</div>

</body>

</html>
