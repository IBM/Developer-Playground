<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script src="demo-builder.js">
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
      padding: 0px;
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
    .timelinestep {
      margin-top: 0px;
      padding-top: 0px;
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
    .timeline .timeline {
      top: 35px;
      margin-left: 15px
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="right-content" style="padding-top: 40px">
      <div class="apptitle" style="font-size: 28px; color: white">CP4D demo</div>
      <div class="subheading">IBM Cloud Pak® for Data platform helps improve productivity and reduce complexity. Build a data fabric connecting siloed data distributed across a hybrid cloud landscape.</div>
    </div>
  </div>
  <div class="section">
    <p style="font-size: 24px">Instructions</p>
    <p style="margin-bottom: 10px">Please follow all the below steps in proper sequence.</p>
  </div>
  <div class="timeline">
    <div class="container right timelinestep">
      <div class="content">
        <p>Open the sandbox terminal.</p>
        <a class="button is-dark is-medium" title="Open Terminal"
          href="didact://?commandId=terminal-for-sandbox-container:new">Open Terminal</a>
      </div>
    </div>
    <div class="container right timelinestep">
      <div class="content">
        <p>Clone the GitHub repository.</p>
        <a class="button is-dark is-medium" title="Get the Code"
          href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$git%20clone%20https://github.com/bodarajeshkumar/wkc-api%20${CHE_PROJECTS_ROOT}/wkc-api">Get
          Code</a>
      </div>
    </div>
    <div class="container right timelinestep">
      <div class="content">
        <p>Configure Environment</p>
        <a class="button is-dark is-medium" title="Configure Environment"
          href="didact://?commandId=extension.openFile&&text=cp4d%7Cconfigure-application%7C/projects/wkc-api/.env">Configure
          Environment</a>
      </div>
    </div>
    <div class="container right timelinestep">
      <div class="content">
        <p>Install required dependencies for executing python scripts.</p>
        <a class="button is-dark is-medium" title="Instal Dependencies"
          href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$pip3.8 install pandas python-decouple requests ipython;cd /projects/wkc-api/notebooks/sandbox/">Install
          Dependencies
        </a>
      </div>
    </div>
    <div class="container right timelinestep">
      <div class="content">
        <p>Select the required tasks</p>
        <div style="float:left;padding-left:0px;">
          <input type="checkbox" name="checkboxtask" value="task1"/>
          <label for="task1">User Management</label>
        </div>
        <div style="float:left;padding-left:30px;">
          <input type="checkbox" name="checkboxtask" value="task2"/>
          <label for="task2">Governance artifacts</label><br />
        </div>
        <div style="float:left;padding-left:30px;">
          <input type="checkbox" name="checkboxtask" value="task3"/>
          <label for="task3">Project Management</label><br />
        </div>
      </div>
    </div>
    <div class="container right timelinestep" style="clear:both;" id="task1">
      <div class="content">
        <details>
          <summary>User management</summary>
          <br><br>
          <div>
            <p>Select the action to perform in the configured cp4d instance</p>
            <div style="float:left;padding-left:0px;" id="step1">
              <input type="radio" id="createusersoption" name="userselection" value="createusers" />
              <label for="createusers">Create Users</label>
            </div>
            <div style="float:left;padding-left:30px;">
              <input type="radio" id="updateusersoption" name="userselection" value="updateusers" />
              <label for="updateusers">Update Users</label><br />
            </div>
          </div>
          <div class="timeline">
            <div id="createusersteps" style="display:none">
              <div class="container right">
                <div class="content">
                  <p style="margin-top:20px;">Configure users to be added to the cp4d instance. You have to update
                    the csv file with the users to be created.</p>
                  <a class="button is-dark is-medium" title="Configure new users"
                    href="didact://?commandId=extension.openFile&&text=cp4d%7Cconfigure-application%7C/projects/wkc-api/notebooks/sandbox/new_users.csv">Configure
                    users
                  </a>
                </div>
              </div>
              <div class=" container right timelinestep">
                    <div class="content">
                      <p>Create users in the configured cp4d instance </p>
                      <a class="button is-dark is-medium" title="Create Users"
                        href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/wkc-api/notebooks/sandbox/;python3.8 createUsers.py">Create
                        users</a>
                    </div>
                </div>
                <div class="container right timelinestep">
                  <div class="content">
                    <p>Get all users from the cp4d instance configured</p>
                    <a class="button is-dark is-medium" title="Get Users"
                      href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/wkc-api/notebooks/sandbox/;python3.8 exportUsers.py">Get
                      users</a>
                  </div>
                </div>
                <div class="container right timelinestep">
                  <div class="content">
                    <p>List users of the configured cp4d instance</p>
                    <a class="button is-dark is-medium" title="List Users"
                      href="didact://?commandId=extension.openFile&&text=cp4d%7Cconfigure-application%7C/projects/wkc-api/notebooks/sandbox/users_export.csv">List
                      users</a>
                  </div>
                </div>
              </div>
              <div id="updateusersteps" style="display:none">
                <div class="container right">
                  <div class="content">
                    <p style="margin-top:20px;">Export User List to the csv file</p>
                    <a class="button is-dark is-medium" title="Export User List"
                      href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/wkc-api/notebooks/sandbox/;python3.8 exportUsers.py">Export
                      User List</a>
                  </div>
                </div>
                <div class="container right timelinestep">
                  <div class="content">
                    <p>List Users from the configured cp4d instance</p>
                    <a class="button is-dark is-medium" title="List Users"
                      href="didact://?commandId=extension.openFile&&text=cp4d%7Cconfigure-application%7C/projects/wkc-api/notebooks/sandbox/users_export.csv">List
                      Users</a>
                  </div>
                </div>
                <div id="updateusers" class="container right timelinestep">
                  <div class="content">
                    <p>Update users in the configured cp4d instance</p>
                    <a class="button is-dark is-medium" title="Update users"
                      href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/wkc-api/notebooks/sandbox/;python3.8 updateUsers.py">Update
                      users</a>
                  </div>
                </div>
                <div class="container right timelinestep">
                  <div class="content">
                    <p>Get updated user list from the configured cp4d instance</p>
                    <a class="button is-dark is-medium" title="List Users"
                      href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/wkc-api/notebooks/sandbox/;python3.8 exportUsers.py">Get
                      users</a>
                  </div>
                </div>
                <div class="container right timelinestep">
                  <div class="content">
                    <p>List Users in the configured cp4d instance</p>
                    <a class="button is-dark is-medium" title="List Users"
                      href="didact://?commandId=extension.openFile&&text=cp4d%7Cconfigure-application%7C/projects/wkc-api/notebooks/sandbox/users_export.csv">List
                      users</a>
                  </div>
                </div>
              </div>
            </div>
        </details>
      </div>
    </div>
    <div class="container right" id="task2">
      <div class="content">
        <details>
          <summary>Governance artifacts</summary>
          <br><br>
          <div>
            <p>Select the action to perform in the configured cp4d instance</p>
            <div style="float:left;padding-left:0px;">
              <input type="radio" id="createcategoriesopt" name="governanceartifactsopt" value="createcategories" />
              <label for="createusers">Create categories</label>
            </div>
            <div style="float:left;padding-left:30px;">
              <input type="radio" id="updatecategoriesopt" name="governanceartifactsopt" value="updatecategories" />
              <label for="updateusers">Update categories</label><br />
            </div>
            <div style="float:left;padding-left:30px;">
              <input type="radio" id="createtermsopt" name="governanceartifactsopt" value="createterms" />
              <label for="createusers">Create terms</label>
            </div>
            <div style="float:left;padding-left:30px;">
              <input type="radio" id="updatetermsopt" name="governanceartifactsopt" value="updateterms" />
              <label for="updateusers">Update terms</label><br />
            </div>
          </div>
          <div class="timeline">
            <div id="createcategories">
              <div class="container right">
                <div class="content">
                  <p style="margin-top:20px;">Configure new categories</p>
                  <a class="button is-dark is-medium" title="Create Users"
                    href="didact://?commandId=extension.openFile&&text=cp4d%7Cconfigure-application%7C/projects/wkc-api/notebooks/sandbox/new_categories.csv">Configure
                    categories</a>
                </div>
              </div>
              <div class="container right timelinestep">
                <div class="content">
                  <p>Create categories in the configured cp4d instance</p>
                  <a class="button is-dark is-medium" title="Create Categories"
                    href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/wkc-api/notebooks/sandbox/;python3.8 create_categories.py">Create
                    categories</a>
                </div>
              </div>
              <div class="container right timelinestep">
                <div class="content">
                  <p>Get categories from the configured cp4d instance</p>
                  <a class="button is-dark is-medium" title="Create Categories"
                    href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/wkc-api/notebooks/sandbox/;python3.8 export_categories.py">Get
                    categories</a>
                </div>
              </div>
              <div class="container right timelinestep">
                <div class="content">
                  <p>List categories in the configured cp4d instance</p>
                  <a class="button is-dark is-medium" title="List Categories"
                    href="didact://?commandId=extension.openFile&&text=cp4d%7Cconfigure-application%7C/projects/wkc-api/notebooks/sandbox/export_categories.csv">List
                    categories</a>
                </div>
              </div>
            </div>
            <div id="createterms">
              <div class="container right timelinestep">
                <div class="content">
                  <p style="margin-top:20px;">Configure new terms</p>
                  <a class="button is-dark is-medium" title="Create Terms"
                    href="didact://?commandId=extension.openFile&&text=cp4d%7Cconfigure-application%7C/projects/wkc-api/notebooks/sandbox/new_terms.csv">Configure
                    terms</a>
                </div>
              </div>
              <div class="container right timelinestep">
                <div class="content">
                  <p>Create terms in the configured cp4d instance</p>
                  <a class="button is-dark is-medium" title="Create Terms"
                    href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/wkc-api/notebooks/sandbox/;python3.8 create_terms.py">Create
                    terms</a>
                </div>
              </div>
              <div class="container right timelinestep">
                <div class="content">
                  <p>Get terms form the configured cp4d instance</p>
                  <a class="button is-dark is-medium" title="Create terms"
                    href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/wkc-api/notebooks/sandbox/;python3.8 export_terms.py">Get
                    terms</a>
                </div>
              </div>
              <div class="container right timelinestep">
                <div class="content">
                  <p>List terms in the configured cp4d instance</p>
                  <a class="button is-dark is-medium" title="List Terms"
                    href="didact://?commandId=extension.openFile&&text=cp4d%7Cconfigure-application%7C/projects/wkc-api/notebooks/sandbox/export_terms.csv">List
                    terms</a>
                </div>
              </div>
            </div>
            <div id="updatecategories">
              <div class="container right">
                <div class="content">
                  <p style="margin-top:20px;">Export Categories to a csv file</p>
                  <a class="button is-dark is-medium" title="Export Categories"
                    href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/wkc-api/notebooks/sandbox/;python3.8 export_categories.py">Export
                    Categories</a>
                </div>
              </div>
              <div class="container right timelinestep">
                <div class="content">
                  <p>List Categories from the configured cp4d instance</p>
                  <a class="button is-dark is-medium" title="List Users"
                    href="didact://?commandId=extension.openFile&&text=cp4d%7Cconfigure-application%7C/projects/wkc-api/notebooks/sandbox/export_categories.csv">List
                    Categories</a>
                </div>
              </div>
              <div id="updateusers" class="container right timelinestep">
                <div class="content">
                  <p>Update categories from the csv file in the configured cp4d instance</p>
                  <a class="button is-dark is-medium" title="Update Categories List"
                    href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/wkc-api/notebooks/sandbox/;python3.8 update_categories.py">Update
                    categories</a>
                </div>
              </div>
              <div class="container right timelinestep">
                <div class="content">
                  <p>Get updated categories in the configured cp4d instance</p>
                  <a class="button is-dark is-medium" title="Get updated categories"
                    href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/wkc-api/notebooks/sandbox/;python3.8 export_categories.py">Get
                    categories</a>
                </div>
              </div>
              <div class="container right timelinestep">
                <div class="content">
                  <p>List Categories from the configured cp4d instance</p>
                  <a class="button is-dark is-medium" title="List Users"
                    href="didact://?commandId=extension.openFile&&text=cp4d%7Cconfigure-application%7C/projects/wkc-api/notebooks/sandbox/export_categories.csv">List
                    Categories</a>
                </div>
              </div>
            </div>
            <div id="updateterms">
              <div class="container right">
                <div class="content">
                  <p style="margin-top:20px;">Export terms to a csv file</p>
                  <a class="button is-dark is-medium" title="Export Terms"
                    href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/wkc-api/notebooks/sandbox/;python3.8 export_terms.py">Export
                    Terms</a>
                </div>
              </div>
              <div class="container right timelinestep">
                <div class="content">
                  <p>List terms form the configured cp4d instance</p>
                  <a class="button is-dark is-medium" title="List Terms"
                    href="didact://?commandId=extension.openFile&&text=cp4d%7Cconfigure-application%7C/projects/wkc-api/notebooks/sandbox/export_terms.csv">List
                    Terms</a>
                </div>
              </div>
              <div id="updateusers" class="container right timelinestep">
                <div class="content">
                  <p>Update terms form the csv file</p>
                  <a class="button is-dark is-medium" title="Update New Terms"
                    href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/wkc-api/notebooks/sandbox/;python3.8 update_terms.py">Update
                    Terms</a>
                </div>
              </div>
              <div class="container right timelinestep">
                <div class="content">
                  <p>Get updated terms in the configured cp4d instance</p>
                  <a class="button is-dark is-medium" title="Get updatd terms"
                    href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/wkc-api/notebooks/sandbox/;python3.8 export_terms.py">Get
                    updated terms</a>
                </div>
              </div>
              <div class="container right timelinestep">
                <div class="content">
                  <p>List Terms from the configured cp4d instance</p>
                  <a class="button is-dark is-medium" title="List terms"
                    href="didact://?commandId=extension.openFile&&text=cp4d%7Cconfigure-application%7C/projects/wkc-api/notebooks/sandbox/export_terms.csv">List
                    Terms</a>
                </div>
              </div>
            </div>
          </div>
      </div>
      </details>
    </div>
    <div class="container right" id="task3">
      <div class="content">
        <details>
          <summary>Project management</summary>
          <br><br>
          <div style="margin-top:0px; padding-top:0px;" class="container right">
            <div class="content">
              <p>Export project from the configured cp4d instance</p>
              <a class="button is-dark is-medium" title="Export Project"
                href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/wkc-api/notebooks/sandbox/;python3.8 exportProject.py">Export
                Project</a>
            </div>
          </div>
          <div style="margin-top:0px; padding-top:0px;" class="container right">
            <div class="content">
              <p>Import project from the configured cp4d instance</p>
              <a class="button is-dark is-medium" title="Import Project"
                href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/wkc-api/notebooks/sandbox/;python3.8 importProject.py">Import
                Project</a>
            </div>
          </div>
        </details>
      </div>
    </div>
    <div class="container right">
      <div class="content">
        <p>Push code to GitHub repository</p>
        <a class="button is-dark is-medium" title="Delete services from IBM Cloud"
          href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=sandbox terminal$$cd%20%2Fprojects%2Fwkc-api%20%26%26sh%20/github.sh ">Push
          to GITHUb</a>
        <p style="margin-top:10px;">Click to push code to your own Github repository. You will need a personal access
          token to complete this action via the CLI. Refer to this <a
            href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token">guide</a>
          for generating your personal access token.</p>
      </div>
    </div>
  </div>
  </div>
</body>
</html>
