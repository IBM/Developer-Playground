console.log("this is test");
window.onload = function funLoad() {
 let compositeHref = "didact://?commandId=extension.compositeCommand&&text=terminal-for-sandbox-container:new%7Cvscode.didact.sendNamedTerminalAString%2Csandbox%20terminal%2Cgit%20clone%20-b%20techzone%20https%3A%2F%2Fgithub.com%2FIBM%2FDeveloper-Playground%20%24%7BCHE_PROJECTS_ROOT%7D%2Ftechzone-demo%2C%2Fprojects%7Cvscode.didact.sendNamedTerminalAString%2Csandbox%20terminal%2Ccd%20${CHE_PROJECTS_ROOT}/techzone-demo;pip3.8%20install%20-r%20requirements.txt%3Bcd%20%2Fprojects%2Ftechzone-demo%2Fsandbox%2F%3Bpython3.8%20update-env.py%20" 

  
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
    cta.href = `${compositeHref}${Object.values(config).toString().replaceAll(",", "%20")}%7Cpython3%20update-project-dropdown.py%7Cvscode.didact.reload`
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
}
