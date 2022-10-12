//base command to configure the environment
let configureCommand = "git clone -b ${BRANCH} https://github.com/IBM/CPDemoFramework ${CHE_PROJECTS_ROOT}/techzone-demo;cd ${CHE_PROJECTS_ROOT}/techzone-demo;pip3.8 install -r requirements.txt;cd /projects/techzone-demo/sandbox/;python3.8 update-env.py ";

currentHTMLstateData = {
  prerequisites: {
    hostname: "",
    wkcuser: "",
    password: ""
  },
  validPrequisites: [["hostname", "wkcuser", "password"]],
  dropdownIds: ["project-list", "governance-list", "industry-list", "service-list"],
  envConfigured: false,
  selectedArtifacts: ["all"],
  selectedServices: [],
  selectedProject: {},
  selecetdIndustry: "",
  isPrivateDemo: false,
  requiredGithubFields: {
    demoName: "",
    tags: "",
    author: "",
    desc: ""
  },
  requiredPrivateGithubFields: {
    "private-git-url": "",
    "private-git-access-token": ""
  },
  doNotRestore: ["private-git-access-token"]
}

const services = {
  analyticsengine: "Analytics Engine Powered by Apache Spark",
  bigsql: "Db2 Big SQL",
  cde: "Cognos Dashboards",
  cognos_analytics: "Cognos Analytics",
  cpd_platform: "Cloud Pak for Data Control Plane",
  cpfs: "Cloud Pak Foundational Services(CPFS)",
  datagate: "Data Gate",
  datarefinery: "Data Refinery",
  datastage_ent: "DataStage Enterprise",
  datastage_ent_plus: "DataStage Enterprise Plus",
  db2aaservice: "CPD db2 aas component",
  db2oltp: "Db2",
  db2u: "IBM Db2u",
  db2wh: "Db2 Warehouse",
  dmc: "Data Management Console",
  dods: "Decision Optimization",
  dp: "Data Privacy",
  dv: "Data Virtualization",
  edb_cp4d: "EnterpriseDB Postgres",
  hee: "Execution Engine for Apache Hadoop",
  iis: "WKC's IIS component",
  informix: "Informix install Operator",
  informix_cp4d: "Informix deployment Operator",
  match360: "Match 360 with Watson",
  model_train: "IBM cloudpak operator for training with Model Train",
  mongodb: "MongoDB Operator",
  mongodb_cp4d: "MongoDB for Cloud Pak for Data",
  openpages: "OpenPages",
  openpages_instance: "OpenPages Instance",
  openscale: "Watson OpenScale",
  planning_analytics: "Planning Analytics",
  postgresql: "Cloud Native PostgreSQL",
  productmaster: "Product Master",
  productmaster_instance: "Product Master Instance",
  rstudio: "RStudio Server",
  scheduler: "CPD Scheduler",
  spss: "SPSS Modeler",
  voice_gateway: "Voice Gateway",
  watson_assistant: "Watson Assistant",
  watson_discovery: "Watson Discovery",
  watson_gateway: "IBM Watson Gateway Operator",
  watson_ks: "Watson Knowledge Studio",
  watson_speech: "Watson Speech to Text",
  wkc: "Watson Knowledge Catalog",
  wml: "Watson Machine Learning",
  wml_accelerator: "Watson Machine Learning Accelerator",
  ws: "Watson Studio",
  ws_pipelines: "Watson Studio Pipelines",
  ws_runtimes: "Watson Studio Runtimes",
  zen: "Zen Service in CPFS"
}

const industries = {
  hospitality: "Hospitality",
  healthcare: "Healthcare",
  "e-commerce": "E-commerce",
  banking: "Banking and financial services",
  insurance: "Insurance",
  retail: "Retail",
  software: "Software",
  telecommunications: "Telecommunications",
  transportation: "Transportation",
  utilities: "Utilities",
  other: "Other"
}

