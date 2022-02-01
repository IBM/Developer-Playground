import { MultiSelect, RadioButton, RadioButtonGroup, FormGroup, Dropdown, TextInput, Button, Loading, ToastNotification } from 'carbon-components-react';
import { Header, HeaderName } from "carbon-components-react/lib/components/UIShell";
import { useState } from 'react'
import axios from 'axios'
import './App.css'
import FileUpload from './components/FileUpload';
import JobStatus from './components/JobStatus'
import FetchResults from './components/FetchResults';
import CarbonChart from './components/CarbonChart'



const anaomalyEstimator = {
  WindowAD: ['IsolationForest', 'NearestNeighbor', 'SyntheticRandomForestTrainer', 'MinCovDet', 'AnomalyEnsembler'],
  ReconstructAD: ['DNN_AutoEncoder', 'Seq2seq_AutoEncoder', 'CNN_AutoEncoder', 'DNN_VariationalAutoEncoder'],
  RelationshipAD: ['Covariance', 'GMM_L0', 'GMM_L1', 'MachineTranslation']
}

function App() {
  const [data, setData] = useState([])
  const [showChart, setChart] = useState(false)
  const [showFileUploader, setFileUploader] = useState(false)
  const [columns, setColumns] = useState([])
  const [showForm, setForm] = useState(false)
  const [showTarget, setTarget] = useState(false)
  const [showAnomalyEstimatorOptions, setAnomalyEstimatorOptions] = useState(false)
  const [showTextField, setTextField] = useState(false)
  const [targetParams, setTargetParams] = useState([])
  const [loading, setLoading] = useState(false)
  const [timeColumnOptions, setTimeColumnOptions] = useState([])
  const [showTimeColumn, setTimeColumn] = useState(false)
  const [time, setTime] = useState("")
  const [anomalyEstimatorOptions, setAnomalyEstimator] = useState([])
  const [jobId, setJobId] = useState("")
  const [targetInvalid, setTargetInvalid] = useState({ state: false, text: "" })
  const [LWInvalid, setLWInvalid] = useState({ state: false, text: "" })
  const [OWInvalid, setOWInvalid] = useState({ state: false, text: "" })
  const [LTInvalid, setLTInvalid] = useState({ state: false, text: "" })
  const [PTInvalid, setPTInvalid] = useState({ state: false, text: "" })
  const [showJob, setShowJob] = useState(false)
  const [showNotif, setNotification] = useState(false)
  const [notifData, setNotifData] = useState({
    kind: "",
    subtitle: "",
    title: ""
  })
  const [showSample, setSample] = useState(false)
  const [sampledata, setSampledata] = useState([])
  const [datasetName, setDatasetName] = useState("")
  const [settings, setSettings] = useState({})
  const [labelingMethods, setLabelingMethods] = useState(['Chi-Square', 'IID', 'Q-Score', 'Sliding-Window', 'Adaptive-Sliding-Window', 'Contextual-Anomaly'])
  const [showRecentData, setRecentData] = useState(false)
  const [anomalyEstimatorValue, setAnomalyEstimatorValue] = useState("IID")
  const [showLabelingMethods, setLabelingMethodsOptions] = useState(true)

  const resetStates = () => {
    setSettings({})
    setTargetInvalid({ state: false, text: "" })
    setLWInvalid({ state: false, text: "" })
    setOWInvalid({ state: false, text: "" })
    setLTInvalid({ state: false, text: "" })
    setTimeColumnOptions([])
    setChart(false)
    setTimeColumn(false)
    setAnomalyEstimatorOptions(false)
    setTextField(false)
  }

  const sendDataToParent = async (res) => {
    resetStates()
    let result = true
    try {
      setLoading(true)
      //setData(res.data)
      setDatasetName("customfile.json")
      setTimeColumnOptions(res.data)
      setTimeColumn(true)
      setForm(false)
      result = true
    } catch (err) {
      console.log(err)
      let errMsg;
      try {
        errMsg = err.response.data.msg
      } catch {
        errMsg = "Something went wrong"
      }
      setNotifData({
        kind: "error",
        subtitle: errMsg,
        title: "Error"
      })
      setNotification(true)
      result = false
    } finally {
      setLoading(false)
    }
    return result
  }


  const getSample = async (e) => {
    resetStates()
    try {
      setLoading(true)
      let res = await axios.get('/availabledatasets')
      console.log(res)
      setSample(true)
      setSampledata(res.data)
      setForm(false)
      setFileUploader(false)
    } catch (err) {
      let errMsg;
      try {
        errMsg = err.response.data.msg
      } catch {
        errMsg = "Something went wrong"
      }
      setNotifData({
        kind: "error",
        subtitle: errMsg,
        title: "Error"
      })
      setNotification(true)
    } finally {
      setLoading(false)
    }
  }

  const showDragDrop = () => {
    setFileUploader(true)
    setChart(false)
    setForm(false)
    setSample(false)
    setTimeColumn(false)
  }

  const showTextInput = ({ selectedItem }) => {
    if (selectedItem === "Custom")
      setTextField(true)
    else
      setTextField(false)

  }

  const setTargetParameters = async ({ selectedItem }) => {
    try {
      setTarget(false)
      const index = timeColumnOptions.indexOf(selectedItem)
      let columns = []
      timeColumnOptions.forEach((column, idx) => {
        if (idx !== index) {
          columns.push({
            name: column
          })
        }
      })
      setLoading(true)
      setColumns(columns)
      let res = await axios.get(`/data/${datasetName}/${selectedItem}`)
      setData(res.data)
      setChart(true)
      //setLines(lines)
      setForm(true)
      if (timeColumnOptions.length === 2) {
        setTarget(false)
      } else {
        setTarget(true)
      }
      setTime(selectedItem)``
    } catch (err) {
      let errMsg;
      try {
        errMsg = err.response.data.msg
      } catch {
        errMsg = "Something went wrong"
      }
      setNotifData({
        kind: "error",
        subtitle: errMsg,
        title: "Error"
      })
      setNotification(true)
    } finally {
      setLoading(false)
    }

  }


  const uploadData = async (e) => {
    e.preventDefault()
    try {
      if (document.getElementById("submit-btn").name !== "btn-clicked")
        return
      document.getElementById("submit-btn").setAttribute("name", "btn")
    } catch {
      return
    }
    let formData = {}
    formData.dataset_type = e.target.dataset_type.value
    if (formData.dataset_type === "sampledt")
      formData.filename = document.getElementById("sample_data").innerText
    if (columns.length === 1) {
      formData.target_column = columns[0].name
    } else {
      formData.target_column = targetParams
    }
    formData.prediction_type = document.getElementById("prediction_type").innerText.toLowerCase()
    if(formData.prediction_type === "recent")
        formData.recent_data = parseInt(e.target.recent_data.value)
    formData.algorithm_type = document.getElementById("algorithm_type").innerText
    console.log(formData.algorithm_type === "DeepAD")
    if (formData.algorithm_type !== "DeepAD" && formData.algorithm_type !== "PredAD")
      formData.anomaly_estimator = document.getElementById("anomaly_estimator").innerText
    else
      formData.anomaly_estimator = 'Default'
    formData.lookback_window = document.getElementById("lookback_window").innerText.toLowerCase()
    if (formData.lookback_window === 'custom')
      formData.lookback_window = parseInt(e.target.lookback_window_custom_value.value)
    formData.observation_window = parseInt(e.target.observation_window.value)
    formData.labeling_method = document.getElementById("labeling_method").innerText
    formData.labeling_threshold = parseInt(e.target.labeling_threshold.value)
    formData.time_column = time
    //formData.recent_data = parseInt(e.target.recent_data.value)
    console.log(formData)

    let valid = true
    if (typeof (formData.target_column) === "object" && formData.target_column.length === 0) {
      setTargetInvalid({ state: true, text: "Please select some options" })
      document.getElementById("target_columns").scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      valid = false
    }
    if (formData.lookback_window !== 'auto' && (isNaN(formData.lookback_window) || formData.lookback_window > 50 || formData.lookback_window < 1 || !Number.isInteger(formData.lookback_window))) {
      setLWInvalid({ state: true, text: "Please enter an integer between 1 and 50" })
      document.getElementById("lookback_window_custom_value").scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      valid = false
    }
    if (isNaN(formData.observation_window) || formData.observation_window < 1 || !Number.isInteger(formData.observation_window)) {
      setOWInvalid({ state: true, text: "Please enter an integer > 0" })
      document.getElementById("observation_window").scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      valid = false
    }
    if (isNaN(formData.labeling_threshold) || formData.labeling_threshold < 1 || !Number.isInteger(formData.labeling_threshold)) {
      setLTInvalid({ state: true, text: "Please enter an integer > 0" })
      document.getElementById("labeling_threshold").scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      valid = false
    }
    if (formData.prediction_type !== 'entire' && (isNaN(formData.recent_data) || formData.recent_data < 1 || !Number.isInteger(formData.recent_data))) {
      setPTInvalid({ state: true, text: "Please enter an integer > 0" })
      document.getElementById("recent_data").scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      valid = false
    }
    console.log(valid)
    if (valid) {
      try {
        setLoading(true)
        let res = await axios.post('/detect', JSON.stringify(formData), {
          "headers": {
            "content-type": "application/json",
          }
        })
        setJobId(res.data.jobId)
        setShowJob(true)
        document.getElementById("job-status").scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      } catch (err) {
        let errMsg;
        try {
          errMsg = err.response.data.msg
        } catch {
          errMsg = "Something went wrong"
        }
        setNotifData({
          kind: "error",
          subtitle: errMsg,
          title: "Error"
        })
        setNotification(true)
      } finally {
        setLoading(false)
      }
    }
  }

  const changeAnomalyEstimatorOptions = ({ selectedItem }) => {
    setAnomalyEstimatorOptions(false)
    setAnomalyEstimatorValue(selectedItem)
    setLoading(true)
    setTimeout(() => {
      if (selectedItem !== `DeepAD` && selectedItem !== `PredAD`) {
        setAnomalyEstimator(anaomalyEstimator[selectedItem])
        setAnomalyEstimatorOptions(true)
      } else {
        setAnomalyEstimatorOptions(false)
      }
      if (selectedItem === 'RelationshipAD'){
        setLabelingMethodsOptions(false)
        setLabelingMethods(['IID'])
      }
      else
        setLabelingMethods(['Chi-Square', 'IID', 'Q-Score', 'Sliding-Window', 'Adaptive-Sliding-Window', 'Contextual-Anomaly'])
      setLabelingMethodsOptions(true)
      setLoading(false)
    }, 1)
  }

  const getChartResults = (data) => {
    setData([])
    setData(data)
    setChart(false)
    setChart(true)
    document.getElementById("chart").scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  }

  const getTimeColumns = async (e) => {
    try {
      getSample()
      setLoading(true)
      setDatasetName(e.selectedItem)
      let res = await axios.get(`/columns/${e.selectedItem}`)
      setChart(false)
      setTimeColumn(true)
      setTimeColumnOptions(res.data)
      setForm(false)
      setFileUploader(false)
    } catch (err) {
      let errMsg;
      try {
        errMsg = err.response.data.msg
      } catch {
        errMsg = "Something went wrong"
      }
      setNotifData({
        kind: "error",
        subtitle: errMsg,
        title: "Error"
      })
      setNotification(true)
    } finally {
      setLoading(false)
    }
  }

  const applySettings = async (e) => {
    try {
      setLoading(true)
      setChart(false)
      setForm(false)
      setTimeColumn(false)
      setTarget(false)
      setLabelingMethodsOptions(false)
      let settings = await axios.get(`/settings/${datasetName}`)
      console.log(settings)
      await setTargetParameters({ selectedItem: settings.data.time_column })
      setSettings(settings.data)
      setTargetParams(settings.data.target_columns)
      setTargetInvalid({ state: false, text: "" })
      await changeAnomalyEstimatorOptions({ selectedItem: settings.data.algorithm_type })
      setAnomalyEstimatorValue(settings.data.algorithm_type)
      showTextInput({ selectedItem: settings.data.lookback_window })
      setLabelingMethodsOptions(true)
      setTarget(true)
      setTimeColumn(true)
      setChart(true)
      setForm(true)
    } catch (err) {
      let errMsg;
      try {
        errMsg = err.response.data.msg
      } catch {
        errMsg = "Something went wrong"
      }
      setNotifData({
        kind: "error",
        subtitle: errMsg,
        title: "Error"
      })
      setNotification(true)
    } finally {
      setLoading(false)
      setTimeColumn(true)
    }
  }
  const showRecentDataTextInput = ({ selectedItem }) => {
    if (selectedItem === "Recent")
      setRecentData(true)
    else
      setRecentData(false)

  }
  return (
    <div className="app">
      <Header aria-label="IBM">
        <HeaderName href="#" prefix="">
          <div style={{ whiteSpace: "nowrap" }}>
            Anomaly Detection Sample Application
          </div>
        </HeaderName>
      </Header>
      <br /><br /><br /><br />
      <div className="app-header">
        <h2>Anomaly Detection</h2>
      </div>
      <form id="form-data" onSubmit={uploadData} >
        <div className="app-content">
          <RadioButtonGroup
            legendText="Choose the type of Dataset"
            name="dataset_type"
          >
            <RadioButton
              labelText="Upload your Dataset"
              value="customdt"
              id="customdt"
              onClick={showDragDrop}
            />
            <RadioButton
              labelText="Use Sample Dataset"
              value="sampledt"
              id="sampledt"
              onClick={getSample}
            />
          </RadioButtonGroup></div>
        {showFileUploader ?
          <FileUpload accept=".json, .csv" sendDataToParent={sendDataToParent} />
          : null}
        {showSample ? <Dropdown
          id="sample_data"
          titleText="Select Value"
          label="Choose a Dataset"
          items={sampledata}
          onChange={getTimeColumns}
          onClick={getSample}
        /> : null}
        {showSample && showTimeColumn ? <Button type="submit" style={{ marginTop: "14px" }} onClick={applySettings}>Apply Recommended Settings</Button> : null}
        {showTimeColumn ? <div>
          <p className="others">Time Column</p>
          <Dropdown
            id="time_column"
            titleText="Select Value"
            label="Choose an Option"
            items={timeColumnOptions}
            initialSelectedItem={settings.time_column}
            onChange={({ selectedItem }) => {
              setTargetParameters({"selectedItem": selectedItem})
              setSettings({})
            }} /> </div> : null}
        {showChart ?
          //<Chart data={data} lines={lines} showAnomaly={showAnomaly} time={time} />
          <div id="chart"><CarbonChart data={data} /></div>
          : null}
        {showForm ?
          <FormGroup>
            {showTarget ? <div>
              <p className="target">Target Parameters</p>
              <MultiSelect
                id="target_columns"
                titleText="Select Value"
                label="Select Options"
                items={columns}
                itemToString={(item) => (item ? item.name : '')}
                initialSelectedItems={settings.target_columns}
                onChange={({ selectedItems }) => {
                  setTargetParams(selectedItems)
                  setTargetInvalid({ state: false, text: "" })
                }}
                invalid={targetInvalid.state}
                invalidText={targetInvalid.text}
              /> </div> : null}

            <p className="others">Prediction Type</p>
            <Dropdown
              id="prediction_type"
              titleText="Select Value"
              label="Choose an Option"
              initialSelectedItem={settings.prediction_type || "Entire"}
              items={["Entire", "Recent"]} 
              onChange={showRecentDataTextInput}/>
              {showRecentData ?
              <div id="recent_data" className="hidden-options">
                <p className="others">Recent Data</p>
                <TextInput 
                  id="recent_data"
                  name="recent_data" 
                  type="number" 
                  labelText="Add Value" 
                  helperText="Add numbers (30% of data-size)" 
                  defaultValue="1"
                  invalid={PTInvalid.state}
                  invalidText={PTInvalid.text}
                  onChange={() => setPTInvalid({ state: false, text: "" })}  />
              </div> : null}
            <p className="others">Algorithm Type</p>
            <Dropdown
              id="algorithm_type"
              titleText="Select Value"
              label="Select Options"
              items={showTarget ? ['DeepAD', 'WindowAD', 'PredAD', 'ReconstructAD', 'RelationshipAD'] : ['DeepAD', 'WindowAD', 'PredAD', 'ReconstructAD']}
              initialSelectedItem={settings.algorith_type || "DeepAD"}
              onChange={changeAnomalyEstimatorOptions} />
            {showAnomalyEstimatorOptions ?
              <div className="hidden-options">
                <Dropdown
                  id="anomaly_estimator"
                  titleText="Select Value"
                  label="Select Options"
                  initialSelectedItem={settings.anomaly_estimator || anomalyEstimatorOptions[0] }
                  items={anomalyEstimatorOptions}
                /></div>
              : null}
            <p className="others">Lookback Window</p>
            <Dropdown
              id="lookback_window"
              titleText="Select Value"
              items={['Auto', 'Custom']}
              initialSelectedItem={settings.lookback_window || "Auto"}
              onChange={showTextInput}
            />
            {showTextField ?
              <div className="hidden-options">
                <TextInput
                  name="lookback_window_custom_value"
                  id="lookback_window_custom_value"
                  type="number" labelText="Add Value"
                  helperText="Add numbers (Max.50)"
                  defaultValue="10"
                  invalid={LWInvalid.state}
                  invalidText={LWInvalid.text}
                  onChange={() => setLWInvalid({ state: false, text: "" })} />
              </div> : null}
            <p className="others">Observation Window</p>
            <TextInput
              name="observation_window"
              id="observation_window"
              type="number"
              labelText="Add Value"
              helperText="Add numbers (10% of data-size)"
              defaultValue={settings.observation_window || "10"}
              invalid={OWInvalid.state}
              invalidText={OWInvalid.text}
              onChange={() => setOWInvalid({ state: false, text: "" })} />
              {showLabelingMethods ? <div>
            <p className="others">Labeling Method</p>
            <Dropdown
              id="labeling_method"
              titleText="Select Value"
              label="Select Options"
              items={labelingMethods}
              initialSelectedItem={anomalyEstimatorValue !=="RelationshipAD" ? (settings.labeling_method || "IID") : "IID"}
            /></div> : null }
            <p className="others">Labeling Threshold</p>
            <TextInput
              name="labeling_threshold"
              id="labeling_threshold"
              type="number" labelText="Add Value"
              helperText="Add numbers"
              defaultValue={settings.labeling_threshold || "10"}
              invalid={LTInvalid.state}
              invalidText={LTInvalid.text}
              onChange={() => setLTInvalid({ state: false, text: "" })} />
            <div className="hidden-options">
              <Button id="submit-btn" name="btn" onClick={e => document.getElementById("submit-btn").setAttribute("name", "btn-clicked")} type="submit">Submit</Button>
            </div>
          </FormGroup> : null}
      </form>
      <br />
      {showJob ? <div id="job-status"><JobStatus jobId={jobId} msg={"submitted"} /></div> : null}
      <FetchResults jobId={jobId} getChartResults={getChartResults} />
      {showNotif ?
        <ToastNotification
          kind={notifData.kind}
          iconDescription="Close notification"
          subtitle={<span>{notifData.subtitle}</span>}
          timeout={3000}
          onCloseButtonClick={() => setNotification(false)}
          title={notifData.title}
          caption=""
        /> : null}
      <Loading active={loading} overlay={true} />
    </div>
  );
}

export default App;
