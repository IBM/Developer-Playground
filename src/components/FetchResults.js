import { TextInput, Button, Form, Loading } from 'carbon-components-react';
import axios from 'axios';
import { useState } from "react"

const FetchResults = ({ jobId }) => {
  const [loading, setLoading] = useState(false)
  const [invalid, setInvalid] = useState({ state: false, text: "" })
  const getResults = async (e) => {
    e.preventDefault();
    if (e.target.job_text.value.trim() === "") {
      setInvalid({
        state: true,
        text: "Please enter a Job ID"
      })
    } else {
      setLoading(true)
      //let res = await axios.get(`/result?jobid=${e.target.job_text.value}`)
      window.open(`http://localhost:4000/result?jobid=${e.target.job_text.value}`)
      setLoading(false)
    }
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
      onChange={() => setInvalid({ state: false, text: "" })}
    />
    <br />
    <Button
      kind="tertiary"
      type="submit"
    >
      Fetch Results
    </Button>
    <Loading active={loading} overlay={true} />
  </Form>)
}

export default FetchResults