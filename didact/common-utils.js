let dataToRestoreOnReload = {};
let currentHTMLstateData = {};
let productInfo = {};

const services = {
    analyticsengine: "Analytics Engine Powered by Apache Spark",
    bigsql: "Db2 Big SQL",
    cde: "Cognos Dashboards",
    cognos_analytics: "Cognos Analytics",
    cpd_platform: "Cloud Pak for Data Control Plane",
    cpfs: "Cloud Pak Foundational Services(CPFS)",
    datagate: "Data Gate",
    datarefinery: "Data Refinery",
    datastage_ent: "DataStage Enterprise",
    datastage_ent_plus: "DataStage Enterprise Plus",
    db2aaservice: "CPD db2 aas component",
    db2oltp: "Db2",
    db2u: "IBM Db2u",
    db2wh: "Db2 Warehouse",
    dmc: "Data Management Console",
    dods: "Decision Optimization",
    dp: "Data Privacy",
    dv: "Data Virtualization",
    edb_cp4d: "EnterpriseDB Postgres",
    hee: "Execution Engine for Apache Hadoop",
    iis: "WKC's IIS component",
    informix: "Informix install Operator",
    informix_cp4d: "Informix deployment Operator",
    match360: "Match 360 with Watson",
    model_train: "IBM cloudpak operator for training with Model Train",
    mongodb: "MongoDB Operator",
    mongodb_cp4d: "MongoDB for Cloud Pak for Data",
    openpages: "OpenPages",
    openpages_instance: "OpenPages Instance",
    openscale: "Watson OpenScale",
    planning_analytics: "Planning Analytics",
    postgresql: "Cloud Native PostgreSQL",
    productmaster: "Product Master",
    productmaster_instance: "Product Master Instance",
    rstudio: "RStudio Server",
    scheduler: "CPD Scheduler",
    spss: "SPSS Modeler",
    voice_gateway: "Voice Gateway",
    watson_assistant: "Watson Assistant",
    watson_discovery: "Watson Discovery",
    watson_gateway: "IBM Watson Gateway Operator",
    watson_ks: "Watson Knowledge Studio",
    watson_speech: "Watson Speech to Text",
    wkc: "Watson Knowledge Catalog",
    wml: "Watson Machine Learning",
    wml_accelerator: "Watson Machine Learning Accelerator",
    ws: "Watson Studio",
    ws_pipelines: "Watson Studio Pipelines",
    ws_runtimes: "Watson Studio Runtimes",
    zen: "Zen Service in CPFS"
}

const industries = {
    hospitality: "Hospitality",
    healthcare: "Healthcare",
    "e-commerce": "E-commerce",
    banking: "Banking and financial services",
    insurance: "Insurance",
    retail: "Retail",
    software: "Software",
    telecommunications: "Telecommunications",
    transportation: "Transportation",
    utilities: "Utilities",
    other: "Other"
}



//update workspace state with events
const updateWorkspaceState = (e) => {
    let data = {};
    if (currentHTMLstateData.doNotRestore.includes(e.target.id)) {
        return;
    }
    if (e.type === "change") {
        data.checked = e.target.checked;
    } else if (e.type === "input") {
        data.value = e.target.value;
    }
    data.dispatchEvent = e.type;
    dataToRestoreOnReload[e.target.id] = data;
    // update dataToRestoreOnReload in extension
    document.getElementById("update-workspace-state").click();
    delete dataToRestoreOnReload[e.target.id];
}


//adds additional event listener to update the state in workspace
const addEventListener = (element, eventType, triggerFunction) => {
    element.addEventListener(eventType, triggerFunction);
    if (element.classList.contains('store-data')) {
        element.addEventListener(eventType, updateWorkspaceState);
    }
}

//add additional event listener to update the state in workspace for CTAs 
const storeCTAInState = () => {
    [...document.getElementsByTagName("BUTTON")].forEach(cta => {
        if (cta.classList.contains("store-data")) {
            cta.addEventListener("click", updateWorkspaceState);
        }
    })
}

// Fill available state data
const restoreData = (dataToRestore) => {
    console.log("get-workspace-state", dataToRestore)
    for (let elementId of Object.keys(dataToRestore)) {
        let elementToRestore = document.getElementById(elementId);
        for (let attribute of Object.keys(dataToRestore[elementId])) {
            try {
                if (attribute === "dispatchEvent") {
                    elementToRestore.dispatchEvent(new Event(dataToRestore[elementId][attribute]));
                } else {
                    elementToRestore[attribute] = dataToRestore[elementId][attribute];
                }
            } catch {
                continue;
            }
        }
    }
}

// validate prequisites
const checkAllPrequisiteFieldsfilled = () => {
    for (combination of currentHTMLstateData.validPrequisites) {
        let valid = true;
        for (prerequisite of combination) {
            if (currentHTMLstateData.prerequisites[prerequisite].trim() === "") {
                valid = false;
            }
        }
        if (valid) {
            return true
        }
    }
    return false
}

