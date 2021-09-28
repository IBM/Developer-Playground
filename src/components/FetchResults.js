import { TextInput, Button, Form, Loading, ButtonSet } from 'carbon-components-react';
import axios from 'axios';
import { useState } from "react"
import "../App.css"

const FetchResults = ({ jobId, getChartResults }) => {
  const [loading, setLoading] = useState(false)
  const [invalid, setInvalid] = useState({ state: false, text: "" })
  const [showButton, setButton] = useState(false)
  const [currentJobId, setJobId] = useState("")
  
  const getResults = async (e) => {
    e.preventDefault();
    if (e.target.job_text.value.trim() === "") {
      setInvalid({
        state: true,
        text: "Please enter a Job ID"
      })
    } else {
      setLoading(true)
      let res = await axios.get(`/result?jobid=${e.target.job_text.value}`)
      setButton(true)
      setJobId(e.target.job_text.value)
      getChartResults(res.data)
      setLoading(false)
    }
  }

  const download = (e) => {
    e.preventDefault();
    window.open(`/download?jobid=${currentJobId}`)
  }
  return (<Form className="fetch-results"onSubmit={getResults}>
    <h3>Fetch Processed Results </h3>
    <br />
    <br />
    <TextInput
      name="job_text"
      size="lg"
      labelText={"Fetch Results"}
      helperText={"Save this Job ID for futher use"}
      placeholder={"Job ID"}
      invalid={invalid.state}
      invalidText={invalid.text}
      defaultValue={jobId}
      onChange={() => {setInvalid({ state: false, text: "" });setButton(false)}}
    />
    <br />
    <ButtonSet >
    <Button
      kind="tertiary"
      type="submit"
    >
      Fetch Results
    </Button>
    {showButton ? 
    <Button type="submit" style={{marginLeft: "14px"}} onClick={download}> Download Results </Button>:null}
    </ButtonSet>
    <Loading active={loading} overlay={true} />
  </Form>)
}

export default FetchResults