//base command to configure the environment
let configureCommand = "git clone https://github.com/IBM/Developer-Playground -b video-insights --single-branch ${CHE_PROJECTS_ROOT}/video-insights;cd ${CHE_PROJECTS_ROOT}/video-analysis/; ";

function funcLoad(){
  // Disable timeline
  disableTimelineFromElement("all");

  //generate config command
  addEventListenerToElement(document.getElementById("configure-env"), "click", updateConfigVars);

  //After env configured successfully enable timeline
  addEventListenerToElement(document.getElementById("enable-timeline"), "click", enableAll)


  //Store required CTAs in state
  storeCTAInState();

  //Restore data if available
  document.getElementById("get-workspace-state").click();

}

function updateConfigVars(e) {
  document.getElementById("configure-env$1").setAttribute("command", `${configureCommand}${Object.keys(currentHTMLstateData.prerequisites).map(val => `${currentHTMLstateData.prerequisites[val] || "\"\""}`).toString().replaceAll(",", "%20")}`);
  document.getElementById("configure-env$1").click();
}

window.addEventListener("load", funcLoad);