const funcLoad = () => {
  // Disable timeline
  disableTimelineFromElement("all");

  //handle prerequisites
  for (let prerequisite of Object.keys(currentHTMLstateData.prerequisites)) {
    addEventListener(document.getElementById(prerequisite), "input", handlePrerequisiteValues);
  }

  //generate config command
  addEventListener(document.getElementById("configure-env"), "click", updateConfigVars);

  //After env configured successfully enable timeline
  addEventListener(document.getElementById("enable-timeline"), "click", enableAll)

  //handle managemnet dropdowns
  let tasks = document.querySelectorAll("[id^='task']");
  tasks.forEach((task) => (task.style.display = "none"));

  let selectedTasks = document.getElementsByName("checkboxtask");
  selectedTasks.forEach((task) => addEventListener(task, "change", showTasks));

  //open/close logic for all dropdowns
  toggleDropdowns(currentHTMLstateData.dropdownIds)


  //handle governance artifacts
  let govArtifacts = document.getElementsByName("governance-artifacts");
  govArtifacts.forEach((task) => addEventListener(task, "change", UpdateExport));

  //show private demo options
  addEventListener(document.getElementById("private-git-toggle"), "change", showPrivateDemoOptions);

  //handle required github fields
  for (let gitField of Object.keys(currentHTMLstateData.requiredGithubFields)) {
    addEventListener(document.getElementById(gitField), "input", handleGitValues);
  }

  //handle private demo required github fields
  for (let privateGitField of Object.keys(currentHTMLstateData.requiredPrivateGithubFields)) {
    addEventListener(document.getElementById(privateGitField), "input", handleGitValues);
  }

  //create industry dropdown
  createSingleSelectDropdown("industry-ul", industries, selectIndustry);

  //create services dropdown
  createMultiSelectDropdownWithSearch("git-services", services, updateSelectedServices, "services", "services-search", filterServiceList)

  //handle push to git 
  addEventListener(document.getElementById("pushToGit"), "click", pushToGit);

  //Store required CTAs in state
  storeCTAInState();

  //Restore data if available
  document.getElementById("get-workspace-state").click();

  //reset workspace state
  addEventListener(document.getElementById("reset-href"), "click", resetWorkspace);
}


const updateConfigVars = (e) => {
  document.getElementById("configure-env$1").setAttribute("command", `${configureCommand}${Object.values(currentHTMLstateData.prerequisites).toString().replaceAll(",", "%20")}`)
  document.getElementById("configure-env$1").click();
}

const showTasks = (e) => {
  if (e.target.checked) {
    document.getElementById(e.target.value).style.display = "block";
  } else {
    document.getElementById(e.target.value).style.display = "none";
  }
}

