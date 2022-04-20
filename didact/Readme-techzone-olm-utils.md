<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
   <script src="olm-utils.js">
  </script>

  <style>
    html,
    div,
    body {
      background-color: #1a1a1a;
      font-family: "IBM Plex Sans", sans-serif;
      font-size: 16px;
      outline: none;
    }
    body {
      font-family: Helvetica, sans-serif;
    }
    /* The actual timeline (the vertical ruler) */
    .timeline {
      position: relative;
      max-width: 1200px;
      margin: 0 auto;
      margin-left: 50px;
    }
    .content p {
      margin: 0px;
    }
    .content .afterbutton {
      padding-top: 16px;
    }
    /* The actual timeline (the vertical ruler) */
    .timeline::after {
      content: "";
      position: absolute;
      width: 1px;
      background-color: white;
      top: 15px;
      bottom: -6px;
      left: 18px;
      margin-left: -2px;
    }
    /* Container around content */
    .container {
      padding: 0px 0px;
      width: 100%;
      align-content: left;
      margin: 0px 0px 0px 0px;
      margin-left: 25px;
      margin-top: 32px;
    }
    /* The circles on the timeline */
    .container::after {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      right: -6px;
      background-color: white;
      border: 0px solid #ff9f55;
      top: 15px;
      border-radius: 50%;
      z-index: 1;
      margin: 0px 0px 0px 0px;
    }
    /* The circles on the timeline */
    /* Place the container to the left */
    .left {
      left: 0px;
    }
    /* Place the container to the right */
    .right {
      left: 0px;
    }
    /* Add arrows to the left container (pointing right) */
    .left::before {
      content: " ";
      height: 0;
      top: 22px;
      width: 0;
      z-index: 1;
      right: 30px;
      border: medium solid white;
      border-width: 10px 0 10px 10px;
      border-color: transparent transparent transparent white;
    }
    /* Fix the circle for containers on the right side */
    .right::after {
      left: -13px;
    }
    /* The actual content */
    .content {
      padding: 5px 10px;
      color: white;
      background: transparent;
    }
    .button.is-dark.is-medium {
      font-family: "IBM Plex Sans", sans-serif;
      background: transparent;
      border-color: white;
      color: #fff;
      border: 1px solid white;
      padding: 10px;
      padding-left: 20px;
      margin-bottom: 13px;
      border-radius: 0px;
      min-width: 180px;
      font-size: 14px;
      text-align: left;
      min-height: 48px;
      margin: 0px;
      justify-content: left;
    }
    .button.is-dark.is-medium:hover {
      font-family: "IBM Plex Sans", sans-serif;
      background-color: #2a67f5;
      border-color: white;
      color: #fff;
      text-decoration: none;
    }
    .footer {
      display: flex;
      background-color: #343a3e;
      margin-top: 20px;
      padding: 0px;
      max-width: 1200px;
    }
    .github-icon {
      min-height: 100%;
      min-width: 100%;
      object-fit: cover;
      object-position: 250% 100px;
      opacity: 15%;
      bottom: 15px;
    }
    .image-content {
      padding: 5px 10px;
      background: transparent;
      color: black;
      position: absolute;
      font-size: 27px;
    }
    .image-div {
      position: relative;
      background-color: white;
      min-width: 50%;
      background-image: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
        url("https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/github.svg");
      background-position: -50% 60px;
      background-repeat: no-repeat;
      padding-top: 20px;
      padding-left: 20px;
    }
    .image-btn {
      position: absolute;
      right: 0;
      bottom: 0%;
      background-color: #0062ff;
      width: 300px;
      padding: 0px;
      padding-bottom: 20px;
    }
    .image-link span {
      float: right;
      font-size: 32px;
      padding-right: 20px;
    }
    .image-btn .image-link:hover {
      text-decoration: none;
      color: white;
      background-color: #0353e9;
    }
    .image-btn a:hover {
      text-decoration: none;
      color: white;
    }
    .image-link {
      color: white;
      display: block;
      padding: 5px 10px 5px 10px;
      line-height: 28px;
      font-size: 16px;
    }
    .header {
      background-image: url("https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/video_insights.jpeg");
      background-position: right;
      width: 95%;
      min-height: 70px;
      display: inline-block;
      margin-top: 20px;
      margin-bottom: 20px;
      margin-left: 30px;
      margin-right: 30px;
      max-width: 1200px;
      background-repeat: no-repeat;
      background-size: 700px 500px;
    }
    .header .right-content {
      float: left;
      width: 50%;
      background-color: #525252;
      min-height: 270px;
      font-size: 16px;
    }
    .header .right-content h4 {
      background: none;
      color: white;
      padding-left: 25px;
      padding-right: 25px;
    }
    .header .right-content div {
      background: none;
      color: white;
      padding-left: 15px;
      padding-right: 25px;
      font-size: 14px;
      margin-bottom: 10px;
    }
    .header .right-content ul {
      margin: 0px;
      margin-left: 25px;
      margin-bottom: 10px;
      line-height: 16px;
    }
    .container a {
      color: #78a9ff;
      background-color: transparent;
      text-decoration: none;
    }
    .container a:visited {
      color: #8c43fc;
      background-color: transparent;
      text-decoration: none;
    }
    .apptitle {
      margin-left: 25px;
      margin-top: 20px;
      margin-bottom: 0px;
      font-size: 28px;
      color: white;
    }
    .subheading {
      margin-left: 25px;
      margin-top: 0px;
      margin-bottom: 0px;
      font-size: 16px;
      color: #c1c7cd;
    }
    .no-hover:hover {
      background-color: #0062ff !important;
    }
    .section {
      margin-top: 5px;
      margin-bottom: -50px;
    }
    a:hover {
      color: #a6c8ff;
      text-decoration: underline;
    }
    a:visited {
      color: #be95ff;
    }
    summary {
      float: left;
    }
    details>summary {
      list-style-image: url("https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/arrow-right.svg");
      direction: rtl;
    }
    details[open]>summary {
      list-style-image: url("https://raw.githubusercontent.com/IBM/Developer-Playground/development/didact/images/arrow-down.svg");
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="right-content" style="padding-top: 40px">
      <div class="apptitle" style="font-size: 28px; color: white">CP4D demo</div>
      <div class="subheading"></div>
    </div>
  </div>
  <div class="section">
    <p style="font-size: 24px">Instructions</p>
    <p style="margin-bottom: 10px">Please follow all the below steps in proper sequence.</p>
  </div>
  <div class="timeline">
    <div style="margin-top: 0px; padding-top: 0px" class="container right">
      <div class="content">
        <p>Open the sandbox terminal.</p>
        <a class="button is-dark is-medium" title="Open Terminal"
          href="didact://?commandId=terminal-for-sandbox-container:new">Open Terminal</a>
      </div>
    </div>
      <div style="margin-top: 0px; padding-top: 0px" class="container right">
      <div class="content">
        <p>Add openshift Credentials to deploy to olm-utils </p>
        <a class="button is-dark is-medium" title="open env file"
          href="didact://?commandId=vscode.open&projectFilePath=env.sh">env creds
        </a>
      </div>
    </div>
      <div style="margin-top: 0px; padding-top: 0px" class="container right">
      <div class="content">
        <p>Deploy olm-utils and set the required aliases </p>
        <a class="button is-dark is-medium" title="open env file"
          href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$source env.sh">Configure
        </a>
      </div>
    </div>
      <div style="margin-top: 0px; padding-top: 0px" class="container right">
      <div class="content">
        <p>Check the status of the deployment, it might take upto 30-45 seconds </p>
        <a class="button is-dark is-medium" title="Check Pod State"
          href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$get_pods">Check Pod State
        </a>
      </div>
    </div>
    <div style="margin-top: 0px; padding-top: 0px" class="container right">
      <div class="content">
        <p>Run Utils Login to OC</p>
        <a class="button is-dark is-medium" title="Check Pod State"
          href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$oclogin_auto">oclogin
        </a>
      </div>
    </div>
      <div style="margin-top: 0px; padding-top: 0px" class="container right">
      <div class="content">
        <p>list of components supported by olm-utils </p>
        <a class="button is-dark is-medium" title="Check Pod State"
          href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$run_utils list-components --release=4.0.5">List Components
        </a>
      </div>
      </div>
      <div style="margin-top: 0px; padding-top: 0px" class="container right">
      <div class="content">
        <p>Show existing Service</p>
        <label>cpd_instance_ns value</label>
      <input type="text" id="cpd_instance_value" placeholder="cpd-inst-01"><br><br>
        <a class="button is-dark is-medium" title="Execute" id="existing_service"
          >Execute
        </a>
      </div>
    </div>
     <div style="margin-top: 0px; padding-top: 0px" class="container right">
      <div class="content">
        <p>Install Selected services(OLM artifacts)</p>
        <label>preview value</label>
      <input type="text" id="olm_preview_value" placeholder="true/false"><br><br>
        <label>Release version</label>
      <input type="text" id="olm_release_version" placeholder="4.0.5"><br><br>
      <label>Component list(comma separated)</label>
      <input type="text" id="olm_component_list" placeholder="cpfs,cpd_platform"><br><br>
        <a class="button is-dark is-medium" title="Execute" id="install_olm"
          >Execute
        </a>
      </div>
    </div>
     <div style="margin-top: 0px; padding-top: 0px" class="container right">
      <div class="content">
        <p>Install Selected services (Custom resources CRs)</p>
        <label>preview value</label>
      <input type="text" id="cr_preview_value" placeholder="true/false"><br><br>
        <label>Release version</label>
      <input type="text" id="cr_release_version" placeholder="4.0.5"><br><br>
      <label>Component list(comma separated)</label>
      <input type="text" id="cr_component_list" placeholder="cpfs,cpd_platform"><br><br>
       <label>license_acceptance</label>
      <input type="text" id="cr_license_acceptance" placeholder="true/false"><br><br>
      <label>Storage class</label>
      <input type="text" id="cr_storage_class" placeholder="nfs_client"><br><br>
      <label>cpd_instance_ns</label>
      <input type="text" id="cr_cpd_instance" placeholder="cpd_instance"><br><br>
        <a class="button is-dark is-medium" title="Execute" id="install_cr"
          >Execute
        </a>
      </div>
    </div>
     <div style="margin-top: 0px; padding-top: 0px" class="container right">
      <div class="content">
        <p>Delete the resources </p>
        <a class="button is-dark is-medium" title="Check Pod State"
          href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$sh delete.sh">delete
        </a>
      </div>
      </div>
    <a id="command_exec",href=""></a>
</body>
</html>