let configureCommand = "git clone https://github.com/IBM/CPDemoFramework -b ${BRANCH} --single-branch cpd-backup;cd ${CHE_PROJECTS_ROOT}/cpd-backup/sandbox/cpdbr;sh configure-env.sh%20";
currentHTMLstateData = {
  prerequisites: {
    icr_key: "",
    server: "",
    api_token: "",
    kubeadmin_user: "",
    kubeadmin_pass: "",
    s3_url: "",
    bucket: "",
    region: "",
    access_key: "",
    access_id: "", 
    oc_login:"",
  },
  authenticationOptions: {
    required: ["icr_key","s3_url", "bucket", "region", "access_key", "access_id"],
    additionalOptions: {
      "server_option": ["server","api_token"],
      "kube_option": ["server","kubeadmin_user", "kubeadmin_pass"],
      "oc_option": ["oc_login"]
    },
  },
  validPrerequisites: [["icr_key", "oc_login", "s3_url", "bucket", "region", "access_key", "access_id"], ["icr_key", "server", "api_token", "s3_url", "bucket", "region", "access_key", "access_id"], ["icr_key", "server", "kubeadmin_user", "kubeadmin_pass", "s3_url", "bucket", "region", "access_key", "access_id"]],
  envConfigured: false,
  doNotRestore: []
}

function funcLoad() {
  // Disable timeline
  disableTimelineFromElement("all");

  //handle prerequisites
  for (let prerequisite of Object.keys(currentHTMLstateData.prerequisites)) {
    addEventListenerToElement(document.getElementById(prerequisite), "input", handlePrerequisiteValues);
  }

  [...document.getElementsByName("authentication-options")].forEach(element => addEventListenerToElement(element, "change", handleAuthenticationOptions))

  addEventListenerToElement(document.getElementById("oc_login"),"input", handleOCLogin)
  //generate config command
  addEventListenerToElement(document.getElementById("configure-env"), "click", updateConfigVars);

  //After env configured successfully enable timeline
  addEventListenerToElement(document.getElementById("enable-timeline"), "click", enableAll)

  //Store required CTAs in state
  storeCTAInState();

  //Restore data if available
  document.getElementById("get-workspace-state").click();

  //reset workspace state
  addEventListenerToElement(document.getElementById("reset-href"), "click", resetWorkspace);
}

function updateConfigVars(e) {
  document.getElementById("configure-env$1").setAttribute("command", `${configureCommand}${Object.keys(currentHTMLstateData.prerequisites).map(val => `${currentHTMLstateData.prerequisites[val] || "\"\""}`).toString().replaceAll(",", "%20")}`);
  document.getElementById("configure-env$1").click();
}

//start backup cta
document.getElementById("backup_src").addEventListener("click", backup_src);


function backup_src() {
  let backupName = document.getElementById('backup_name').value;
  document.getElementById("backup_src$1").setAttribute("command", "cd ${CHE_PROJECTS_ROOT}" + `/cpd-backup/sandbox/cpdbr; bash cpdbr.sh cp4d backup ${backupName}`)
  document.getElementById("backup_src$1").click();
}

window.addEventListener("load", funcLoad);
