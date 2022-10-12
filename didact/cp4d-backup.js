window.onload = function () {
  let compositeHref = "git clone https://github.com/IBM/CPDemoFramework -b development --single-branch cpd-backup;cd%20/projects/cpd-backup/sandbox/cpdbr;sh%20configure-env.sh%20"
  let prerequisite = ["src_server", "src_api_token", "kubeadmin_user", "kubeadmin_pass", "s3_url","bucket","region","access_key","access_id" ]
  let didact = document.getElementsByClassName("apptitle")[0].textContent

  //Get Workspace ID and setup default data for localStorage
  let workspaceId = document.getElementById("workspaceID").textContent
  let data = {
    workspaceId: workspaceId,
    src_server: "",
    src_api_token: "",
    kubeadmin_user: "",
    kubeadmin_pass: "",
    s3_url:"",
    bucket:"",
    region:"",
    access_key:"",
    access_id:"",
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
  if ((localData.src_server.trim() === "" || localData.src_api_token.trim() === "" || localData.s3_url.trim() === "" || localData.bucket.trim() === "" || localData.region.trim() === "" || localData.access_key.trim() === "" || localData.access_id.trim() === "") && (localData.kubeadmin_user.trim() === "" || localData.kubeadmin_pass.trim() === "" || localData.s3_url.trim() === "" || localData.bucket.trim() === "" || localData.region.trim() === "" || localData.access_key.trim() === "" || localData.access_id.trim() === "")) {
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
    src_server: localData.src_server.trim(),
    src_api_token: localData.src_api_token.trim(),
    kubeadmin_user: localData.kubeadmin_user.trim(),
    kubeadmin_pass: localData.kubeadmin_pass.trim(),
    s3_url: localData.s3_url.trim(),
    bucket: localData.bucket.trim(),
    region: localData.region.trim(),
    access_key: localData.access_key.trim(),
    access_id: localData.access_id.trim(),
  }
  //Get env values
  let envVariables = document.getElementsByClassName('env-variables');
  [...envVariables].forEach((task) => {
    task.addEventListener("input", getEnvValues)
  });

  function getEnvValues(e) {
    if (e.target.name === "src_server") {
      e.target.value = e.target.value.replace(/(^\w+:|^)\/\//, '');
    }
    console.log(e.target.name, e.target.value)
    config[e.target.name] = e.target.value
    let tempData = JSON.parse(localStorage[didact])
    tempData[e.target.name] = e.target.value
    localStorage[didact] = JSON.stringify(tempData)
    let valid = true
    if ((config.src_server.trim() === "" || config.src_api_token.trim() === "" || config.s3_url.trim() === "" || config.bucket.trim() === "" || config.region.trim() === "" || config.access_key.trim() === "" || config.access_id.trim() === "") && (config.kubeadmin_user.trim() === "" || config.kubeadmin_pass.trim() === "" || config.s3_url.trim() === "" || config.bucket.trim() === "" || config.region.trim() === "" || config.access_key.trim() === "" || config.access_id.trim() === ""))
      valid = false
    if (valid) {
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

  //configure env cta
  document.getElementById("configure-env").addEventListener("click", updateConfigVars);
  function updateConfigVars(e) {
    document.getElementById("configure-env$1").setAttribute("command", `${compositeHref}${Object.keys(config).map(val => `${document.getElementsByName(val)[0].value || "\"\""}`).toString().replaceAll(",","%20")}` );
    document.getElementById("configure-env$1").click();
  }
  //start backup cta
  document.getElementById("backup_src").addEventListener("click", backup_src);
  function backup_src() {
    let backupName = document.getElementById('backup_name').value;
    document.getElementById("backup_src$1").setAttribute("command", `cd /projects/cpd-backup/sandbox/cpdbr; bash cpdbr.sh cp4d backup ${backupName}`)
    document.getElementById("backup_src$1").click();
  }
};
