window.onload = function funLoad() {
    let env = document.getElementById("environment").textContent
    let compositeHref = "git clone -b $BRANCH https://github.com/IBM/CPDemoFramework ${CHE_PROJECTS_ROOT}/techzone-demo;bash /projects/techzone-demo/sandbox/getDemoFiles.sh demo_name;cd ${CHE_PROJECTS_ROOT}/techzone-demo;pip3.8 install -r requirements.txt;cd /projects/techzone-demo/sandbox/;python3.8 update-env.py "
    compositeHref = compositeHref.replaceAll("$BRANCH",env)
    
    let prerequisite = ["hostname", "wkcuser", "password"/*, "api_key"*/]
    let didact = document.getElementsByClassName("apptitle")[0].textContent
  
    //Get Workspace ID and setup default data for localStorage
    let workspaceId = document.getElementById("workspaceID").textContent
    let data = {
      workspaceId: workspaceId,
      hostname: "",
      wkcuser: "",
      password: "",
      /*api_key: "",*/
      demo: "",
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
  
  
    //Disable timeline
    let localData = JSON.parse(localStorage[didact])
    let timelineContainer = document.getElementsByClassName("timeline-container")[0]
    if (localData.hostname.trim() === "" || localData.wkcuser.trim() === "" || localData.password.trim() === "" /*|| localData.api_key.trim() === ""*/) {
      timelineContainer.style.opacity = 0.5;
      timelineContainer.style.cursor = "not-allowed";
      [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "none");
      [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "none");
      [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "none");
      let checkList = document.getElementById('list1');
      checkList.style.pointerEvents = "none";
  
  
    }
  
    //Store Config data
    let config = {
      hostname: localData.hostname,
      wkcuser: localData.wkcuser,
      password: localData.password,
      /*api_key: localData.api_key*/
    }
    let demo = localData.demo
  
    //update open cluster cta URL
    let clusterUrl = `https://${config.hostname}`
    let openClusterCta = document.getElementById("open-cpd-cluster")
    openClusterCta.href = clusterUrl
  
    //modify cta with localStorage data
    let cta = document.getElementById("configure-env$1")
    cta.setAttribute("command",`${compositeHref.replace("demo_name", demo)}${Object.values(config).toString().replaceAll(",", " ")}`)
  
    if (demo.trim() !== "") {
      document.getElementById("selected").textContent = demo
      document.getElementById("import-project").setAttribute("command", `cd /projects/techzone-demo/sandbox/;python3.8 importProject.py project_assets ${demo}`)
    }
  
  
    //open/close demo dropdown
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
  
    //modify cta with selected demo value
    let options = checkList.getElementsByTagName('LI');
    [...options].forEach(option => option.addEventListener("click", selectOption))
    function selectOption(e) {
      document.getElementById("selected").textContent = e.target.textContent
      demo = e.target.textContent
      cta.setAttribute("command",`${compositeHref.replace("demo_name", e.target.textContent)}${Object.values(config).toString().replaceAll(",", "%20")}`)
      document.getElementById("import-project").setAttribute("command",`cd /projects/techzone-demo/sandbox/;python3.8 importProject.py project_assets ${e.target.textContent}`)
      checkList.classList.remove('visible');
      let tempData = JSON.parse(localStorage[didact])
      tempData["demo"] = e.target.textContent
      localStorage[didact] = JSON.stringify(tempData)
    }
  
    //get env values
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
        timelineContainer.style.opacity = 1;
        timelineContainer.style.cursor = "auto";
        [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "auto");
        [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "auto");
        [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "auto");
        let checkList = document.getElementById('list1');
        checkList.style.pointerEvents = "auto";
      } else {
        timelineContainer.style.opacity = 0.5;
        timelineContainer.style.cursor = "not-allowed";
        [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "none");
        [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "none");
        [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "none");
        let checkList = document.getElementById('list1');
        checkList.style.pointerEvents = "none";
      }
      let clusterUrl = `https://${config.hostname}`
      let openClusterCta = document.getElementById("open-cpd-cluster")
      openClusterCta.href = clusterUrl
    }
    //configure cta
  document.getElementById("configure-env").addEventListener("click", updateConfigVars);
  function updateConfigVars(e){
    document.getElementById("config_command_exec").href =`${compositeHref.replace("demo_name", demo)}${Object.values(config).toString().replaceAll(",", "%20")}`
    document.getElementById("config_command_exec").click();
    let clusterUrl = `https://${config.hostname}`
    let openClusterCta = document.getElementById("open-cpd-cluster")
    openClusterCta.href = clusterUrl
  }
  }
  
