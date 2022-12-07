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

const services = {
  "analyticsengine": 'Analytics Engine Powered by Apache Spark',
  "bigsql": 'Db2 Big SQL',
  "ca": 'Cognos Analytics',
  "cde": 'Cognos Dashboards',
  "datagate": 'Data Gate',
  "datastage-ent-plus": 'DataStage Enterprise Plus',
  "db2": 'Db2',
  "db2wh": 'Db2 Warehouse',
  "dmc": 'Data Management Console',
  "dods": 'Decision Optimization',
  "dp": 'Data Privacy',
  "dv": 'Data Virtualization',
  "facsheet": 'AI Factsheets',
  "hadoop": 'Execution Engine for Apache Hadoop',
  "mdm": 'Match360',
  "openpages": 'OpenPages',
  "planning-analytics": 'Planning Analytics',
  "replication": 'Data Replication',
  "rstudio": 'RStudio Server',
  "spss": 'SPSS Modeler',
  "voice-gateway": 'Voice Gateway',
  "watson-assistant": 'Watson Assistant',
  "watson-discovery": 'Watson Discovery',
  "watson-ks": 'Watson Knowledge Studio',
  "watson-openscale": 'IBM Watson OpenScale',
  "watson-speech": 'Watson Speech to Text',
  "wkc": 'Watson Knowledge Catalog',
  "wml": 'Watson Machine Learning',
  "wml-accelerator": 'Watson Machine Learning Accelerator',
  "ws-pipelines": 'Watson Studio Pipelines',
  "wsl": 'Watson Studio'
}

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

  //open/close logic for all dropdowns
  toggleDropdowns(currentHTMLstateData.dropdownIds)

  //create services dropdown
  createMultiSelectDropdownWithSearch("git-services", services, updateSelectedServices, "services", "services-search", filterServiceList)

  addEventListenerToElement(document.getElementById("install_cpd"), "click", install_cpd);

  addEventListenerToElement(document.getElementById("storage_value"), "change", () => { })

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

function install_cpd() {
  let cp4dVersion = document.getElementById('cp4d_version').value;
  let component_list = currentHTMLstateData.selectedServices.toString()
  if (!component_list) {
    component_list = "null"
  }
  let storage = document.getElementById("storage_value").value;
  document.getElementById("install_cpd$1").setAttribute("command", "cd ${CHE_PROJECTS_ROOT}" + `/techzone-demo/olm-utils-v2/;pip3.8 install PyYAML;python3.8 updateYaml.py  ${component_list} ${storage} ${cp4dVersion} cp4d; bash deploy.sh cp4d`)
  document.getElementById("install_cpd$1").click();
}

function updateSelectedServices(e) {
  let gitServicesList = document.getElementById("git-services");
  let gitServices = document.getElementsByName("services");
  if (e.target.checked) {
    currentHTMLstateData.selectedServices.indexOf(e.target.value) == -1 && currentHTMLstateData.selectedServices.push(e.target.value)
    gitServicesList.insertBefore(e.target.parentElement, gitServicesList.firstChild);
  } else {
    currentHTMLstateData.selectedServices.indexOf(e.target.value) !== -1 && currentHTMLstateData.selectedServices.splice(currentHTMLstateData.selectedServices.indexOf(e.target.value), 1)
    gitServicesList.insertBefore(e.target.parentElement, gitServices[Object.keys(services).indexOf(e.target.value)].parentElement);
  }
  let showSeleted = document.getElementById("selected-services")
  showSeleted.textContent = currentHTMLstateData.selectedServices.toString().replaceAll(",", ", ")
  document.getElementById("selected-components-string").textContent = getShortenedString(currentHTMLstateData.selectedServices) || "Select Services";
}

function filterServiceList(e) {
  let filteredServices = {}
  let htmlServices = document.getElementsByName("services")
  let listServices = [...htmlServices].map(service => service.value)
  listServices.forEach((res, idx) => {
    if (res.toLowerCase().includes(e.target.value.toLowerCase()) || services[res].toLowerCase().includes(e.target.value.toLowerCase())) {
      filteredServices[res] = services[res]
      htmlServices[idx].parentElement.style.display = "block"
    } else {
      htmlServices[idx].parentElement.style.display = "none"
    }
  })
}

window.addEventListener("load", funcLoad);
