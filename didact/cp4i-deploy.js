window.onload = function () {
  let compositeHref = "git clone https://github.com/IBM/CPDemoFramework -b techzone --single-branch techzone-demo;cd%20./techzone-demo/olm-utils-v2;sh%20configure-env.sh%20"   
    let prerequisite = ["server", "api_token", "kubeadmin_user", "kubeadmin_pass", "icr_key"]
    let services = {
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

    let selectedServices = []
  
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
      envConfigured: false,
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
      //timelineContainer.style.opacity = 0.5;
      timelineContainer.style.cursor = "not-allowed";
      [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "none");
      [...timelineContainer.getElementsByTagName("BUTTON")].forEach(ele => ele.style.pointerEvents = "none");
      [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "none");
      [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "none");
      [...timelineContainer.getElementsByTagName("DIV")].forEach(ele => ele.style.pointerEvents = "none");
  } else {
    timelineContainer.style.cursor = "not-allowed";
    [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "none");
    [...timelineContainer.getElementsByTagName("BUTTON")].forEach(ele => ele.style.pointerEvents = "none");
    [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "none");
    [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "none");
    [...timelineContainer.getElementsByTagName("DIV")].forEach(ele => ele.style.pointerEvents = "none");
    if (localData.envConfigured) {
      let timelineCTA = timelineContainer.getElementsByClassName("timeline");
      [...timelineCTA].forEach(ele => ele.style.opacity = 1);
      timelineContainer.style.cursor = "auto";
      [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "auto");
      [...timelineContainer.getElementsByTagName("BUTTON")].forEach(ele => !ele.classList.contains("no-click") ? ele.style.pointerEvents = "auto" : ele.style.pointerEvents = "none");
      [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "auto");
      [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "auto");
      [...timelineContainer.getElementsByTagName("DIV")].forEach(ele => ele.style.pointerEvents = "auto");
    } else {
      let configCTA = timelineContainer.getElementsByClassName("timeline")[0]
      configCTA.style.opacity = 1;
      configCTA.style.cursor = "auto";
      [...configCTA.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "auto");
      [...configCTA.getElementsByTagName("BUTTON")].forEach(ele => !ele.classList.contains("no-click") ? ele.style.pointerEvents = "auto" : ele.style.pointerEvents = "none");
      [...configCTA.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "auto");
      [...configCTA.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "auto");
      [...configCTA.getElementsByTagName("DIV")].forEach(ele => ele.style.pointerEvents = "auto");
    }
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
      if (e.target.name === "server") {
        e.target.value = e.target.value.replace(/(^\w+:|^)\/\//, '');
      }
      console.log(e.target.name, e.target.value)
      config[e.target.name] = e.target.value
      let tempData = JSON.parse(localStorage[didact])
      tempData[e.target.name] = e.target.value
      localStorage[didact] = JSON.stringify(tempData)
      let valid = true
      if((config.server.trim() === "" || config.api_token.trim() === "" || config.icr_key.trim() === "") && (config.kubeadmin_user.trim() === "" || config.kubeadmin_pass.trim() === "" || config.icr_key.trim() === ""))
        valid = false
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
      [...configCTA.getElementsByTagName("DIV")].forEach(ele => ele.style.pointerEvents = "auto");
      if (localData.envConfigured) {
        let timelineCTA = timelineContainer.getElementsByClassName("timeline");
        [...timelineCTA].forEach(ele => ele.style.opacity = 1);
        timelineContainer.style.cursor = "auto";
        [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "auto");
        [...timelineContainer.getElementsByTagName("BUTTON")].forEach(ele => !ele.classList.contains("no-click") ? ele.style.pointerEvents = "auto" : ele.style.pointerEvents = "none");
        [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "auto");
        [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "auto");
        [...timelineContainer.getElementsByTagName("DIV")].forEach(ele => ele.style.pointerEvents = "auto");
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
      [...timelineContainer.getElementsByTagName("DIV")].forEach(ele => ele.style.pointerEvents = "none");
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
    [...timelineContainer.getElementsByTagName("DIV")].forEach(ele => ele.style.pointerEvents = "auto");
    let tempData = JSON.parse(localStorage[didact])
    tempData.envConfigured = true
    localStorage[didact] = JSON.stringify(tempData)
  }

  
        //configure cta
        document.getElementById("configure-env").addEventListener("click", updateConfigVars);
        function updateConfigVars(e) {
            document.getElementById("configure-env$1").setAttribute("command", `${compositeHref}${Object.values(config).toString().replaceAll(",", " ")}`)
            document.getElementById("configure-env$1").click();
          }
   
    ////// CP4I dropdown
    document.getElementById("install_cpd").addEventListener("click", install_cpd);
    
    function install_cpd() {
      let cp4iVersion = document.getElementById('cp4i_version').value;
      let component_list = selectedServices.toString()
      if(!component_list){
        component_list="null"
      }
      let storage = document.getElementById("storage_value").value;
      document.getElementById("install_cpd$1").setAttribute("command", `cd /projects/techzone-demo/olm-utils-v2/;pip3.8 install PyYAML;python3.8 updateYaml.py  ${component_list} ${storage} ${cp4iVersion} cp4i; bash deploy.sh cp4i`)
      document.getElementById("install_cpd$1").click();  
    }
  
    // Get the dropdown elements
    let serviceList = document.getElementById('service-list');  
    //Open close dropdowns cp4d
    document.onclick = function (e) {
      if (e.target.parentElement !== serviceList && e.target.name !== "services" && e.target.nodeName !== "LI" && e.target.nodeName !== "INPUT") {
        serviceList.classList.remove('visible');
      }
    };
    serviceList.getElementsByClassName('anchor')[0].onclick = function (evt) {
        if (serviceList.classList.contains('visible'))
        serviceList.classList.remove('visible');
        else
        serviceList.classList.add('visible');
    }
    let gitServicesList = document.getElementById("git-services");
    Object.keys(services).forEach((id, index) => {
        let li = document.createElement("li");
        let input = document.createElement("input");
        input.id = `input_option${index}`
         input.value = id
         input.name = "services"
         input.type = "checkbox"
         li.id = `li_option${index}`
        li.appendChild(input)
        li.appendChild(document.createTextNode(services[id]));
        gitServicesList.appendChild(li);
        
      })
  
    //Get selected values
    let gitServices = document.getElementsByName("services");
    gitServices.forEach((task) => task.addEventListener("change", updateSelectedServices));
    function updateSelectedServices(e) {
        if (e.target.checked) {
          if(!selectedServices.includes(e.target.value)){
            selectedServices.push(e.target.value)
            gitServicesList.insertBefore(e.target.parentElement, gitServicesList.firstChild);
        }
          } else {
          selectedServices.indexOf(e.target.value) !== -1 && selectedServices.splice(selectedServices.indexOf(e.target.value), 1)
          gitServicesList.insertBefore(e.target.parentElement, gitServices[Object.keys(services).indexOf(e.target.value)].parentElement);
    
        }
        let showSeleted = document.getElementById("selected-services")
        showSeleted.textContent = selectedServices.toString().replaceAll(",", ", ")
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
    let searchItem = document.getElementById("services-search")
    searchItem.addEventListener("input", filterServiceList)
  
    function filterServiceList(e) {
      let currServices = []
      if (e.target.id === "services-search") {
        currServices = gitServices
      }
      let listServices = [...currServices].map(service => service.value)
      listServices.forEach((res, idx) => {
        if (res.toLowerCase().includes(e.target.value.toLowerCase()) || services[res].toLowerCase().includes(e.target.value.toLowerCase())) {
          currServices[idx].parentElement.style.display = "block"
        } else {
          currServices[idx].parentElement.style.display = "none"
        }
      })
    }
      let dataFetchInput = document.getElementById("data-fetched")
  };
