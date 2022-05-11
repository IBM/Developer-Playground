<html>

<head>
<meta http-equiv="Content-Security-Policy" content="default-src 'self' datafabric.ibmcloudpack.com:12010 *.datafabric.ibmcloudpack.com:12010" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="export-demo-artifacts.css">
    <style>
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
                        <select name="select" id="select-option" class="form-control">
                            <option value="">Select a Option</option>
                            <option value="Option_one">Option one</option>
                            <option value="Option_two">Option two</option>
                        </select>
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