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

<h2 class="title is-3 ">SaaS User and Subscription and Management Sample Application</h2>

<h3>SaaS User and Subscription and Management APIs can help you perform user management functions for your IBM SaaS subscriptions </h3>

<br>

<p>Try out the Sample Application!</p>

<br>

<p>In order to begin, we'll need the application's source code. Let's get that down!</p>
<a class="button is-dark is-medium" title="Get the Code" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=SSM$$git%20clone%20-b%20ssm%20https://github.com/IBM/Developer-Playground.git%20${CHE_PROJECTS_ROOT}/sbs-orgaccess/">Get the Code</a><br><br>

<br>

<p>Awesome! We've got the codes! In order to see it in action, we've to build it first!</p>
<a class="button is-dark is-medium" title="Build the Application" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=SSM$$cd%20${CHE_PROJECTS_ROOT}/sbs-orgaccess/SSMSampleApp%20%26%26%20npm%20install">Build the Application</a><br><br>

<br>


<p>Halt! Identify yourself! Follow the steps below to obtain your credentials and configure the application </p>
<br>
  <ol>
  <li>Head over to <a title= "IBM API Hub" href="https://developer.ibm.com/apis/">IBM API Hub</a> and sign in with your IBM ID</li><br>
  <li>Please note that you must be subscribed to atleast one other IBM Product on APIHub. For example, you can subscribe to <a title= "IBMFOC" href="https://developer.ibm.com/apis/catalog/industryresearch--i2r-fss/Introduction">IBM FOC Enterprise Microservices</a></li><br>
  <li>Now check out <a title= "My Subscriptions" href="https://developer.ibm.com/profile/myapis">API Subscriptions</a></li><br>
  <li>You should see a subscription for SaaS User and Subscription and Management, click that and proceed</li><br>
  <li>You can obtain your Client ID/Secret from here. If you don't see any, you can "Generate API Key"</li><br>
  <li>Let's get the credentials by configuring the application </li><br>
</ol>

<a class="button is-dark is-medium" title="Configure the Application" href="didact://?commandId=vscode.open&projectFilePath=sbs-orgaccess/SSMSampleApp/.env">Configure the Application</a><br><br>
<br>

<p> You're all set to get started! </p>
<a class="button is-dark is-medium" title="Launch the Application" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=SSM$$cd%20${CHE_PROJECTS_ROOT}/sbs-orgaccess/SSMSampleApp%20%26%26%20npm%20start&completion=The%20application%20has%20been%20launched.">Launch the Application</a><br><br>

<p>You will see a dialog box saying "The application has been launched" </p>

<br>


<p> If you'd like to make changes and explore the application, make sure to stop it first! </p>
<a class="button is-dark is-medium" title="Stop Application" href="didact://?commandId=vscode.didact.sendNamedTerminalCtrlC&text=SSM" >Stop Application</a><br><br>

<br>


<p> The stage is yours! </p>
<a class="button is-dark is-medium" title="Explore the Code" href="didact://?commandId=vscode.open&projectFilePath=sbs-orgaccess/SSMSampleApp/services/service.js">Explore the Code</a><br><br>
<br>


<p> To view the changes you've made, re-launch the application </p>
<a class="button is-dark is-medium" title="Re-Launch the Application" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=SSM$$cd%20${CHE_PROJECTS_ROOT}/sbs-orgaccess/SSMSampleApp%20%26%26%20npm%20start&completion=The%20application%20has%20been%20launched.">Re-Launch the Application</a><br><br>

<br>

<p> Want to explore this project more? Head over to <a href = "https://github.com/IBM/Developer-Playground/tree/master" > the GitHub Repository</a> </p>

</ol>
<br/>


</div>
</body>
</html>
