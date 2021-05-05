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
<h2 class="title is-3 ">Aspera on Cloud API  Sample Application</h2>

<h3>Aspera on Cloud or (AoC) is Aspera’s on-demand SaaS offering for global content sharing. AoC enables fast, easy, and secure exchange of files and folders of any size between end users, even across separate organizations, in both local and remote locations. Using AoC, organizations can store and readily access files and folders in multiple cloud-based and on-premises storage systems. </h3>

<br>

<p>Try out the Sample Application!</p>

<br>

<p>In order to begin, we'll need the application's source code. Let's get that down!</p>
<a class="button is-dark is-medium" title="Get the Code" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=AsperaonCloud$$git%20clone%20-b%20aspera%20https://github.com/IBM/Developer-Playground.git%20${CHE_PROJECTS_ROOT}/">Get the Code</a>
<br><br>

<br>

<p>Awesome! We've got the codes! In order to see it in action, we've to build it first!</p>
<a class="button is-dark is-medium" title="Build the Application" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=AsperaonCloud$$cd%20${CHE_PROJECTS_ROOT}/AoCSampleApp%20%26%26%20npm%20install">Build the Application</a><br><br>

<br>


<p>Halt! Identify yourself! Follow the steps below to obtain your credentials and configure the application </p>
<br>
<ol>
  <li>Head over to <a title= "IBM API Hub" href="https://developer.ibm.com/apis/">IBM API Hub</a> and sign in with your IBM ID</li><br>
  <li>Subscribe to the <a title= "AoC Subscribe" href="https://developer.ibm.com/apis/catalog/aspera--aspera-on-cloud-api/Introduction">Aspera on Cloud API</a></li><br>
  <li>In a few mins, you should be able to "Launch" the IBM Aspera on Cloud Platform, and login with your IBM ID</li><br>
  <li>Once you're in, Click the "Admin" App </li><br>
  <li>Great! Let's get the credentials. To do that, Go to "Integrations" and then to "API clients" </li><br>
  <li>Click "Create new" and type in "my-custom-integration", and check the box right below it  </li><br>
  <li>Under "Redirect URIs" give a name and select it. Click "Save". Voila! Your Client ID and Client Secret's here! </li><br>
  <li>We're almost done! Within the same tab, next to 'Profile', go to 'JSON Web Token Auth'. Beside 'Settings', check both the boxes </li><br>
  <li>Next to 'Keys', under "Allowed keys", choose "User-specific keys and global key", and paste the following under "Public Key (PEM Format)"</li><br>
    <p>       -----BEGIN PUBLIC KEY-----
          MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAyklcsZFn99KW77qMIs8K
          X5EmATzIsLfwbpOG5B+lUMQGsp1kFwqMzSZaf0b4fuyKKBqSCpj8bqhUmUxFkjPM
          vpIz0zduqLyBDt+JMZbD4E6Rxg797WnCHuVVgOK74dYf4KdfiJ0OUua6frqavFL+
          mhvNp6uTCfmLBfWVqnCKjht80zib7n+M00Y7zht6ZDTrxcGMH2qtqoYSI77YZGxg
          ndw7SLcehicHVzST7KzepkQvAYMexM/eiLeaDj6ymfwflvJHH8J3i9LfBJZ0/mUa
          XbgOSn7VCv5rZB6gpihsic4Gs2nn9I7cxOQS/XLmaVfgsGiIpUfNA7cby/Q7bf/w
          uBy6beoI0a5nxr4z8MdrK2e1HXhOnG8TXSFQAulGMOPP6exZaeiWk+/3xTRFjrsP
          B8/A5iDtvF0BvL6OY868HwnT+vitvtq4JdH1gAY8An0Unh+vnZqPhl9jWOjycXQJ
          HWo8g3P1uqgJL0dkHfBDHObfYTZuiEFjbJgAO3MLesbX7mTSkva5ZA7/o5awKbY7
          VEgA0p1sSgFxEdYlZKAyra3bAL4iQ9j8B/3kPyQDMfYB4lZwV7Qdp+iAho7UjYaB
          bQds3PxeeEmDyI0a2qa6wrxfJllDDGW9b2eGnlZvXZunt57JLHLcJ32YAEYjEm7W
          owXAMbm9fMi6X5aEyVbqI4cCAwEAAQ==
              -----END PUBLIC KEY-----
  </p>

  <li>Click "Save". We've now completed the Authentication setup! </li><br>
  <li>Let's get the credentials by configuring the application </li><br>
</ol>
<a class="button is-dark is-medium" title="Configure the Application" href="didact://?commandId=vscode.open&projectFilePath=AoCSampleApp/.env">Configure the Application</a><br><br>
<br>

<p> You're all set to get started! </p>
<a class="button is-dark is-medium" title="Launch the Application" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=AsperaonCloud$$cd%20${CHE_PROJECTS_ROOT}/AoCSampleApp%20%26%26%20npm%20start&completion=The%20application%20has%20been%20launched.">Launch the Application</a><br><br>

<p>You will see a dialog box saying "The application has been launched" </p>

<br>

<p> If you'd like to make changes and explore the application, make sure to stop it first! </p>
<a class="button is-dark is-medium" title="Stop Application" href="didact://?commandId=vscode.didact.sendNamedTerminalCtrlC&text=AsperaonCloud" >Stop Application</a><br><br>

<br>

<p> The stage is yours! </p>
<a class="button is-dark is-medium" title="Explore the Code" href="didact://?commandId=workbench.view.explorer">Explore the Code</a><br><br>

<br>

<p> To view the changes you've made, re-launch the application </p>
<a class="button is-dark is-medium" title="Re-Launch the Application" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=AsperaonCloud$$cd%20${CHE_PROJECTS_ROOT}/AoCSampleApp%20%26%26%20npm%20start&completion=The%20application%20has%20been%20launched.">Re-Launch the Application</a><br><br>



<p> Want to explore this project more? Head over to <a href = "https://github.com/IBM/Developer-Playground/tree/master" > the GitHub Repository</a> </p>

</ol>
<br/>


</div>
</body>
</html>
