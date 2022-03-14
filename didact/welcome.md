<!-- ========================================================
IBM Confidential                                                  
   
OCO Source Materials                                              
   
Copyright IBM Corp. 2021		                                     
     
The source code for this program is not published or otherwise    
divested of its trade secrets, irrespective of what has been      
deposited with the U.S. Copyright Office.                         
                                                                  
============================================================= -->
<!DOCTYPE html>
<html>
<head>

<style>
.head {
	color: #1f5ed1; 
	font-size: 14px
}

/*.par:before {
    content:"• ";
    color:green;
    font-size: 20px;
}*/
.par {
	color: whitesmoke;
}
</style>

</head>
<body style="background-color:#221c1c;font-family:Inv Maison Neue,Maison Neue,-apple-system,BlinkMacSystemFont,Open Sans,open-sans,sans-serif;font-size:13px;">
<div style="padding-left: 20px; padding-right: 200px">

<p align="justify" style="color:whitesmoke; font-size:32px"><b> Welcome to the IBM Developer Playground Guide! </b> </p>
<p align="justify" style="color:whitesmoke; line-height: 1.5; font-size:24px">IBM Developer Playground is a first of its kind cloud-based sandbox. Use the Playground for discovering, editing and running APIs. The Developer Playground makes it easier for you to see multiple APIs working in conjunction with your own code. This helps you determine which APIs work the best for your needs. You can even save and share your work by logging in to your Git account. </p>
<p align="justify" style="color:whitesmoke; line-height: 1.5;font-size:24px">The Developer Playground has multiple sections with assets from API Hub, IBM Developer and IBM Cloud.. </p>

<p align="justify" style="color:whitesmoke; font-size:24px"> <b>Developer Playground IDE Plugin:</b> </p>
<p align="justify" style="color:whitesmoke;line-height: 1.5;;font-size:24px"> The Developer Playground IDE Plugin is on the left side of the screen. It is opened by default when you launch the Developer Playground. It contains the Resource Bar to navigate across API products, additional assets and a code editor window. The Developer Profile can be accessed by selecting the Profile icon</p>

<p align="justify" style="color:whitesmoke; font-size:24px"> <b>Resource Bar:</b> </p>
<p align="justify" style="color:whitesmoke;line-height: 1.5;font-size:24px">  The Resource Bar sits on the left side of the Developer Playground IDE. It has four sections.</p>

<p align="justify" style="color:whitesmoke;line-height: 1.5;font-size:24px"> <font style="color:whitesmoke">1. API Products: </font>This section contains the last five APIs that you launched from APIHub and browsed in the Developer Playground across your sessions. The most recently launched API is displayed at the top of the list.</p>
<p align="justify" style="color:whitesmoke;line-height: 1.5;font-size:24px"> <font style="color:whitesmoke">2. Code Patterns: </font>This section provides Code Patterns which can be used to build solutions for common use cases.</p>
<p align="justify" style="color:whitesmoke;line-height: 1.5;font-size:24px"> <font style="color:whitesmoke">3. Cloud Services: </font> This section provides recommendations of IBM Cloud services which work together with your selected API(s) for creating end to end solutions.</p>
<p align="justify" style="color:whitesmoke;line-height: 1.5;font-size:24px"> <font style="color:whitesmoke">4. API Recommendations: </font>This section provides API Recommendations based on the selected API, your interests & activity in your IBM Developer Profile.</p>

<p align="justify" style="color:whitesmoke; font-size:24px"><b>Code Editor Window:</b></p>
<p align="justify" style="color:whitesmoke;line-height: 1.5;font-size:24px"> The Code Editor Window occupies the center section of the Developer Playground IDE plugin. The Didact Tutorial for the selected API is displayed here. Sample application code, and sample code snippets of the API are opened as new tabs in the Code Editor Window.</p>

<p align="justify" style="color:whitesmoke;line-height: 1.5;font-size:24px"> The final section of the Code Editor Window is the debugging section and displays the relevant information when running an API or sample application.</p>

<p align="justify" style="color:whitesmoke; font-size:24px"><b>Launching Didact Tutorial for selected API:</b> </p>
<p align="justify" style="color:whitesmoke;line-height: 1.5;font-size:24px"> Launching the Developer Playground loads a Didact tutorial in the Code editor window for the selected API product. The Didact tutorial for any of the APIs in the API Products section can be launched by hovering over the API product name and selecting the document icon.</p>

