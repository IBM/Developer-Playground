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

  try{
  let checkList = document.getElementById('list1');
  checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (checkList.classList.contains('visible'))
      checkList.classList.remove('visible');
    else
      checkList.classList.add('visible');
  }
  } catch {
      //Do NOTHING
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
    if(selectedArtifacts.length === 0){
      task.classList.remove("enable")
      task.classList.add("disable")
      cta.classList.remove("allow-click")
      cta.classList.add("no-click")
    } else{
      task.classList.remove("disable")
      task.classList.add("enable")
      cta.classList.remove("no-click")
      cta.classList.add("allow-click")
    }
    cta.href = `didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/techzone-demo/sandbox/;python3.8 exportGovArtifacts.py gov-artifacts.zip ${selectedArtifacts.toString()};unzip gov-artifacts.zip -d gov-artifacts`
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
