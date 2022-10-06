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
  addEventListener(document.getElementById("configure-env"),"click", updateConfigVars);

  //After env configured successfully enable timeline
  addEventListener(document.getElementById("enable-timeline"),"click", enableAll)

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
  addEventListener(document.getElementById("pushToGit"),"click", pushToGit);

  //Store required CTAs in state
  storeCTAInState();

  //Restore data if available
  document.getElementById("get-workspace-state").click();
}


const updateConfigVars = (e) => {
  document.getElementById("configure-env$1").setAttribute("command", `${configureCommand}${Object.values(currentHTMLstateData.prerequisites).toString().replaceAll(",", "%20")}`)
  document.getElementById("configure-env$1").click();
}

const enableAll = (e) => {
  enableTimelineTillElement("all");
}

const showTasks = (e) => {
  if (e.target.checked) {
    document.getElementById(e.target.value).style.display = "block";
  } else {
    document.getElementById(e.target.value).style.display = "none";
  }
}

const UpdateExport = (e) => {
  if (e.target.checked) {
    currentHTMLstateData.selectedArtifacts.push(e.target.value)
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
  let industry = selecetdIndustry;
  let tags = currentHTMLstateData.requiredGithubFields.tags || ""
  let author = currentHTMLstateData.requiredGithubFields.author || ""
  let services = selectedServices.toString()
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
