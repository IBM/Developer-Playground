# [MyChatBot](https://my-watson-assistant.mybluemix.net) - IBM Watson Assistant with Discovery Service

## Table of Contents
* [Introduction](#introduction)
* [Architecture Design](#architecture-design)
* [How it Works](#how-it-works)
* [Run Locally](#run-locally)
  * [Getting Started](#getting-started)
  * [Setting Local Environment](#setting-local-environment)
  * [Application Configurations](#application-configurations)
  * [Running the App](#running-the-app)
  * [Testing the app](#testing-the-app)
  * [Channels Integration](#channels-integration)
* [License](#license)
* [References](#references)

## INTRODUCTION

This repository can help you quickly getting started with IBM Watson services like Watson Assistant, Watson Discovery, Speech To Text etc.  This serves as a complete framework for both server side code and front end and also provides an architecture design for implementing a solution (quickly and with no compromises).

This shows the capabilities of [Watson Assistant](https://console.bluemix.net/docs/services/conversation/index.html#about) and [Watson Discovery](https://console.bluemix.net/docs/services/discovery/index.html) services to work together to find answers on a given query. In this sample app, the user is chatting with a virtual car dashboard, giving it commands in plain English such as "Turn on the wipers," "Play me some music," or "Let's find some food." If the user makes a request and Watson Assistant is not confident in its answer (e.g. "How do I check my tire pressure?"), Discovery will search the car manual and return the most relevant results, if relevant materials exist.

### Demo URL: [https://my-watson-assistant.mybluemix.net](https://my-watson-assistant.mybluemix.net)
  - Credentials to login: guest / P@ssw0rd
  - Follow [Testing the app](#testing-the-app)

## ARCHITECTURE DESIGN

Below diagram shows the overall architecture of a complete solution that uses Watson Assistant as a backbone of the whole application:

<!-- ![Architecture Design](https://github.ibm.com/gurvsin3/virtualagent/raw/master/docs/VirualAssitant_Architecture_V1.png) -->

<p align="center">
  <img width="600" src="https://github.ibm.com/gurvsin3/virtualagent/raw/master/docs/VirualAssitant_Architecture_V1.png">
</p>

## HOW IT WORKS

Under the hood, there are two components to this app:
* Front-end (Angular based), which is simply static assets (HTML, CSS and JS etc.)
* Other component is the nodejs (Loopback framework) based server side logic:
  * When the user inputs text, the UI sends the current context and input to the server. These are processed by Watson Assistant service and returned, with an output and new context. The results are sent to the next action.
  * The Discovery action checks for a flag from the Assistant output, and if it is present takes the original input and queries the manual with it. If there is no flag, the Assistant results pass through the function unchanged. The Server returns the output and updated context back to the UI.
  * You can enable/disable Watson Discovery and channels integrations by updating the configuration in backend DB (in mappings datasource).
  * If you want a response to be saved in Cloudant DB, then just add following context variable to Watson Assistant request:
  ```
  "context": {
    "save_in_db": true
  }
  ```

## RUN LOCALLY

### Getting Started
1. If you don't already have an IBM Cloud account, you can sign up [here](https://console.bluemix.net/?cm_mmc=GitHubReadMe)
> First of all create a Cloudfoundry applicaiton on IBM Cloud.  Create a Node JS starter application (Catalog -> Cloud Foundry apps -> SDK for Node JS), and bind following services to it:
  - CloudantNoSQL DB
  - Watson Assistant
  - Watson Discovery (Optional)
  - Object storage (Optional): Create an instance of Object storage of the type “Object Storage OpenStack Swift”
  Note: By default object storage instance of the type “Cloud Object Storage” would get created. To create object storage of required type, after selecting Object Storage instance from the catalog, one need to click on “Compare Versions” button on top right, and select “Object Storage OpenStack Swift” and then click on “Create” to create the service instance.

2. Clone (or fork) this repository, and go to the new directory
```bash
git clone https://git.ng.bluemix.net/gurvsin3/my-watson-assistant.git
cd my-watson-assitant
```

3. Install [Node.js](https://nodejs.org) (Versions >= 10).

4. In the root directory of your repository, install the project dependencies.
```bash
npm install
```

#### Issues running on Windows Machine
There are a few issues you may face while trying to run the application on a Windows machine:
  - Issue related to node-gyp rebuild, “The build tools for v141 (Platform tools) not found” error
    Resolution: Run following command to install windows build tools.

    ```bash
    npm install --global --production windows-build-tools
    ```

  - dezalgo ENOENT npm install error
    Resolution: npm can be upgraded by running the following command

    ```bash
    npm i -g npm
    ```

  - Fatal error LNK1181: cannot open input file c:\OpenSSL-Win64\lib\libeay32.lib
    Resolution: Install OpenSSL in default path, after which the required lib file will be in place. https://www.openssl.org/

### Setting local environment

Copy the contents of .env.example file in root directory to .env file and replace the values for each property as per your application requirement

#### Setting Front end

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.0.

#### Client side build (Using Angular)

```bash
cd client
npm install
ng build
# ng build --configuration=production
```

#### Setting Server Side Code

Install the demo app package into the local Node.js runtime environment.  Run below command in the root folder of the app:

    ```bash
    npm install
    ```

#### Build and Run as Docker Containers

 - Create Docker network to run all containers on the same network Bridge

 ```
 docker network create my-network

 ```

 - Build and run single docker container for both front end and backend
  ```
  docker build --build-arg CLIENT_BUILD_ENV=docker -t my-watson-assistant:latest .

  docker run -it -d -p 3000:3000 --network my-network --name my-watson-assistant-all --env-file ./app/.env my-watson-assistant:latest

  ```

- Build and run docker container for backend only
  ```
  cd app
  docker build -t my-watson-assistant-backend:latest .

  docker run -it -d -p 3000:3000 --network my-network --name my-watson-assistant-backend --env-file .env my-watson-assistant-backend:latest

  ```

- Build and run docker container for front end separately
  ```
  cd client
  docker build --build-arg CLIENT_BUILD_ENV=docker -t my-watson-assistant-client:latest .

  docker run -it -d -p 80:80 --network my-network --name my-watson-assistant-client my-watson-assistant-client:latest

  ```

- Run Cloudant DB as Docker container locally
```
docker run --detach --volume cloudant:/srv --name cloudant-developer --network my-network --publish 9001:80 --hostname cloudant.dev ibmcom/cloudant-developer

docker run --detach --volume cloudant:/srv --name cloudant-developer --publish 9001:80 --hostname cloudant.dev ibmcom/cloudant-developer

```

### Application Configurations

Once your app is running on port 3000 (http://localhost:3000), the first thing you need to do is to configure your application.  There are following steps required:

1. In your CloudantDB, create following datasources (all smallcase):

* accounts
* identities
* mappings
* conversations
* roles
* rolemappings

2. You need a make a POST REST call with data in following JSON format:

```
{
    "key": "APP_CONFIG",
    "output": {
        "WATSON_ASSISTANT": {
            "API_KEY": "REPLACE_WITH_WATSON_ASSISTANT_API_KEY",
            "ASSISTANTS": [
                {
                    "name": "REPLACE_WITH_WATSON_ASSISTANT_NAME",
                    "id": "REPLACE_WITH_WATSON_ASSISTANT_ID",
                    "default": true
                }
            ]
        },
        "WATSON_DISCOVERY": {
            "ENABLE": true,
            "API_KEY": "REPLACE_WITH_WATSON_DISCOVERY_API_KEY",
            "ENVIRONMENT_ID": "REPLACE_WITH_WATSON_DISCOVERY_ENVIRONMENT_ID",
            "CONFIGURATION_ID": "REPLACE_WITH_WATSON_DISCOVERY_CONFIGURATION_ID",
            "COLLECTION_ID": "REPLACE_WITH_WATSON_DISCOVERY_COLLECTION_ID"
        },
        "WATSON_STT_API_KEY": "REPLACE_WITH_WATSON_STT_API_KEY",
        "ENABLE_SLACK": true,
        "SLACK_BOT_USER_TOKEN": "REPLACE_WITH_SLACK_BOT_USER_TOKEN",
        "SLACK_SIGNIN_SECRET": "REPLACE_WITH_SLACK_SIGNIN_SECRET",
        "ENABLE_MS_BOT": false,
        "MS_BOT_APP_ID": "REPLACE_WITH_MS_BOT_APP_ID",
        "MS_BOT_APP_PASSWORD": "REPLACE_WITH_MS_BOT_APP_ID"
    }
}

```
* METHOD: POST
* ENDPOINT_URL: http://localhost:3000/api/Mappings
* HEADERS:
  > Accept: application/json
  > Content-Type: application/json
  > X-IBM-client-Id: default
  > X-IBM-client-Secret: SECRET

You can use following postman collection:

[my-assistant-demo.postman_collection.json](https://github.ibm.com/gurvsin3/virtualagent/raw/master/docs/my-assistant-demo.postman_collection.json)

### Running the App

**There are two ways of running this app.**

1. Both Server side and client side build together on a single port (3000)

    ```bash
    npm run serve
    ```

2. Running both standalone

a. Start the server side app (NodeJs - Loopback framework based):

    ```bash
    npm start
    ```
    Now your server side application should be running on port 3000 (http://localhost:3000)

b. In new terminal tab, install Client build dependencies

  ```bash
  cd client
  npm install
  ```
c. Run the Client side build (Angular framework)

  ```bash
  ng serve
  ```
  Now static build should be running on port 4200 (http://localhost:4200)

d. Point your browser to http://localhost:4200 to try out the app.

#### Using localtunnel

Make sure localtunnel is installed globally on your local system

```
npm install -g localtunnel
```

```
lt --port 3000 --subdomain=my-watson-assistant --local-host "127.0.0.1" -o --print-requests

OR

lt --port 3000 --subdomain=my-watson-assistant -h http://localtunnel.me --local-https false --local-host "127.0.0.1" -o --print-requests

```

#### Using serveo.net

```
ssh -R my-watson-assistant.serveo.net:80:localhost:3000 serveo.net
```

Point your browser to https://my-watson-assistant.serveo.net to try out the app.

ALTERNATIVES

To create local certificates for SSL
openssl req -x509 -out ssl/server.crt -keyout ssl/server.key -newkey rsa:2048 -nodes -sha256

To Run app
sudo npm start --open --public https://my-watson-assistant.com --port 443 --https --key "ssl/server.key" --cert "ssl/cerver.csr"

#### Using NGROK

./ngrok http -subdomain=my-watson-assistant 3000

## Testing the app

After your app is installed and running, experiment with it to see how it responds.  Admin can configure a default Watson Assistant skill to be in use.  Currently, I've made Home Automation as default Assistant Skill, but one can enable Skills detection from the dropdown menu and should be able to use multiple Skills from one chat window.  Once everything is setup on your machine, you can verify these by sending below texts.

### For Home Automation, following flows can be verified:

Triggering Weather service:

   - 1: What's the weather outside ?
   - 2: How is the weather in New Delhi ?
   - 3: Is it hot outside
   - 4: How cold is it outside
    and more

To trigger Google Search API:

  - 1: What is the meaning of ROFL ?
  - 2: What does TOEFL sounds for ?
  - 3: What's the meaning of IoT
  - 4: What's the meaning of life ?
    and more

To fetch data from News Feeds:

  - 1: Tell me the latest news
  - 2: What is the news headlines
  - 3: What's the latest news ?
    and more

Some other input texts:
  - Tell me a joke (Note: this will fetch joke using Cloud Functions)
  - Turn on the living room fan
  - Switch off the light in kitchen
  - Tell me something about IBM Watson (This will show Video content in Chat window)

### For COVID19, following flows can be verified:

  - 1: How do I know that I have corona virus
  - 2: whats the difference between common flu and corona virus
  - 3: what are the symptoms of corona virus

 - Scenario (1)
   - U: "can I send my kids to school"
   - W: "can you tell me the type of school they go to"
   - U: use either "college" or "high school" - the answer will change
   - W: "can you tell me the zip code"
   - U: use either "78708" or "78712" (Austin, TX)
   - W: "colleges have been advised to conduct classes remotely online..."

 - Scenario (2):
   - U: "when can my kids go back to college"
   - W: "can you tell me the zipcode"
   - U: use either "78708" or "78712" or other Ohio zip codes
   - W: "colleges have been advised to conduct classes remotely online..."

## Channels Integration

This repository currently has integrations with Slack and Microsoft Bot Framework (Skype).
Slack integration can be enabled by setting the following environment variables:

```
ENABLE_SLACK=true
SLACK_BOT_USER_TOKEN=<REPLACE_WITH_SLACK_BOT_USER_TOKEN>

```
MS Bot / Skype integration can be enabled by setting the following environment variables:

```
ENABLE_MS_BOT=true
MS_BOT_APP_ID=<REPLACE_WITH_MS_BOT_APP_ID>
MS_BOT_APP_PASSWORD=<REPLACE_WITH_MS_BOT_APP_PASSWORD>

```
More details on this and how to add other Bot integrations can be found [here] (https://botkit.ai/getstarted.html)

#### Google Actions

./gactions update --action_package action.json --project watson-3af30
./gactions test --action_package action.json --project <YOUR_PROJECT_ID>

## LICENSE

This sample code is licensed under Apache 2.0.
Full license text is available in [LICENSE](LICENSE).

## REFERENCES

- [IBM_sign_up](http://bluemix.net/registration)
- [Watson Assistant](https://cloud.ibm.com/docs/services/assistant?topic=assistant-index#index)
- [Watson Discovery](https://cloud.ibm.com/docs/services/discovery?topic=discovery-about#about)
- [Watson Speech to Text](https://cloud.ibm.com/docs/services/speech-to-text?topic=speech-to-text-about#about)
- [IBM Cloudant NoSQLDB](https://cloud.ibm.com/docs/services/Cloudant?topic=cloudant-overview#overview)
- [Channels Integration](https://botkit.ai/getstarted.html)
- [Slack_Integration](https://botkit.ai/docs/provisioning/slack-events-api.html)
- [MS_BOT_Integration](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-quickstart?view=azure-bot-service-4.0)
- [Microsoft_Teams_Bots](https://docs.microsoft.com/en-gb/microsoftteams/platform/concepts/bots/bots-overview)
- [NodeJs](http://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Loopback](https://loopback.io/doc/en/lb3/index.html)
- [Angular](https://angular.io/guide/quickstart)
- [cf_docs](https://www.ibm.com/watson/developercloud/doc/common/getting-started-cf.html)
- [cloud_foundry](https://github.com/cloudfoundry/cli#downloads)
- [Skill Detection](https://github.ibm.com/gurvsin3/skills_detection)
- [Web Chat](https://cloud.ibm.com/docs/assistant?topic=assistant-deploy-web-chat)
- [Advanced Tasks](https://cloud.ibm.com/docs/assistant?topic=assistant-logs-resources)
- [WA Dialog Skills Analysis](https://github.com/watson-developer-cloud/assistant-dialog-skill-analysis)
