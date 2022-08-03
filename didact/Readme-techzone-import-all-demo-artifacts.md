<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="import-all-demo-artifacts.css">
    <style>
        .header {
            background-image: url("https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/video_insights.jpeg");
        }
    </style>
</head>

<body>
    <div style="margin-top:2rem"></div>
    <div id="workspaceID" class="hidden-state">$workspace_id</div>
    <div id="userID" class="hidden-state">$user_id</div>
    <div id="environment" class="hidden-state">$environment</div>
    <div class="header">
        <div class="left-content">
            <div class="apptitle">Recreate shared demo assets onto your CPD cluster</div>
            <div class="subheading">Search centralized repository of demo assets and recreate selected demo assets on your cluster. The assumption is that you have an existing Openshift cluster with Cloud Pak for Data installed. Demo assets can include different types of artifacts such as Users, Governance artifacts, Analytics projects, Data integration projects etc. You can selectively pick one or more of these artifacts and import into your cluster.</div>
        </div>
    </div>
    <div class="section">
        <p style="font-size:24px">Pre-requisites</p>
        <div>
            <p>EEnter your CPD cluster details.</p>
            <div class="env-config">
                <label>Hostname: </label><input class="env-variables" name="hostname" type="text" />
                <label>User: </label><input class="env-variables" name="wkcuser" type="text" />
                <label>Password: </label><input class="env-variables" name="password" type="password" />
                <label>API Key: </label><input class="env-variables" name="api_key" type="text" />
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
                <div id="list1" class="dropdown-check-list" tabindex="100">
                            <span id="selected" class="anchor">Select Demo</span>
                            <ul class="items">
                                $demo_options
                            </ul>
                        </div>
            </div>
            <span class="dot"></span>
        </div>
        <div class="timeline timelinestep">
            <div class="content">
                <p>Configure the environment with the required resources and connect to the specified CP4D cluster.</p>
            </div>
            <button class="button is-dark is-medium" id="configure-env" title="Configure Resources">Configure Environment</button>
            <a id="config_command_exec" ,href=""></a>
            <span class="dot"></span>
        </div>
        <div class="timeline" id="task1">
            <div class="content">
                <details>
                    <summary>User management<span class="arrow"></span></summary>
                    <br><br>
                    <div>
                        <div class="content">
                            <p>Recreate demo users onto new CPD cluster.</p>
                        </div>
                        <a class="button is-dark is-medium" title="Create Users"
                            href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/techzone-demo/sandbox/;python3.8 createUsers.py users.csv">Create
                            Users</a>
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
                            <p>Import Governance artifacts to new CPD cluster.</p>
                        </div>
                        <a class="button is-dark is-medium" title="Import Gov Artifacts"
                            href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/techzone-demo/sandbox/;python3.8 importGovArtifacts.py governance_artifacts.zip">Import
                            Artifacts</a>
                    </div>
                </details>
            </div>
            <span class="dot"></span>
        </div>
        <!--<div class="timeline" id="task2">
            <div class="content">
                            <p>Validate</p>
                        </div>
                        <a class="button is-dark is-medium" title="Export Gov Artifacts"
                            href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/techzone-demo/sandbox/;">Validate</a>
            <span class="dot"></span>
        </div>-->
        <div class="timeline" id="task3">
            <div class="content">
                <details>
                    <summary>Project management<span class="arrow"></span></summary>
                    <br><br>
                    <div>
                        <div class="content">
                            <p>Import project</p>
                        </div>
                        <a id="import-project" class="button is-dark is-medium" title="Import Project"
                            href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$cd /projects/techzone-demo/sandbox/;python3.8 importProject.py project_assets ">Import
                            Project</a>
                        <span class="dot"></span>
                    </div>
                </details>
            </div>
            <span class="dot"></span>
        </div>
        <div class="timeline timelinestep">
            <div class="content">
                <p>Open the CPD cluster to  verify the resources created.</p>
            </div>
            <a id="open-cpd-cluster" class="button is-dark is-medium" title="Open Cluster"
                href="">Open CPD Cluster</a>
            <span class="dot"></span>
        </div>
    </div>
    </div>
    </div>
</body>
<script src="import-all-demo-artifacts.js"></script>

</html>
