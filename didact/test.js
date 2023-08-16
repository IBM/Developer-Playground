//base command to configure the environment
let configureCommand = "git clone https://github.com/aishwaryapradeep01/CPDemoFramework.git -b ${BRANCH} --single-branch ${CHE_PROJECTS_ROOT}/techzone-demo;pip install PyYAML;cd ${CHE_PROJECTS_ROOT}/techzone-demo/olm-utils-v2;sh configure-env.sh ";

currentHTMLstateData = {
    prerequisites: {
        server: "",
        api_token: "",
        kubeadmin_user: "",
        kubeadmin_pass: "",
        icr_key: "",
        oc_login: ""
    },
    authenticationOptions: {
        required: ["icr_key"],
        additionalOptions: {
            "server_option": ["server", "api_token"],
            "kube_option": ["server", "kubeadmin_user", "kubeadmin_pass"],
            "oc_option": ["oc_login"]
        },
    },
    validPrerequisites: [["icr_key", "oc_login"], ["icr_key", "server", "api_token"], ["icr_key", "server", "kubeadmin_user", "kubeadmin_pass"]],
    dropdownIds: ["service-list"],
    envConfigured: false,
    selectedServices: [],
    doNotRestore: [],
    fileContents: ""
}


let previousServicesState = "";

function funcLoad() {
    // Disable timeline
    disableTimelineFromElement("all");

    //handle prerequisites
    for (let prerequisite of Object.keys(currentHTMLstateData.prerequisites)) {
        addEventListenerToElement(document.getElementById(prerequisite), "input", handlePrerequisiteValues);
    }

    [...document.getElementsByName("authentication-options")].forEach(element => addEventListenerToElement(element, "change", handleAuthenticationOptions))

    addEventListenerToElement(document.getElementById("oc_login"), "input", handleOCLogin)
    //generate config command
    addEventListenerToElement(document.getElementById("configure-env"), "click", updateConfigVars);

    //After env configured successfully enable timeline
    addEventListenerToElement(document.getElementById("enable-timeline"), "click", updateYamlAndEnableTimeline);

    //open/close logic for all dropdowns
    toggleDropdowns(currentHTMLstateData.dropdownIds)

    //create services dropdown
    //createMultiSelectDropdownWithSearch("git-services", services, updateSelectedServices, "services", "services-search", filterServiceList)

    addEventListenerToElement(document.getElementById("install_cpd"), "click", install_cpd);

    //addEventListenerToElement(document.getElementById("storage_value"), "change", () => { })

    //add search function
    //addEventListenerToElement(document.getElementById("services-search"), "input", filterServiceList);

    //Store required CTAs in state
    storeCTAInState();

    //Restore data if available
    document.getElementById("get-workspace-state").click();

    //reset workspace state
    addEventListenerToElement(document.getElementById("reset-href"), "click", resetWorkspace);
}

function toggleDropdowns(dropdownIds) {
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

toggleDropdowns(["service-list"])

console.log("----------- Check file content: -----------", currentHTMLstateData.fileContents)

var groupCheckboxes = document.querySelectorAll('.group-checkbox');
var optionCheckboxes = document.querySelectorAll('.option-checkbox');
var selectedOptions = [];

var displaySelected = [];
var storeSelected = [];

function updateSelectedOptions() {
    var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
    displaySelected = []
    storeSelected = []


    for (var each of markedCheckbox) {
        displaySelected.push(each.nextSibling.innerHTML)
        storeSelected.push(each.value)
    }

    console.log(displaySelected);
    console.log(storeSelected);

    document.getElementById('selected-services').textContent = displaySelected.join(', ');

}

function updateParentCheckbox(childCheckbox) {
    var groupCheckbox = childCheckbox.parentNode.querySelector('.group-checkbox');
    if (groupCheckbox) {
        if (groupCheckbox.id === 'foundation') {

            // Disable unchecking the parent checkbox if all children checkboxes are unselected for Group 1
            var childCheckboxes = childCheckbox.parentNode.querySelectorAll('.option-checkbox');
            var allChildrenUnchecked = Array.from(childCheckboxes).every(function (checkbox) {
                return !checkbox.checked;
            });

            if (allChildrenUnchecked) {

                updateSelectedOptions();
                return;
            }

        }

        var childCheckboxes = childCheckbox.parentNode.querySelectorAll('.option-checkbox');

        var anyChildChecked = Array.from(childCheckboxes).some(function (checkbox) {
            return checkbox.checked;
        });

        groupCheckbox.checked = anyChildChecked;

        if (anyChildChecked) {
            selectedOptions.push(groupCheckbox);
        } else {
            selectedOptions = selectedOptions.filter(function (option) {
                return option !== groupCheckbox;
            });
        }
    }

    updateSelectedOptions();
}

groupCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        var childCheckboxes = this.parentNode.querySelectorAll('.option-checkbox');

        childCheckboxes.forEach(function (childCheckbox) {
            childCheckbox.checked = this.checked;

            if (this.checked) {
                selectedOptions.push(childCheckbox);
            } else {
                selectedOptions = selectedOptions.filter(function (option) {
                    return option !== childCheckbox;
                });
            }
        });

        updateSelectedOptions();
    });
});

optionCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        updateParentCheckbox(this);
    });
});


function updateConfigVars(e) {
    document.getElementById("configure-env$1").setAttribute("command", `${configureCommand}${Object.keys(currentHTMLstateData.prerequisites).map(val => `"${currentHTMLstateData.prerequisites[val] || "\"\""}"`).toString().replaceAll(",", "%20")} cp4ba`);
    document.getElementById("configure-env$1").click();

}

function updateYamlAndEnableTimeline(e) {
    //updateCP4BAyaml()
    console.log("----------- Check file content inside enable function: -----------", currentHTMLstateData.fileContents)
    enableAll()
}


function updateCP4BAyaml() {
    let cp4baVersion = document.getElementById('cp4ba_version').value || " ";
    let component_list = storeSelected
    if (!component_list) {
        component_list = "null"
    }
    let storage = "auto";
    if (previousServicesState === component_list)
        return
    document.getElementById("update-config").setAttribute("command", "cd ${CHE_PROJECTS_ROOT}" + `/techzone-demo/olm-utils-v2/;python updateYaml.py  ${component_list} ${storage} ${cp4baVersion} cp4ba`)
    document.getElementById("update-config").click();
    previousServicesState = component_list;
}

function install_cpd() {
    let cp4baVersion = "0";
    let cp4baAdminPassword = document.getElementById('cp4ba_admin_password').value
    let cp4baEnvName = document.getElementById('cp4ba_env_name').value
    let component_list = storeSelected
    if (!component_list) {
        component_list = "null"
    }
    let data = {
        cp4baAdminPassword: cp4baAdminPassword,
        cp4baEnvName: cp4baEnvName
    }
    data = JSON.stringify(data)
    let storage = "auto" //document.getElementById("storage_value").value;
    document.getElementById("install_cpd$1").setAttribute("command", "cd ${CHE_PROJECTS_ROOT}/techzone-demo/olm-utils-v2;" + `python updateYaml.py  ${component_list} ${storage} ${cp4baVersion} cp4ba;bash deploy.sh cp4ba '${data}'`)
    document.getElementById("install_cpd$1").click();

}

// function getDOMnode(htmlServices, service) {
//     let listServices = [...htmlServices].map(service => service.value)
//     for (let i = 0; i < listServices.length; i++) {
//         //console.log(htmlServices, service)
//         if (service === listServices[i]) {
//             return htmlServices[i].parentElement
//         }
//     }
// }

// function updateSelectedServices(e) {
//     let gitServicesList = document.getElementById("git-services");
//     let gitServices = document.getElementsByName("services");
//     if (e.target.checked) {
//         currentHTMLstateData.selectedServices.indexOf(e.target.value) == -1 && currentHTMLstateData.selectedServices.push(e.target.value)
//         //gitServicesList.insertBefore(e.target.parentElement, gitServicesList.firstChild);
//     } else {
//         currentHTMLstateData.selectedServices.indexOf(e.target.value) !== -1 && currentHTMLstateData.selectedServices.splice(currentHTMLstateData.selectedServices.indexOf(e.target.value), 1)
//         //gitServicesList.insertBefore(e.target.parentElement, gitServices[Object.keys(services).indexOf(e.target.value)].parentElement);
//     }
//     //gitServicesList.innerHTML = "";
//     currentHTMLstateData.selectedServices.sort()
//     currentHTMLstateData.selectedServices.forEach(res => {
//         console.log(res)
//         gitServicesList.appendChild(getDOMnode(gitServices, res))
//     })
//     let listServices = [...gitServices].map(service => service.value)
//     listServices.sort()
//     listServices.forEach((res, idx) => {
//         if (currentHTMLstateData.selectedServices.indexOf(res) == -1) {
//             gitServicesList.appendChild(getDOMnode(gitServices, res))
//         }
//     })

//     let showSeleted = document.getElementById("selected-services")
//     showSeleted.textContent = currentHTMLstateData.selectedServices.toString().replaceAll(",", ", ")
//     document.getElementById("selected-components-string").textContent = getShortenedString(currentHTMLstateData.selectedServices) || "Select Services";
//     updateCP4BAyaml();
// }

// function filterServiceList(e) {
//     let filteredServices = {}
//     let htmlServices = document.getElementsByName("services")
//     let listServices = [...htmlServices].map(service => service.value)
//     listServices.forEach((res, idx) => {

//         if (res.toLowerCase().includes(e.target.value.toLowerCase()) || htmlServices[idx].nextSibling.textContent.trim().toLowerCase().includes(e.target.value.toLowerCase())) {
//             filteredServices[res] = htmlServices[idx].nextSibling.textContent.trim()
//             htmlServices[idx].parentElement.style.display = "block"
//         } else {
//             htmlServices[idx].parentElement.style.display = "none"
//         }
//     })
// }
window.addEventListener("load", funcLoad);
