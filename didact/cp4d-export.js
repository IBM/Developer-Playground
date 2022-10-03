let env = document.getElementById("environment").textContent
let compositeHref = "git clone -b $BRANCH https://github.com/IBM/CPDemoFramework ${CHE_PROJECTS_ROOT}/techzone-demo;cd ${CHE_PROJECTS_ROOT}/techzone-demo;pip3.8 install -r requirements.txt;cd /projects/techzone-demo/sandbox/;python3.8 update-env.py "
compositeHref = compositeHref.replaceAll("$BRANCH", env)

let prerequisite = ["hostname", "wkcuser", "password"]
let pushToGitRequiredFields = ["demoname", "tags", "author", "desc", "private-git-url", "private-git-access-token"]
let requiredVals = {
  demoname: "",
  tags: "",
  author: "",
  desc: "",
}
let privateGitRequired = {
  "private-git-url": "",
  "private-git-access-token": "",
}
let services = {
  analyticsengine: 'Analytics Engine Powered by Apache Spark',
  bigsql: 'Db2 Big SQL',
  cde: 'Cognos Dashboards',
  cognos_analytics: 'Cognos Analytics',
  cpd_platform: 'Cloud Pak for Data Control Plane',
  cpfs: 'Cloud Pak Foundational Services(CPFS)',
  datagate: 'Data Gate',
  datarefinery: 'Data Refinery',
  datastage_ent: 'DataStage Enterprise',
  datastage_ent_plus: 'DataStage Enterprise Plus',
  db2aaservice: 'CPD db2 aas component',
  db2oltp: 'Db2',
  db2u: 'IBM Db2u',
  db2wh: 'Db2 Warehouse',
  dmc: 'Data Management Console',
  dods: 'Decision Optimization',
  dp: 'Data Privacy',
  dv: 'Data Virtualization',
  edb_cp4d: 'EnterpriseDB Postgres',
  hee: 'Execution Engine for Apache Hadoop',
  iis: "WKC's IIS component",
  informix: 'Informix install Operator',
  informix_cp4d: 'Informix deployment Operator',
  match360: 'Match 360 with Watson',
  model_train: 'IBM cloudpak operator for training with Model Train',
  mongodb: 'MongoDB Operator',
  mongodb_cp4d: 'MongoDB for Cloud Pak for Data',
  openpages: 'OpenPages',
  openpages_instance: 'OpenPages Instance',
  openscale: 'Watson OpenScale',
  planning_analytics: 'Planning Analytics',
  postgresql: 'Cloud Native PostgreSQL',
  productmaster: 'Product Master',
  productmaster_instance: 'Product Master Instance',
  rstudio: 'RStudio Server',
  scheduler: 'CPD Scheduler',
  spss: 'SPSS Modeler',
  voice_gateway: 'Voice Gateway',
  watson_assistant: 'Watson Assistant',
  watson_discovery: 'Watson Discovery',
  watson_gateway: 'IBM Watson Gateway Operator',
  watson_ks: 'Watson Knowledge Studio',
  watson_speech: 'Watson Speech to Text',
  wkc: 'Watson Knowledge Catalog',
  wml: 'Watson Machine Learning',
  wml_accelerator: 'Watson Machine Learning Accelerator',
  ws: 'Watson Studio',
  ws_pipelines: 'Watson Studio Pipelines',
  ws_runtimes: 'Watson Studio Runtimes',
  zen: 'Zen Service in CPFS'
}

let industries = [
  { id: 'hospitality', value: 'Hospitality' },
  { id: 'healthcare', value: 'Healthcare' },
  { id: 'e-commerce', value: 'E-commerce' },
  { id: 'banking', value: 'Banking and financial services' },
  { id: 'insurance', value: 'Insurance' },
  { id: 'retail', value: 'Retail' },
  { id: 'software', value: 'Software' },
  { id: 'telecommunications', value: 'Telecommunications' },
  { id: 'transportation', value: 'Transportation' },
  { id: 'utilities', value: 'Utilities' },
  { id: 'other', value: 'Other' }
]

function getIndustry(industry) {
  return industries.find(({ id, value }) => value === industry).id
}

let selectedServices = []
let selectedProject = ""
let selecetdIndustry = ""
let didact = document.getElementsByClassName("apptitle")[0].textContent

//Get Workspace ID and setup default data for localStorage
let workspaceId = document.getElementById("workspaceID").textContent
let data = {
  workspaceId: workspaceId,
  hostname: "",
  wkcuser: "",
  password: "",
  envConfigured: false,
  //api_key: ""
}

