## Instructions to run the application locally on your workstation or deploy to IKS
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
8. Deploy the model.
    ```
    python3 deploy_model.py
    ```
9. Run the script to update the code file with Model URL.
    ```
    cd Developer-Playground/Agro-Smart-Assistant/scripts && chmod +x ./add_model_url.sh && ./add_model_url.sh
    ```
###  Configure Cloud Functions to access the model

10. Create an Action in cloud functions with web action enabled.
    ```
    cd Developer-Playground/Agro-Smart-Assistant/scripts && python3 create_action.py
    ```
11. Run the script to add API Key parameter to the Action.
    ```
    chmod +x ./add_parameter.sh && ./add_parameter.sh
    ```
12. Run the script to update the Watson Assistant Dialog skill file with the webhook URL to access the Cloud Function.
    ```
    chmod +x ./update_dialog.sh && ./update_dialog.sh
    ```
###  Integrate the Machine Learning Model with Watson Assistant

13. Create the Dialog Skill.
    ```
    cd Developer-Playground/cp4d-smart-virtual-assistant/Agro-Smart-Assistant/chatbot && python3 watson-assistant.py
    ```
14. Open the Assistant URL given in terminal in a new tab. Avoid using the shortcut to open the URL just copy paste the URL in new tab.
15. If the below screen is displayed, click on the profile icon and select "Switch to classic experience".

<img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/section_4.2_assistant.png" width = "750"/>
16. Click on "Create assistant".

<img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/section_4.3_assistant.png" width = "550"/>
17. Enter the name of the assistant and click "Create assistant".

<img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/section_4.4_assistant.png" width = "550"/>
18. Once the Assistant is created, click on "Add dialog skill".

<img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/section_4.5_assistant.png" width = "750"/>
19. In the "Add dialog skill" window, select the "Add Existing Skill" file and click on the "Crop Recommender" Skill.

<img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/section_4.6_assistant.png" width = "750"/>

### Configure the application

20. Once the skill is created, click on (⋮) on top right and Click on "Assitant Settings".

<img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/section_5.1_chatbot.png" width = "450"/>
21. Copy the Assistant ID and Assistant URL in .env file.

<img src = "https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/section_5.2_chatbot.png" width = "750"/>
    
    ```
    #Add the Assistant ID here
    ASSISTANT_ID=

    #Add the Assistant URL here
    ASSISTANT_URL=
    ```
22. Launch Application.
    ```
    cd Developer-Playground/Agro-Smart-Assistant/chatbot && npm start
    ```
### Deploy to Docker

1. Install docker(https://docs.docker.com/get-docker/) or podman(https://podman.io/getting-started/installation)
2. Build Docker Image 
    ```
    docker build -t docker_username/agro-smart-assistant .
    ```
3. To run the image locally execute the following command.
    ```
    docker run -p 8080:8080 -it docker_username/agro-smart-assistant
    ```
4. Push the image to docker registry(https://hub.docker.com or quay.io)
    ```
    docker login
    ```
    use your creds to login, once successfully logged in, push the image to the registry
    ```
    docker push docker_username/agro-smart-assistant
    ```
5. Once the image is pushed to docker registry, go to deployment.yaml file, and replace IMAGE_NAME with your image i.e (docker_username/video_insights)
6. To connect the cli to the IKS(IBM Kubernetes Service) follow the below steps:
7. Create IBM Kubernetes cluster (https://cloud.ibm.com/kubernetes/catalog/create) or use the existing cluster.
8. Execute the following command in the terminal, replace the CLUSTER_ID with the created cluster_id
    ```
    ibmcloud ks cluster config --cluster CLUSTER_ID
    ```
9. Set the kubectl context by executing this command 
    ```
    kubectl config current-context
    ```
10. To deploy the application, execute the command 
    ```
    kubectl apply -f deployment.yaml
    ```
11. To get the deployed IP, execute 
    ```
    kubectl get nodes -o wide
    ```
    copy the value under EXTERNAL-IP(eg:159.122.177.131)
    to get the port number, execute 
    ```
    kubectl get services
    ```
    under the PORT(S) section, copy the 5 digit port number. eg: If the value is 5000:31001/TCP, the 5 digit port number is 31001. Go to any browser and load the endpoint which is EXTERNAL-IP:ROUTE (eg: 159.122.177.131:31001)
