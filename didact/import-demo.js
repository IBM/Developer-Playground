window.onload = function funLoad() {
    let env = document.getElementById("environment").textContent
    let compositeHref = "git clone -b $BRANCH https://github.com/IBM/CPDemoFramework ${CHE_PROJECTS_ROOT}/techzone-demo;bash /projects/techzone-demo/sandbox/getDemoFiles.sh demo_name is_private git_url git_token;cd ${CHE_PROJECTS_ROOT}/techzone-demo;pip3.8 install -r requirements.txt;cd /projects/techzone-demo/sandbox/;python3.8 update-env.py "
    compositeHref = compositeHref.replaceAll("$BRANCH", env)

    let prerequisite = ["hostname", "wkcuser", "password"/*, "api_key"*/]

    let demo = document.getElementById("selected-demo").textContent

    let didact = demo ? `${document.getElementsByClassName("apptitle")[0].textContent}-${demo}` : document.getElementsByClassName("apptitle")[0].textContent

    //Get Workspace ID and setup default data for localStorage
    let workspaceId = document.getElementById("workspaceID").textContent
    let data = {
        workspaceId: workspaceId,
        hostname: "",
        wkcuser: "",
        password: "",
        /*api_key: "",*/
        demo: "",
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


    //Disable timeline
    let localData = JSON.parse(localStorage[didact])
    let timelineContainer = document.getElementsByClassName("timeline-container")[0]
    if (localData.hostname.trim() === "" || localData.wkcuser.trim() === "" || localData.password.trim() === "" /*|| localData.api_key.trim() === ""*/) {
        //timelineContainer.style.opacity = 0.5;
        timelineContainer.style.cursor = "not-allowed";
        [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "none");
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
        } else {
            console.log(document.getElementById("gittokeninput").style.display, "test---")
            let configCTA = timelineContainer.getElementsByClassName("timeline")[0]
            configCTA.style.opacity = 1;
            configCTA.style.cursor = "auto";
            [...configCTA.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "auto");
            [...configCTA.getElementsByTagName("BUTTON")].forEach(ele => !ele.classList.contains("no-click") ? ele.style.pointerEvents = "auto" : ele.style.pointerEvents = "none");
            [...configCTA.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "auto");
            [...configCTA.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "auto");
            if (document.getElementById("gittokeninput").style.display === "none") {
                let configCTA = timelineContainer.getElementsByClassName("timeline")[1]
                configCTA.style.opacity = 1;
                configCTA.style.cursor = "auto";
                [...configCTA.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "auto");
                [...configCTA.getElementsByTagName("BUTTON")].forEach(ele => !ele.classList.contains("no-click") ? ele.style.pointerEvents = "auto" : ele.style.pointerEvents = "none");
                [...configCTA.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "auto");
                [...configCTA.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "auto");
            }
        }
    }
    //Store Config data
    let config = {
        hostname: localData.hostname,
        wkcuser: localData.wkcuser,
        password: localData.password,
        /*api_key: localData.api_key*/
    }

    //update open cluster cta URL
    let clusterUrl = `https://${config.hostname}`
    let openClusterCta = document.getElementById("open-cpd-cluster")
    openClusterCta.href = clusterUrl

    //username from demo
    document.getElementById("selected-demo").textContent = demo.split(/-(.*)/s)[1] ? demo.split(/-(.*)/s)[1] : demo

    //modify cta with localStorage data
    let cta = document.getElementById("configure-env")
    cta.setAttribute("command", `${compositeHref.replace("demo_name", demo)}${Object.values(config).toString().replaceAll(",", " ")}`)
    document.getElementById("import-project").setAttribute("command", `cd /projects/techzone-demo/sandbox/;python3.8 importProject.py project_assets ${demo}`)



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
            console.log(document.getElementById("gittokeninput"), "---")
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
            if (document.getElementById("gittokeninput").style.display === "none") {
                let configCTA = timelineContainer.getElementsByClassName("timeline")[1]
                configCTA.style.opacity = 1;
                configCTA.style.cursor = "auto";
                [...configCTA.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "auto");
                [...configCTA.getElementsByTagName("BUTTON")].forEach(ele => !ele.classList.contains("no-click") ? ele.style.pointerEvents = "auto" : ele.style.pointerEvents = "none");
                [...configCTA.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "auto");
                [...configCTA.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "auto");
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
        let clusterUrl = `https://${config.hostname}`
        let openClusterCta = document.getElementById("open-cpd-cluster")
        openClusterCta.href = clusterUrl
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

    document.getElementById("gittoken").addEventListener("input", showConfigureCTA)
    function showConfigureCTA(e) {
        let configCTA = timelineContainer.getElementsByClassName("timeline")[1]
        console.log(e.target.value.trim())
        if (e.target.value.trim() !== "") {
            configCTA.style.opacity = 1;
            configCTA.style.cursor = "auto";
            [...configCTA.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "auto");
            [...configCTA.getElementsByTagName("BUTTON")].forEach(ele => !ele.classList.contains("no-click") ? ele.style.pointerEvents = "auto" : ele.style.pointerEvents = "none");
            [...configCTA.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "auto");
            [...configCTA.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "auto");
        } else {
            configCTA.style.opacity = 0.5;
            configCTA.style.cursor = "not-allowed";
            [...configCTA.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = "none");
            [...configCTA.getElementsByTagName("BUTTON")].forEach(ele => ele.style.pointerEvents = "none");
            [...configCTA.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = "none");
            [...configCTA.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = "none");
        }
    }

    //configure cta
    document.getElementById("configure-env").addEventListener("click", updateConfigVars);
    function updateConfigVars(e) {
        let gitToken = document.getElementById("gittoken") ? document.getElementById("gittoken").value : '';
        document.getElementById("configure-env$1").setAttribute("command", `${compositeHref.replace("demo_name", demo).replace("is_private", productInfo.isPrivate).replace("git_url", productInfo.privateGitRepoUrl).replace("git_token", gitToken)}${Object.values(config).toString().replaceAll(",", "%20")}`)
        document.getElementById("configure-env$1").click();
        let clusterUrl = `https://${config.hostname}`
        let openClusterCta = document.getElementById("open-cpd-cluster")
        openClusterCta.href = clusterUrl
    }
    document.getElementById("open-cpd-cluster-button").addEventListener("click", openCluster);
    function openCluster() {
        document.getElementById('open-cpd-cluster').click();
    }
}
