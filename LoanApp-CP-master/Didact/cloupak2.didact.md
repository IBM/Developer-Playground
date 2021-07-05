<html>
<style>
.boxed 
{
  border: 1px solid blue ;
}
</style>
<style>
.btn {
  border: 2px solid gray;
  background-color: #202020;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
}
.info {
  border-color: gray;
  color: gray;
  
}
<style>
html,div,body{
    background-color:#1a1a1a;
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
.h3{
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
​
</style>
<body style="font-family: 'IBM Plex Sans', sans-serif;background-color:#1a1a1a;">
<div style="font-family: 'IBM Plex Sans', sans-serif;background-color:#1a1a1a;">
​
</style>
​
<body>

<img src = "Images/unnamed.jpg" width = "500" height= "500">


<h2 class="title is-3 ">Cloud Pak Sample App</h2>

<p> This sample app aims to showcase the functionalities available on the Cloud Pak platform, with regards to Cloud Pak for Data and Cloud Pak for Integration
</p>

<h3> Getting Started</h3></span>

<span style="color:grey"><h2>1. Create an account on IBM's Cloud Platform</h2></span>

To ensure a completely immersive experience with Cloud Pak services, create an account on IBM's cloud platform.

<a class="button is-dark is-medium" title="Log in here" href="https://dataplatform.cloud.ibm.com/login?context=cpdaas">Log in here</a>
<br/>

 

<span style="color:grey"><h2> 2. Check prerequisites linked to Cloud account</h2></span>

<p> This sample app requires the user to avail certain instances present in the Services catalog. The lite version of these services will suffice. The instances are listed below:</p>


<h5>2.1 Event Streams</h5>
<p>Built on Apache Kafka, IBM Event Streams which is a part of IBM's Cloud Pak for integration is a high-throughput, fault-tolerant, event streaming platform that helps you build intelligent, responsive, event-driven applications.</p>

<h6>Follow the below steps to create an event stream instance and connect your application data to event streams.</h6>

<p>Step1: Click the below button to create event stream instance. Choose lite plan amd select the region and finally click on create button.</p>
<a class="button is-dark is-medium" title="Event Streams" href="https://cloud.ibm.com/catalog/services/event-streams">Event Streams</a><br><br>
<p>Step 2 : After creating the instance you will be re-directed to a page as shown below.Select topic and click on create topic
 </p>
<img src = "./Images/step1-kafka.jpg" width = "500" height= "500">
<p>Step 3 : Give your topic an appropriate name and click next</p>
<img src = "./Images/step2-kafka.jpg" width = "500" height= "500">

<p>Step 4 :Select the number of partitions and click next</p>
<img src = "./Images/step3-kafka.jpg" width = "500" height= "500">

<p>Step 5 : Choose message retention as per requirement and click on create topic.</p>
<img src = "./Images/step4-kafka.jpg" width = "500" height= "500">
<p>Step 6 : Now u can see the topic that you have created under the topics section.Now select service credentials section and click on new credentials.Give the credentials a name and select the role as manager. Once the credentials are created you can view it in the table. Expand the table row and make note of <b>apikey</b>,<b>kafka_brokers_sasl</b></p>
<img src = "./Images/step5-kafka.jpg" width = "500" height= "500">

<h5>2.2 Waston Machine Learning </h5>
<p>IBM Watson Machine Learning helps data scientists and developers accelerate AI and machine learning deployment on IBM Cloud Pak for Data.With watson machine learning you can deploy AI models at scale across any cloud on an open.</p>
<a class="button is-dark is-medium" title="Machine Learning" href="https://dataplatform.cloud.ibm.com/data/catalog/pm-20?context=cpdaas&target=services">Machine Learning</a><br><br>
<a class="button is-dark is-medium" title="Databases for MongoDB" href="https://dataplatform.cloud.ibm.com/data/catalog/databases-for-mongodb?context=cpdaas&target=services">Databases for MongoDB</a><br>

</body>



<!-- <span style="color:grey"><h2>3. Clone the GitHub repo for this Sample App</h2></span>

<p>This Sample app needs to be cloned onto the Developer playground. It only takes a few minutes to do so.</p>


<p href="didact://?commandId=send">
<a class="button is-dark is-medium" title="Clone the GitHub repo" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=nodejs$$git+clone+https://github.ibm.com/SUMANVITA-K/LoanApp-CP">Clone the GitHub repo</a><br> -->

<span style="color:grey"><h2>3.Deploy AutoAI Model</h2></span>

<a class="button is-dark is-medium" title="Build the App" href="didact://?commandId=python.createTerminal">open python terminal</a><br>

<a class="button is-dark is-medium" title="Build the App" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=Python$$cd+projects;cd+LoanApp-CP;pip3+install+-r+requirements.txt;python3+./DeployModel/DeployMLModel.py">Deploy Model</a><br>

<p>This is to deploy the autoAI model to deployment space.The program will ask for API key and space id</p>
<ul><h6>Steps to generate API Key</h6>
<li>
<p>Step 1 : Go to <a href="https://cloud.ibm.com/">IBM cloud</a> and login with your mail id. click on the Manage tab and select Access (IAM), the cloud Identity and Access Management page will be displayed.
 </p>
<img src = "./Images/Step1.jpg" width = "500" height= "500">
</li>
<li>
<p>Step 2 :  Click on API keys on the left panel.</p>
<img src = "./Images/step2.jpg" width = "500" height= "500">
</li>
<li><p>Step 3 : In API keys, click on Create an IBM Cloud API key and give a Name and Description Accordingly as shown</p>
<img src = "./Images/step3.jpg" width = "500" height= "500">
</li>
<li>
<p>Step 4 : Once the API key is generated Successfully, copy the key and paste it in the termial.</p>
<img src = "./Images/step4.jpg" width = "500" height= "500">
</li>
</ul>

<ul><h6>Steps to generate deployment space</h6>
<li>
<p>Step 1 : Go to <a href="https://dataplatform.cloud.ibm.com/">IBM CloudPak for data</a> and login with your mail id. Once you login click on view all spaces button as shown in the figure below.
 </p>
<img src = "./Images/step1-spaceId.png" width = "500" height= "500">
</li>
<li>
<p>Step 2 :  Click on create deployment space.</p>
<img src = "./Images/step2-spaceId.png" width = "500" height= "500">
</li>
<li><p>Step 3 : Give the deployment a name and add a machine learning instance that you have earlier created.Click on create button after filling the details.</p>
<img src = "./Images/step3-spaceID.png" width = "500" height= "500">
</li>
<li>
<p>Step 4 : Click on view deployement space and then select manage tab.Under this tab, copy the space GUID.</p>

</li>
</ul>

<span style="color:grey"><h2>4. Build the App</h2></span>

<p> Build the application to explore it's functionalities within the given terminal.</p>
<a class="button is-dark is-medium" title="Build the App" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=nodejs$$cd+LoanApp-CP;npm+install">Build the App</a><br>

<span style="color:grey"><h4>5.Adding credentials to the App</h4></span>


<p>Add the sasl password value,broker list and topic name collected from the above steps in the .env file </p>

<a class="button is-dark is-medium" title="Edit environment variables" href="didact://?commandId=vscode.open&projectFilePath=.env">Edit environment variables</a><br>

<span style="color:grey"><h2>6.Launch the Application</h2></span>

<p>Upon launching the app,the application will start running. </p>

<a class="button is-dark is-medium" title="Launch the Application" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=nodejs$$npm+start">Launch the Application</a><br>

<a class="button is-dark is-medium" title="Launch the Application" href="didact://?commandId=vscode.didact.sendNamedTerminalCtrlC">stop terminal</a><br>
<!-- <span style="color:grey"><h2>7. Explore the Code.</h2></span>

<a class="button is-dark is-medium" title="Explore the Code" href="didact://?commandId=workbench.view.explorer">Explore the Code</a><br><br>

<p> -->

<span style="color:grey"><h2>7.Delete Deployment</h2></span>



<p>Deleting deployment will help you save CUH.</p>

<a class="button is-dark is-medium" title="Clone the GitHub repo" href="didact://?commandId=vscode.didact.sendNamedTerminalCtrlC&text=Python$$python3+./DeleteDeploy/deleteDeploy.py">Delete deployment</a><br>
