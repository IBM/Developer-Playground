//base command to configure the environment
let configureCommand = "git clone https://github.com/IBM/CPDemoFramework -b ${BRANCH} --single-branch ${CHE_PROJECTS_ROOT}/techzone-demo;pip install PyYAML;cd ${CHE_PROJECTS_ROOT}/techzone-demo/olm-utils-v2;sh configure-env.sh ";

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
    fileContents: []
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

    addEventListenerToElement(document.getElementById("configure-env$4"), "click", handleInstalledcp4baServices);

    //After env configured successfully enable timeline
    addEventListenerToElement(document.getElementById("enable-timeline"), "click", updateYamlAndEnableTimeline);

    // handle yaml updation
    addEventListenerToElement(document.getElementById("service-list"), "mouseleave", updateCP4BAyaml)

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


var groupCheckboxes = document.querySelectorAll('.group-checkbox');
var optionCheckboxes = document.querySelectorAll('.option-checkbox');
var selectedOptions = [];

var displaySelected = ['Foundation'];
var storeSelected = ['foundation'];
document.getElementById('selected-services').textContent = displaySelected.join(', ');
document.getElementById("selected-components-string").textContent = getShortenedString(storeSelected) || "Select Services";

function updateSelectedOptions() {
    var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
    displaySelected = []
    storeSelected = []


    for (var each of markedCheckbox) {
        displaySelected.push(each.nextSibling.innerHTML)
        storeSelected.push(each.value)
    }

    document.getElementById('selected-services').textContent = displaySelected.join(', ');
    document.getElementById("selected-components-string").textContent = getShortenedString(storeSelected) || "Select Services";

}

function updateParentCheckbox(childCheckbox) {
    var groupCheckbox = childCheckbox.parentNode.querySelector('.group-checkbox');
    if (groupCheckbox) {
        if (groupCheckbox.id === 'foundation') {

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


function handleInstalledcp4baServices(e) {

    var installed_services = JSON.parse(currentHTMLstateData.fileContents);

    if (installed_services.length == 0) {
        console.log("fresh cluster");
    }
    else {
        for (let i = 0; i < installed_services.length; i++) {
            selectservice = installed_services[i]
            document.getElementById(selectservice).checked = true;
        }

        console.log('cluster has some cp4ba services already installed');
        updateSelectedOptions();
    }

    document.getElementById("enable-timeline").click();
    document.getElementById("selected-components-string").textContent = getShortenedString(installed_services) || "Select Services";

}

function updateYamlAndEnableTimeline(e) {
    //updateCP4BAyaml()
    enableAll()
}


function updateCP4BAyaml() {
    let cp4baVersion = "0";
    let component_list = storeSelected
    if (!component_list) {
        component_list = "null"
    }
    let storage = "auto";
    if (previousServicesState === component_list)
        return
    document.getElementById("update-config").setAttribute("command", "cd ${CHE_PROJECTS_ROOT}" + `/techzone-demo/olm-utils-v2/;python updateYaml.py ${component_list} ${storage} ${cp4baVersion} cp4ba`)
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
        cpakAdminPassword: cp4baAdminPassword,
        cpakEnvName: cp4baEnvName
    }
    data = JSON.stringify(data)

    let storage = "auto"
    document.getElementById("install_cpd$1").setAttribute("command", "cd ${CHE_PROJECTS_ROOT}/techzone-demo/olm-utils-v2;" + `python updateYaml.py ${component_list} ${storage} ${cp4baVersion} cp4ba;bash deploy.sh cp4ba '${data}' `)
    document.getElementById("install_cpd$1").click();

}


window.addEventListener("load", funcLoad);
