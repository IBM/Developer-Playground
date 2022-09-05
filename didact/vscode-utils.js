

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
            console.log(receivedOutput.outputData)
            let data = JSON.parse(receivedOutput.outputData)
            console.log(data.parentId, data.parentTagName, data.elementToRender)
            let elementToRender = document.getElementById(data.parentId)
            let list = elementToRender.getElementsByTagName(data.parentTagName)[0]
            console.log(list, elementToRender)
            data.data.forEach((option) => {
                let li = document.createElement(data.elementToRender);
                li.innerHTML = option.name
                li.name = option.guid
                list.appendChild(li);
                //li.addEventListener("click", selectProject)
            })
            document.getElementById("data-fetched").value = data.parentId
            document.getElementById("data-fetched").dispatchEvent(new Event('input', {bubbles:true, }));
            console.log(typeof (data))
            break;
        case 'executing':
            console.log(receivedOutput.outputData.cursor, receivedOutput.outputData.pointerEvents)
            let timelineContainer = document.getElementsByClassName("timeline-container")[0]
            timelineContainer.style.cursor = receivedOutput.outputData.cursor;
            [...timelineContainer.getElementsByTagName("A")].forEach(ele => ele.style.pointerEvents = receivedOutput.outputData.pointerEvents);
            [...timelineContainer.getElementsByTagName("BUTTON")].forEach(ele => !ele.classList.contains("no-click") ? ele.style.pointerEvents = receivedOutput.outputData.pointerEvents : ele.style.pointerEvents = "none");
            [...timelineContainer.getElementsByTagName("INPUT")].forEach(ele => ele.style.pointerEvents = receivedOutput.outputData.pointerEvents);
            [...timelineContainer.getElementsByTagName("DETAILS")].forEach(ele => ele.style.pointerEvents = receivedOutput.outputData.pointerEvents);
            if (receivedOutput.outputData.clickCTA) {
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
                    inputFields: inputFields
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
                    inputFields: inputFields
                });
            }
            else {

                vscode.postMessage({
                    command: 'sendcommand',
                    terminalName: terminalName,
                    text: command,
                    silent: silent,
                    nextAction: nextAction,
                    inputFields: inputFields
                });
            }
        }
    }, false);
})