//handle prerequisites values
const handlePrerequisiteValues = (e) => {
    if (e.target.name === "hostname") {
        e.target.value = e.target.value.trim().replace(/(^\w+:|^)\/\//, '').replace(/^\/+|\/+$/g, '');
    }
    currentHTMLstateData.prerequisites[e.target.name] = e.target.value;
    let prerequisiteFulfilled = checkAllPrequisiteFieldsfilled()

    if (prerequisiteFulfilled) {
        if (currentHTMLstateData.isPrivateDemo) {
            enableTimelineTillElement("private-git-CTA");
        } else {
            enableTimelineTillElement("configure-environment-CTA");
        }
    } else {
        disableTimelineFromElement("all");
    }
}

// Disable/Enable components
const modifyVisibilityOfCTAs = (CTAids, visibility) => {
    for (let CTAid of CTAids) {
        let CTA = document.getElementById(CTAid);
        if (visibility === "disable") {
            CTA.classList.remove("enable")
            CTA.classList.add("disable")
            CTA.classList.remove("allow-click")
            CTA.classList.add("no-click")
        } else if (visibility === "enable") {
            CTA.classList.remove("disable")
            CTA.classList.add("enable")
            CTA.classList.remove("no-click")
            CTA.classList.add("allow-click")
        } else if (visibility === "unhide") {
            CTA.classList.remove("hidden-state")
        } else if (visibility === "hide") {
            CTA.classList.add("hidden-state")
        }
    }

}

// Handle timeline visibility
const modifyVisibilityInTimeline = (element, cursorValue, opacityValue, pointerEventValue) => {
    [...element].forEach(parentEle => {
        parentEle.style.opacity = opacityValue;
        parentEle.style.cursor = cursorValue;
        [...parentEle.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = pointerEventValue);
        [...parentEle.getElementsByTagName("BUTTON")].forEach(ele => !ele.classList.contains("no-click") ? ele.style.pointerEvents = pointerEventValue : ele.style.pointerEvents = "none");
        [...parentEle.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = pointerEventValue);
        [...parentEle.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = pointerEventValue);
    });
}

// enable timeline till particular element(including that element)
const enableTimelineTillElement = (elementId) => {
    let timelineContainer = document.getElementsByClassName("timeline-container")[0]
    let CTAs = timelineContainer.getElementsByClassName("timeline")
    if (elementId === "all") {
        modifyVisibilityInTimeline(CTAs, "auto", 1, "auto")
    } else {
        for (let CTA of CTAs) {
            modifyVisibilityInTimeline([CTA], "auto", 1, "auto")
            if (CTA.id === elementId) {
                break;
            }
        }
    }
}

//disable timeline from particular element(excluding that element)
const disableTimelineFromElement = (elementId) => {
    let timelineContainer = document.getElementsByClassName("timeline-container")[0]
    let CTAs = [...timelineContainer.getElementsByClassName("timeline")]
    if (elementId === "all") {
        modifyVisibilityInTimeline(CTAs, "not-allowed", 0.5, "none")
    } else {
        let elementFound = false;
        for (let CTA of CTAs) {
            if (elementFound) {
                modifyVisibilityInTimeline([CTA], "not-allowed", 0.5, "none")
            }
            if (CTA.id === elementId) {
                elementFound = true
            }
        }
    }
}

// Open/Close Dropdowns
const toggleDropdowns = (dropdownIds) => {
    dropdownIds.forEach(dropdownId => {
        let dropdown = document.getElementById(dropdownId);
        dropdown.getElementsByClassName('anchor')[0].onclick = function (evt) {
            if (dropdown.classList.contains('visible'))
                dropdown.classList.remove('visible');
            else
                dropdown.classList.add('visible');
        }
    })
}

//create single select dropdown with given data
const createSingleSelectDropdown = (parentId, data, clickFunction) => {
    let parent = document.getElementById(parentId);
    Object.keys(data).forEach(id => {
        let li = document.createElement("li");
        li.id = `li_${id}`
        li.textContent = data[id];
        li.classList.add('store-data')
        addEventListener(li, 'click', clickFunction);
        parent.appendChild(li);
    })
}

//create multi select dropdown with given data along with search functinality
const createMultiSelectDropdownWithSearch = (parentId, data, checkFunction, inputName, searchInputId, filterFunction) => {
    let parent = document.getElementById(parentId);
    Object.keys(data).forEach(id => {
        let li = document.createElement("li");
        let input = document.createElement("input");
        input.id = `input_${id}`
        li.id = `li_${id}`
        input.classList.add('store-data')
        input.setAttribute("value", id)
        input.setAttribute("name", inputName)
        input.setAttribute("type", "checkbox")
        addEventListener(input, "change", checkFunction);
        li.appendChild(input)
        li.appendChild(document.createTextNode(data[id]));
        parent.appendChild(li);
    })
    addEventListener(document.getElementById(searchInputId), "input", filterFunction);
}

// enable complete timeline
const enableAll = (e) => {
    enableTimelineTillElement("all");
    currentHTMLstateData.envConfigured = true;
}
