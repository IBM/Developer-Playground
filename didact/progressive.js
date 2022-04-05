window.onload = function () {
    let ctaPairs = {
        "git-clone": ["explore-application"]
    }
    console.log(Object.keys(ctaPairs))
    let steps = document.getElementsByClassName("step");
    activate(steps[0])
    let completedCTAs = null;

    let didact = document.getElementsByClassName("apptitle")[0].textContent
    let data = {
        time: new Date().getTime(),
        ctasClicked: null
    }

    if (localStorage[didact] === undefined) {
        localStorage[didact] = JSON.stringify(data)
    }
    console.log(JSON.parse(localStorage[didact]))
    if (new Date().getTime() - JSON.parse(localStorage[didact]).time >= 60 * 60 * 4 * 1000) {
        localStorage.clear()
    }
    try {
        completedCTAs = JSON.parse(localStorage[didact]).ctasClicked;
        console.log(completedCTAs)
        try {
            for (let i = 0; i < completedCTAs.length; i++) {
                enableCTA(Number(completedCTAs[i]))
            }
        } catch (e) {
            console.log(e)
            //Do Nothing
        }
    } catch {
        completedCTAs = null
    }
    for (let i = 0; i < steps.length; i++) {
        steps[i].addEventListener("click", enableCTA)
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
            if (step.path[0].tagName == "SPAN")
                currentStep = getNodeIndex(step.path[2])
            else
                currentStep = getNodeIndex(step.path[1])
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
            console.log("clicked")
            currentStep = step
            console.log(currentStep, step + 1)
        }
        for (cta of Object.keys(ctaPairs)) {
            if (steps[currentStep].classList.contains(cta)) {
                for (ctaPair of ctaPairs[cta]) {
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
            console.log("footer")
            let footer = document.getElementsByClassName("footer-step")
            for (let i = 0; i < footer.length; i++) {
                activate(footer[i])
            }
        }
    }

    function activate(step) {
        let cta = step.getElementsByTagName("A")[0]
        try {
            let dot = step.getElementsByClassName("dot")[0]
            dot.classList.add("show-dot")
        } catch {
            //Do Nothing
        }
        step.classList.add("enable");
        cta.classList.add("allow-click")
    }
}