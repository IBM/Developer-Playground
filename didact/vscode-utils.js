const vscode = acquireVsCodeApi();
window.addEventListener('message', event => {
    const receivedOutput = event.data; // The JSON data our extension sent
    switch (receivedOutput.command) {
        case 'receiveProductInfo':
            //document.querySelector('[id="message"]').innerHTML = message.message;
            productInfo = receivedOutput.productInfo;
            currentHTMLstateData.isPrivateDemo = productInfo.isPrivate;
            currentHTMLstateData.demo = productInfo.demoName;
            currentHTMLstateData.privateGitRepoUrl = productInfo.privateGitRepoUrl;
            console.log(JSON.stringify(productInfo));
            document.getElementById("selected-demo").innerHTML = productInfo.displayName;
            document.getElementById("demo-url").innerHTML = productInfo.privateGitRepoUrl;
            if (productInfo.isPrivate) {
                modifyVisibilityOfCTAs(["gittokeninput", "private-demo-url"],"unhide")
            }
            else {
                modifyVisibilityOfCTAs(["gittokeninput", "private-demo-url"],"hide")
            }
            break;
        case 'renderFileData':
            const createElementWithAttributes = (parentElement, elementToRender, attributes, children) => {
                let element = document.getElementById(attributes.id)
                let newElementCreated = false;
                if (elementToRender !== "TEXT_NODE") {
                    if (!element) {
                        element = document.createElement(elementToRender);
                        newElementCreated = true;
                    }
                    if (attributes) {
                        for (const [key, value] of Object.entries(attributes)) {
                            if (key === "addEventListener") {
                                element[key](value[0], window[value[1]])
                            } else if (key === "classList") {
                                for (const [action, classes] of Object.entries(attributes[key])) {
                                    console.log(key, action)
                                    element[key][action](...classes)
                                }
                            } else if (key === "dispatchEvent") {
                                element[key](new Event(value));
                                console.log("event-triggered");
                            } else if (key === "command") {
                                element.setAttribute(key,element.getAttribute(key)+value);
                            } else if (key === "numSuccess") {
                                element.setAttribute(key,value);
                            } else if (key === "executeFunction") {
                                //console.log(value[0],value[1],window[value[0]])
                                window[value[0]](...value[1])
                            } else {
                                element[key] = value;
                            }
                        }
                    }
                } else {
                    console.log("Text node", document.contains(parentElement))
                    if (!document.contains(parentElement)) {
                        element = document.createTextNode(attributes.value)
                        newElementCreated = true
                    }
                }
                if (children) {
                    for (let i = 0; i < children.length; i++) {
                        let childElement = children[i]
                        createElementWithAttributes(element, childElement.elementToRender, childElement.attributes, childElement.children)
                    }
                }
                if (newElementCreated) {
                    parentElement.appendChild(element)
                }
            }
            console.log(receivedOutput.outputData)
            let dataFromFile = JSON.parse(receivedOutput.outputData)
            for (let i = 0; i < dataFromFile.componentsToRender.length; i++) {
                let parentElement = document.getElementById(dataFromFile.componentsToRender[i].parentId);
                for (let j = 0; j < dataFromFile.componentsToRender[i].dataToRender.length; j++) {
                    let element = dataFromFile.componentsToRender[i].dataToRender[j];
                    createElementWithAttributes(parentElement, element.elementToRender, element.attributes, element.children);
                }
            }
            break;
        case 'executing':
            console.log(receivedOutput.outputData.elementId, receivedOutput.outputData.status)
            let element = document.getElementById(receivedOutput.outputData.elementId.split("$")[0])
            if (receivedOutput.outputData.showSpinner)
                element.nextSibling.classList.remove("hidden-state");
            else
                element.nextSibling.classList.add("hidden-state");
            if (receivedOutput.outputData.status === "error") {
                element.style.borderColor = "red";
            } else if (receivedOutput.outputData.status === "success") {
                element.style.borderColor = "green";
            } else {
                element.style.borderColor = "white";
            }
            if (receivedOutput.outputData.status === "success" && receivedOutput.outputData.clickCTA) {
                let nextCTA = document.getElementById(receivedOutput.outputData.clickCTA);
                nextCTA.click();
            }
            break;
        case 'get-workspace-state':
            restoreData(receivedOutput.outputData);
            break;
        case 'reset-workspace-state':
            dataToRestoreOnReload = {};
            break;
    }
});
[...document.getElementsByClassName("send-to-extension")].forEach(element => {
    element.addEventListener('click', function (e) {
        var anchor = e.target.closest('button');
        if (anchor !== null) {
            var action = anchor.getAttribute("action");
            var command = anchor.getAttribute("command");
            var terminalName = anchor.getAttribute("termianlName");
            var nextAction = anchor.getAttribute("nextAction") ? anchor.getAttribute("nextAction") : false;
            var silent = anchor.getAttribute("silent") ? true : false;
            var filePath = anchor.getAttribute("filePath");
            var preProcess = anchor.getAttribute("preProcess") ? true : false;
            var elementId = anchor.getAttribute("id")
            var numSuccess = anchor.getAttribute("numSuccess") ? parseInt(anchor.getAttribute("numSuccess")) : 1;
            if (action == "readfile") {
                command = anchor.getAttribute("command");
                vscode.postMessage({
                    command: 'readfile',
                    text: command,
                    filePath: filePath,
                    silent: silent,
                    nextAction: nextAction,
                    preProcess: preProcess,
                    elementId: elementId,
                    numSuccess: numSuccess,
                });
            }
            else if (action == "openPath") {
                command = anchor.getAttribute("command");
                vscode.postMessage({
                    command: 'openPath',
                    text: command,
                    filePath: filePath,
                    silent: silent,
                    nextAction: nextAction,
                    preProcess: preProcess,
                    elementId: elementId,
                    numSuccess: numSuccess,
                });
            }
            else if (action == "update-workspace-state") {
                console.log("update-workspace-state", dataToRestoreOnReload)
                vscode.postMessage({
                    command: 'update-workspace-state',
                    data: dataToRestoreOnReload,
                    nextAction: nextAction,
                    preProcess: preProcess,
                    elementId: elementId,
                });
            }
            else if (action == "get-workspace-state") {
                console.log("getupdate-workspace-state", dataToRestoreOnReload)
                vscode.postMessage({
                    command: 'get-workspace-state',
                    nextAction: nextAction,
                    preProcess: preProcess,
                    elementId: elementId,
                });
            }
            else if (action == "reset-workspace-state") {
                vscode.postMessage({
                    command: 'reset-workspace-state',
                    text: command,
                    nextAction: nextAction,
                    preProcess: preProcess,
                    elementId: elementId,
                });
            }
            else {
                vscode.postMessage({
                    command: 'sendcommand',
                    terminalName: terminalName,
                    text: command,
                    silent: silent,
                    nextAction: nextAction,
                    elementId: elementId,
                    numSuccess: numSuccess
                });
            }
        }
    }, false);
})
