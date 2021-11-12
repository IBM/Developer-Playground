

### One time setup of your CLI tools:
```

curl -sL https://ibm.biz/idt-installer | bash
```

### Accessing your cluster

  - Log in to your IBM Cloud account. Include the --sso option if you have a federated ID.
```

ibmcloud login -a cloud.ibm.com -r eu-de -g <resourceGroupName>
```

  - Set the Kubernetes context to your cluster for this terminal session. For more information about this command, [see the docs](https://cloud.ibm.com/docs/containers?topic=containers-cli-plugin-kubernetes-service-cli#cs_cluster_config).

```

ibmcloud ks cluster config --cluster bthjfjff0vmuggo24e2g
```

  -  Verify that you can connect to your cluster.
 ```

 kubectl config current-context
 ```

 Now, you can run kubectl commands to manage your cluster workloads in IBM Cloud! For a full list of commands, see the [Kubernetes docs](https://kubectl.docs.kubernetes.io/).


ibmcloud plugin install container-registry -r 'IBM Cloud'
ibmcloud login -a https://cloud.ibm.com
ibmcloud cr region-set us-south
ibmcloud cr namespace-add <my_namespace>
ibmcloud cr login
docker tag my-watson-assistant-backend us.icr.io/gurudev/my-watson-assistant-backend:latest
docker push us.icr.io/gurudev/my-watson-assistant-backend:latest


docker tag sinny777/smartthings-keycloak:latest us.icr.io/smartthings/smartthings-keycloak:latest
docker push us.icr.io/smartthings/smartthings-keycloak:latest


ibmcloud cr image-list


docker tag postgres:10.4 us.icr.io/smartthings/postgres:10.4
docker push us.icr.io/smartthings/postgres:10.4


ibmcloud ks cluster ls
ibmcloud ks cluster get --cluster mycluster-free | grep Ingress


ibmcloud ks worker ls --cluster mycluster-free



## DevOps Pipeline for Kubernetes Deployment

### CHECK DOCKERFILE

```

#!/bin/bash
# uncomment to debug the script
# set -x
# copy the script below into your app code repo (e.g. ./scripts/check_dockerfile.sh) and 'source' it from your pipeline job
#    source ./scripts/check_prebuild.sh
# alternatively, you can source it from online script:
#    source <(curl -sSL "https://raw.githubusercontent.com/open-toolchain/commons/master/scripts/check_dockerfile.sh")
# ------------------
# source: https://raw.githubusercontent.com/open-toolchain/commons/master/scripts/check_dockerfile.sh

# This script lints Dockerfile.
source <(curl -sSL "https://raw.githubusercontent.com/open-toolchain/commons/master/scripts/check_dockerfile.sh")

```

### CHECK REGISTERY

```
#!/bin/bash
# uncomment to debug the script
# set -x
# copy the script below into your app code repo (e.g. ./scripts/check_registry.sh) and 'source' it from your pipeline job
#    source ./scripts/check_registry.sh
# alternatively, you can source it from online script:
#    source <(curl -sSL "https://raw.githubusercontent.com/open-toolchain/commons/master/scripts/check_registry.sh")
# ------------------
# source: https://raw.githubusercontent.com/open-toolchain/commons/master/scripts/check_registry.sh

# This script checks presence of registry namespace.
source <(curl -sSL "https://raw.githubusercontent.com/open-toolchain/commons/master/scripts/check_registry.sh")

```

### BUILD CONTAINER IMAGE

```

#!/bin/bash
# uncomment to debug the script
# set -x
# copy the script below into your app code repo (e.g. ./scripts/build_image.sh) and 'source' it from your pipeline job
#    source ./scripts/build_image.sh
# alternatively, you can source it from online script:
#    source <(curl -sSL "https://raw.githubusercontent.com/open-toolchain/commons/master/scripts/build_image.sh")
# ------------------
# source: https://raw.githubusercontent.com/open-toolchain/commons/master/scripts/build_image.sh

# This script does build a Docker image into IBM Container Service private image registry.
# Minting image tag using format: BUILD_NUMBER-BRANCH-COMMIT_ID-TIMESTAMP
# Also copies information into a build.properties file, so they can be reused later on by other scripts (e.g. image url, chart name, ...)
source <(curl -sSL "https://raw.githubusercontent.com/open-toolchain/commons/master/scripts/build_image.sh")

```

### CHECK VULNERABILITIES

```

#!/bin/bash
# uncomment to debug the script
# set -x
# copy the script below into your app code repo (e.g. ./scripts/check_vulnerabilities.sh) and 'source' it from your pipeline job
#    source ./scripts/check_vulnerabilities.sh
# alternatively, you can source it from online script:
#    source <(curl -sSL "https://raw.githubusercontent.com/open-toolchain/commons/master/scripts/check_vulnerabilities.sh")
# ------------------
# source: https://raw.githubusercontent.com/open-toolchain/commons/master/scripts/check_vulnerabilities.sh
# Check for vulnerabilities of built image using Vulnerability Advisor
source <(curl -sSL "https://raw.githubusercontent.com/open-toolchain/commons/master/scripts/check_vulnerabilities.sh")

```

### DEPLOY TO KUBERNETES

```

#!/bin/bash
# uncomment to debug the script
# set -x
# copy the script below into your app code repo (e.g. ./scripts/check_and_deploy_kubectl.sh) and 'source' it from your pipeline job
#    source ./scripts/check_and_deploy_kubectl.sh
# alternatively, you can source it from online script:
#    source <(curl -sSL "https://raw.githubusercontent.com/open-toolchain/commons/master/scripts/check_and_deploy_kubectl.sh")
# ------------------
# source: https://raw.githubusercontent.com/open-toolchain/commons/master/scripts/check_and_deploy_kubectl.sh

# This script checks the IBM Container Service cluster is ready, has a namespace configured with access to the private
# image registry (using an IBM Cloud API Key), perform a kubectl deploy of container image and check on outcome.
source <(curl -sSL "https://raw.githubusercontent.com/open-toolchain/commons/master/scripts/check_and_deploy_kubectl.sh")

```
