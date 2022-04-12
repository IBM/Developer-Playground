# Create a web based intelligent bank loan application for a loan agent

In this code pattern we will create a web based bank loan application. In a typical bank loan department,  the loan agent will recieve an application from a customer. This loan agent will then consider several factors in order to come to a conclusion of whether loan can be approved or rejected. To ease this decision making process, we build a web based application that the loan agent can use to make these decisions.  This will enable the loan agent to analyze the risk involved while trying to approve loan. The web application is built using Python Flask.

When the reader has completed this code pattern they will understand how to:

* Deploy a Python based web application
* Make a Watson Machine Learning REST API call through web application
* Send and receive messages to a machine learning model deployed using Watson Machine Learning using REST APIs
* Integrate Cloud Pak For Data's Watson Machine Learning services in a web app

![architecture](doc/source/images/architecture.png)

## Flow

1. Application developer builds a python based app and deploys it.  
2. Loan Customer approaches the loan agent for a loan through the bank.
3. Loan agent submits loan details through the web based application and gets back risk analysis.
4. Based on the risk analysis results, the loan agent makes a decision about loan application.
5. This result is relayed back to the customer by the loan agent.

## Included components

* [Cloud Pak for Data](https://www.ibm.com/products/cloud-pak-for-data/): A fully-integrated data and AI platform that modernizes how businesses collect, organize and analyze data to infuse AI throughout their organizations.
* [Watson Machine Learning](https://www.ibm.com/cloud/machine-learning/): Deploy models built with IBM Watson Studio and open source tools.

## Featured technologies

* [Flask](http://flask.pocoo.org/): Python is a programming language that lets you work more quickly and integrate your systems more effectively.

## Intelligent loan agent application

This app internally makes REST API calls to the model deployed using *Watson Machine Learning*. [This](https://developer.ibm.com/tutorials/infuse-a-loan-department-platform-with-ai/) tutorial shows us how Watson Studio instances on Cloud Pak for Data can be used to build a model that would predict the risk involved with a loan application. It also covers how this risk model can be deployed using Watson Machine Learning instances on Cloud Pak for Data.

## Deployment options

Click on one of the options below for instructions on deploying the app.

|   |   |   |
| - | - | - |
| [![openshift](https://raw.githubusercontent.com/IBM/pattern-utils/master/deploy-buttons/openshift.png)](doc/source/openshift.md) | [![public](https://raw.githubusercontent.com/IBM/pattern-utils/master/deploy-buttons/cf.png)](doc/source/cf.md) | [![local](https://raw.githubusercontent.com/IBM/pattern-utils/master/deploy-buttons/local.png)](doc/source/local.md) |

## Sample Loan Submission

 Once the application is deployed via one the three options discussed above and the application is launched, the loan agent can enter loan details of an applicant and review response as shown below.
![sample output](doc/source/images/LoanApplication-demo.gif)

## License

This code pattern is licensed under the Apache License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1](https://developercertificate.org/) and the [Apache License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache License FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)


## Instructions to run the application locally on your workstation or deploy to IKS
Steps to run the application locally or deploy to IKS:

1. Install ibmcloud cli: https://cloud.ibm.com/docs/cli?topic=cli-install-ibmcloud-cli
2. Clone the repo.
```
git clone -b bank-loan https://github.com/IBM/Developer-Playground.git bank-loan && cd bank-loan/bankloan
```
3. Install the dependencies for executing python scripts.
```
pip3.8 install -r requirements.txt
```
4. Login to IBM cloud. 
```
chmod +x ./script/login.sh && ./script/login.sh
```
5. After loging in successfully, execute the following command which will create all the required services.
```
chmod +x ./script/create-ibm-cloud-services.sh && ./script/create-ibm-cloud-services.sh
```
6. To fetch IBM API Key execute below command. 
```
ibmcloud iam api-key-create ApiKey-bankLoan -d 'thisisAPIkeyforbankLoan' --file key_file
```
7. Create a new deployment space with the pre-loaded model. Make sure your IBM Cloud Pak for Data account is active: https://dataplatform.cloud.ibm.com then execute the below command.
```
python3.8 deployment-files/create_space.py
```
>Incase Importing the Model Fails, perform the below steps:
* Step 1 : Login to your IBM CloudPak for Data (https://dataplatform.cloud.ibm.com) account with the Region given in your terminal. Click on <b>Create a Project</b>.
![Create Project](https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/bank-loan-didact1.png) 
* Step 2 : Click on <b>Create a project from sample or file</b>.
![Project From Sample](https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/bank-loan-didact2.png) 
* Step 3: Upload the zip file (bank-loan/bankloan/data/bankLoan.zip). Enter a project <b>Name</b> click <b>Create</b>.
![Upload Zip](https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/bank-loan-didact3.png) 
* Step 4 : After the project is created, click on <b>View new project</b>.
![View Project](https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/bank-loan-didact4.png)
* Step 5 : Click on the <b>Assets</b> tab.
![Assets](https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/bank-loan-didact5.png)
* Step 6 : Click on the <b>(⋮)</b> icon right hand side of the <b>Model</b> and Click on <b>Promote</b>.
![Promote Model](https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/bank-loan-didact6.png)
* Step 7 : On the <b>Target Space</b> drop-down menu, select the deployment space you created (To get the deployment space name check your terminal), Once done click <b>Promote</b>.
![Target Space](https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/bank-loan-didact7.png)
8. Next, you need to deploy the model by executing below command. 
```
python3.8 deployment-files/DeploySavedModel.py
```
9. Launch the application. 
```
python3.8 app.py
```
### Deploy to Docker
1. Install docker(https://docs.docker.com/get-docker/) or podman(https://podman.io/getting-started/installation)
2. Build Docker Image 
```
docker build -t docker_username/bank-loan .
```
3. To run the image locally execute 
```
docker run -p 8080:8080 -it docker_username/bank-loan
```
4. Push the image to docker registry(https://hub.docker.com or quay.io), 
```
docker login
```
Use your creds to login, once successfully logged in, push the image to the registry 
```
docker push docker_username/bank-loan
```
5. Once the image is pushed to docker registry, go to deployment.yaml file, and replace IMAGE_NAME with your image i.e (docker_username/bank-loan)
6. To connect the cli to the IKS(IBM Kubernetes Service) follow the below steps:
* Create IBM Kubernetes cluster (https://cloud.ibm.com/kubernetes/catalog/create) or use the existing cluster.
* Execute the following command in the terminal, replace the CLUSTER_ID with the created cluster_id 
```
ibmcloud ks cluster config --cluster CLUSTER_ID
```
* Set the kubectl context by executing this command 
```
kubectl config current-context
```
7. To deploy the application, execute the command 
```
kubectl apply -f deployment.yaml
```
8. To get the deployed IP, execute 
```
kubectl get nodes -o wide
```
Copy the value under EXTERNAL-IP(eg:159.122.177.131), to get the port number, execute 
```
kubectl get services
```
Under the PORT(S) section, copy the 5 digit port number. eg: If the value is 5000:31001/TCP, the 5 digit port number is 31001. Go to any browser and load the endpoint which is EXTERNAL-IP:ROUTE (eg: 159.122.177.131:31001)

