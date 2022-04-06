# Developer-Playground
Steps to run the application locally or deploy to IKS:

1. Install ibmcloud cli: https://cloud.ibm.com/docs/cli?topic=cli-install-ibmcloud-cli
2. Clone the repo.
    ``` 
    git clone -b agro-chatbot https://github.com/IBM/Developer-Playground.git
    ```
3. Install Dependencies.
    ```
    cd Developer-Playground/Agro-Smart-Assistant/chatbot && npm install && cd Developer-Playground && pip3.8 install -r requirements.txt
    ```
4. Login to IBM Cloud CLI.
    ```
    cd Developer-Playground/Agro-Smart-Assistant/scripts && chmod +x ./login.sh && ./login.sh
    ```
5. After loging in successfully,execute the following coomand which will create all the required services.
    ```
    chmod +x ./create-ibm-services.sh && ./create-ibm-services.sh
    ```
### Create a New Deployment Space and Deploy the Model using Watson Machine Learning

6. Generate an API Key in the IBM account. This is required to access the model for our Cloud Function.
    ```
    cd Developer-Playground;ibmcloud iam api-key-create ApiKey-SVA -d 'this is API key for Smart Virtual Assitant' --file Developer-Playground/key_file
    ``` 
7. Create a new deployment space with the pre-loaded model. Make sure your [IBM Cloud Pak for Data](https://dataplatform.cloud.ibm.com/) account is        active in the region given in terminal.
    ```
    cd Developer-Playground/Agro-Smart-Assistant/deployment-files && python3 create_space.py
    ```
    If your model import failed, follow these [steps](error.md)
10. Install docker(https://docs.docker.com/get-docker/) or podman(https://podman.io/getting-started/installation)
11. Build Docker Image (docker build -t docker_username/video_insights .), To run the image locally execute (docker run -p 8080:8080 -it docker_username/video_insights)
12. Push the image to docker registry(https://hub.docker.com or quay.io), docker login, use your creds to login, once successfully logged in, push the image to the registry(docker push docker_username/video_insights)
13. Once the image is pushed to docker registry, go to deployment.yaml file, and replace IMAGE_NAME with your image i.e (docker_username/video_insights)
14. To connect the cli to the IKS(IBM Kubernetes Service) follow the below steps:
15. Create IBM Kubernetes cluster (https://cloud.ibm.com/kubernetes/catalog/create) or use the existing cluster.
16. Execute the following command in the terminal, replace the CLUSTER_ID with the created cluster_id(ibmcloud ks cluster config --cluster CLUSTER_ID)
17. Set the kubectl context by executing this command (kubectl config current-context).
18. To deploy the application, execute the command (kubectl apply -f deployment.yaml)
19. To get the deployed IP, execute (kubectl get nodes -o wide), copy the value under EXTERNAL-IP(eg:159.122.177.131), to get the port number, execute (kubectl get services), under the PORT(S) section, copy the 5 digit port number. eg: If the value is 5000:31001/TCP, the 5 digit port number is 31001. Go to any browser and load the endpoint which is EXTERNAL-IP:ROUTE (eg: 159.122.177.131:31001)
