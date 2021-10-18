import React, { useState} from 'react';
import raw from 'raw.macro';
import { Button,TextInput, Form, Loading, ToastNotification } from 'carbon-components-react';

const adminauthtoken = raw('../auth/adminauth.txt');

function Aoc1() {
  const [wname, setwname] = useState('');
  const [wdesc, setwdesc] = useState('');
  const [isLoading,setLoading] = useState(false);
  const [notifystatus, setnotifystatus] = useState(false);
  const [err1status, seterr1status] = useState(false);  
  const [err2status, seterr2status] = useState(false);
  const [err3status, seterr3status] = useState(false);
  const [err4status, seterr4status] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if ((wname) && (wname.trim() !== "")) {

        const wcreate = async() => {

        try{

           if(process.env.REACT_APP_mode === "dev"){
              let headers = {
                  'accept': 'application/json',
                  'Authorization': adminauthtoken
                  }

              let response = await fetch(`https://api.ibmaspera.com/api/v1/admin/nodes`,{ headers})
              let result = await response.json();

              var def_wksp_node = result[0]["id"];

              var reqbody = { "name": wname, "description": wdesc, "node_id": def_wksp_node }

              headers = 
                {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'Authorization': adminauthtoken
                  }

              response = await fetch('https://api.ibmaspera.com/api/v1/admin/workspaces', { method: "POST", body: JSON.stringify(reqbody), json: true, headers})
              result = await response.json();
              let resp = await response;
              
              if((resp.status === 204) || (resp.status === 202) ){
                setnotifystatus(true);
                setLoading(false);
              }
              else if(resp.status === 401){
                seterr1status(true);
                setLoading(false);
              }

              else{
                seterr3status(true);
                setLoading(false);
              }          
        }
      else{

        let resp1 = await fetch('/addworkspace?wname=' + wname + '&wdesc=' + wdesc);
        let res1 = await resp1.json();
        if(res1["result"] === "success"){
           setnotifystatus(true);
           setLoading(false);
        }
        else{
           seterr3status(true);
           setLoading(false);
        }
      
      }
    }
        catch(error){
            seterr2status(true);
            setLoading(false);
        }

        }
        wcreate();

      setwname('');
      setwdesc('');
    } 
    
    else {
      seterr4status(true);
      setLoading(false);
    }
  };

  function notifystatusf() {
    setnotifystatus(false);
  }
  function err1closef() {
    seterr1status(false);
  }
  function err2closef() {
    seterr2status(false);
  }
  function err3closef() {
    seterr3status(false);
  }
  function err4closef() {
    seterr4status(false);
  }
  return (
    <>
    <Form onSubmit={handleSubmit}>
      <TextInput type = "text" id={'wname'} labelText = {'Workspace Name*'} placeholder = {'Workspace Name'} size = 'lg' value={wname} onChange={(e)=> setwname(e.target.value)} />
      <br/>
      <br/>
      <TextInput type = "text" id={'wdesc'} labelText = {'Workspace Description'} placeholder = {'Workspace Description'} size = 'lg' value={wdesc} onChange={(e)=> setwdesc(e.target.value)} />

      <div className="ButtonArea">
        <Button type="submit" > Create Workspace </Button>
      </div>
      
    </Form>

      <Loading active = {isLoading} description="Active loading indicator" withOverlay={true}/>

      {notifystatus && 
        <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Workspace created successfully</span>}
        timeout={4000}
        onClose = {notifystatusf}
        kind = 'success'
        title="Success Notification"
        />
      }

       {err1status && 
      <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Unauthorised credentials. Restart to refresh your tokens</span>}
        timeout={3000}
        onClose = {err1closef}
        title="Error Notification"
      />
      }

      {err2status && 
      <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Server cannot be reached</span>}
        timeout={3000}
        onClose = {err2closef}
        title="Error Notification"
      />
      }
      
      {err3status && 
      <ToastNotification
          iconDescription="Close notification"
          subtitle={<span>Workspace creation failed</span>}
          timeout={3000}
          onClose = {err3closef}
          title="Error Notification"
        />
      }
      
      {err4status && 
      <ToastNotification
          iconDescription="Close notification"
          subtitle={<span>Invalid input. Specify workspace name</span>}
          timeout={3000}
          onClose = {err4closef}
          title="Error Notification"
        />
      }


    <br/>
    <br/>
    </>
  );
};

export default Aoc1;