//base command to configure the environment
let configureCommand = "git clone https://github.com/IBM/CPDemoFramework -b ${BRANCH} --single-branch ${CHE_PROJECTS_ROOT}/techzone-demo;cd ${CHE_PROJECTS_ROOT}/techzone-demo/olm-utils-v2;sh configure-env.sh ";

currentHTMLstateData = {
  prerequisites: {
    server: "",
    api_token: "",
    kubeadmin_user: "",
    kubeadmin_pass: "",
    icr_key: "",
    oc_login:""
  },
  authenticationOptions: {
    required: ["icr_key"],
    additionalOptions: {
      "server_option": ["server","api_token"],
      "kube_option": ["server","kubeadmin_user", "kubeadmin_pass"],
      "oc_option": ["oc_login"]
    },
  },
  validPrerequisites: [["icr_key", "oc_login"],["icr_key", "server", "api_token"], ["icr_key", "server", "kubeadmin_user", "kubeadmin_pass"]],
  dropdownIds: ["service-list"],
  envConfigured: false,
  selectedServices: [],
  doNotRestore: []
}

let previousServicesState = "";

function funcLoad(){
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

  //handle cp4d version
  addEventListenerToElement(document.getElementById("cp4d_version"),"input", handleCP4dVersion)

  //open/close logic for all dropdowns
  toggleDropdowns(currentHTMLstateData.dropdownIds)

  //create services dropdown
  //createMultiSelectDropdownWithSearch("git-services", services, updateSelectedServices, "services", "services-search", filterServiceList)

  addEventListenerToElement(document.getElementById("install_cpd"), "click", install_cpd);

  //addEventListenerToElement(document.getElementById("storage_value"), "change", () => { })

  //add search function
  addEventListenerToElement(document.getElementById("services-search"), "input", filterServiceList);

  //Store required CTAs in state
  storeCTAInState();

  //Restore data if available
  document.getElementById("get-workspace-state").click();

  //reset workspace state
  addEventListenerToElement(document.getElementById("reset-href"), "click", resetWorkspace);
}

function updateConfigVars(e) {
  document.getElementById("configure-env$1").setAttribute("command", `${configureCommand}${Object.keys(currentHTMLstateData.prerequisites).map(val => `"${currentHTMLstateData.prerequisites[val] || "\"\""}"`).toString().replaceAll(",", "%20")}`);
  document.getElementById("configure-env$1").click();
}

function handleCP4dVersion(e){
  if((e.target.value.trim()).match((/^\d\.\d$/))){
    e.target.value = e.target.value.trim() + ".0"
  }
}

function updateCP4Dyaml() {
  let cp4dVersion = document.getElementById('cp4d_version').value || " ";
  let component_list = currentHTMLstateData.selectedServices.toString()
  if (!component_list) {
    component_list = "null"
  }
  let storage = "auto";
  if (previousServicesState === component_list)
    return
  document.getElementById("update-config").setAttribute("command", "cd ${CHE_PROJECTS_ROOT}" + `/techzone-demo/olm-utils-v2/;pip3.8 install PyYAML;python3.8 updateYaml.py  ${component_list} ${storage} ${cp4dVersion} cp4d;`)
  document.getElementById("update-config").click();
  previousServicesState = component_list;
}

function install_cpd() {
  let cp4dVersion = document.getElementById('cp4d_version').value;
  let cp4dAdminPassword = document.getElementById('cp4d_admin_password').value
  let cp4dEnvName = document.getElementById('cp4d_env_name').value
  let component_list = currentHTMLstateData.selectedServices.toString()
  if (!component_list) {
    component_list = "null"
  }
  let storage = "auto" //document.getElementById("storage_value").value;
  document.getElementById("install_cpd$1").setAttribute("command", "cd ${CHE_PROJECTS_ROOT}" + `bash deploy.sh cp4d ${cp4dAdminPassword} ${cp4dEnvName}`)
  document.getElementById("install_cpd$1").click();
}

function getDOMnode(htmlServices, service){
  let listServices = [...htmlServices].map(service => service.value)
  for (let i=0; i < listServices.length; i++){
    //console.log(htmlServices, service)
    if(service === listServices[i]){
      return htmlServices[i].parentElement
    }
  }
}

function updateSelectedServices(e) {
  let gitServicesList = document.getElementById("git-services");
  let gitServices = document.getElementsByName("services");
  if (e.target.checked) {
    currentHTMLstateData.selectedServices.indexOf(e.target.value) == -1 && currentHTMLstateData.selectedServices.push(e.target.value)
    //gitServicesList.insertBefore(e.target.parentElement, gitServicesList.firstChild);
  } else {
    currentHTMLstateData.selectedServices.indexOf(e.target.value) !== -1 && currentHTMLstateData.selectedServices.splice(currentHTMLstateData.selectedServices.indexOf(e.target.value), 1)
    //gitServicesList.insertBefore(e.target.parentElement, gitServices[Object.keys(services).indexOf(e.target.value)].parentElement);
  }
  //gitServicesList.innerHTML = "";
  currentHTMLstateData.selectedServices.sort()
  currentHTMLstateData.selectedServices.forEach(res => {
    console.log(res)
    gitServicesList.appendChild(getDOMnode(gitServices, res))
  })
  let listServices = [...gitServices].map(service => service.value)
  listServices.sort()
  listServices.forEach((res, idx) => {
    if(currentHTMLstateData.selectedServices.indexOf(res) == -1){
      gitServicesList.appendChild(getDOMnode(gitServices, res))
    }
  })
    
  let showSeleted = document.getElementById("selected-services")
  showSeleted.textContent = currentHTMLstateData.selectedServices.toString().replaceAll(",", ", ")
  document.getElementById("selected-components-string").textContent = getShortenedString(currentHTMLstateData.selectedServices) || "Select Services";
  updateCP4Dyaml();
}

function filterServiceList(e) {
  let filteredServices = {}
  let htmlServices = document.getElementsByName("services")
  let listServices = [...htmlServices].map(service => service.value)
  listServices.forEach((res, idx) => {
    
    if (res.toLowerCase().includes(e.target.value.toLowerCase()) || htmlServices[idx].nextSibling.textContent.trim().toLowerCase().includes(e.target.value.toLowerCase())) {
      filteredServices[res] = htmlServices[idx].nextSibling.textContent.trim()
      htmlServices[idx].parentElement.style.display = "block"
    } else {
      htmlServices[idx].parentElement.style.display = "none"
    }
  })
}
window.addEventListener("load", funcLoad);
