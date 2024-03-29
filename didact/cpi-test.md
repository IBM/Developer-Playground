<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script src="cpi-test.js">
  </script>
  <link rel="stylesheet" href="cpi-test.css">
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
            <div class="apptitle">Self-service customizable CP4I environment setup</div>
            <div class="subheading">Cloud Pak for Integration (CP4I) v4 adopted the Operator based installation & management pattern.
            This gives us flexibility to custom build a demo environment based on our needs. If we are doing a simple data
            science demo with services WS, WML you can choose to just install those 2 services in a self-service fashion on
            an appropriately sized cluster for more cost effectiveness in addition to better performance as you would have
            installed just services you need for your demo. This interface uses standard engineering-supported install
            utility/mechanism for ongoing support/maintainability.</div>
        </div>
    </div>
    <div class="section">
        <p style="font-size:24px">Pre-requisites</p>
        <div>
        <p>Configure Openshift credentials (either use combination of server, user/password (OR) server, token).<br>
            Openshift server name (including https://) and token can be obtained using one of two methods
        <ol>
            <li>From Openshift console, select your profile on top right and select “Copy login command”</li>
            <li>From oc cli, run “oc config view --minify|grep server” to get server name and “oc whoami -t” to get token
            </li>
        </ol>
        </p>
        <p>Obtain an Entitlement key from <a href="https://myibm.ibm.com/products-services/containerlibrary"> IBM Container Library</a> using your IBM ID. Click Get an entitlement key if you are not on the entitlement page.</p>
        <div class="env-config">
            <label>ICR Key: </label><input class="env-variables" name="icr_key" type="text" /><p></p><p></p>
            <label>Server: </label><input class="env-variables" name="server" type="text" />
            <label>API Token: </label><input class="env-variables" name="api_token" type="text" />
            <p>-------OR-------</p>
            <p></p>
            <label>Kube Admin User: </label><input class="env-variables" name="kubeadmin_user" type="text" />
            <label>Kube Admin Password: </label><input class="env-variables" name="kubeadmin_pass" type="password" />
        </div>
        </div>
    </div>
    <div class="section">
        <p style="font-size: 24px">Instructions</p>
        Please follow all the below steps in proper sequence<br>
        At a high level the installation steps include:
        <ol>
            <li>Configure CP deployer on Openshift cluster.</li>
            <li>Deploy selected CP4D services.</li>
        </ol>
        Please follow steps below as appropriate, some steps are optional depending on what needs to be done. Mandatory
        steps are indicated using *<br><br>
    </div>
    <div class="timeline-container">
        <div class="timeline">
            <div class="content">
                <p>Get the resources required to deploy CP4I services and configure the openshift credentials.</p>
            </div>
            <button class="button is-dark is-medium" id="configure-env" title="Configure Environment">Configure Environment *</button>
            <a id="config_command_exec" ,href=""></a>
            <span class="dot"></span>
        </div>
        <div class="timeline">
            <div class="content">
                    CP4I
                    <br><br>
                <div>
                    <div class="content">
                        <p>Deploy custom resources for selected CP4I services</p>
                        <div class="env-config">
                            <label>CP4I Version</label>
                            <input type="text" id="cp4i_version" value="2022.2.1-0">
                            <label>Components list
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <div id="cpi-service-list" class="dropdown-check-list" tabindex="100">
                                <span class="anchor">Select Components</span>
                                <div class="items">
                                    <input id="cpi-services-search" type="search" placeholder="Search components" style="width: 100%" />
                                    <ul id="cpi-git-services"></ul>
                                </div>
                            </div>
                        </div>
                        <p style="margin-top:1rem"><b>Selected Services: </b><span id="cpi-selected-services"></span></p>
                        <div class="env-config">
                            <b>Storage Vendor</b><br>
                            <div>Valid values include:
                                <ul>
                                <li>nfs: If using NFS you should ensure that there is a storage class called managed-nfs-storage </li>
                                <li>ocs: If you are using OCS storage for CP4D </li>
                                <li>portworx: If you are using Portworx storage for CP4D </li>
                                <li>roks-classic: If you want to use ibmc-file-gold-gid and ibm-block-gold-gid </li>
                                <ul>
                            </div>
                            <label></label>
                            <select id="cr_storage_value" style="width:150px;height:33px;padding-left: -150px">
                                <option value="nfs">nfs</option>
                                <option value="ocs">ocs</option>
                                <option value="portworx">portworx</option>
                                <option value="roks-classic">roks-classic</option>
                            </select>
                        </div>
                    </div>
                    <a class="button is-dark is-medium" title="Execute" id="install_cpi">Install selected services</a>
                    <br /><br />
                    <div class="content">
                    <p>Cleanup install utility artifacts</p>
                </div>
                <a class="button is-dark is-medium" title="Check Pod State" href="didact://?commandId=vscode.didact.sendNamedTerminalAString&&text=sandbox terminal$$sh delete.sh">Clean up</a>
            </div>
        <span class="dot"></span>
        </div>
    </div>
    <a id="command_exec" , href=""></a>
</body>
</html>
