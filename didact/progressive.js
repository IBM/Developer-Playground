window.onload = function () {
    let ctaPairs = {
        "git-clone": ["explore-application"],
        "launch-application-wca": ["stop-application"],
        "create-deployment-space":["deploy-model"]
    }
    let workspaceId = document.getElementsByClassName("hidden-state")[0].textContent
    let steps = document.getElementsByClassName("step");
    activate(steps[0])
    let completedCTAs = null;

    let didact = document.getElementsByClassName("apptitle")[0].textContent
    let data = {
        workspaceId: workspaceId,
        ctasClicked: null
    }

    if (localStorage[didact] === undefined) {
        localStorage[didact] = JSON.stringify(data)
    }
    console.log(JSON.parse(localStorage[didact]).workspaceId)
    if (JSON.parse(localStorage[didact]).workspaceId !== workspaceId) {
        localStorage[didact] = JSON.stringify(data)
    }
    try {
        completedCTAs = JSON.parse(localStorage[didact]).ctasClicked;
        try {
            for (let i = 0; i < completedCTAs.length; i++) {
                enableCTA(Number(completedCTAs[i]))
            }
        } catch (e) {
            //Do Nothing
        }
    } catch {
        completedCTAs = null
    }
    for (let i = 0; i < steps.length; i++) {
        let anchor_tags = steps[i].getElementsByTagName("A")
        for(let j = 0; j < anchor_tags.length; j++){
            if(anchor_tags[j].className.includes("button is-dark is-medium")){
                anchor_tags[j].addEventListener("click", enableCTA)
                break
            }
        }
    }
    function getNodeIndex(step) {
        let steps = document.getElementsByClassName("step");
        for (let i = 0; i < steps.length; i++) {
            if (steps[i].isSameNode(step))
                return i
        }
    }
    function enableCTA(step) {
        let currentStep = 0
        if (isNaN(step)) {
            if (step.target.tagName == "SPAN")
                currentStep = getNodeIndex(step.target.parentElement.parentElement)
            else
                currentStep = getNodeIndex(step.target.parentElement)
            try {
                completedCTAs.push(currentStep)
            }
            catch {
                completedCTAs = [0]
            }
            let tempData = JSON.parse(localStorage[didact])
            tempData.ctasClicked = completedCTAs
            localStorage[didact] = JSON.stringify(tempData)
            console.log(completedCTAs);
            console.log(currentStep + 1, steps.length)
        } else {
            currentStep = step
        }
        for (cta of Object.keys(ctaPairs)) {
            if (steps[currentStep].classList.contains(cta)) {
                for (let ctaPair of ctaPairs[cta]) {
                        let pair = document.getElementsByClassName(ctaPair)[0];
                    activate(pair)
                }
            }
        }
        let checkbox = steps[currentStep].getElementsByTagName("INPUT")[0]
        checkbox.checked = true;
        if (currentStep + 1 != steps.length)
            activate(steps[currentStep + 1])
        else {
            let footer = document.getElementsByClassName("footer-step")
            for (let i = 0; i < footer.length; i++) {
                activate(footer[i])
            }
        }
    }

    function activate(step) {
        let anchor_tags = step.getElementsByTagName("A")
        try {
            let dot = step.getElementsByClassName("dot")[0]
            dot.classList.add("show-dot")
        } catch(e) {
            //Do Nothing
        }
        step.classList.add("enable");
        for(let i = 0; i < anchor_tags.length; i++){
            anchor_tags[i].classList.add("allow-click")
            if(anchor_tags[i].className.includes("button is-dark is-medium"))
                break
        }
    }
}