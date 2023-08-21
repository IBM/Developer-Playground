
currentHTMLstateData = {
  prerequisites: {
    server: "",
    api_token: "",
    kubeadmin_user: "",
    kubeadmin_pass: "",
    icr_key: "",
    oc_login: ""
  },
  authenticationOptions: {
    required: ["icr_key"],
    additionalOptions: {
      "server_option": ["server", "api_token"],
      "kube_option": ["server", "kubeadmin_user", "kubeadmin_pass"],
      "oc_option": ["oc_login"]
    },
  },
  validPrerequisites: [["icr_key", "oc_login"], ["icr_key", "server", "api_token"], ["icr_key", "server", "kubeadmin_user", "kubeadmin_pass"]],
  dropdownIds: ["service-list"],
  envConfigured: false,
  selectedServices: [],
  doNotRestore: [],
  registryParams: ["registry_host_name", "registry_port", "registry_namespace", "registry_user", "registry_password"],
  requiredRegistryFileds: [],
  toggleFields: [],
  configYamlPath: "",
}

const DEFAULT_CP4D_VERSION = "4.7.0"

let previousServicesState = "";
let previousCP4DVersion = DEFAULT_CP4D_VERSION


function funcLoad() {
  // Disable timeline
  disableTimelineFromElement("all");

  //handle prerequisites
  for (let prerequisite of Object.keys(currentHTMLstateData.prerequisites)) {
    addEventListenerToElement(document.getElementById(prerequisite), "input", handlePrerequisiteValues);
    document.getElementById(prerequisite).addEventListener("input", validateRegistryFields)
  }

  [...document.getElementsByName("action-options")].forEach(element => addEventListenerToElement(element, "change", showAvailableOptions))

  //handle cp4d version
  addEventListenerToElement(document.getElementById("cp4d_version"), "focusout", updateCP4Dyaml)

  //handle cp4d environment name
  addEventListenerToElement(document.getElementById("cp4d_env_name"), "focusout", updateCP4Dyaml)



  //open/close logic for all dropdowns
  toggleDropdowns(currentHTMLstateData.dropdownIds)

  //portable registry option 
  addEventListenerToElement(document.getElementById("registry_option"), "change", showAvailableOptions)

  for (let registryParam of currentHTMLstateData.registryParams) {
    console.log(registryParam)
    addEventListenerToElement(document.getElementById(registryParam), "input", validateRegistryFields);
  }


  //createMultiSelectDropdownWithSearch("git-services", services, updateSelectedServices, "services", "services-search", filterServiceList)
  [...document.getElementsByName("action-options")].forEach(element => addEventListenerToElement(element, "change", showAvailableOptions));

  [...document.getElementsByName("authentication-options")].forEach(element => addEventListenerToElement(element, "change", handleAuthenticationOptions))

  addEventListenerToElement(document.getElementById("oc_login"), "input", handleOCLogin)

  //add search function
  addEventListenerToElement(document.getElementById("services-search"), "input", filterServiceList);

  //mirror-image
  addEventListenerToElement(document.getElementById("mirror-image"), "click", mirrorImage)

  document.getElementById("mirror_option").checked = true;
  document.getElementById("mirror_option").dispatchEvent(new Event("change"));

  document.getElementById("registry_option").checked = true;
  document.getElementById("registry_option").dispatchEvent(new Event("change"));
}

function handleCP4DVersion(version) {
  if (version.trim().match((/^\d\.\d\.\d$/)))
    return version.trim()
  else if (version.trim().match((/^\d\.\d$/)))
    return version.trim() + ".0"
  else
    return DEFAULT_CP4D_VERSION
}

function updateCP4Dyaml() {
  let cp4dVersion = handleCP4DVersion(document.getElementById('cp4d_version').value);
  let envName = document.getElementById('cp4d_env_name').value;
  let component_list = currentHTMLstateData.selectedServices.toString()
  if (!component_list) {
    component_list = "null"
  }
  let storage = "auto";
  if (previousServicesState === component_list && previousCP4DVersion === cp4dVersion)
    return
  document.getElementById("update-config").setAttribute("command", "cd ${CHE_PROJECTS_ROOT}" + `/scripts;python updateYamlAirGapped.py  ${component_list} ${storage} ${cp4dVersion} cp4d ${currentHTMLstateData.configYamlPath}`)
  document.getElementById("update-config").click();
  previousServicesState = component_list;
  previousCP4DVersion = cp4dVersion;
}

