//base command to configure the environment
let configureCommand = "git clone -b ${BRANCH} https://github.com/IBM/CPDemoFramework ${CHE_PROJECTS_ROOT}/techzone-demo;bash /projects/techzone-demo/sandbox/getDemoFiles.sh demo_name is_private git_url git_token;cd ${CHE_PROJECTS_ROOT}/techzone-demo;pip3.8 install -r requirements.txt;cd /projects/techzone-demo/sandbox/;python3.8 update-env.py ";

currentHTMLstateData = {
  prerequisites: {
    hostname: "",
    wkcuser: "",
    password: ""
  },
  validPrequisites: [["hostname", "wkcuser", "password"]],
  envConfigured: false,
  isPrivateDemo: false,
  demo: document.getElementById("selected-demo").textContent,
  privateGitRepoUrl: document.getElementById("demo-url").textContent,
  gitToken:"",
  doNotRestore: []
}

const funcLoad = () => {
  // Disable timeline
  disableTimelineFromElement("all");

  //handle prerequisites
  for (let prerequisite of Object.keys(currentHTMLstateData.prerequisites)) {
    addEventListener(document.getElementById(prerequisite), "input", handlePrerequisiteValues);
  }

  //git token input for private demo
  addEventListener(document.getElementById("gittoken"),"input", showConfigureCTA);
  

  //generate config command
  addEventListener(document.getElementById("configure-env"),"click", updateConfigVars);

  //After env configured successfully enable timeline
  addEventListener(document.getElementById("enable-timeline"),"click", enableAll)

  //open cluster url
  addEventListener(document.getElementById("open-cpd-cluster-button"),"click", openCluster);

  //Store required CTAs in state
  storeCTAInState();

  //Restore data if available
  document.getElementById("get-workspace-state").click();
}


const updateConfigVars = (e) => {
    let cta = document.getElementById("configure-env$1");
    cta.setAttribute("command", `${configureCommand.replace("demo_name", currentHTMLstateData.demo).replace("is_private", currentHTMLstateData.isPrivate).replace("git_url", currentHTMLstateData.privateGitRepoUrl).replace("git_token", currentHTMLstateData.gitToken)}${Object.values(currentHTMLstateData.prerequisites).toString().replaceAll(",", "%20")}`)
    cta.click();
    document.getElementById("import-project").setAttribute("command", `cd /projects/techzone-demo/sandbox/;python3.8 importProject.py project_assets ${currentHTMLstateData.demo}`)
}

const showConfigureCTA = (e) => {
    let configCTA = document.getElementById("configure-environment-CTA")
    if (e.target.value.trim() !== "") {
        modifyVisibilityInTimeline([configCTA], "auto", 1, "auto")
    } else {
        modifyVisibilityInTimeline([configCTA], "not-allowed", 0.5, "none")
    }
}

const openCluster = () => {
    let clusterUrl = `https://${currentHTMLstateData.prerequisites.hostname}`
    let openClusterCta = document.getElementById("open-cpd-cluster")
    openClusterCta.href = clusterUrl
    openClusterCta.click();
}

window.addEventListener("load", funcLoad);
