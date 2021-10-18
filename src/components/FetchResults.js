import { TextInput, Button, Form, Loading, ButtonSet, ToastNotification } from 'carbon-components-react';
import axios from 'axios';
import { useState } from "react"
import "../App.css"

const FetchResults = ({ jobId, getChartResults }) => {
  const [loading, setLoading] = useState(false)
  const [invalid, setInvalid] = useState({ state: false, text: "" })
  const [showButton, setButton] = useState(false)
  const [currentJobId, setJobId] = useState("")
  const [showNotif, setNotification] = useState(false)
  const [notifData, setNotifData] = useState({
    kind: "",
    subtitle: "",
    title: ""

  })

  const getResults = async (e) => {
    e.preventDefault();
    if (e.target.job_text.value.trim() === "") {
      setInvalid({
        state: true,
        text: "Please enter a Job ID"
      })
    } else {
      setLoading(true)
      try {
        let res = await axios.get(`/result?jobid=${e.target.job_text.value}`)
        //setButton(true)
        console.log(res.data.length)
        setJobId(e.target.job_text.value)
        if(res.data.length!==0)
          getChartResults(res.data)

      } catch(err){
        let errMsg;
      try{
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
      }finally {
        setLoading(false)
      }
    }
  }

  const download = async(e) => {
    e.preventDefault();
    window.open(`/download?jobid=${currentJobId}`,)
  }
  return (<Form className="fetch-results" onSubmit={getResults}>
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
      onChange={() => { setInvalid({ state: false, text: "" }); setButton(false) }}
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
        <Button type="submit" style={{ marginLeft: "14px" }} onClick={download}> Download Results </Button> : null}
    </ButtonSet>
    <Loading active={loading} overlay={true} />
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
  </Form>)
}

export default FetchResults