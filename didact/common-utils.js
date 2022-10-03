let dataToRestoreOnReload = {};
let currentHTMLstateData = {};



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


const addEventListener = (element, eventType, triggerFunction) => {
    element.addEventListener(eventType, triggerFunction);
    if (element.classList.contains('store-data')) {
        element.addEventListener(eventType, updateWorkspaceState);
    }
}

// Fill available state data
const restoreData = () => {
    //get data from workspace state
    document.getElementById("get-workspace-state").click();
    for (let elementId of Object.keys(dataToRestoreOnReload)) {
        let elementToRestore = document.getElementById(elementId);
        for (let attribute of Object.keys(dataToRestoreOnReload[elementId])) {
            if (attribute === "dispatchEvent") {
                elementToRestore.dispatchEvent(new Event(dataToRestoreOnReload[elementId][attribute]));
            } else {
                elementToRestore[attribute] = dataToRestoreOnReload[elementId][attribute];
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
        li.addEventListener('click', clickFunction);
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
