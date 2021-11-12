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
  ReconstructAD: ['Covariance', 'GMM_L0', 'GMM_L1', 'MachineTranslation'],
  RelationshipAD: ['IDD_AutoEncoder', 'Seq2seq_AutoEncoder', 'CNNAutoEncoder', 'GAN']
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

  const resetStates = () => {
    setTargetInvalid({ state: false, text: "" })
    setLWInvalid({ state: false, text: "" })
    setOWInvalid({ state: false, text: "" })
    setLTInvalid({ state: false, text: "" })
    setTimeColumnOptions([])
    setChart(false)
    setTimeColumn(false)
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
    setTime(selectedItem)
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
    try{
    if(document.getElementById("submit-btn").name !== "btn-clicked")
      return
    document.getElementById("submit-btn").setAttribute("name","btn")
    } catch{
      return
    }
    let formData = {}
    formData.dataset_type = e.target.dataset_type.value
    if(formData.dataset_type === "sampledt")
      formData.filename = document.getElementById("sample_data").innerText
    if (columns.length === 1) {
      formData.target_column = columns[0].name
    } else {
      formData.target_column = targetParams
    }
    formData.prediction_type = document.getElementById("prediction_type").innerText.toLowerCase()
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
    setTimeout(() => {
      if (selectedItem !== `DeepAD` && selectedItem !== `PredAD`) {
        setAnomalyEstimator(anaomalyEstimator[selectedItem])
        setAnomalyEstimatorOptions(true)
      } else {
        setAnomalyEstimatorOptions(false)
      }
    }, 1)
  }

  const getChartResults = (data) => {
    setData([])
    setData(data)
    setChart(false)
    setChart(true)
    setForm(false)
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
        />: null}
        {showTimeColumn ? <div>
          <p className="others">Time Column</p>
          <Dropdown
            id="time_column"
            titleText="Select Value"
            label="Choose an Option"
            items={timeColumnOptions}
            onChange={setTargetParameters} /> </div> : null}
        {showChart ?
          //<Chart data={data} lines={lines} showAnomaly={showAnomaly} time={time} />
          <CarbonChart data={data} />
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
                onChange={({ selectedItems }) => {
                  setTargetParams(selectedItems)
                  setTargetInvalid({ state: false, text: "" })
                }}
                invalid={targetInvalid.state}
                invalidText={targetInvalid.text}
              /> </div> : null}
            {/*<p className="others">Recent Data</p>
            <TextInput name="recent_data" type="number" labelText="Add Value" helperText="Add numbers (30% of data-size)" defaultValue="1" />*/}
            <p className="others">Prediction Type</p>
            <Dropdown
              id="prediction_type"
              titleText="Select Value"
              label="Choose an Option"
              initialSelectedItem="Entire"
              items={["Entire", "Recent"]} />
            <p className="others">Algorithm Type</p>
            <Dropdown
              id="algorithm_type"
              titleText="Select Value"
              label="Select Options"
              items={['DeepAD', 'WindowAD', 'PredAD', 'ReconstructAD', 'RelationshipAD']}
              initialSelectedItem="DeepAD"
              onChange={changeAnomalyEstimatorOptions} />
            {showAnomalyEstimatorOptions ?
              <div className="hidden-options">
                <Dropdown
                  id="anomaly_estimator"
                  titleText="Select Value"
                  label="Select Options"
                  initialSelectedItem={anomalyEstimatorOptions[0]}
                  items={anomalyEstimatorOptions}
                /></div>
              : null}
            <p className="others">Loopback Window</p>
            <Dropdown
              id="lookback_window"
              titleText="Select Value"
              items={['Auto', 'Custom']}
              initialSelectedItem="Auto"
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
              defaultValue="10"
              invalid={OWInvalid.state}
              invalidText={OWInvalid.text}
              onChange={() => setOWInvalid({ state: false, text: "" })} />
            <p className="others">Labeling Method</p>
            <Dropdown
              id="labeling_method"
              titleText="Select Value"
              label="Select Options"
              items={['Chi-Square', 'IID', 'Q-Score', 'Sliding-Window', 'Adaptive-Sliding-Window', 'Contextual-Anomaly']}
              initialSelectedItem="IID"
            />
            <p className="others">Labelling Threshold</p>
            <TextInput
              name="labeling_threshold"
              id="labeling_threshold"
              type="number" labelText="Add Value"
              helperText="Add numbers"
              defaultValue="10"
              invalid={LTInvalid.state}
              invalidText={LTInvalid.text}
              onChange={() => setLTInvalid({ state: false, text: "" })} />
            <div className="hidden-options">
              <Button id="submit-btn" name="btn" onClick={e=>document.getElementById("submit-btn").setAttribute("name","btn-clicked")} type="submit">Submit</Button>
            </div>
          </FormGroup> : null}
      </form>
      <br />
      {showJob ? <JobStatus jobId={jobId} msg={"submitted"} /> : null}
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
