# Developer-Playground
Steps to run the application locally or deploy to IKS:

1. Install ibmcloud cli: https://cloud.ibm.com/docs/cli?topic=cli-install-ibmcloud-cli
2. Clone the repo. 
```
git clone -b churn-prediction https://github.com/IBM/Developer-Playground.git churn-prediction && cd churn-prediction
```
3. Install required dependencies for executing python scripts. 
```
pip3.8 install -r requirements.txt
```
4. Install required dependencies for executing node customer churn prediction application. 
```
npm install
```
5. Login to IBM cloud. 
```
chmod +x ./login.sh && ./login.sh
```
6. After loging in successfully, execute the following command which will create all the required services.
```
chmod +x ./create-ibm-cloud-services.sh && ./create-ibm-cloud-services.sh
```
7. To fetch IBM API Key execute the below command. 
```
ibmcloud iam api-key-create ApiKey-bankLoan -d 'thisisAPIkeyforbankLoan' --file key_file
```
8. Create a new deployment space with the pre-loaded model. Make sure your IBM Cloud Pak for Data account is active: https://dataplatform.cloud.ibm.com then execute the below command.
```
python3.8 create_space.py
```
9. Next, you need to train and deploy the model by executing below command
```
python3.8 DeployModel/DeploySavedModel.py
```
10. Launch the application. 
```
npm start
```
### Deploy to Docker
1. Install docker(https://docs.docker.com/get-docker/) or podman(https://podman.io/getting-started/installation)
2. Build Docker Image 
```
docker build -t docker_username/churn-prediction .
```
3. To run the image locally execute the below command. 
```
docker run -p 8080:8080 -it docker_username/churn-prediction
```
4. Push the image to docker registry(https://hub.docker.com or quay.io), 
```
docker login
```
Use your creds to login, once successfully logged in, push the image to the registry 
```
docker push docker_username/churn-prediction
```
5. Once the image is pushed to docker registry, go to deployment.yaml file, and replace IMAGE_NAME with your image i.e 
```
docker_username/churn-prediction
```
6. To connect the cli to the IKS(IBM Kubernetes Service) follow the below steps:

* Create IBM Kubernetes cluster (https://cloud.ibm.com/kubernetes/catalog/create) or use the existing cluster.
* Execute the following command in the terminal, replace the CLUSTER_ID with the created cluster_id 
```
ibmcloud ks cluster config --cluster CLUSTER_ID
```
* Set the kubectl context by executing this command 
```kubectl config current-context```
7. To deploy the application, execute the command 
``
kubectl apply -f deployment.yaml
```
8. To get the deployed IP, execute 
```
kubectl get nodes -o wide
```
copy the value under EXTERNAL-IP(eg:159.122.177.131), to get the port number, execute 
```
kubectl get services
```
under the PORT(S) section, copy the 5 digit port number. eg: If the value is 5000:31001/TCP, the 5 digit port number is 31001. Go to any browser and load the endpoint which is EXTERNAL-IP:ROUTE (eg: 159.122.177.131:31001)