//Create localStorage item if didact name not present 
if (localStorage[didact] === undefined) {
  localStorage[didact] = JSON.stringify(data)
}

//Reset localStorage to default data if workspace is changed
if (JSON.parse(localStorage[didact]).workspaceId !== workspaceId) {
  localStorage[didact] = JSON.stringify(data)
}

//Fill input data from localStorage
prerequisite.forEach(input => document.getElementsByName(input)[0].value = JSON.parse(localStorage[didact])[input])

// .push related code
document.getElementById("private-git-toggle").addEventListener("change", showPrivateDemoOptions);
function showPrivateDemoOptions() {
  if (document.getElementById("private-git-toggle").checked) {
    document.getElementById("private-git-url-label").classList.remove("hidden-state");
    document.getElementById("private-git-url").classList.remove("hidden-state");
    document.getElementById("private-git-access-token-label").classList.remove("hidden-state");
    document.getElementById("private-git-access-token").classList.remove("hidden-state");
  } else {
    document.getElementById("private-git-url-label").classList.add("hidden-state");
    document.getElementById("private-git-url").classList.add("hidden-state");
    document.getElementById("private-git-access-token-label").classList.add("hidden-state");
    document.getElementById("private-git-access-token").classList.add("hidden-state");
  }
  let cta = document.getElementById("pushToGit")
  if (document.getElementById("private-git-toggle").checked) {
    if (Object.values(privateGitRequired).map(val => val.trim()).includes("")) {
      cta.classList.remove("enable")
      cta.classList.add("disable")
      cta.classList.remove("allow-click")
      cta.classList.add("no-click")
    } else {
      cta.classList.remove("disable")
      cta.classList.add("enable")
      cta.classList.remove("no-click")
      cta.classList.add("allow-click")
    }
  } else {
    if (Object.values(requiredVals).map(val => val.trim()).includes("") || selectedServices.length === 0 || selecetdIndustry.trim() === "") {
      cta.classList.remove("enable")
      cta.classList.add("disable")
      cta.classList.remove("allow-click")
      cta.classList.add("no-click")
    } else {
      cta.classList.remove("disable")
      cta.classList.add("enable")
      cta.classList.remove("no-click")
      cta.classList.add("allow-click")
    }
  }
}

