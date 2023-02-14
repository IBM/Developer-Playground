//base command to configure the environment
let configureCommand = "git clone https://github.com/IBM/CPDemoFramework -b ${BRANCH} --single-branch ${CHE_PROJECTS_ROOT}/techzone-demo;cd ${CHE_PROJECTS_ROOT}/techzone-demo/olm-utils-v2;sh configure-env.sh ";

currentHTMLstateData = {
  prerequisites: {
    icr_key: "",
  },
  authenticationOptions: {
    required: ["icr_key"],
    additionalOptions: {
    },
  },
  validPrerequisites: [["icr_key"]],
  dropdownIds: ["service-list"],
  envConfigured: false,
  selectedServices: [],
  doNotRestore: [],
  registryParams: ["registry_host_name", "registry_port", "registry_namespace", "registry_user", "registry_password"]
}

let previousServicesState = "";

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
  "factsheet": 'AI Factsheets',
  "hadoop": 'Execution Engine for Apache Hadoop',
  "match360": 'Match360',
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

function funcLoad() {
  // Disable timeline
  disableTimelineFromElement("all");

  //handle prerequisites
  for (let prerequisite of Object.keys(currentHTMLstateData.prerequisites)) {
    addEventListenerToElement(document.getElementById(prerequisite), "input", handlePrerequisiteValues);
  }

  [...document.getElementsByName("authentication-options")].forEach(element => addEventListenerToElement(element, "change", handleAuthenticationOptions))

  //handle cp4d version
  addEventListenerToElement(document.getElementById("cp4d_version"), "input", handleCP4dVersion)

  //open/close logic for all dropdowns
  toggleDropdowns(currentHTMLstateData.dropdownIds)

  //portable registry option 
  addEventListenerToElement(document.getElementById("registry_option"), "change", handleRegistryOption)

  for (let registryParam of currentHTMLstateData.registryParams) {
    console.log(registryParam)
    addEventListenerToElement(document.getElementById(registryParam), "input", validateRegistryFields);
  }

  //create services dropdown
  createMultiSelectDropdownWithSearch("git-services", services, updateSelectedServices, "services", "services-search", filterServiceList)

  //mirror-image
  addEventListenerToElement(document.getElementById("mirror-image"), "click", mirrorImage)

  //Store required CTAs in state
  storeCTAInState();

  //Restore data if available
  document.getElementById("get-workspace-state").click();

  //reset workspace state
  addEventListenerToElement(document.getElementById("reset-href"), "click", resetWorkspace);

  document.getElementById("configure-env").click()
}

function handleCP4dVersion(e) {
  if ((e.target.value.trim()).match((/^\d\.\d$/))) {
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
  document.getElementById("update-config").setAttribute("command", "cd ${CHE_PROJECTS_ROOT}" + `/techzone-demo/olm-utils-v2/;pip3.8 install PyYAML;python3.8 updateYaml.py  ${component_list} ${storage} ${cp4dVersion} cp4d;` + "cp ${CHE_PROJECTS_ROOT}/techzone-demo/olm-utils-v2/cp4d-config.yaml /opt/ansible/cpd-config/config/cpd-config.yaml")
  document.getElementById("update-config").click();
  previousServicesState = component_list;
}

function handleRegistryOption(e) {
  let registryLabels = document.getElementById("registry-details").getElementsByTagName("label");
  for (let label of registryLabels) {
    if (e.target.checked && (label.innerHTML.includes("Host Name") || label.innerHTML.includes("User") || label.innerHTML.includes("Password"))) {
      label.innerHTML = label.innerHTML.slice(0, -1);
    } else if (!label.innerHTML.includes("*") && !label.innerHTML.includes("Option")) {
      label.innerHTML = `${label.innerHTML}*`
    }
  }
  validateRegistryFields("e")
}

function validateRegistryFields(e) {
  let valid = false;
  for (let registryParam of currentHTMLstateData.registryParams) {
    if (document.getElementById(registryParam).value.trim() !== "") {
      valid = true
    }
    else if (document.getElementById("registry_option").checked && ["registry_host_name", "registry_user", "registry_password"].includes(registryParam)) {
      valid = true
    } else {
      valid = false
    }
    if (!valid) {
      disableTimelineFromElement("configure-environment-CTA")
      return
    }
  }
  enableTimelineTillElement("all");
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
  updateCP4Dyaml();
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

function mirrorImage(e) {
  let cp4dAdminPassword = document.getElementById('cp4d_admin_password').value
  let cp4dEnvName = document.getElementById('cp4d_env_name').value
  let entitlementKey = document.getElementById('icr_key').value
  let portable = document.getElementById("registry_option").checked
  let registryHostName = document.getElementById('registry_host_name').value
  let registryPort = document.getElementById('registry_port').value
  let registryNamespace = document.getElementById('registry_namespace').value
  let registryUser = document.getElementById('registry_user').value
  let registryPassword = document.getElementById('registry_password').value
  document.getElementById("mirror-image$1").setAttribute("command", `sh /cloud-pak-deployer/cp-deploy.sh env download -e=env_id=${cp4dEnvName} -e=ibm_cp_entitlement_key=${entitlementKey} -v`)
  document.getElementById("mirror-image$1").click();
}

window.addEventListener("load", funcLoad);
