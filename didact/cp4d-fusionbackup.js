//base command to configure the environment
let configureCommand = "git clone https://github.com/aishwaryapradeep01/CPDemoFramework.git -b ${BRANCH} --single-branch ${CHE_PROJECTS_ROOT}/techzone-demo;cd ${CHE_PROJECTS_ROOT}/techzone-demo/sandbox/fusion;sh configure-env.sh ";

currentHTMLstateData = {
    prerequisites: {
        server: "",
        api_token: "",
        kubeadmin_user: "",
        kubeadmin_pass: "",
        s3_url: "",
        bucket: "",
        region: "",
        access_key: "",
        access_id: "", 
        oc_login: ""
    },
    authenticationOptions: {
        required: ["s3_url", "bucket", "region", "access_key", "access_id"],
        additionalOptions: {
            "server_option": ["server", "api_token"],
            "kube_option": ["server", "kubeadmin_user", "kubeadmin_pass"],
            "oc_option": ["oc_login"]
        },
    },
    validPrerequisites: [["oc_login", "s3_url", "bucket", "region", "access_key", "access_id"], ["server", "api_token", "s3_url", "bucket", "region", "access_key", "access_id"], ["server", "kubeadmin_user", "kubeadmin_pass", "s3_url", "bucket", "region", "access_key", "access_id"]],
    envConfigured: false,
    selectedServices: [],
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

    addEventListenerToElement(document.getElementById("oc_login"), "input", handleOCLogin)
    //generate config command
    addEventListenerToElement(document.getElementById("configure-env"), "click", updateConfigVars);

    //After env configured successfully enable timeline
    addEventListenerToElement(document.getElementById("enable-timeline"), "click", updateYamlAndEnableTimeline);


    addEventListenerToElement(document.getElementById("run_backup"), "click", run_backup);

    //Store required CTAs in state
    storeCTAInState();

    //Restore data if available
    document.getElementById("get-workspace-state").click();

    //reset workspace state
    addEventListenerToElement(document.getElementById("reset-href"), "click", resetWorkspace);
}

function updateConfigVars(e) {
    document.getElementById("configure-env$1").setAttribute("command", `${configureCommand}${Object.keys(currentHTMLstateData.prerequisites).map(val => `"${currentHTMLstateData.prerequisites[val] || "\"\""}"`).toString().replaceAll(",", "%20")} cp4d`);
    document.getElementById("configure-env$1").click();
}

function updateYamlAndEnableTimeline(e) {
    enableAll()
}


function run_backup() {

    let backupstoragelocation_name = document.getElementById('cp4d_backupstoragelocation_name').value
    let backuppolicy_name = document.getElementById('cp4d_backuppolicy_name').value
    let backup_name = document.getElementById('cp4d_backup_name').value

    document.getElementById("run_backup$1").setAttribute("command", "cd ${CHE_PROJECTS_ROOT}/techzone-demo/sandbox/fusion;" + `bash fusion-setup.sh  ${backupstoragelocation_name} ${backuppolicy_name} ${backup_name}`)
    document.getElementById("run_backup$1").click();

}


window.addEventListener("load", funcLoad);
