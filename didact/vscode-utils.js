

const vscode = acquireVsCodeApi();
let inputFields = {};
window.addEventListener('message', event => {
    const receivedOutput = event.data; // The JSON data our extension sent
    switch (receivedOutput.command) {
        case 'refactor':
            break;
        case 'receivedata':
            //document.querySelector('[id="message"]').innerHTML = message.message;
            var ele = document.getElementById('project-list');
            for (var i = 0; i < receivedOutput.outputData.resources.length; i++) {
                // POPULATE SELECT ELEMENT WITH JSON.
                ele.innerHTML = ele.innerHTML +
                    '<option value="' + receivedOutput.outputData.resources[i].metadata.guid + '">' + receivedOutput.outputData.resources[i].entity.name + '</option>';
            }
            break;
        case 'renderFileData':
            //document.querySelector('[id="message"]').innerHTML = message.message;
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
                            if (key !== "class") {
                                element[key] = value
                            } else {
                                element.classList.add(value)
                            }
                        }
                    }
                } else {
                    element = parentElement.nextSibling.nodeValue || ""
                    if (element != attributes.value) {
                        element = document.createTextNode(attributes.value)
                        newElementCreated = true
                    }
                    if (children) {
                        children.forEach(childElement => {
                            createElementWithAttributes(element, childElement.elementToRender, childElement.attributes, childElement.children)
                        })
                    }
                }
                if (newElementCreated) {
                    parentElement.appendChild(element)
                }
                return newElementCreated
            }
            console.log(receivedOutput.outputData)
            let dataFromFile = JSON.parse(receivedOutput.outputData)
            let parentElement = document.getElementById(dataFromFile.parentId);
            let sendInputEvent = false;
            dataFromFile.dataToRender.forEach(element => {
                let newElementCreated = createElementWithAttributes(parentElement, element.elementToRender, element.attributes, element.children);
                if (newElementCreated) {
                    sendInputEvent = true
                }

            })
            /*console.log(data.parentId, data.parentTagName, data.elementToRender)
            let elementToRender = document.getElementById(data.parentId)
            let list = elementToRender.getElementsByTagName(data.parentTagName)[0]
            console.log(list, elementToRender)
            data.data.forEach((option) => {
                let li = document.createElement(data.elementToRender);
                li.innerHTML = option.name
                li.name = option.guid
                list.appendChild(li);
                //li.addEventListener("click", selectProject)
            })*/
            if (sendInputEvent) {
                document.getElementById("data-fetched").value = dataFromFile.parentId
                document.getElementById("data-fetched").dispatchEvent(new Event('input', { bubbles: true, }));
            }
            console.log(typeof (data))
            break;
        case 'executing':
            console.log(receivedOutput.outputData.elementId, receivedOutput.outputData.status)
            if (receivedOutput.outputData.showSpinner)
                document.getElementById(receivedOutput.outputData.elementId).nextSibling.classList.remove("hidden-state");
            else
                document.getElementById(receivedOutput.outputData.elementId).nextSibling.classList.add("hidden-state");
            if (receivedOutput.outputData.status === "error") {
                document.getElementById(receivedOutput.outputData.elementId.split("$")[0]).style.borderColor = "red";
            } else if (receivedOutput.outputData.status === "success") {
                document.getElementById(receivedOutput.outputData.elementId.split("$")[0]).style.borderColor = "green";
            } else {
                document.getElementById(receivedOutput.outputData.elementId.split("$")[0]).style.borderColor = "white";
            }
            if (receivedOutput.outputData.status === "success" && receivedOutput.outputData.clickCTA) {
                document.getElementById(receivedOutput.outputData.clickCTA).click();
            }
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
            var numSuccess = anchor.getAttribute("numSuccess") ? parseInt(anchor.getAttribute("numSuccess")) : 1
            console.log(typeof (numSuccess))
            /*inputFields["hostName"] = document.getElementById('hostname').value;
            inputFields["userName"] = document.getElementById('username').value;
            inputFields["password"] = document.getElementById('password').value;
            inputFields["apikey"] = document.getElementById('apikey').value;*/
            //var projectElelment = document.getElementById('project-list');
            //console.log("selected project:" + projectElelment.value);
            //inputFields["selectedProject"] = projectElelment.value;
            if (action == "getdata") {
                vscode.postMessage({
                    command: 'getdata',
                    inputFields: inputFields
                });
            }
            else if (action == "publish") {
                pushToGit();
                command = anchor.getAttribute("command");
                vscode.postMessage({
                    command: 'sendcommand',
                    text: command,
                    inputFields: inputFields,
                    elementId: elementId
                });
            }
            else if (action == "readfile") {
                command = anchor.getAttribute("command");
                vscode.postMessage({
                    command: 'readfile',
                    text: command,
                    filePath: filePath,
                    silent: silent,
                    nextAction: nextAction,
                    preProcess: preProcess,
                    inputFields: inputFields,
                    elementId: elementId,
                    numSuccess: numSuccess
                });
            }
            else {

                vscode.postMessage({
                    command: 'sendcommand',
                    terminalName: terminalName,
                    text: command,
                    silent: silent,
                    nextAction: nextAction,
                    inputFields: inputFields,
                    elementId: elementId,
                    numSuccess: numSuccess
                });
            }
        }
    }, false);
})