const UpdateExport = (e) => {
  let artifacts = document.querySelectorAll("[id^='ga_']");
  if (e.target.checked) {
    currentHTMLstateData.selectedArtifacts.push(e.target.value)
    if (e.target.value === "all") {
      currentHTMLstateData.selectedArtifacts = ["all"];
      artifacts.forEach(artifact => {
        if (e.target.id !== artifact.id) {
          artifact.checked = false
          artifact.dispatchEvent(new Event("change"))
          currentHTMLstateData.selectedArtifacts.indexOf(artifact.value) !== -1 && currentHTMLstateData.selectedArtifacts.splice(currentHTMLstateData.selectedArtifacts.indexOf(artifact.value), 1)
        }
      })
    } else if (e.target.value !== "all" && currentHTMLstateData.selectedArtifacts.length <= 6) {
      let artifact = document.getElementById("ga_all");
      artifact.checked = false
      artifact.dispatchEvent(new Event("change"))
      currentHTMLstateData.selectedArtifacts.indexOf("all") !== -1 && currentHTMLstateData.selectedArtifacts.splice(currentHTMLstateData.selectedArtifacts.indexOf("all"), 1)
    } else if (e.target.value !== "all" && currentHTMLstateData.selectedArtifacts.length > 6) {
      currentHTMLstateData.selectedArtifacts = ["all"];
      artifacts.forEach(artifact => {
        if ("all" !== artifact.value) {
          artifact.checked = false
        } else {
          artifact.checked = true
        }
        artifact.dispatchEvent(new Event("change"))
      })
    }
  } else {
    currentHTMLstateData.selectedArtifacts.indexOf(e.target.value) !== -1 && currentHTMLstateData.selectedArtifacts.splice(currentHTMLstateData.selectedArtifacts.indexOf(e.target.value), 1)
  }
  if (currentHTMLstateData.selectedArtifacts.length === 0) {
    modifyVisibilityOfCTAs(["export-task"], "disable")
  } else {
    modifyVisibilityOfCTAs(["export-task"], "enable")
  }
  let cta = document.getElementById("export-task").getElementsByTagName("BUTTON")[0]
  cta.setAttribute("command", `cd /projects/techzone-demo/sandbox/;python3.8 exportGovArtifacts.py governance_artifacts.zip ${currentHTMLstateData.selectedArtifacts.toString()};unzip governance_artifacts.zip -d governance_artifacts`)
  cta.setAttribute("numSuccess", 1)
  if (currentHTMLstateData.selectedArtifacts.indexOf("rule") >= 0 || currentHTMLstateData.selectedArtifacts.indexOf("all") >= 0) {
    cta.setAttribute("command", `${cta.getAttribute("command")};python3.8 exportDataProtectionRules.py data_protection_rules.json`)
    cta.setAttribute("numSuccess", 2)
  }
  let showSeleted = document.getElementById("selected")
  showSeleted.textContent = currentHTMLstateData.selectedArtifacts.toString().replaceAll(",", ", ")
  document.getElementById("selected-artifacts").textContent = getShortenedString(currentHTMLstateData.selectedArtifacts) || "Select Artifacts";
}

function selectProject(e) {
  document.getElementById("selected-project").textContent = e.target.textContent
  selectedProject = e.target.textContent;
  let exportProjectCTA = document.getElementById("export-project")
  exportProjectCTA.setAttribute("command", `cd /projects/techzone-demo/sandbox/;python3.8 exportProjectv3.py ${e.target.name} project_assets.zip`)
  modifyVisibilityOfCTAs(["export-project"], "enable")
  document.getElementById("project-list").classList.remove('visible');
}

const showPrivateDemoOptions = (e) => {
  if (e.target.checked) {
    modifyVisibilityOfCTAs(["private-git-url-label", "private-git-url", "private-git-access-token-label", "private-git-access-token"], "unhide")
    currentHTMLstateData.isPrivateDemo = true;
  } else {
    modifyVisibilityOfCTAs(["private-git-url-label", "private-git-url", "private-git-access-token-label", "private-git-access-token"], "hide")
    currentHTMLstateData.isPrivateDemo = false;
  }
  validateGithubFields();
}

const handleGitValues = (e) => {
  if (e.target.id in currentHTMLstateData.requiredGithubFields) {
    currentHTMLstateData.requiredGithubFields[e.target.id] = e.target.value;
  } else {
    currentHTMLstateData.requiredPrivateGithubFields[e.target.id] = e.target.value;
  }
  validateGithubFields();
}

const validateGithubFields = () => {
  let notValid = false
  if (currentHTMLstateData.isPrivateDemo) {
    notValid = Object.values(currentHTMLstateData.requiredPrivateGithubFields).map(val => val.trim()).includes("") || Object.values(currentHTMLstateData.requiredGithubFields).map(val => val.trim()).includes("") || currentHTMLstateData.selectedServices.length === 0 || currentHTMLstateData.selecetdIndustry.trim() === "";
  } else {
    notValid = Object.values(currentHTMLstateData.requiredGithubFields).map(val => val.trim()).includes("") || currentHTMLstateData.selectedServices.length === 0 || currentHTMLstateData.selecetdIndustry.trim() === "";
  }
  if (notValid) {
    modifyVisibilityOfCTAs(["pushToGit"], "disable")
  } else {
    modifyVisibilityOfCTAs(["pushToGit"], "enable")
  }
}

