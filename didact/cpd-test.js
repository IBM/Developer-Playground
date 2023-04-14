window.onload = function () {
    // console.log(document.getElementById("execute"))
    let compositeHref = "didact://?commandId=extension.compositeCommand&&text=terminal-for-sandbox-container:new%7Cvscode.didact.sendNamedTerminalAString%2Csandbox%20terminal%2Ccd /projects;git clone https://github.com/IBM/CPDemoFramework -b techzone-fk --single-branch techzone;cd%20${CHE_PROJECTS_ROOT}/techzone/olm-utils-v2;sh%20configure-env.sh%20"  

    let prerequisite = ["server", "api_token", "kubeadmin_user", "kubeadmin_pass", "icr_key"]
    let services = {
      "analyticsengine": 'Analytics Engine Powered by Apache Spark',
      "bigsql": 'Db2 Big SQL',
      "ca": 'Cognos Analytics',
      "cde": 'Cognos Dashboards',
      "datagate": 'Data Gate',
      "datastage-ent-plus": 'DataStage Enterprise Plus',
      "db2": 'Db2',
      "db2u": 'IBM Db2u',
      "db2wh": 'Db2 Warehouse',
      "dmc": 'Data Management Console',
      "dods": 'Decision Optimization',
      "dp": 'Data Privacy',
      "dv": 'Data Virtualization',
      "hadoop": 'Execution Engine for Apache Hadoop',
      "mdm": 'IBM Master Data Management',
      "openpages": 'OpenPages',
      "planning-analytics": 'Planning Analytics',
      "rstudio": 'RStudio Server',
      "spss": 'SPSS Modeler',
      "voice-gateway": 'Voice Gateway',
      "watson-assistant": 'Watson Assistant',
      "watson-discovery": 'Watson Discovery',
      "watson-ks": 'Watson Knowledge Studio',
      "watson-openscale": 'IBM Watson OpenScale',
      "watson-speech": 'Watson Speech to Text',
      "wkc": 'Watson Knowledge Catalog',
      "wml": 'Watson Machine Learning',
      "wml-accelerator": 'Watson Machine Learning Accelerator',
      "wsl": 'Watson Studio'
    }
    let selectedServices = []
    let olmSelectedServices = []
  
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
      [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "none");
      [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "none");
      [...timelineContainer.getElementsByTagName("DIV")].forEach(ele => ele.style.pointerEvents = "none");
    }
  
    //default data
    let config = {
      server: localData.server,
      api_token: localData.api_token,
      kubeadmin_user: localData.kubeadmin_user,
      kubeadmin_pass: localData.kubeadmin_pass,
      icr_key: localData.icr_key,
    }
  
    //Get env values
    let envVariables = document.getElementsByClassName('env-variables');
    [...envVariables].forEach((task) => {
      task.addEventListener("input", getEnvValues)
    });
  
    function getEnvValues(e) {
      console.log(e.target.name, e.target.value)
      config[e.target.name] = e.target.value
      // let cta = document.getElementById("configure-env")
      // cta.href = `${compositeHref}${Object.keys(config).map(val => `${val.toUpperCase()}=${config[val]}`).toString().replaceAll(",","%20")}`
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
        [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "auto");
        [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "auto");
        [...timelineContainer.getElementsByTagName("DIV")].forEach(ele => ele.style.pointerEvents = "auto");
      } else {
        timelineContainer.style.opacity = 0.5;
        timelineContainer.style.cursor = "not-allowed";
        [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "none");
        [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "none");
        [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "none");
        [...timelineContainer.getElementsByTagName("DIV")].forEach(ele => ele.style.pointerEvents = "none");
      }
    }
  
        //configure cta
        document.getElementById("configure-env").addEventListener("click", updateConfigVars);
        function updateConfigVars(e){
        document.getElementById("config_command_exec").href =`${compositeHref}${Object.keys(config).map(val => `${document.getElementsByName(val)[0].value || "\"\""}`).toString().replaceAll(",","%20")}`          
        document.getElementById("config_command_exec").click();
        }

  
    document.getElementById("install_cr").addEventListener("click", install_cr);
    
    function install_cr() {
      let cp4dVersion = document.getElementById('cp4d_version').value;
      let component_list = selectedServices.toString()
      if(!component_list){
        component_list="null"
      }
      let storage = document.getElementById("cr_storage_value").value;
      document.getElementById("command_exec").href =
        "didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox%20terminal$$cd%20${CHE_PROJECTS_ROOT}/techzone/olm-utils-v2/;pip3.8%20install%20PyYAML;python%20updateYaml.py%20"+component_list+"%20"+storage+"%20"+cp4dVersion+"; source deploy.sh";
      document.getElementById("command_exec").click();
    }

    let serviceList = document.getElementById('cr-service-list');
  
    //Open close dropdowns
    document.onclick = function (e) {
      if (e.target.name !== "olm-services" && e.target.parentElement !== serviceList && e.target.name !== "cr-services" && e.target.nodeName !== "LI" && e.target.nodeName !== "INPUT") {
        serviceList.classList.remove('visible');
        // olmServiceList.classList.remove('visible');
      }
    };
    serviceList.getElementsByClassName('anchor')[0].onclick = function (evt) {
      if (serviceList.classList.contains('visible'))
        serviceList.classList.remove('visible');
      else
        serviceList.classList.add('visible');
    }
  
    let gitServicesList = document.getElementById("cr-git-services");
    Object.keys(services).forEach(id => {
      let li = document.createElement("li");
      let input = document.createElement("input");
      input.setAttribute("value", id)
      input.setAttribute("name", "cr-services")
      input.setAttribute("type", "checkbox")
      li.appendChild(input)
      li.appendChild(document.createTextNode(services[id]));
      gitServicesList.appendChild(li);
      li = document.createElement("li");
      input = document.createElement("input");
      input.setAttribute("value", id)
      input.setAttribute("name", "olm-services")
      input.setAttribute("type", "checkbox")
      li.appendChild(input)
      li.appendChild(document.createTextNode(services[id]));
      // olmServicesList.appendChild(li);
  
    })
  
    //Get selected values
    let gitServices = document.getElementsByName("cr-services");
    // let olmServices = document.getElementsByName("olm-services");
    gitServices.forEach((task) => task.addEventListener("click", updateSelectedServices));
    // olmServices.forEach((task) => task.addEventListener("click", updateOlmSelectedServices));
  
    function updateSelectedServices(e) {
      if (e.target.checked) {
        selectedServices.push(e.target.value)
        gitServicesList.insertBefore(e.target.parentElement, gitServicesList.firstChild);
      } else {
        selectedServices.indexOf(e.target.value) !== -1 && selectedServices.splice(selectedServices.indexOf(e.target.value), 1)
        gitServicesList.insertBefore(e.target.parentElement, gitServices[Object.keys(services).indexOf(e.target.value)].parentElement);
  
      }
      let showSeleted = document.getElementById("cr-selected-services")
      showSeleted.textContent = selectedServices.toString().replaceAll(",", ", ")
    }
  
  
    //Search in the dropdown
    let searchItem = document.getElementById("cr-services-search")
    searchItem.addEventListener("input", filterServiceList)
    // let olmSearchItem = document.getElementById("olm-services-search")
    // olmSearchItem.addEventListener("input", filterServiceList)
  
    function filterServiceList(e) {
      let currServices = []
      if (e.target.id === "cr-services-search") {
        currServices = gitServices
      } 
      // else {
      //   currServices = olmServices
      // }
      let listServices = [...currServices].map(service => service.value)
      listServices.forEach((res, idx) => {
        if (res.toLowerCase().includes(e.target.value.toLowerCase()) || services[res].toLowerCase().includes(e.target.value.toLowerCase())) {
          currServices[idx].parentElement.style.display = "block"
        } else {
          currServices[idx].parentElement.style.display = "none"
        }
      })
    }
  };
