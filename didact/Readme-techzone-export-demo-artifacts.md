<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--<link rel="stylesheet" href="export-demo-artifacts.css">-->
    <style>
        html,
        div,
        body {
            background-color: #1a1a1a;
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 16px;
            outline: none;
        }
        body {
            font-family: Helvetica, sans-serif;
        }
        a:hover {
            color: #A6C8FF;
            text-decoration: underline;
        }
        a:visited {
            color: #BE95FF;
        }
        .timeline-container {
            margin-top: 2rem;
        }
        .timeline {
            position: relative;
            padding: 0.5rem 1rem 1rem 4rem;
        }
        .dot{
            content: "";
            position: absolute;
            width: 10px;
            aspect-ratio: 1;
            border: 0px solid #FF9F55;
            border-radius: 50%;
            background-color: white;
            left: 1rem;
            top: 0rem;
        }
        .content {
            color: white;
            background: transparent;
            margin-top: -2.22rem;
            margin-left: -1.5rem;
        }
        .timeline:not(:last-child):before {
            content: '';
            position: absolute;
            width: 1px;
            background-color: white;
            left: 1.25rem;
            bottom: 0rem;
            top: 0.6rem;
        }
        .button.is-dark.is-medium {
            font-family: 'IBM Plex Sans', sans-serif;
            background: transparent;
            border-color: white;
            color: #fff;
            border: 1px solid white;
            margin-bottom: 1.8rem !important;
            margin-top: -0.5rem !important;
            border-radius: 0rem;
            min-width: 11.25rem;
            font-size: 14px;
            text-align: left;
            min-height: 3rem;
            margin: 0rem;
            justify-content: left;
        }
        .button.is-dark.is-medium:hover {
            font-family: 'IBM Plex Sans', sans-serif;
            background-color: #2a67f5;
            border-color: white;
            color: #fff;
            text-decoration: none;
        }
        .footer-cta {
            background-color: #343A3E !important;
            min-width: 50%;
            background-color: #343A3E;
            padding: 30px;
            padding-left: 60px;
            padding-bottom: 0px;
        }
        .footer {
            display: flex;
            flex-direction: row;
            width: auto;
            background:transparent;
            margin-left:2rem;
            margin-top:2rem;
        }
        .image-content {
            pointer-events: auto !important;
            padding: 0.313rem 0.625rem;
            color: black;
            position: relative;
            font-size: 27px;
        }
        .image-content a:hover {
            text-decoration: underline;
        }
        .image-div {
            display: block;
            position: relative;
            background-color: white;
            min-width: 50%;
            background-image: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/github.svg");
            background-position: -8rem 120%;
            background-size:contain;
            background-repeat: no-repeat;
            padding-top: 1.25rem;
            padding-left: 1.25rem;
        }
        .image-btn {
            position: absolute;
            right:0;
            bottom:0;
            background-color: #0062FF;
            width: 18.75rem;
            padding: 0px;
            padding-bottom: 1.25rem;
        }
        .image-link span {
            float: right;
            font-size: 32px;
            padding-right: 1.25rem;
        }
        .image-btn .image-link:hover {
            text-decoration: underline;
            color: white !important;
            background-color: #0353E9 !important;
        }
        .image-btn a:hover {
            text-decoration: none !important;
            color: white !important;
        }
        .image-link {
            color: white !important;
            display: block !important;
            padding: 0.313rem 0.625rem 0.313rem 0.625rem !important;
            line-height: 1.75rem !important;
            font-size: 16px !important;
        }
        .header {
            background-position: right;
            width: 95%;
            min-height: 4.375rem;
            display: inline-block;
            margin-top: 1.25rem !important;
            margin-bottom: 1.25rem;
            margin-left: 1.875rem;
            margin-right: 1.875rem;
            max-width: 75rem;
            background-repeat: no-repeat;
            background-size: 43.75rem 31.25rem;
        }
        .header .left-content {
            float: left;
            width: 50%;
            background-color: #525252 !important;
            min-height: 16.875rem;
            font-size: 16px;
            padding-top: 2.188rem;
        }
        .header .left-content h4 {
            background: none;
            color: #C1C7CD;
            padding-left: 1.563rem;
            padding-right: 1.563rem;
        }
        .header .left-content div {
            background: none;
            color: #C1C7CD;
            padding-left: 0.938rem;
            padding-right: 1.563rem;
            font-size: 16px;
            margin-bottom: 0.625rem;
        }
        .container a {
            color: #BE95FF;
            background-color: transparent;
            text-decoration: none;
        }
        .container a:visited {
            color: #8C43FC;
            background-color: transparent;
            text-decoration: none;
        }
        .apptitle {
            margin-left: 1.563rem;
            margin-top: 1.25rem;
            margin-bottom: 0px;
            font-size: 28px !important;
            color: white !important;
            background: transparent;
        }
        .subheading {
            margin-left: 1.563rem;
            margin-top: 0rem;
            margin-bottom: 0rem;
            font-size: 16px;
            color: #c1c7cd;
            background: transparent;
        }
        .no-hover:hover {
            background-color: #A6C8FF !important;
        }
        .section {
            margin-top: 0.313rem;
            margin-bottom: -3.125rem;
        }
        .hidden-state{
            display: none;
        }
        summary{
            float:left;
            display:flex;
            justify-content: space-between;
        }
        summary::marker{
            display:none;
            content: "";
        }
        details > summary > span { 
            content: url("https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/arrow-right.svg");
            margin-left: 1rem;
        }
        details[open] > summary > span {
            content: url("https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/arrow-down.svg");
        }
        details{
            margin-bottom: 1.25rem;
        }
        .checkbox-group{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .checkbox-item{
            float:left;
            padding: 0.5rem;
            flex: 1 1 22%;
        }
        label{
            flex:none;
        }
        .disable{
            opacity: 0.5;
            cursor: not-allowed;
        }
        .no-click{
            pointer-events: none;
        }
        .enable{
            opacity: 1;
            cursor: auto;
        }
        .allow-click{
            pointer-events: auto;
        }
        .dropdown-check-list {
            display: inline-block;
          }
          .dropdown-check-list .anchor {
            position: relative;
            cursor: pointer;
            display: inline-block;
            padding: 5px 50px 5px 10px;
            border: 1px solid #ccc;
          }
          .dropdown-check-list .anchor:after {
            position: absolute;
            content: "";
            border-left: 2px solid white;
            border-top: 2px solid white;
            padding: 5px;
            right: 10px;
            top: 20%;
            -moz-transform: rotate(-135deg);
            -ms-transform: rotate(-135deg);
            -o-transform: rotate(-135deg);
            -webkit-transform: rotate(-135deg);
            transform: rotate(-135deg);
          }
          .dropdown-check-list .anchor:active:after {
            right: 8px;
            top: 21%;
          }
          .dropdown-check-list ul.items {
            padding: 2px;
            display: none;
            margin: 0;
            border: 1px solid #ccc;
            border-top: none;
          }
          .dropdown-check-list ul.items li {
            list-style: none;
          }
          .dropdown-check-list.visible .anchor {
            color: #0094ff;
          }
          .dropdown-check-list.visible .items {
            display: block;
          }
          .env-config{
            display:grid;
            grid-template-columns: max-content max-content;
            grid-gap:5px;
        }
        .env-config label       { text-align:right; }
        @media screen and (max-width: 50rem) {
            .footer {
                display: flex;
                flex-direction: column;
            }
            .image-content {
                height: 20rem;
            }
        }
        .header {
            background-image: url("https://raw.githubusercontent.com/IBMP/Developer-Playground/master/didact/images/video_insights.jpeg");
        }
    </style>
</head>

<body>
    <div style="margin-top:2rem"></div>
    <div class="header">
        <div class="left-content">
            <div class="apptitle">CP4D demo</div>
            <div class="subheading">Cloud Pak for Data (CPD) v4 adopted the Operator based installation & management
                pattern. This relies on the Operator Lifecycle Manager (OLM) as well as some key features delivered by
                Cloud Pak Foundational Services (CPFS).</div>
        </div>
    </div>
    <div class="section">
        <p style="font-size:24px">Pre-requisites</p>
        <div>
            <p>Enter your cp4d details.</p>
            <div class="env-config">
                <label>Hostname: </label><input class="env-variables" name="hostname" type="text" />
                <label>User: </label><input class="env-variables" name="wkcuser" type="text" />
                <label>Password: </label><input class="env-variables" name="password" type="password" />
            </div>
        </div>
    </div>
    <div class="section">
        <p style="font-size:24px">Instructions</p>
        <p>Please follow all the below steps in proper sequence.</p>
    </div>
    <div class="timeline-container">
        <div class="timeline timelinestep">
            <div class="content">
                <p>Open the sandbox terminal.</p>
            </div>
            <a class="button is-dark is-medium" title="Open Terminal"
                href="didact://?commandId=terminal-for-sandbox-container:new">Open Terminal</a>
            <span class="dot"></span>
        </div>
        <div class="timeline timelinestep">
            <div class="content">
                <p>Get the resources required and update the cp4d details in .env file.</p>
            </div>
            <a id="configure-env" class="button is-dark is-medium" title="Configure Resources"
                href="didact://?commandId=extension.compositeCommand%26%26text%3Dvscode.didact.sendNamedTerminalAString%2Csandbox%20terminal%2Cgit%20clone%20-b%20techzone%20https%3A%2F%2Fgithub.com%2FIBM%2FDeveloper-Playground%20%24%7BCHE_PROJECTS_ROOT%7D%2Ftechzone-demo%2C%2Fprojects%7Cvscode.didact.sendNamedTerminalAString%2Csandbox%20terminal%2Cpip3.8%20install%20-r%20requirements.txt%3Bcd%20%2Fprojects%2Ftechzone-demo%2Fsandbox%2F%7C">Configure
                Environment</a>
            <span class="dot"></span>
        </div>
        <div class="timeline timelinestep">
            <div class="content">
                <p>Select the required tasks</p>
                <div class="checkbox-group">
                    <div style="float:left;padding: 0.2rem;flex: 1 1 31%;">
                        <input type="checkbox" name="checkboxtask" value="task1" />
                        <label for="task1">User Management</label>
                    </div>
                    <div style="float:left;padding: 0.2rem;flex: 1 1 31%;">
                        <input type="checkbox" name="checkboxtask" value="task2" />
                        <label for="task2">Governance Artifacts</label>
                    </div>
                    <div style="float:left;padding: 0.2rem;flex: 1 1 31%;">
                        <input type="checkbox" name="checkboxtask" value="task3" />
                        <label for="task3">Project Management</label>
                    </div>
                </div>
                <span class="dot"></span>
            </div>
            </br>
        </div>
        <div class="timeline" id="task1">
            <div class="content">
                <details>
                    <summary>User management<span class="arrow"></span></summary>
                    <br><br>
                    <div>
                        <div class="content">
                            <p>Export User List to the csv file</p>
                        </div>
                        <a class="button is-dark is-medium" title="Export User List"
                            href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/techzone-demo/sandbox/;python3.8 exportUsers.py demo_users.csv">Export
                            User List</a>
                        <span class="dot"></span>
                    </div>
                </details>
            </div>
            <span class="dot"></span>
        </div>
        <div class="timeline" id="task2">
            <div class="content">
                <details>
                    <summary>Governance Artifacts<span class="arrow"></span></summary>
                    <br><br>
                    <div class="content">
                        <p>Select the action to perform in the configured cp4d instance</p>
                        <div id="list1" class="dropdown-check-list" tabindex="100">
                            <span class="anchor">Select Artifacts</span>
                            <ul class="items">
                                <li><input type="checkbox" name="governance-artifacts" value="all" checked />All </li>
                                <li><input type="checkbox" name="governance-artifacts"
                                        value="category" />Category</label>
                                </li>
                                <li><input type="checkbox" name="governance-artifacts"
                                        value="classification" />Classification</label>
                                </li>
                                <li><input type="checkbox" name="governance-artifacts" value="data_class" />Data
                                    Class</label>
                                </li>
                                <li><input type="checkbox" name="governance-artifacts" value="glossary_term" />Glossary
                                    Terms</label>
                                </li>
                                <li><input type="checkbox" name="governance-artifacts" value="policy" />Policy</label>
                                </li>
                                <li><input type="checkbox" name="governance-artifacts"
                                        value="reference_data" />Reference Data</label>
                                </li>
                                <li><input type="checkbox" name="governance-artifacts" value="rule" />Rule</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <br>
                    <div id="export-task">
                        <div class="content">
                            <p>Export Governance Artifacts</p>
                        </div>
                        <a class="button is-dark is-medium" title="Export Gov Artifacts"
                            href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/techzone-demo/sandbox/;python3.8 exportGovArtifacts.py gov-artifacts.zip all;unzip gov-artifacts.zip -d gov-artifacts">Export
                            Artifacts</a>
                        <span class="dot"></span>
                    </div>
                </details>
            </div>
            <span class="dot"></span>
        </div>
        <div class="timeline" id="task3">
            <div class="content">
                <details>
                    <summary>Project management<span class="arrow"></span></summary>
                    <br><br>
                    <div>
                        <div class="content">
                            <p>Export project from the configured cp4d instance</p>
                        </div>
                        <!--<select name="select" id="select-option" class="form-control">
                            <option value="">Select a Option</option>
                            <option value="Option_one">Option one</option>
                            <option value="Option_two">Option two</option>
                        </select>-->
                        <a class="button is-dark is-medium" title="Export Project"
                            href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/techzone-demo/sandbox/;python3.8 exportProject.py">Export
                            Project</a>
                        <span class="dot"></span>
                    </div>
                </details>
            </div>
            <span class="dot"></span>
        </div>
        <div class="timeline">
            <div class="content">
                <p>Push code to GitHub repository</p>
            </div>
            <a class="button is-dark is-medium" title="Delete services from IBM Cloud"
                href="didact://?commandId=vscode.didact.sendNamedTerminalAString&text=sandbox: IPython: notebooks/sandbox$$cd%20%2Fprojects%2Ftechzone-demo%20%26%26sh%20/github.sh ">Push
                to GitHub</a>
            <p style="margin-top:10px;">Click to push code to your own Github repository. You will need a personal
                access
                token to complete this action via the CLI. Refer to this <a
                    href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token">guide</a>
                for generating your personal access token.</p>
            <span class="dot"></span>
        </div>
    </div>
    </div>
    </div>
</body>
<script src="export-demo-artifacts.js"></script>
</html>