function getDOMnode(htmlServices, service) {
  let listServices = [...htmlServices].map(service => service.value)
  for (let i = 0; i < listServices.length; i++) {
    //console.log(htmlServices, service)
    if (service === listServices[i]) {
      return htmlServices[i].parentElement
    }
  }
}

function updateSelectedServices(e) {
  let gitServicesList = document.getElementById("git-services");
  let gitServices = document.getElementsByName("services");
  if (e.target.checked) {
    e.target.disabled=false
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
    if (currentHTMLstateData.selectedServices.indexOf(res) == -1) {
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

function mirrorImage(e) {
  let data = {
    action: document.querySelector('input[name="action-options"]:checked').value,
    cp4dAdminPassword: document.getElementById('cp4d_admin_password').value,
    cp4dEnvName: document.getElementById('cp4d_env_name').value,
    entitlementKey: document.getElementById('icr_key').value,
    ocLogin: {
      server: document.getElementById("server").value,
      api_token: document.getElementById("api_token").value,
      kubeadmin_user: document.getElementById("kubeadmin_user").value,
      kubeadmin_pass: document.getElementById("kubeadmin_pass").value,
      oc_login: document.getElementById("oc_login").value
    },
    componentsList: currentHTMLstateData.selectedServices.toString(),
    portable: document.getElementById("registry_option").checked,
    registryHostName: document.getElementById('registry_host_name').value,
    registryPort: document.getElementById('registry_port').value,
    registryNamespace: document.getElementById('registry_namespace').value,
    registryUser: document.getElementById('registry_user').value,
    registryPassword: document.getElementById('registry_password').value
  }
  data = JSON.stringify(data)
  console.log(data)
  document.getElementById("mirror-image$1").setAttribute("command", "cd ${CHE_PROJECTS_ROOT}/scripts;" + `python3.8 get-data.py '${data}';` + "./air-gapped-deploy.sh ${CHE_PROJECTS_ROOT}/scripts/data.json")
  document.getElementById("mirror-image$1").click();
}

function updateCtaText(ctaText, descriptionText) {
  document.getElementById("action-content").textContent = descriptionText
  let cta = document.getElementById("mirror-image")
  cta.setAttribute("title", ctaText)
  cta.textContent = ctaText
}

function setInstallFieldsDisabled(boolean, fields) {
  for(let field of fields){
    document.getElementById(field).disabled = boolean;
  }
  let serviceListArray = [...document.getElementById("git-services").getElementsByTagName("INPUT")]
  serviceListArray.forEach(element => element.disabled = boolean)
}

const updateConfigCTAs = (command) => {
    let openConfigCTA = document.getElementById("open-config")
    openConfigCTA.setAttribute("filePath", currentHTMLstateData.configYamlPath)
    openConfigCTA.setAttribute("editCommand", command)
}

function toggleContext(action, portable) {
  toggleFields("show")
  setInstallFieldsDisabled(false,["cp4d_env_name", "cp4d_version", "registry_host_name", "registry_port", "registry_namespace"])
  if (action === "mirror") {
    currentHTMLstateData.configYamlPath = "${CHE_PROJECTS_ROOT}/techzone-demo/olm-utils-v2/cp4d-config.yaml"
    updateConfigCTAs("cd ${CHE_PROJECTS_ROOT}/scripts;pip install pyYaml;python getInstalledServicesAirGapped.py cp4d mirror /opt/ansible/projects/techzone-demo/olm-utils-v2/cp4d-config.yaml");
    document.getElementById("configure-env").click()
    document.getElementById("config-not-found").classList.add("hidden-state")
    currentHTMLstateData.validPrerequisites.length === 3 ? currentHTMLstateData.validPrerequisites.push(["icr_key"]) : null;
    updateCtaText("Mirror", "Mirror Image")
    currentHTMLstateData.requiredRegistryFileds = []
    currentHTMLstateData.toggleFields = ["authentication_options_label", "authentication_options_div", "oc_login$label", "oc_login", "server$label", "server", "api_token$label", "api_token", "kubeadmin_user$label", "kubeadmin_user", "kubeadmin_pass$label", "kubeadmin_pass", "registry_host_name_label", "registry_port_label", "registry_namespace_label", "registry_user_label", "registry_password_label", "registry_host_name", "registry_port", "registry_namespace", "registry_user", "registry_password", "cp4d_admin_password_label", "cp4d_admin_password"]
    if (!portable) {
      currentHTMLstateData.requiredRegistryFileds = ["registry_host_name"]
      currentHTMLstateData.toggleFields = ["authentication_options_label", "authentication_options_div", "oc_login$label", "oc_login", "server$label", "server", "api_token$label", "api_token", "kubeadmin_user$label", "kubeadmin_user", "kubeadmin_pass$label", "kubeadmin_pass", "cp4d_admin_password_label", "cp4d_admin_password"]
    }
  } else {
    currentHTMLstateData.configYamlPath = "/opt/ansible/cpd-status/cpd-config/config/cpd-config.yaml"
    updateConfigCTAs("cd ${CHE_PROJECTS_ROOT}/scripts;pip install pyYaml;python getInstalledServicesAirGapped.py cp4d mirror /opt/ansible/cpd-status/cpd-config/config/cpd-config.yaml");
    currentHTMLstateData.validPrerequisites.length === 4 ? currentHTMLstateData.validPrerequisites.pop() : null;
    let configCta = document.getElementById("configure-env-install")
    configCta.setAttribute("command", "cd ${CHE_PROJECTS_ROOT}/scripts;pip install pyYaml;python getInstalledServicesAirGapped.py cp4d " + `${!portable? "private_registry_install" :action} /opt/ansible/cpd-status/cpd-config/config/cpd-config.yaml`)
    configCta.click()
    updateCtaText("Install", "Install CP4D")
    if(!portable)
      setInstallFieldsDisabled(true, ["cp4d_env_name", "cp4d_version", "registry_host_name", "registry_port", "registry_namespace"])
    else
      setInstallFieldsDisabled(true, ["cp4d_env_name", "cp4d_version"])
    currentHTMLstateData.toggleFields = []
    currentHTMLstateData.requiredRegistryFileds = ["registry_host_name"]
  }
  showRegistryOptions()
  toggleFields("hide")
  validateRegistryFields()
}

function showAvailableOptions(e) {
  toggleContext(document.querySelector('input[name="action-options"]:checked').value, document.getElementById("registry_option").checked)
}

function showRegistryOptions() {
  for (let registryParam of currentHTMLstateData.registryParams) {
    let label = document.getElementById(`${registryParam}_label`)
    if (label.innerHTML.includes("*")) {
      label.innerHTML = label.innerHTML.slice(0, -1);
    }
    if (currentHTMLstateData.requiredRegistryFileds.includes(registryParam)) {
      if (!label.innerHTML.includes("*") && !label.innerHTML.includes("Option")) {
        label.innerHTML = `${label.innerHTML}*`
      }
    }
  }
}

function toggleFields(toggleOption) {
  if (toggleOption == "show") {
    currentHTMLstateData.toggleFields.forEach(elementId => {
      document.getElementById(elementId).style.display = "block"
    })
  } else if (toggleOption == "hide") {
    currentHTMLstateData.toggleFields.forEach(elementId => document.getElementById(elementId).style.display = "none")
  }
}

function validateRegistryFields() {
  let valid = false;
  if (!checkAllPrequisiteFieldsfilled()) {
    disableTimelineFromElement("all");
    return
  }
  if (document.getElementById("registry_option").checked && document.getElementById("registry_option").checked === "mirror") {
    enableTimelineTillElement("all");
    return
  }
  for (let registryParam of currentHTMLstateData.registryParams) {
    console.log(registryParam, currentHTMLstateData.requiredRegistryFileds.includes(registryParam))
    if (document.getElementById(registryParam).value.trim() !== "") {
      valid = true
    }
    else if (!currentHTMLstateData.requiredRegistryFileds.includes(registryParam)) {
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

window.addEventListener("load", funcLoad);
