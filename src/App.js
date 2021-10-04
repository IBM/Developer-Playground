import { MultiSelect, RadioButton, RadioButtonGroup, FormGroup, Dropdown, TextInput, Button, Loading} from 'carbon-components-react';
import Chart from './components/Chart'
import { Header, HeaderName } from "carbon-components-react/lib/components/UIShell";
import { useState } from 'react'
import axios from 'axios'
import './App.css'
import FileUpload from './components/FileUpload';
import FetchResults from './components/FetchResults';



const anaomalyEstimator = {
  WindowAD: ['IsolationForest', 'NearestNeighbor', 'SyntheticRandomForestTrainer', 'MinCovDet', 'AnomalyEnsembler'],
  ReconstructAD: ['Covariance', 'GMM_L0', 'GMM_L1', 'MachineTranslation'],
  RelationshipAD: ['IDD_AutoEncoder', 'Seq2seq_AutoEncoder', 'CNNAutoEncoder', 'GAN']
}

function App() {
  const [data, setData] = useState([])
  const [lines, setLines] = useState([])
  const [showAnomaly, setAnomaly] = useState(false)
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


  const resetStates = () => {
    setTargetInvalid({state: false, text: "" })
    setLWInvalid({state: false, text: "" })
    setOWInvalid({ state:false, text: "" })
    setLTInvalid({state: false, text: "" })
    setTimeColumnOptions([])
    setChart(false)
    setTimeColumn(false)
    setLines([])
  }

  const sendDataToParent = async (data) => {
    resetStates()
    data.append('name',Math.random().toString(36).substring(2,13))
    console.log(data.entries())
    const res = await axios.post("/upload", data, {})
    setData(res.data)
    setTimeColumn(true)
    setTimeColumnOptions(Object.keys(res.data[0]))
    setForm(false)
  }

  const getSample = async (e) => {
    resetStates()
    let res = await axios.get('/sampledata')
    setData(res.data)
    setChart(true)
    setTimeColumn(false)
    let lines = Object.keys(res.data[0]).slice(1)
    let lineData = []
    lines.forEach(line => {
      lineData.push({
        line,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
      })
    })
    setLines(lineData)
    setFileUploader(false)
    let columnNames = Object.keys(res.data[0]).slice(1)
    console.log(columnNames, Object.keys(res.data[0]))
    let columns = []
    columnNames.forEach(column => {
      columns.push({
        name: column
      })
    })
    setColumns(columns)
    setForm(true)
    if (columns.length === 1) {
      setTarget(false)
    } else {
      setTarget(true)
    }
    setAnomaly(false)
  }

  const showDragDrop = () => {
    setFileUploader(true)
    setChart(false)
    setForm(false)
    //setTargetParams([])
    //setTimeColumnOptions([])
  }

  const showTextInput = ({ selectedItem }) => {
    if (selectedItem === "Custom")
      setTextField(true)
    else
      setTextField(false)

  }

  const setTargetParameters = ({ selectedItem }) => {
    const index = timeColumnOptions.indexOf(selectedItem)
    let columns = []
    let lines = []
    timeColumnOptions.forEach((column, idx) => {
      if (idx !== index) {
        columns.push({
          name: column
        })
        let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
        while (color === "#ffffff")
          color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
        lines.push({
          line: column,
          color
        })
      }
    })
    setColumns(columns)
    setChart(true)
    setLines(lines)
    setForm(true)
    if (timeColumnOptions.length === 2) {
      setTarget(false)
    } else {
      setTarget(true)
    }
    setAnomaly(false)
    setTime(selectedItem)
  }

  const uploadData = async (e) => {
    e.preventDefault()
    console.log(e)
    let formData = {}
    formData.dataset_type = e.target.dataset_type.value
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
    if (typeof(formData.target_column) ===Array && formData.target_column.length === 0) {
      setTargetInvalid({ state: true, text: "Please select some options" })
      valid = false
    }
    if (formData.lookback_window !== 'auto' && (isNaN(formData.lookback_window) || formData.lookback_window > 50 || formData.lookback_window < 1 || !Number.isInteger(formData.lookback_window))) {
      setLWInvalid({ state: true, text: "Please enter an integer between 1 and 50" })
      valid = false
    }
    if(isNaN(formData.observation_window) || formData.observation_window < 1 || !Number.isInteger(formData.observation_window)){
      setOWInvalid({ state: true, text: "Please enter an integer > 0" })
      valid = false
    }
    if(isNaN(formData.labeling_threshold) || formData.labeling_threshold < 1 || !Number.isInteger(formData.labeling_threshold)){
      setLTInvalid({ state: true, text: "Please enter an integer > 0" })
      valid = false
    }
    console.log(valid)
    if (valid) {
      setLoading(true)
      let res = await axios.post('/detect', JSON.stringify(formData), {
        "headers": {
          "content-type": "application/json",
        }
      })
      setLoading(false)
      setJobId(res.data)
      /*setData(res.data)
      setLines([...lines, {
        line: "anomaly_score",
        color: "#000000"
      }])
      setAnomaly(true)*/
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
    setData(data)
    let lines = Object.keys(data[0]).slice(1)
    let lineData = []
    lines.forEach(line => {
      if(line !== "anomaly")
        lineData.push({
          line,
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
        })
    })
    setLines(lineData)
    setAnomaly(true)
    setChart(true)
    setForm(false)
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

        {showTimeColumn ? <div>
          <p className="others">Time Column</p>
          <Dropdown
            id="time_column"
            titleText="Select Value"
            label="Choose an Option"
            items={timeColumnOptions}
            onChange={setTargetParameters} /> </div> : null}
        {showChart ?
          <Chart data={data} lines={lines} showAnomaly={showAnomaly} time={time} />
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
              items={["Enitre", "Recent"]} />
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
              type="number" labelText="Add Value"
              helperText="Add numbers"
              defaultValue="10"
              invalid={LTInvalid.state}
              invalidText={LTInvalid.text}
              onChange={() => setLTInvalid({ state: false, text: "" })} />
            <div className="hidden-options">
              <Button type="submit">Submit</Button>
              <Loading active={loading} overlay={true} />
            </div>
          </FormGroup> : null}
      </form>
      <br />
      <FetchResults jobId={jobId} getChartResults = {getChartResults}/>
    </div>
  );
}

export default App;