document.getElementById("pushToGit").addEventListener("click", pushToGit);
function pushToGit() {
  let industry = selecetdIndustry//document.getElementById("industry").value || ""
  let tags = document.getElementById("tags").value || ""
  let author = document.getElementById("author").value || ""
  let services = selectedServices.toString()//document.getElementById("services").value
  let demoName = document.getElementById("demoname").value || ""
  let desc = document.getElementById("desc").value || "Update"
  let userID = document.getElementById("userID").textContent || author
  tags = tags.split(",")
  services = services.split(",")
  industry = industry.split(",")
  let gitUrl = document.getElementById("private-git-url").value
  let gitAccessToken = document.getElementById("private-git-access-token").value
  // JSON ARRAY
  let metadata = {
    "industries": industry,
    "tags": tags,
    "author": author,
    "services": services,
    "demoName": userID.replace(/ /g, '') + "-" + demoName.replace(/ /g, ''),
    "displayName": demoName,
    "desc": desc
  }
  if (document.getElementById("private-git-toggle").checked) {
    metadata.isPrivate = true,
      metadata.privateGitRepoUrl = gitUrl
  }
  console.log(gitUrl, gitAccessToken)
  console.log(metadata)
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

//Enable/Disable timeline
let localData = JSON.parse(localStorage[didact])
let timelineContainer = document.getElementsByClassName("timeline-container")[0]
if (localData.hostname.trim() === "" || localData.wkcuser.trim() === "" || localData.password.trim() === "") {
  //timelineContainer.style.opacity = 0.5;
  timelineContainer.style.cursor = "not-allowed";
  [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "none");
  [...timelineContainer.getElementsByTagName("BUTTON")].forEach(ele => ele.style.pointerEvents = "none");
  [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "none");
  [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "none");
} else {
  timelineContainer.style.cursor = "not-allowed";
  [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "none");
  [...timelineContainer.getElementsByTagName("BUTTON")].forEach(ele => ele.style.pointerEvents = "none");
  [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "none");
  [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "none");
  if (localData.envConfigured) {
    let timelineCTA = timelineContainer.getElementsByClassName("timeline");
    [...timelineCTA].forEach(ele => ele.style.opacity = 1);
    timelineContainer.style.cursor = "auto";
    [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "auto");
    [...timelineContainer.getElementsByTagName("BUTTON")].forEach(ele => !ele.classList.contains("no-click") ? ele.style.pointerEvents = "auto" : ele.style.pointerEvents = "none");
    [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "auto");
    [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "auto");
    document.getElementById("configure-env$2").click();
  } else {
    let configCTA = timelineContainer.getElementsByClassName("timeline")[0]
    configCTA.style.opacity = 1;
    configCTA.style.cursor = "auto";
    [...configCTA.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "auto");
    [...configCTA.getElementsByTagName("BUTTON")].forEach(ele => !ele.classList.contains("no-click") ? ele.style.pointerEvents = "auto" : ele.style.pointerEvents = "none");
    [...configCTA.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "auto");
    [...configCTA.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "auto");
  }
}

//default data
let config = {
  hostname: localData.hostname,
  wkcuser: localData.wkcuser,
  password: localData.password,
  //api_key: localData.api_key
}

//Modify configure-env with localstorage values
let cta = document.getElementById("configure-env")
cta.href = `${compositeHref}${Object.values(config).toString().replaceAll(",", " ")}`


//open/close industry dropdown
let industryList = document.getElementById('industry-list');
industryList.getElementsByClassName('anchor')[0].onclick = function (evt) {
  if (industryList.classList.contains('visible'))
    industryList.classList.remove('visible');
  else
    industryList.classList.add('visible');
}

//modify cta with selected industry value
let options = industryList.getElementsByTagName('LI');
[...options].forEach(option => option.addEventListener("click", selectOption))
function selectOption(e) {
  document.getElementById("selected-industry").textContent = e.target.textContent
  selecetdIndustry = getIndustry(e.target.textContent);
  industryList.classList.remove('visible');
  let cta = document.getElementById("pushToGit")
  if (Object.values(requiredVals).map(val => val.trim()).includes("") || selectedServices.length === 0 || selecetdIndustry.trim() === "") {
    cta.classList.remove("enable")
    cta.classList.add("disable")
    cta.classList.remove("allow-click")
    cta.classList.add("no-click")
  } else {
    cta.classList.remove("disable")
    cta.classList.add("enable")
    cta.classList.remove("no-click")
    cta.classList.add("allow-click")
  }
}

//open/close gov-artifacts dropdown
let checkList = document.getElementById('list1');
checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
  if (checkList.classList.contains('visible'))
    checkList.classList.remove('visible');
  else
    checkList.classList.add('visible');
}

//Get env values
let envVariables = document.getElementsByClassName('env-variables');
[...envVariables].forEach((task) => {
  task.addEventListener("input", getEnvValues)
});

