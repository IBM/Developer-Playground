function funcLoad(){
  // Disable timeline
//   disableTimelineFromElement("all");

  //After env configured successfully enable timeline
  addEventListenerToElement(document.getElementById("enable-timeline"), "click", enableAll)

  //Store required CTAs in state
  storeCTAInState();

  //Restore data if available
  document.getElementById("get-workspace-state").click();

}

window.addEventListener("load", funcLoad);
