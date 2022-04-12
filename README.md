## Instructions on how to run the application locally on your workstation or deploy to IKS
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
copy the value under EXTERNAL-IP(eg:159.122.177.131), to get the port number, execute 
```
kubectl get services
```
under the PORT(S) section, copy the 5 digit port number. eg: If the value is 5000:31001/TCP, the 5 digit port number is 31001. Go to any browser and load the endpoint which is EXTERNAL-IP:ROUTE (eg: 159.122.177.131:31001)







<!-- This should be the location of the title of the repository, normally the short name -->
# repo-template

<!-- Build Status, is a great thing to have at the top of your repository, it shows that you take your CI/CD as first class citizens -->
<!-- [![Build Status](https://travis-ci.org/jjasghar/ibm-cloud-cli.svg?branch=master)](https://travis-ci.org/jjasghar/ibm-cloud-cli) -->

<!-- Not always needed, but a scope helps the user understand in a short sentance like below, why this repo exists -->
## Scope

The purpose of this project is to provide a template for new open source repositories.

<!-- A more detailed Usage or detailed explaination of the repository here -->
## Usage

This repository contains some example best practices for open source repositories:

* [LICENSE](LICENSE)
* [README.md](README.md)
* [CONTRIBUTING.md](CONTRIBUTING.md)
* [MAINTAINERS.md](MAINTAINERS.md)
<!-- A Changelog allows you to track major changes and things that happen, https://github.com/github-changelog-generator/github-changelog-generator can help automate the process -->
* [CHANGELOG.md](CHANGELOG.md)

> These are optional

<!-- The following are OPTIONAL, but strongly suggested to have in your repository. -->
* [dco.yml](.github/dco.yml) - This enables DCO bot for you, please take a look https://github.com/probot/dco for more details.
* [travis.yml](.travis.yml) - This is a example `.travis.yml`, please take a look https://docs.travis-ci.com/user/tutorial/ for more details.

These may be copied into a new or existing project to make it easier for developers not on a project team to collaborate.

<!-- A notes section is useful for anything that isn't covered in the Usage or Scope. Like what we have below. -->
## Notes

**NOTE: While this boilerplate project uses the Apache 2.0 license, when
establishing a new repo using this template, please use the
license that was approved for your project.**

**NOTE: This repository has been configured with the [DCO bot](https://github.com/probot/dco).
When you set up a new repository that uses the Apache license, you should
use the DCO to manage contributions. The DCO bot will help enforce that.
Please contact one of the IBM GH Org stewards.**

<!-- Questions can be useful but optional, this gives you a place to say, "This is how to contact this project maintainers or create PRs -->
If you have any questions or issues you can create a new [issue here][issues].

Pull requests are very welcome! Make sure your patches are well tested.
Ideally create a topic branch for every separate change you make. For
example:

1. Fork the repo
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

All source files must include a Copyright and License header. The SPDX license header is 
preferred because it can be easily scanned.

If you would like to see the detailed LICENSE click [here](LICENSE).

```text
#
# Copyright 2020- IBM Inc. All rights reserved
# SPDX-License-Identifier: Apache2.0
#
```
## Authors

Optionally, you may include a list of authors, though this is redundant with the built-in
GitHub list of contributors.

- Author: New OpenSource IBMer <new-opensource-ibmer@ibm.com>

[issues]: https://github.com/IBM/repo-template/issues/new
