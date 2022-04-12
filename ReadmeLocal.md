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