<div style="margin-left: 50px;">
<p align="justify" style="color:whitesmoke; font-size:24px"><i>About Didact: </i></p>
<p align="justify" style="color:whitesmoke;line-height: 1.5;font-size:24px"> <i>The <b>Didact</b> framework is designed to instruct users in a useful way about how to complete tasks through a combination of text (Markdown-or AsciiDoc-formatted), images, and active links that show VS Code functionality in action. Those links are paired with VS Code’s simple command framework to interact with the IDE directly and that provides one-click access to nearly all the functionality VS Code and its extensions have to offer.</i></p> 
</div>

<p align="justify" style="color:whitesmoke; font-size:24px"><b>Executing code snippets for API endpoints:</b> </p>
<p align="justify" style="color:whitesmoke;line-height: 1.5;font-size:24px"> Selecting an API endpoint in the Resource Bar will populate the sample code snippet for it in the code editor window in a new tab. Hovering on an API endpoint will show an execute icon. Selecting it will execute the sample generated code for the API endpoint in a new tab in the code editor window.</p>


<hr>

<p align="justify" style="color:whitesmoke; font-size:24px"><b>Publish your code to Git</b></p>

<li align="justify" style="color:whitesmoke; font-size:24px">Open a Terminal in the theia-ide*** container.</li>
<p align="justify" style="color:whitesmoke; font-size:24px; margin-left: 25px" class="par"> Terminal->Open Terminal in specific container  and select the theia-ide*** container</p>

<li align="justify" style="color:whitesmoke; font-size:24px">Make sure you are in the projects folder</li>
<p align="justify" style="color:whitesmoke; font-size:24px; margin-left: 25px" class="par"> cd /projects</p>

<li align="justify" style="color:whitesmoke; font-size:24px">Clone the repository to push the code</li>
<p align="justify" style="color:whitesmoke; font-size:24px; margin-left: 25px" class="par"> git clone &lt;github repo&gt;</p>

<li align="justify" style="color:whitesmoke; font-size:24px">if you need to clone a particular branch from the repo</li>
<p align="justify" style="color:whitesmoke; font-size:24px; margin-left: 25px" class="par"> git -b &lt;branch&gt; clone &lt;github repo&gt;</p>
<p align="justify" style="color:whitesmoke; font-size:24px; margin-left: 25px" class="par"> Based on the repo being private or public you would be prompted for the username and password for the repo.</p>

<li align="justify" style="color:whitesmoke; font-size:24px">Copy the sample app code into the clone repo.</li>
<p align="justify" style="color:whitesmoke; font-size:24px; margin-left: 25px" class="par"> cp -a &lt;sample app&gt;/. &lt;repo name&gt;/</p>

<li align="justify" style="color:whitesmoke; font-size:24px">Let's switch to the repo folder </li>
<p align="justify" style="color:whitesmoke; font-size:24px; margin-left: 25px" class="par"> cd &lt;repo name&gt;</p>

<li align="justify" style="color:whitesmoke; font-size:24px">Skip unnecessary files from being pushed to repo :</li>
<p align="justify" style="color:whitesmoke; font-size:24px; margin-left: 25px" class="par"> touch .gitignore && echo "node_modules/" >> .gitignore; echo ".git" >> .gitignore</p>

<li align="justify" style="color:whitesmoke; font-size:24px">Let's add all the changes to git: </li>
<p align="justify" style="color:whitesmoke; font-size:24px; margin-left: 25px" class="par"> git add *</p>

<li align="justify" style="color:whitesmoke; font-size:24px">Let's commit all the changes: </li>
<p align="justify" style="color:whitesmoke; font-size:24px; margin-left: 25px" class="par"> git commit -m "Commit Message"</p>

<li align="justify" style="color:whitesmoke; font-size:24px">Let's push all code to the remote repo: </li>
<p align="justify" style="color:whitesmoke; font-size:24px; margin-left: 25px" class="par"> git remote add origin &lt;repo name&gt;</p>
<p align="justify" style="color:whitesmoke; font-size:24px; margin-left: 25px" class="par"> git push -u origin &lt;branch&gt; </p>




</div>
</body>
</html>
