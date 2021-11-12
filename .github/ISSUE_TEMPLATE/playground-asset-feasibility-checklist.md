---
name: Playground Asset Feasibility Checklist
about: This will capture all the details about the Asset to identify the feasibility
  of getting any asset onto Playground
title: "[New Asset] - "
labels: ''
assignees: ''

---

Asset Name: 
Asset Description: 
Contact email: 

Please provide the following details for us to identify the feasibility of getting the asset onto Playground
1. Is a sample application available?
2. Is the github repo public so the code can be downloaded without credentials?
3. What technologies are used to build the asset? Node, React, Angular, R, Python,  others? 
4. Is the asset Dockerised? Playground has a template to run docker images in a consistent manner.
5. Which IBM Services are used in the sample application?
Paid
Free
6. Can any of the IBM services be created via API? This would allow a script from within Playground to create the services, without the need to switch to a Cloud account  in a different browser tab. 
7. Does any of the IBM services used, need to be created and configured manually by going to IBM Cloud via the browser?
8. Would the asset need an upload/download feature for files, images or datasets?  
9. Does the asset endpoint have a size limitation for the upload of files, images or datasets? Playground currently has a upload size limitation of 50 MB. Would that be a restriction for the sample application?
10. Is it a client/server (backend/frontend) model with both built and launched in playground?
11. If the server has to be built and run on playground, the server url would be dynamic. Does the client need the server url to be updated into its sources/config before building and launching the client? 
12. Are jupyter notebooks used in the asset? 
13. Do the notebooks have other files (for eg: datasets)  that they refer to in an of the cells?
14. What is the size of the data sets used in the notebook? 
15. If the datasets are huge, Playground might have memory issue with loading them, since every user workspace has a limited memory and CPU. Can the datasets be reduced in size?
