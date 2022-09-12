window.onload = function () {
    // console.log(document.getElementById("execute"))
    let env = document.getElementById("environment").textContent
    let compositeHref = "git clone https://github.com/IBM/CPDemoFramework -b techzone --single-branch ${CHE_PROJECTS_ROOT}/techzone-demo;cd ${CHE_PROJECTS_ROOT}/techzone-demo/olm-utils-v2;sh configure-env.sh"    
    let prerequisite = ["server", "api_token", "kubeadmin_user", "kubeadmin_pass", "icr_key"]
    let cpiSelectedServices = []
    let servicescpi = {
        "platform-navigator": "Platform Navigator",
        "api-management": "API Management",
        "automation-assets": "Automation Assets",
        "enterprise-gateway": "Enterprise Gateway",
        "event-endpoint-management": "Event Endpoint Management",
        "event-streams": "Event Steam",
        "high-speed-transfer-server": "High Speed Transfer Server",
        "integration-dashboard": "Integration Dashboard",
        "integration-design": "Integration Design",
        "integration-tracing": "Integration tracing",
        "messaging": "Messaging"
    }
  
    let didact = document.getElementsByClassName("apptitle")[0].textContent
  
    //Get Workspace ID and setup default data for localStorage
    let workspaceId = document.getElementById("workspaceID").textContent
    let data = {
      workspaceId: workspaceId,
      server: "",
      api_token: "",
      kubeadmin_user: "",
      kubeadmin_pass: "",
      icr_key: "",
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
  
    //Enable/Disable timeline
    let localData = JSON.parse(localStorage[didact])
    let timelineContainer = document.getElementsByClassName("timeline-container")[0]
    if ((localData.server.trim() === "" || localData.api_token.trim() === "" || localData.icr_key.trim() === "" ) && (localData.kubeadmin_user.trim() === "" || localData.kubeadmin_pass.trim() === "" || localData.icr_key.trim() === "")) {
      timelineContainer.style.opacity = 0.5;
      timelineContainer.style.cursor = "not-allowed";
      [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "none");
      [...timelineContainer.getElementsByTagName("BUTTON")].forEach(ele => ele.style.pointerEvents = "none");
      [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "none");
      [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "none");
      [...timelineContainer.getElementsByTagName("DIV")].forEach(ele => ele.style.pointerEvents = "none");
    }
  
    //default data
    let config = {
      server: localData.server.trim(),
      api_token: localData.api_token.trim(),
      kubeadmin_user: localData.kubeadmin_user.trim(),
      kubeadmin_pass: localData.kubeadmin_pass.trim(),
      icr_key: localData.icr_key.trim(),
    }
      //Modify configure-env with localstorage values
      let cta = document.getElementById("configure-env")
      cta.href = `${compositeHref}${Object.values(config).toString().replaceAll(",", " ")}`  
    //Get env values
    let envVariables = document.getElementsByClassName('env-variables');
    [...envVariables].forEach((task) => {
      task.addEventListener("input", getEnvValues)
    });
  
    function getEnvValues(e) {
      console.log(e.target.name, e.target.value)
      config[e.target.name] = e.target.value
      let tempData = JSON.parse(localStorage[didact])
      tempData[e.target.name] = e.target.value
      localStorage[didact] = JSON.stringify(tempData)
      let valid = true
      if((config.server.trim() === "" || config.api_token.trim() === "" || config.icr_key.trim() === "") && (config.kubeadmin_user.trim() === "" || config.kubeadmin_pass.trim() === "" || config.icr_key.trim() === ""))
        valid = false
      if (valid) {
        timelineContainer.style.opacity = 1;
        timelineContainer.style.cursor = "auto";
        [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "auto");
        [...timelineContainer.getElementsByTagName("BUTTON")].forEach(ele => !ele.classList.contains("no-click") ? ele.style.pointerEvents = "auto" : ele.style.pointerEvents = "none");
        [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "auto");
        [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "auto");
        [...timelineContainer.getElementsByTagName("DIV")].forEach(ele => ele.style.pointerEvents = "auto");
      } else {
        timelineContainer.style.opacity = 0.5;
        timelineContainer.style.cursor = "not-allowed";
        [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "none");
        [...timelineContainer.getElementsByTagName("BUTTON")].forEach(ele => ele.style.pointerEvents = "none");
        [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "none");
        [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "none");
        [...timelineContainer.getElementsByTagName("DIV")].forEach(ele => ele.style.pointerEvents = "none");
      }
    }
  
        //configure cta
        document.getElementById("configure-env").addEventListener("click", updateConfigVars);
        function updateConfigVars(e) {
            document.getElementById("configure-env$1").setAttribute("command", `${compositeHref}${Object.values(config).toString().replaceAll(",", "%20")}`)
            document.getElementById("configure-env$1").click();
          }
   
    ////// CP4I dropdown
    document.getElementById("install_cpi").addEventListener("click", install_cpi);
    
    function install_cpi() {
      let cp4iVersion = document.getElementById('cp4i_version').value;
      let component_list = cpiSelectedServices.toString()
      if(!component_list){
        component_list="null"
      }
      let storage = document.getElementById("cr_storage_value").value;
      document.getElementById("command_exec").href =
        "didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox%20terminal$$cd%20${CHE_PROJECTS_ROOT}/techzone-demo/olm-utils-v2/;pip3.8%20install%20PyYAML;python3.8%20updateYaml.py%20"+component_list+"%20"+storage+"%20"+cp4iVersion+";bash deploy.sh";    
        document.getElementById("command_exec").click();
    }
  
    // Get the dropdown elements
    let cpiServiceList = document.getElementById('cpi-service-list');  
    //Open close dropdowns cp4d
    document.onclick = function (e) {
      if (e.target.parentElement !== cpiServiceList && e.target.name !== "cpi-services" && e.target.nodeName !== "LI" && e.target.nodeName !== "INPUT") {
        cpiServiceList.classList.remove('visible');
      }
    };
    cpiServiceList.getElementsByClassName('anchor')[0].onclick = function (evt) {
        if (cpiServiceList.classList.contains('visible'))
        cpiServiceList.classList.remove('visible');
        else
        cpiServiceList.classList.add('visible');
    }
    let cpiServicesList = document.getElementById("cpi-git-services");
    Object.keys(servicescpi).forEach(id => {
        let li = document.createElement("li");
        let input = document.createElement("input");
        input.setAttribute("value", id)
        input.setAttribute("name", "cpi-services")
        input.setAttribute("type", "checkbox")
        li.appendChild(input)
        li.appendChild(document.createTextNode(servicescpi[id]));
        cpiServicesList.appendChild(li);
        
      })
  
    //Get selected values
    let cpiServices = document.getElementsByName("cpi-services");
    cpiServices.forEach((task) => task.addEventListener("click", updateCpiSelectedServices));
    function updateCpiSelectedServices(e) {
        if (e.target.checked) {
          cpiSelectedServices.push(e.target.value)
          cpiServicesList.insertBefore(e.target.parentElement, cpiServicesList.firstChild);
        } else {
          cpiSelectedServices.indexOf(e.target.value) !== -1 && cpiSelectedServices.splice(cpiSelectedServices.indexOf(e.target.value), 1)
          cpiServicesList.insertBefore(e.target.parentElement, cpiServices[Object.keys(servicescpi).indexOf(e.target.value)].parentElement);
    
        }
        let showSeleted = document.getElementById("cpi-selected-services")
        showSeleted.textContent = cpiSelectedServices.toString().replaceAll(",", ", ")
      }
      //enable radio dropdowns
      let tasks = document.querySelectorAll("[id^='task']");
      tasks.forEach((task) => (task.style.display = "none"));
    
      let selectedTasks = document.getElementsByName("checkboxtask");
      selectedTasks.forEach((task) => task.addEventListener("click", showTasks));
  
      function showTasks(e) {
        tasks.forEach((task) => (task.style.display = "none"));
        if (e.target.checked) {
          document.getElementById(e.target.value).style.display = "block";
        } else {
          document.getElementById(e.target.value).style.display = "none";
        }
      }
  
    //Search in the dropdown
    let cpiSearchItem = document.getElementById("cpi-services-search")
    cpiSearchItem.addEventListener("input", filterServiceList)
  
    function filterServiceList(e) {
      let currServices = []
      if (e.target.id === "cr-services-search") {
        currServices = gitServices
        currList = services
      } 
      else{
        currServices = cpiServices
        currList = servicescpi
      }
      let listServices = [...currServices].map(service => service.value)
      listServices.forEach((res, idx) => {
        if (res.toLowerCase().includes(e.target.value.toLowerCase()) || currList[res].toLowerCase().includes(e.target.value.toLowerCase())) {
          currServices[idx].parentElement.style.display = "block"
        } else {
          currServices[idx].parentElement.style.display = "none"
        }
      })
    }
  };
