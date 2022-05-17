<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="import-demo-artifacts.css">
    <style>
        .header {
            background-image: url("https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/video_insights.jpeg");
        }
    </style>
</head>

<body>
    <div style="margin-top:2rem"></div>
    <div class="header">
        <div class="left-content">
            <div class="apptitle">Recreate shared demo assets on your cluster</div>
            <div class="subheading">Search centralized repository of demo assets and recreate selected demo assets on your cluster. The assumption is that you have an existing Openshift cluster with Cloud Pak for Data installed. Demo assets can include different types of artifacts such as Users, Governance artifacts, Analytics projects, Data integration projects etc. You can selectively pick one or more of these artifacts and import into your cluster.</div>
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
                <p>Select Demo</p>
                <select>
                    <option>Select Demo</option>
                    <option>Demo 1</option>
                    <option>Demo 2</option>
                    <option>Demo 3</option>
                </select>
            </div>
            <span class="dot"></span>
        </div>
        <div class="timeline timelinestep">
            <div class="content">
                <p>Get the resources required and update the cp4d details in .env file.</p>
            </div>
            <a id="configure-env" class="button is-dark is-medium" title="Configure Resources"
                href="didact://?commandId=extension.compositeCommand&&text=terminal-for-sandbox-container:new%7Cvscode.didact.sendNamedTerminalAString%2Csandbox%20terminal%2Cgit%20clone%20-b%20techzone%20https%3A%2F%2Fgithub.com%2FIBM%2FDeveloper-Playground%20%24%7BCHE_PROJECTS_ROOT%7D%2Ftechzone-demo%2C%2Fprojects%7Cvscode.didact.sendNamedTerminalAString%2Csandbox%20terminal%2Ccd%20${CHE_PROJECTS_ROOT}/techzone-demo;pip3.8%20install%20-r%20requirements.txt%3Bcd%20%2Fprojects%2Ftechzone-demo%2Fsandbox%2F%7C">Get
                Resources</a>
            <span class="dot"></span>
        </div>
        <div class="timeline" id="task1">
            <div class="content">
                <details>
                    <summary>User management<span class="arrow"></span></summary>
                    <br><br>
                    <div>
                        <div class="content">
                            <p>Create Users</p>
                        </div>
                        <a class="button is-dark is-medium" title="Export User List"
                            href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/techzone-demo/sandbox/;python3.8 exportUsers.py demo_users.csv">Create
                            User</a>
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
                    <div>
                        <div class="content">
                            <p>Create Governance Artifacts</p>
                        </div>
                        <a class="button is-dark is-medium" title="Export Gov Artifacts"
                            href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/techzone-demo/sandbox/;python3.8 exportGovArtifacts.py gov-artifacts.zip all;unzip gov-artifacts.zip -d gov-artifacts">Create
                            Artifacts</a>
                    </div>
                </details>
            </div>
            <span class="dot"></span>
        </div>
        <div class="timeline" id="task2">
            <div class="content">
                            <p>Validate</p>
                        </div>
                        <a class="button is-dark is-medium" title="Export Gov Artifacts"
                            href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/techzone-demo/sandbox/;python3.8 exportGovArtifacts.py gov-artifacts.zip all;unzip gov-artifacts.zip -d gov-artifacts">Validate</a>
            <span class="dot"></span>
        </div>
        <div class="timeline" id="task3">
            <div class="content">
                <details>
                    <summary>Project management<span class="arrow"></span></summary>
                    <br><br>
                    <div>
                        <div class="content">
                            <p>Import project</p>
                        </div>
                        <!--<select name="select" id="select-option" class="form-control">
                            <option value="">Select a Option</option>
                            <option value="Option_one">Option one</option>
                            <option value="Option_two">Option two</option>
                        </select>-->
                        <a class="button is-dark is-medium" title="Export Project"
                            href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/techzone-demo/sandbox/;python3.8 exportProject.py">Import
                            Project</a>
                        <span class="dot"></span>
                    </div>
                </details>
            </div>
            <span class="dot"></span>
        </div>
    </div>
    </div>
    </div>
</body>
<script src="import-demo-artifacts.js"></script>

</html>