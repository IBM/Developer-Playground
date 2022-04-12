## Instructions to run the application locally on your workstation or deploy to IKS

Steps to run **HERE Geocoding and Search**
1. [Steps to run application locally](#1-steps-to-run-application-locally)
2. [Steps to deploy application to IKS](#2-steps-to-deploy-application-to-iks)

## 1. Steps to run application locally

1. Clone the source code.
    ``` 
    git clone -b HERE --sparse https://github.com/IBM/Developer-Playground.git && cd Developer-Playground/ && cd git sparse-checkout init --cone && git sparse-checkout add HEREGeocodingandSearch
    ```
3. Install application dependencies.
    ```
    cd HEREGeocodingandSearch && npm install --production
    ```
4. Obtain HERE credentials, with the following steps:
    * [Subscribe](https://developer.here.com/sign-up?create=Freemium-Basic&keepState=true&step=account) to the HERE Geocoding and Search API.
    * Sign up for 'HERE Developer'.
    * Login to your HERE account, navigate to Projects > REST.
    * Go to OAuth2.0 > Generate App and click 'Create credentials'.
    * 'Access Key ID' and 'Access Key Secret' is your Client ID and Secret.
    * Proceed to the 'API Keys' section and create your API Key.

5. Configure the application by adding your HERE credentials (Client ID and Client Secret) to the `.env` file
6. Launch the application.
    ```
    node token.js && node server.js
    ```
7. Access the application in your browser with this [URL](http://localhost:3100/)



## 2. Steps to deploy application to IKS

1. Install [Docker](https://docs.docker.com/get-docker/) or [Podman](https://podman.io/getting-started/installation).
2. Install [IBM Cloud CLI](https://cloud.ibm.com/docs/cli?topic=cli-install-ibmcloud-cli).
3. Build the Docker Image. 
    ```
    docker build -t docker_username/here-geocoding .
    ```
3. To run the image locally execute the following command.
    ```
    docker run -p 3100:3100 -it docker_username/here-geocoding
    ```
4. Push the image to a registry like [Docker](https://hub.docker.com) or [Quay](quay.io). Login with your credentials.
    ```
    docker login
    ```
    Then push the image to the registry
    ```
    docker push docker_username/here-geocoding
    ```
5. Once the image is pushed to docker registry, go to `deployment.yaml` file, and replace `IMAGE_NAME` with your image i.e (docker_username/here-geocoding)
6. To connect the CLI to the IKS(IBM Kubernetes Service) follow the below steps:
* Create a new [IBM Kubernetes cluster](https://cloud.ibm.com/kubernetes/catalog/create) or use an existing IKS cluster.
* Execute the following command in the terminal, replace the `CLUSTER_ID` with the created cluster_id
    ```
    ibmcloud ks cluster config --cluster CLUSTER_ID
    ```
* Set the kubectl context by executing this command 
    ```
    kubectl config current-context
    ```
* To deploy the application, execute the command 
    ```
    kubectl apply -f deployment.yaml
    ```
* To get the deployed IP, execute 
    ```
    kubectl get nodes -o wide
    ```
    copy the value under EXTERNAL-IP(eg:159.122.177.131)
    to get the port number, execute 
    ```
    kubectl get services
    ```
    under the PORT(S) section, copy the 5 digit port number. eg: If the value is 5000:31001/TCP, the 5 digit port number is 31001. Go to any browser and load the endpoint which is EXTERNAL-IP:ROUTE (eg: 159.122.177.131:31001)
