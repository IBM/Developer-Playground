window.onload = function () {
  let compositeHref = "git clone https://github.com/nupurnegi/CPDemoFramework -b techzone --single-branch techzone-demo;cd%20./techzone-demo/olm-utils-v2;sh%20configure-env.sh%20"   
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
          document.getElementById("configure-env$1").setAttribute("command", `${compositeHref}${Object.values(config).toString().replaceAll(",", " ")}`)
          document.getElementById("configure-env$1").click();
        }
 
  ////// CP4I dropdown
  document.getElementById("install_cr").addEventListener("click", installCr);
  function installCr(e) {
    let cp4dVersion = document.getElementById('cp4d_version').value;
    let component_list = selectedServices.toString()
    if(!component_list){
      component_list="null"
    }
    let storage = document.getElementById("cr_storage_value").value;
    document.getElementById("install_cr$1").setAttribute("command", `cd ${CHE_PROJECTS_ROOT}/techzone-demo/olm-utils-v2/;python3.8 updateYaml.py ${component_list} ${storage} ${cp4dVersion};bash deploy.sh`)
    // document.getElementById("install_cr$1").click();
  }

  // Get the dropdown elements
  let serviceList = document.getElementById('cr-service-list');  
  
  // //Open close dropdowns cp4d
  // document.onclick = function (e) {
  //     if (e.target.parentElement !== serviceList && e.target.name !== "cr-services" && e.target.nodeName !== "LI" && e.target.nodeName !== "INPUT") {
  //         serviceList.classList.remove('visible');
  //   }
  // };
  serviceList.getElementsByClassName('anchor')[0].onclick = function (evt) {
      if (serviceList.classList.contains('visible'))
      serviceList.classList.remove('visible');
      else
      serviceList.classList.add('visible');
  }
  

  //Get selected values
  let gitServices = document.getElementsByName("cr-services");
  gitServices.forEach((task) => task.addEventListener("click", updateSelectedServices));
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

  // Search in the dropdown
  // let searchItem = document.getElementById("cr-services-search")
  // searchItem.addEventListener("input", filterServiceList)

  // function filterServiceList(e) {
  //   let currServices = []
  //   if (e.target.id === "cr-services-search") {
  //     currServices = gitServices
  //   }
  //   let listServices = [...currServices].map(service => service.value)
  //   listServices.forEach((res, idx) => {
  //     if (res.toLowerCase().includes(e.target.value.toLowerCase()) || services[res].toLowerCase().includes(e.target.value.toLowerCase())) {
  //       currServices[idx].parentElement.style.display = "block"
  //     } else {
  //       currServices[idx].parentElement.style.display = "none"
  //     }
  //   })
  // }
  function selectService(e) {
    document.getElementById("cr-selected-services").textContent = e.target.textContent
    selectedServices = e.target.textContent;
    let gitServicesList = document.getElementById("cr-git-services");
    Object.keys(services).forEach(id => {
         let li = document.createElement("li");
         let input = document.createElement("input");
         if(id === selectedServices)
           input.setAttribute("checked", true)
         input.setAttribute("value", id)
         input.setAttribute("name", "cr-services")
         input.setAttribute("type", "checkbox")
         li.appendChild(input)
         li.appendChild(document.createTextNode(services[id]));
         gitServicesList.appendChild(li);
       })
  }
  
  function renderData(e) {
    let elementModified = document.getElementById("data-fetched").value
    if (elementModified === "cr-service-list") {
      [...document.getElementById(elementModified).getElementsByTagName("LI")].forEach(ele => ele.addEventListener("click", selectService))
    }
    document.getElementById("data-fetched").value = ""
  }

  let dataFetchInput = document.getElementById("data-fetched")
  dataFetchInput.addEventListener("input", renderData)
  // console.log(dataFetchInput)
};
