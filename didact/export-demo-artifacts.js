console.log("this is test");
window.onload = function funLoad() {
  /*document.getElementById("createusersteps").style.display = "none";
  document.getElementById("updateusersteps").style.display = "none";
  document.querySelector("#createusersoption").addEventListener("click", show1);
  document.querySelector("#updateusersoption").addEventListener("click", show2);
​
  function show1() {
    document.getElementById("createusersteps").style.display = "inherit";
    document.getElementById("updateusersteps").style.display = "none";
  }
  function show2() {
    document.getElementById("createusersteps").style.display = "none";
    document.getElementById("updateusersteps").style.display = "inherit";
  }*/
 let compositeHref = "didact://?commandId=extension.compositeCommand&&text=terminal-for-sandbox-container:new%7Cvscode.didact.sendNamedTerminalAString%2Csandbox%20terminal%2Cgit%20clone%20-b%20techzone%20https%3A%2F%2Fgithub.com%2FIBM%2FDeveloper-Playground%20%24%7BCHE_PROJECTS_ROOT%7D%2Ftechzone-demo%2C%2Fprojects%7Cvscode.didact.sendNamedTerminalAString%2Csandbox%20terminal%2Ccd%20${CHE_PROJECTS_ROOT}/techzone-demo;pip3.8%20install%20-r%20requirements.txt%3Bcd%20%2Fprojects%2Ftechzone-demo%2Fsandbox%2F%3Bpython3.8%20update-env.py%20" 


 // Github push related code
 document.getElementById("pushToGit").addEventListener("click", pushToGit);
 function pushToGit(){
   let industry = document.getElementById("industry").value
   let tags = document.getElementById("tags").value
   let author = document.getElementById("author").value
   let services = document.getElementById("services").value
   let demoname = document.getElementById("demoname").value
   // JSON ARRAY
   let metadata=`{"industry":"${industry}","tags":"${tags}","author":"${author}","services":"${services}","demoname":"${demoname}"}`
   metadata = JSON.stringify(metadata)
   document.getElementById("command_exec").href =
     "didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=github terminal$$sh /projects/techzone-demo/sandbox/github.sh " + demoname + " "+metadata + " "+author;
   document.getElementById("command_exec").click();
   
 }
  /*var myHeaders = new Headers();
  myHeaders.append("Content-Security-Policy", "default-src *");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("insecureHTTPParser",true)

  var raw = JSON.stringify({
    "username": "admin",
    "password": "CP4DDataFabric"
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://datafabric.ibmcloudpack.com:12010/icp4d-api/v1/authorize", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));*/

  /*let timelineContainer = document.getElementsByClassName("timeline-container")[0]
  timelineContainer.style.opacity = 0.5;
  timelineContainer.style.cursor = "not-allowed";
  [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "none");
  [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "none")*/
  let config = {
    hostname: "",
    wkcuser: "",
    password: "",
  }
  let checkList = document.getElementById('list1');
  document.onclick = function (e) {
    if (e.target.parentElement !== checkList && e.target.name !== "governance-artifacts" && e.target.nodeName !== "LI") {
      checkList.classList.remove('visible');
    }
  };
  checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
    if (checkList.classList.contains('visible'))
      checkList.classList.remove('visible');
    else
      checkList.classList.add('visible');
  }

  let envVariables = document.getElementsByClassName('env-variables');
  console.log([...envVariables]);
  [...envVariables].forEach((task) => {
    task.addEventListener("input", getEnvValues)
  });

  function getEnvValues(e) {
    if (e.target.name === "hostname") {
      e.target.value = e.target.value.replace(/(^\w+:|^)\/\//, '');
    }
    config[e.target.name] = e.target.value
    let cta = document.getElementById("configure-env")
    cta.href = `${compositeHref}${Object.values(config).toString().replaceAll(",", "%20")}`
    /*valid = true
    for (val of Object.values(config)) {
      if (val.trim() === "")
        valid = false
    }
    if (valid) {
      timelineContainer.style.opacity = 1;
      timelineContainer.style.cursor = "auto";
      [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "auto");
      [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "auto")
    } else {
      timelineContainer.style.opacity = 0.5;
      timelineContainer.style.cursor = "not-allowed";
      [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "none");
      [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "none")
    }*/
  }

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
    let cta = task.getElementsByTagName("A")[0]
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
    cta.href = `didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/techzone-demo/sandbox/;python3.8 exportGovArtifacts.py governance_artifacts.zip ${selectedArtifacts.toString()};unzip governance_artifacts.zip -d governance_artifacts`
    if(selectedArtifacts.indexOf("rule") >= 0 || selectedArtifacts.indexOf("all") >= 0)
    {
        cta.href = cta.href + ";python3.8 exportDataProtectionRules.py data_protection_rules.json"
    }
    let showSeleted = document.getElementById("selected")
    showSeleted.innerHTML = `Selected Artifacts: ${selectedArtifacts.toString().replaceAll(",",", ")}`
  }
  var governanceOptions = document.getElementsByName("governanceartifactsopt");
  for (let key in governanceOptions) {
    document.getElementById(governanceOptions[key].value).style.display = "none";
    document.getElementById(governanceOptions[key].id).addEventListener("click", handleGovernanceOptions);
    if (governanceOptions[key].checked) {
      document.getElementById(governanceOptions[key].value).style.display = "inherit";
    }
  }

  function handleGovernanceOptions() {
    for (let key in governanceOptions) {
      console.log(governanceOptions[key].value)
      document.getElementById(governanceOptions[key].value).style.display = "none";
      if (governanceOptions[key].checked) {
        document.getElementById(governanceOptions[key].value).style.display = "inherit";
      }
    }
  }
};
