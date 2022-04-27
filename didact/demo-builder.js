console.log("this is test");
window.onload = function funLoad() {
  document.getElementById("createusersteps").style.display = "none";
  document.getElementById("updateusersteps").style.display = "none";
  document.querySelector("#createusersoption").addEventListener("click", show1);
  document.querySelector("#updateusersoption").addEventListener("click", show2);

  function show1() {
    document.getElementById("createusersteps").style.display = "inherit";
    document.getElementById("updateusersteps").style.display = "none";
  }
  function show2() {
    document.getElementById("createusersteps").style.display = "none";
    document.getElementById("updateusersteps").style.display = "inherit";
  }

  let tasks = document.querySelectorAll("[id^='task']");
  tasks.forEach((task) => (task.style.display = "none"));

  let selectedTasks = document.getElementsByName("checkboxtask");
  selectedTasks.forEach((task) => task.addEventListener("click", showTasks));
  function showTasks(e) {
    if (e.target.checked) {
      document.getElementById(e.target.value).style.display = "block";
    } else {
      document.getElementById(e.target.value).style.display = "none";
    }
  }

  var governanceOptions = document.getElementsByName("governanceartifactsopt");
  for (let key in governanceOptions) {
    document.getElementById(governanceOptions[key].value).style.display = "none";
    document.getElementById(governanceOptions[key].id).addEventListener("click", handleGovernanceOptions);
    if (governanceOptions[key].checked) {
      document.getElementById(governanceOptions[key].value).style.display = "inherit";
    }
  }

  function handleGovernanceOptions() {
    for (let key in governanceOptions) {
      document.getElementById(governanceOptions[key].value).style.display = "none";
      if (governanceOptions[key].checked) {
        document.getElementById(governanceOptions[key].value).style.display = "inherit";
      }
    }
  }
};
