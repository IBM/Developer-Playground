# IBM Developer Technology Sandbox

Steps to run **Weather Data Assistant for Travel**
1. [Steps to run application locally](#1-steps-to-run-application-locally)
2. [Steps to deploy application to IKS](#2-steps-to-deploy-application-to-iks)

## 1. Steps to run application locally

1. Clone the source code.
    ``` 
    git clone -b weather https://github.com/IBM/Developer-Playground.git && cd Developer-Playground
    ```
3. Install application dependencies.
    ```
    cd WeatherDataAssistant && npm config set @here:registry https://repo.platform.here.com/artifactory/api/npm/maps-api-for-javascript/ && npm install --production
    ```
4. Obtain required credentials to run the application.
* [Sign up](https://epwt-www.mybluemix.net/software/support/trial/cst/welcomepage.wss?siteId=1525&tabId=4159&w=1&_ga=2.232934494.1143069578.1643043347-1238955782.1642421092) for The Weather Company Data trial (It might take up to 48 hours to get an API Key provisioned).
* Obtain HERE credentials, with the following steps:
  * [Subscribe](https://developer.here.com/sign-up?create=Freemium-Basic&keepState=true&step=account) to the HERE Public Transit API.
  * Sign up for 'HERE Developer'.
  * Login to your HERE account, navigate to Projects > REST.
  * Go to OAuth2.0 > Generate App and click 'Create credentials'.
  * 'Access Key ID' and 'Access Key Secret' is your Client ID and Secret.
  * Proceed to the 'API Keys' section and create your API Key.

5. Configure the application by adding your Weather Data Assistant (API Key) && HERE credentials (Client ID, Client Secret,API Key) to the `.env` file.
6. Launch the application (Weather based).
    ```
    node server.js
    ```
7. Access the application in your browser with this [URL](http://localhost:3100/)


Additionally,
1. Integrate HERE features into the application
    ```
    cat here.txt >>.env && mv here-components/airport.js here-components/hotels.js here-components/transit.js here-components/progcomp.js src/components && cp here-components/App.js src/App.js
    ```
9. Launch the application (Weather and HERE based)
    ```
    node token.js && npm install && export REACT_APP_mode=dev && npm start
    ```
10. Access the application in your browser with this [URL](http://localhost:3100/)



## 2. Steps to deploy application to IKS

1. Install [Docker](https://docs.docker.com/get-docker/) or [Podman](https://podman.io/getting-started/installation).
2. Install [IBM Cloud CLI](https://cloud.ibm.com/docs/cli?topic=cli-install-ibmcloud-cli).
3. Build the Docker Image. 
    ```
    docker build -t docker_username/travel .
    ```
3. To run the image locally execute the following command.
    ```
    docker run -p 3100:3100 -it docker_username/travel
    ```
4. Push the image to a registry like [Docker](https://hub.docker.com) or [Quay](quay.io). Login with your credentials.
    ```
    docker login
    ```
    Then push the image to the registry
    ```
    docker push docker_username/travel
    ```
5. Once the image is pushed to docker registry, go to `deployment.yaml` file, and replace `IMAGE_NAME` with your image i.e (docker_username/travel)
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
