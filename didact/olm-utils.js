window.onload = function () {
  // console.log(document.getElementById("execute"))
  document.getElementById("existing_service").addEventListener("click", existing_service);

  function existing_service() {
    let artifacts = document.getElementById("cpd_instance_value").value;
    //samplevalue cpd-inst-01
    document.getElementById("command_exec").href =
      "didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$run_utils get-cr-status --cpd_instance_ns=" + artifacts;
    document.getElementById("command_exec").click();
  }

  document.getElementById("install_olm").addEventListener("click", install_olm);

  function install_olm() {
    let component_list = document.getElementById("olm_component_list").value;
    let storage_vendor = document.getElementById("storage_vendor").value;
    let release_version = document.getElementById("olm_release_version").value;
    let preview_value = document.getElementById("olm_preview_value").value;
    document.getElementById("command_exec").href =
      "didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$run_utils apply-olm --preview=" +
      preview_value +
      " --release=" +
      release_version +
      " --components=" +
      component_list +
      " storage_vendor=" + storage_vendor;
    document.getElementById("command_exec").click();
  }

  document.getElementById("install_cr").addEventListener("click", install_cr);

  function install_cr() {
    let component_list = document.getElementById("cr_component_list").value;
    let release_version = document.getElementById("cr_release_version").value;
    let preview_value = document.getElementById("cr_preview_value").value;
    let license_acceptance = document.getElementById("cr_license_acceptance").value;
    let cr_cpd_instance = document.getElementById("cr_cpd_instance").value;
    let cr_storage_class = document.getElementById("cr_storage_class").value;

    document.getElementById("command_exec").href =
      "didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$run_utils apply-cr --preview=" +
      preview_value +
      " --release=" +
      release_version +
      " --components=" +
      component_list +
      " --license_acceptance=" +
      license_acceptance +
      " --cpd_instance_ns=" +
      cr_cpd_instance +
      " --storage_class=" +
      cr_storage_class + "";
    document.getElementById("command_exec").click();
  }
  // Preview logic
  document.getElementById("get_preview").addEventListener("click", get_preview);
  document.getElementById("get_preview_2").addEventListener("click", get_preview);
  function get_preview() {
    document.getElementById("command_exec").href =
      "didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$get_preview"
    document.getElementById("command_exec").click();
    document.getElementById("command_exec").href =
      "didact://?commandId=vscode.open&projectFilePath=${CHE_PROJECTS_ROOT}/techzone-demo/olm-utils/preview.sh"
    document.getElementById("command_exec").click();
  }

};