function getEnvValues(e) {
  if (e.target.name === "hostname") {
    e.target.value = e.target.value.replace(/(^\w+:|^)\/\//, '');
  }
  config[e.target.name] = e.target.value
  let tempData = JSON.parse(localStorage[didact])
  tempData[e.target.name] = e.target.value
  localStorage[didact] = JSON.stringify(tempData)
  valid = true
  for (val of Object.values(config)) {
    if (val.trim() === "")
      valid = false
  }
  if (valid) {
    /*timelineContainer.style.opacity = 1;
    timelineContainer.style.cursor = "auto";
    [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "auto");
    [...timelineContainer.getElementsByTagName("BUTTON")].forEach(ele => !ele.classList.contains("no-click") ? ele.style.pointerEvents = "auto" : ele.style.pointerEvents = "none");
    [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "auto");
    [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "auto");*/
    let configCTA = timelineContainer.getElementsByClassName("timeline")[0]
    configCTA.style.opacity = 1;
    configCTA.style.cursor = "auto";
    [...configCTA.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "auto");
    [...configCTA.getElementsByTagName("BUTTON")].forEach(ele => !ele.classList.contains("no-click") ? ele.style.pointerEvents = "auto" : ele.style.pointerEvents = "none");
    [...configCTA.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "auto");
    [...configCTA.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "auto");
    if (localData.envConfigured) {
      let timelineCTA = timelineContainer.getElementsByClassName("timeline");
      [...timelineCTA].forEach(ele => ele.style.opacity = 1);
      timelineContainer.style.cursor = "auto";
      [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "auto");
      [...timelineContainer.getElementsByTagName("BUTTON")].forEach(ele => !ele.classList.contains("no-click") ? ele.style.pointerEvents = "auto" : ele.style.pointerEvents = "none");
      [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "auto");
      [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "auto");
    }
  } else {
    let timelineCTA = timelineContainer.getElementsByClassName("timeline");
    [...timelineCTA].forEach(ele => ele.style.opacity = 0.5)
    //timelineContainer.style.opacity = 0.5;
    timelineContainer.style.cursor = "not-allowed";
    [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "none");
    [...timelineContainer.getElementsByTagName("BUTTON")].forEach(ele => ele.style.pointerEvents = "none");
    [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "none");
    [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "none");
  }
}

document.getElementById("enable-timeline").addEventListener("click", activateRemainingCTA)
function activateRemainingCTA() {
  let timelineCTA = timelineContainer.getElementsByClassName("timeline");
  [...timelineCTA].forEach(ele => ele.style.opacity = 1)
  timelineContainer.style.cursor = "auto";
  [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "auto");
  [...timelineContainer.getElementsByTagName("BUTTON")].forEach(ele => !ele.classList.contains("no-click") ? ele.style.pointerEvents = "auto" : ele.style.pointerEvents = "none");
  [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "auto");
  [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "auto");
  let tempData = JSON.parse(localStorage[didact])
  tempData.envConfigured = true
  localStorage[didact] = JSON.stringify(tempData)
}

//configure cta
document.getElementById("configure-env").addEventListener("click", updateConfigVars);
function updateConfigVars(e) {
  document.getElementById("configure-env$1").setAttribute("command", `${compositeHref}${Object.values(config).toString().replaceAll(",", "%20")}`)
  document.getElementById("configure-env$1").click();
}

//enable managemnet dropdowns
let tasks = document.querySelectorAll("[id^='task']");
tasks.forEach((task) => (task.style.display = "none"));

let selectedTasks = document.getElementsByName("checkboxtask");
selectedTasks.forEach((task) => task.addEventListener("click", showTasks));
function showTasks(e) {

  if (e.target.checked) {
    document.getElementById(e.target.value).style.display = "block";
  } else {
    document.getElementById(e.target.value).style.display = "none";
  }
}

//open/close project list
let projectList = document.getElementById('project-list');
projectList.getElementsByClassName('anchor')[0].onclick = function (evt) {
  if (projectList.classList.contains('visible'))
    projectList.classList.remove('visible');
  else
    projectList.classList.add('visible');
}



//Get selected values
let govArtifacts = document.getElementsByName("governance-artifacts");
govArtifacts.forEach((task) => task.addEventListener("click", UpdateExport));
let selectedArtifacts = ["all"]
function UpdateExport(e) {
  /*if(e.target.value==="select-all") {
    if(e.target.checked ===true){ 
    govArtifacts.forEach((task) => {
      if(task.value!=="select-all"){
        selectedArtifacts.push(task.value);
        task.checked = true
      }
    }) }
    else{
      govArtifacts.forEach((task) => {
          task.checked = false
        })
     selectedArtifacts = []
    }
  }*/
  if (e.target.checked) {
    selectedArtifacts.push(e.target.value)
  } else {
    selectedArtifacts.indexOf(e.target.value) !== -1 && selectedArtifacts.splice(selectedArtifacts.indexOf(e.target.value), 1)
  }
  let task = document.getElementById("export-task")
  let cta = task.getElementsByTagName("BUTTON")[0]
  if (selectedArtifacts.length === 0) {
    task.classList.remove("enable")
    task.classList.add("disable")
    cta.classList.remove("allow-click")
    cta.classList.add("no-click")
  } else {
    task.classList.remove("disable")
    task.classList.add("enable")
    cta.classList.remove("no-click")
    cta.classList.add("allow-click")
  }
  cta.setAttribute("command", `cd /projects/techzone-demo/sandbox/;python3.8 exportGovArtifacts.py governance_artifacts.zip ${selectedArtifacts.toString()};unzip governance_artifacts.zip -d governance_artifacts`)
  if (selectedArtifacts.indexOf("rule") >= 0 || selectedArtifacts.indexOf("all") >= 0) {
    cta.setAttribute("command", `${cta.getAttribute("command")};python3.8 exportDataProtectionRules.py data_protection_rules.json`)
  }
  let showSeleted = document.getElementById("selected")
  showSeleted.textContent = selectedArtifacts.toString().replaceAll(",", ", ")
}

//Open Close services dropdowns
let serviceList = document.getElementById('service-list');
serviceList.getElementsByClassName('anchor')[0].onclick = function (evt) {
  if (serviceList.classList.contains('visible'))
    serviceList.classList.remove('visible');
  else
    serviceList.classList.add('visible');
}
// Populate the dropdown
let gitServicesList = document.getElementById("git-services");
Object.keys(services).forEach(id => {
  let li = document.createElement("li");
  let input = document.createElement("input");
  input.setAttribute("value", id)
  input.setAttribute("name", "services")
  input.setAttribute("type", "checkbox")
  li.appendChild(input)
  li.appendChild(document.createTextNode(services[id]));
  gitServicesList.appendChild(li);
})

//Get selected values
let gitServices = document.getElementsByName("services");
gitServices.forEach((task) => task.addEventListener("change", updateSelectedServices));
function updateSelectedServices(e) {
  if (e.target.checked) {
    selectedServices.push(e.target.value)
    gitServicesList.insertBefore(e.target.parentElement, gitServicesList.firstChild);
  } else {
    selectedServices.indexOf(e.target.value) !== -1 && selectedServices.splice(selectedServices.indexOf(e.target.value), 1)
    gitServicesList.insertBefore(e.target.parentElement, gitServices[Object.keys(services).indexOf(e.target.value)].parentElement);

  }
  let showSeleted = document.getElementById("selected-services")
  showSeleted.textContent = selectedServices.toString().replaceAll(",", ", ")
  let cta = document.getElementById("pushToGit")
  if (Object.values(requiredVals).map(val => val.trim()).includes("") || selectedServices.length === 0 || selecetdIndustry.trim() === "") {
    cta.classList.remove("enable")
    cta.classList.add("disable")
    cta.classList.remove("allow-click")
    cta.classList.add("no-click")
  } else {
    cta.classList.remove("disable")
    cta.classList.add("enable")
    cta.classList.remove("no-click")
    cta.classList.add("allow-click")
  }
}

//Search in dropdown
let searchItem = document.getElementById("services-search")
searchItem.addEventListener("input", filterServiceList)

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


//close dropdowns when clicked outside
document.onclick = function (e) {
  if (e.target.parentElement !== industryList && e.target.parentElement !== checkList && e.target.name !== "governance-artifacts" && e.target.parentElement !== serviceList && e.target.name !== "services" && e.target.nodeName !== "LI" && e.target.nodeName !== "INPUT") {
    serviceList.classList.remove('visible');
    checkList.classList.remove('visible');
    industryList.classList.remove('visible');
  }
};

//Enable/Disable PushToGit CTA
pushToGitRequiredFields.forEach(id => document.getElementById(id).addEventListener("input", setPushToGitCTA))

function setPushToGitCTA(e) {
  let cta = document.getElementById("pushToGit")
  if (e.target.id === "private-git-url" || e.target.id === "private-git-access-token") {
    privateGitRequired[e.target.id] = e.target.value
  } else {
    requiredVals[e.target.id] = e.target.value
  }
  if (document.getElementById("private-git-toggle").checked) {
    if (Object.values(privateGitRequired).map(val => val.trim()).includes("") || Object.values(requiredVals).map(val => val.trim()).includes("") || selectedServices.length === 0 || selecetdIndustry.trim() === "") {
      cta.classList.remove("enable")
      cta.classList.add("disable")
      cta.classList.remove("allow-click")
      cta.classList.add("no-click")
    } else {
      cta.classList.remove("disable")
      cta.classList.add("enable")
      cta.classList.remove("no-click")
      cta.classList.add("allow-click")
    }
  } else {
    if (Object.values(requiredVals).map(val => val.trim()).includes("") || selectedServices.length === 0 || selecetdIndustry.trim() === "") {
      cta.classList.remove("enable")
      cta.classList.add("disable")
      cta.classList.remove("allow-click")
      cta.classList.add("no-click")
    } else {
      cta.classList.remove("disable")
      cta.classList.add("enable")
      cta.classList.remove("no-click")
      cta.classList.add("allow-click")
    }
  }
}

function selectProject(e) {
  document.getElementById("selected-project").textContent = e.target.textContent
  selectedProject = e.target.textContent;
  let exportProjectCTA = document.getElementById("export-project")
  exportProjectCTA.setAttribute("command", `cd /projects/techzone-demo/sandbox/;python3.8 exportProjectv3.py ${e.target.name} project_assets.zip`)
  exportProjectCTA.classList.remove("disable")
  exportProjectCTA.classList.add("enable")
  exportProjectCTA.classList.remove("no-click")
  exportProjectCTA.classList.add("allow-click")
  projectList.classList.remove('visible');
}