const selectIndustry = (e) => {
  document.getElementById("selected-industry").textContent = e.target.textContent
  currentHTMLstateData.selecetdIndustry = e.target.id;
  document.getElementById("industry-list").classList.remove('visible');
  validateGithubFields();
}

const updateSelectedServices = (e) => {
  let gitServicesList = document.getElementById("git-services");
  let gitServices = document.getElementsByName("services");
  if (e.target.checked) {
    currentHTMLstateData.selectedServices.push(e.target.value)
    gitServicesList.insertBefore(e.target.parentElement, gitServicesList.firstChild);
  } else {
    currentHTMLstateData.selectedServices.indexOf(e.target.value) !== -1 && currentHTMLstateData.selectedServices.splice(currentHTMLstateData.selectedServices.indexOf(e.target.value), 1)
    gitServicesList.insertBefore(e.target.parentElement, gitServices[Object.keys(services).indexOf(e.target.value)].parentElement);
  }
  let showSeleted = document.getElementById("selected-services")
  showSeleted.textContent = currentHTMLstateData.selectedServices.toString().replaceAll(",", ", ")
  document.getElementById("selected-services-string").textContent = getShortenedString(currentHTMLstateData.selectedServices) || "Select Services";
  validateGithubFields();
}

const filterServiceList = (e) => {
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

const pushToGit = () => {
  let industry = currentHTMLstateData.selecetdIndustry;
  let tags = currentHTMLstateData.requiredGithubFields.tags || ""
  let author = currentHTMLstateData.requiredGithubFields.author || ""
  let services = currentHTMLstateData.selectedServices.toString()
  let demoName = currentHTMLstateData.requiredGithubFields.demoName || ""
  let desc = currentHTMLstateData.requiredGithubFields.desc || "Update"
  let userID = document.getElementById("userID").textContent || author
  tags = tags.split(",")
  services = services.split(",")
  industry = industry.split(",")
  // JSON ARRAY
  let metadata = {
    "industries": industry,
    "tags": tags,
    "author": author,
    "services": services,
    "demoName": userID.replace(/ /g, '') + "-" + demoName.replace(/ /g, ''),
    "displayName": demoName,
    "desc": desc,
    "isPrivate": false,
  }
  if (currentHTMLstateData.isPrivateDemo) {
    metadata.isPrivate = true,
      metadata.privateGitRepoUrl = currentHTMLstateData.requiredPrivateGithubFields["private-git-url"]
  }
  // let metadata=`{"industry":"${industry}","tags":"${["tags","asddsa","dsa"]}","author":"${author}","services":"${services}","demoName":"${demoName}"}`
  metadata = '\'' + JSON.stringify(metadata) + '\''
  if (document.getElementById("private-git-toggle").checked) {
    document.getElementById("pushToGit$1").setAttribute("command",
      "bash /projects/techzone-demo/sandbox/github.sh " + "\"" + demoName.replace(/ /g, '') + "\"" + " " + metadata + " " + "\"" + userID.replace(/ /g, '') + "\"" + " " + "\"" + desc + "\"" + " " + "\"" + gitUrl + "\"" + " " + "\"" + gitAccessToken + "\"");
  } else {
    document.getElementById("pushToGit$1").setAttribute("command",
      "bash /projects/techzone-demo/sandbox/github.sh " + "\"" + demoName.replace(/ /g, '') + "\"" + " " + metadata + " " + "\"" + userID.replace(/ /g, '') + "\"" + " " + "\"" + desc + "\"");
  }
  document.getElementById("pushToGit$1").click();

}

window.addEventListener("load", funcLoad);
