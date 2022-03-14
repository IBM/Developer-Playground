<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
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
    .dot {
      position: absolute;
      width: 10px;
      aspect-ratio: 1;
      border: 0px solid #FF9F55;
      border-radius: 50%;
      background-color: white;
      left: 1rem;
      top: 0rem;
      opacity:0.5 !important;
    }
    .content {
      color: white;
      background: transparent;
      margin-top: -2.22rem;
      margin-left: -1.5rem;
    }
    .timeline:not(.step4):before {
      content: '';
      position: absolute;
      width: 1px;
      background-color: white;
      left: 1.25rem;
      bottom: 1.5rem;
      top: 0rem;
      opacity:0.5;
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
    input {
      position: absolute;
      display: none;
      color: #fff !important;
    }
    .timeline.step1::before, .step1 > .dot{
      opacity:1 !important;
    }
    .step2,
    .step3,
    .step4
      {
      margin-left: -4rem;
      cursor: not-allowed;
    }
    #icon {
      display: none;
    }
    .step2 a,
    .step3 a,
    .step4 a{
      opacity: 0.5;
      pointer-events: none;
    }
    .step2 .content,
    .step3 .content,
    .step4 .content{
      opacity: 0.5 !important;
    }
    .footer,
    .footer a {
      opacity: 1;
      pointer-events: auto;
      cursor: auto;
    }
    .footer-cta {
      background-color: #343A3E !important;
      cursor: not-allowed;
      min-width: 50%;
      background-color: #343A3E;
      padding:30px;
      padding-left:60px;
      padding-bottom:0px;
      opacity: 0.5;
    }
    .footer-cta a{
      opacity: 0.5;
      pointer-events: none;
    }
    input:checked ~ span #icon {
      display: flex;
      margin: 0.05rem auto;
    }
    input:checked ~ span{
      width: 20px;
      margin-top:-0.3rem;
      margin-left: -0.36rem;
      background-color:#0261FF;
    }
    input:checked .dot{
      opacity:1 !important;
    }
    input:checked ~ .timeline:not(.step4):before{
      opacity:1;
    }
    .step1 input:checked~.step2 a#step2{
      opacity: 1;
      pointer-events: auto;
    }
    .step1 input:checked~.step2 {
      opacity: 1;
      cursor: auto;
    }
    .step1 input:checked ~.step2 >.content, .step1 input:checked ~.step2 > .dot {
      opacity: 1 !important;
    }
    .step2 input:checked~.step3 a#step3{
      opacity: 1 !important;
      pointer-events: auto;
    }
    .step2 input:checked~.step3 {
      opacity: 1;
      cursor: auto;
    }
    .step2 input:checked ~.step3 >.content, .step2 input:checked ~.step3 > .dot{
      opacity: 1 !important;
    }
    .step3 input:checked~.step4 a#step4{
      opacity: 1;
      pointer-events: auto;
    }
    .step3 input:checked~.step4 {
      opacity: 1;
      cursor: auto;
    }
    .step3 input:checked ~.step4 >.content, .step3 input:checked ~.step4 > .dot{
      opacity: 1 !important;
    }
    .step4 input:checked~.footer .footer-cta a{
      opacity: 1;
      pointer-events: auto;
    }
    .step4 input:checked~.footer .footer-cta {
      opacity: 1;
      cursor: auto;
    }
    .footer {
      display: flex;
      flex-direction: row;
      width: auto;
      background:transparent;
      margin-left:-5rem;
      margin-top:-1.5rem;
    }
    .github-icon {
      min-height: 100%;
      min-width: 100%;
      object-fit: cover;
      object-position: 250% 6.35rem;
      opacity: 15%;
      bottom: 0.938rem;
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
      background-position: -50% 3.75rem;
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
      background-image: url('https://raw.githubusercontent.com/IBM/Developer-Playground/master/didact/images/anomaly.jpeg');
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
    .header .right-content {
      float: left;
      width: 50%;
      background-color: #525252 !important;
      min-height: 16.875rem;
      font-size: 16px;
      padding-top: 2.188rem;
    }
    .header .right-content h4 {
      background: none;
      color: #C1C7CD;
      padding-left: 1.563rem;
      padding-right: 1.563rem;
    }
    .header .right-content div {
      background: none;
      color: #C1C7CD;
      padding-left: 0.938rem;
      padding-right: 1.563rem;
      font-size: 16px;
      margin-bottom: 0.625rem;
    }
    .header .right-content ul {
      margin: 0px;
      margin-left: 1.563rem;
      margin-bottom: 0.625rem;
      line-height: 1rem;
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
      background:transparent;
    }
    .subheading {
      margin-left: 1.563rem;
      margin-top: 0rem;
      margin-bottom: 0rem;
      font-size: 16px;
      color: #c1c7cd;
      background:transparent;
    }
    .no-hover:hover {
      background-color: #A6C8FF !important;
    }
    .section {
      margin-top: 0.313rem;
      margin-bottom: -3.125rem;
    }
    @media screen and (max-width: 50rem) {
    .footer{
      display:flex;
      flex-direction: column;
    }
    .image-content {
      height:20rem;
    }
}
  </style>
</head>

<body>
<div style="margin-top:2rem"></div>
  <div class="header">
    <div class="right-content">
      <div class="apptitle">
        Anomaly Detection
      </div>
      <div class="subheading">
        Perform anomaly detection on a time-series dataset.
      </div>
    </div>
  </div>
  <div class="section" style="font-size:16px; margin-top:-1.25rem">
    <p>Industrial applications need to be able to detect anomalies from unlabelled time series data which can be a
      painful process. Machine learning tools use anomaly detection to identify data points, events, and observations
      that deviate from a dataset’s normal behavior.</p>
    <p>This anomaly detection API service can help users detect anomalies from the entire time series or predict anomaly
      status of the last data input. Currently the service supports both univariate and multivariate time series.This
      application allows you to experiment with the Anomaly Detection API on both univariate and multivariate time
      series datasets. The Anomaly Detection API packages state-of-the-art techniques for doing anomaly detection for a
      time-series dataset along with a unified framework to access these techniques.</p>
  </div>
  <div class="section">
    <p style="font-size:24px">Learning Resources</p>
    <div>
      <a href="https://developer.ibm.com/learningpaths/get-started-anomaly-detection-api/">Get Started with Anomaly
        Detection API</a></br>
    </div>
  </div>
  <div class="section">
    <p style="font-size:24px">Included APIs</p>
    <div>
      <p><a href="https://developer.ibm.com/apis/catalog/ai4industry--anomaly-detection-product/Introduction">Anomaly
          Detection API</a></p>
    </div>
  </div>
  <div class="section">
    <p style="font-size:24px">Pre-requisites</p>
    <div>
      <ol>
        <li>
          <p>IBM Account - <a href="https://ibm.com/registration?cm_sp=ibmdev--developer-sandbox--cloudreg">Create</a>
            one for free.</p>
        </li>
        <li>Obtain API credentials </li>
        <ul>
          <li><a href="https://www.ibm.com/account/reg/us-en/signup?formid=urx-51009">Subscribe</a> to the Anomaly
            Detection API.</li>
          <li>Check out <a href="https://developer.ibm.com/profile/myapis"> API Subscriptions</a>.</li>
          <li>Select subscription for Anomaly Detection API to proceed.</li>
          <li>Get the Client ID/Secret, if not, Generate an API Key.</li>
        </ul>
      </ol>
    </div>
  </div>
  <div class="section">
    <p style="font-size:24px">Instructions</p>
    <p>Please follow all the below steps in proper sequence.</p>
  </div>
  <div class="timeline-container">
    <div class="timeline step1">
    <div class="content">
        <p>Clone the GitHub repository.</p>
      </div>
      <input type="checkbox"><a id="step1" class="button is-dark is-medium" title="Get the Code"
        href="didact://?commandId=extension.sendToTerminal&text=AnomalyDetection%7Cclone%7Canomaly|git%20clone%20-b%20anomaly%20https://github.com/IBM/Developer-Playground.git%20${CHE_PROJECTS_ROOT}/anomaly"
        target="_blank"><span>Get Code</span></a>
        <span class="dot"><svg fill="white"
            id="icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
            <defs>
              <style>
                .cls-1 {
                  fill: none;
                }
              </style>
            </defs>
            <polygon points="14 21.414 9 16.413 10.413 15 14 18.586 21.585 11 23 12.415 14 21.414" />
            <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z" />
            <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32"
              height="32" />
          </svg></span>
      <div class="timeline step2">
        <div class="content">
          <p>Install required dependencies for executing application.</p>
        </div>
        <input type="checkbox"><a id="step2" class="button is-dark is-medium" title="Build the Application"
          href="didact://?commandId=extension.sendToTerminal&text=AnomalyDetection%7Cbuild%7Canomaly|cd%20${CHE_PROJECTS_ROOT}/anomaly%20%26%26%20npm%20install%20--production"
          target="_blank"><span>Install Dependencies</span></a>
            <span class="dot"><svg  fill="white"
            id="icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
            <defs>
              <style>
                .cls-1 {
                  fill: none;
                }
              </style>
            </defs>
            <polygon points="14 21.414 9 16.413 10.413 15 14 18.586 21.585 11 23 12.415 14 21.414" />
            <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z" />
            <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32"
              height="32" />
          </svg></span>
        <div class="timeline step3">
          <div class="content">
            <p>Configure the application. See prerequisites.</p>
          </div>
          <input type="checkbox"><a id="step3" class="button is-dark is-medium" title="Open the File"
            href="didact://?commandId=extension.openFile&text=AnomalyDetection%7Cconfigure-application%7C${CHE_PROJECTS_ROOT}/anomaly/.env"
            target="_blank"><span>Configure Application</span></a>
              <span class="dot"><svg fill="white"
            id="icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
            <defs>
              <style>
                .cls-1 {
                  fill: none;
                }
              </style>
            </defs>
            <polygon points="14 21.414 9 16.413 10.413 15 14 18.586 21.585 11 23 12.415 14 21.414" />
            <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z" />
            <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32"
              height="32" />
          </svg></span>
          <div class="timeline step4">
            <div class="content">
              <p>Launch the application in the preview window.</p>
            </div>
            <input type="checkbox"><a id="step4" class="button is-dark is-medium" title="Launch the Application"
              href="didact://?commandId=extension.sendToTerminal&text=AnomalyDetection%7Claunch%7Canomaly|cd%20${CHE_PROJECTS_ROOT}/anomaly/%20%26%26%20npm%20run%20server"
              target="_blank"><span>Launch Application</span></a>
              <span class="dot"><svg fill="white"
            id="icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
            <defs>
              <style>
                .cls-1 {
                  fill: none;
                }
              </style>
            </defs>
            <polygon points="14 21.414 9 16.413 10.413 15 14 18.586 21.585 11 23 12.415 14 21.414" />
            <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z" />
            <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32"
              height="32" />
          </svg></span>
            <div class="footer">
              <div class="footer-cta">
                <p>To edit or explore the application, make sure to stop it first.</p>
                <a class="button is-dark is-medium" title="Stop Application"
                  href="didact://?commandId=vscode.didact.sendNamedTerminalCtrlC&text=anomaly">Stop Application</a>
                <p class="afterbutton">Explore and update the code as per your requirement.</p>
                <a class="button is-dark is-medium" title="Explore the Code"
                  href="didact://?commandId=extension.openFile&text=AnomalyDetection%7Cexplore-code%7C${CHE_PROJECTS_ROOT}/anomaly/src/App.js">Explore
                  Code</a>
                <p class="afterbutton ">Re-launch the application to view the changes made.</p>
                <a class="button is-dark is-medium" title="Re-Launch the Application"
                  href="didact://?commandId=extension.sendToTerminal&text=AnomalyDetection%7Cre-launch%7Canomaly|cd%20${CHE_PROJECTS_ROOT}/anomaly%20%26%26%20npm%20install%20--only=dev%20%26%26%20rm%20-rf%20build%20%26%26%20npm%20run%20build%20%26%26%20npm%20run%20server">Re-Launch
                  Application</a>
              </div>
              <div class="image-div">
                <p class="image-content">Want to explore this project more?
                  <span style="font-size:15px;margin-top:0px;display:block;">Head over to the <a
                      href="https://github.com/IBM/Developer-Playground/tree/anomaly" target="_blank">Github
                      Repository</a></span>
                  <span style="font-size:15px;margin-top:0px;display:block;">For further assistance reach out to <a
                      href="https://github.com/IBM/Technology-Sandbox-Support/issues/new/choose" target="_blank"> Help &
                      Support</a></span>
                  <span style="font-size:15px;margin-top:0px;display:block;">Check out our <a
                      href="https://ibm.github.io/Technology-Sandbox-Support/" target="_blank">FAQs</a></span>
                </p>
                <div class="image-btn">
                  <a class="image-link"
                    href="didact://?commandId=extension.openURL&text=anomaly%7Cview-product-details%7Chttps://www.ibm.com/products"
                    target="_blank">
                    View Product Details
                    <span>
                      <svg style="position: absolute; right: 10px;" fill="#ffffff" focusable="false"
                        preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/  svg" width="25" height="25"
                        viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M18 6L16.6 7.4 24.1 15 3 15 3 17 24.1 17 16.6 24.6 18 26 28 16z"></path>
                        <title>Arrow right</title>
                      </svg>
                    </span>
                  </a>
                  <a class="image-link"
                    href="didact://?commandId=extension.openURL&text=anomaly%7Cget-trial-subscription%7Chttps://www.ibm.com/account/reg/us-en/signup?formid=urx-51009"
                    target="_blank">
                    Get Trial Subcription
                    <span>
                      <svg style="position: absolute; right: 10px;" fill="#ffffff" focusable="false"
                        preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/  svg" width="25" height="25"
                        viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M18 6L16.6 7.4 24.1 15 3 15 3 17 24.1 17 16.6 24.6 18 26 28 16z"></path>
                        <title>Arrow right</title>
                      </svg>
                    </span>
                  </a>
                  <a class="image-link no-hover"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br><br>
</body>
</html>