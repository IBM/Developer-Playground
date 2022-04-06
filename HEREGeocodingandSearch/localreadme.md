1. Install ibmcloud cli: https://cloud.ibm.com/docs/cli?topic=cli-install-ibmcloud-cli

2. Clone the repo: `git clone -b HERE --sparse https://github.com/IBM/Developer-Playground.git` 

3. Go to .env file to configure the Application.

5. Install docker(https://docs.docker.com/get-docker/) or podman(https://podman.io/getting-started/installation)

6. Build Docker Image `docker build -t docker_username/here .`, To run the image locally execute `docker run -p 8080:8080 -it docker_username/here` and access the application on http://localhost:8080/

7. Push the image to docker registry(https://hub.docker.com or quay.io), docker login, use your creds to login, once successfully logged in, push the image to the registry `docker push docker_username/here`

8. Once the image is pushed to docker registry, go to deployment.yaml file, and replace IMAGE_NAME with your image i.e `docker_username/here`

9. To connect the cli to the IKS(IBM Kubernetes Service) follow the below steps:

* Create IBM Kubernetes cluster (https://cloud.ibm.com/kubernetes/catalog/create) or use the existing cluster.
* Execute the following command in the terminal, replace the CLUSTER_ID with the created cluster_id `ibmcloud ks cluster config --cluster CLUSTER_ID`
* Set the kubectl context by executing this command `kubectl config current-context`.

15. To deploy the application, execute the command `kubectl apply -f deployment.yaml`

16. To get the deployed IP, execute `kubectl get nodes -o wide`, copy the value under EXTERNAL-IP(eg:159.122.177.131), to get the port number, execute `kubectl get services`, under the PORT(S) section, copy the 5 digit port number. eg: If the value is 5000:31001/TCP, the 5 digit port number is 31001. Go to any browser and load the endpoint which is EXTERNAL-IP:ROUTE (eg: 159.122.177.131:31001)
