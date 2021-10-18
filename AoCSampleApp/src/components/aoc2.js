import React, { useState} from 'react';
import raw from 'raw.macro';
import { Button,TextInput, Form, Loading, Select, SelectItem, ToastNotification } from 'carbon-components-react';

const adminauthtoken = raw('../auth/adminauth.txt');

function Aoc2() {
  const [email, setemail] = useState('');
  const [user, setuser] = useState('');
  const [workspace, setworkspace] = useState('');
  const [erremstate, seterremstate] = useState(false); 
  const [erremtext, seterremtext] = useState('A valid email is required');
  const [buttonstate, setbuttonstate] = useState(false);

  const [wobj, setWobj] = useState([]);
  const [userobj, setUserobj] = useState([]);
  const [isLoading,setLoading] = useState(false);

  const [notifystatus, setnotifystatus] = useState(false);
  const [notifystatus2, setnotify2status] = useState(false);
  const [notifystatus3, setnotify3status] = useState(false);
  const [err1status, seterr1status] = useState(false);  
  const [err2status, seterr2status] = useState(false);
  const [err3status, seterr3status] = useState(false);
  const [err4status, seterr4status] = useState(false);
  const [err5status, seterr5status] = useState(false);
  const [err6status, seterr6status] = useState(false);
  const [err7status, seterr7status] = useState(false);
  const [err8status, seterr8status] = useState(false);

  const userperms = [
    {
      id: true,
      value: 'Member',
    },
    {
      id: false,
      value: 'Workspace Manager',
    }
  ];

  const [userperm, setuserperm] = useState(userperms[0].id);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (email) {

        const usercreate = async() => {

        try{

           if(process.env.REACT_APP_mode === "dev"){

            let headers = {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': adminauthtoken,
        };

            var reqbody = { "email": email, "auth_provider_id": null };

            let response = await fetch(`https://api.ibmaspera.com/api/v1/admin/users`,{ method: "POST", body: JSON.stringify(reqbody), json: true, headers})
            let resp = await response;

          if(resp.status === 201){
              setnotifystatus(true);
              setLoading(false);
            }
             else if(resp.status === 401){
              seterr1status(true);
              setLoading(false);
            }
          else{
            seterr4status(true);
            setLoading(false);
          }
          
        }
      else{

          let response = await fetch('/adduser?useremail=' + email)
          let result = await response.json();
           if (result["result"] === "success") {
              setnotifystatus(true);
              setLoading(false);
           }
           else{
              seterr4status(true);
              setLoading(false);
           }
      }
      }
        catch(error){
            seterr2status(true);
            setLoading(false);
        }

        }
        usercreate();

      setemail('');
    } 
    
    else {
      seterr3status(true);
      setLoading(false);
    }
  };

  const handleSubmit1 = () => {

        setLoading(true);

        const listworkspace = async() => {

        try{

           if(process.env.REACT_APP_mode === "dev"){

            let headers = {
              'accept': 'application/json',
              'Authorization': adminauthtoken,
            };

            let response = await fetch(`https://api.ibmaspera.com/api/v1/admin/workspaces`, {headers})
            let result = await response.json();
            let resp = await response;

             if(resp.status === 200){
              
              let wk_arr = [{id:"",value:"Choose Workspace"}];

              for (var i = 0; i < result.length; i++) {
                let list_wksp = {};
                list_wksp["id"] = result[i]["id"];
                list_wksp["value"] = result[i]["name"]
                wk_arr.push(list_wksp)
              }

              setWobj(wk_arr);
              setLoading(false);
            }
             else if(resp.status === 401){
              seterr1status(true);
              setLoading(false);
            }

            else{
              seterr5status(true);
              setLoading(false);
            }
          
        
      }
      else{
          let response = await fetch("/getworkspace");
          let result = await response.json();
          
          if(result["result"] === "failure"){
            seterr5status(true);
            setLoading(false);
          }

          else{
            setWobj(result["result"]);
            setLoading(false);
          }
      }
    }
        catch(error){
            seterr2status(true);
            setLoading(false);
        }

        }
        listworkspace();
  };

  const handleSubmit2 = () => {

        setLoading(true);

        const listusers = async() => {

        try{

           if(process.env.REACT_APP_mode === "dev"){
            let headers = {
          'accept': 'application/json',
          'Authorization': adminauthtoken,
          };

            let response = await fetch(`https://api.ibmaspera.com/api/v1/admin/users`, {headers})
            let result = await response.json();
            let resp = await response;

             if(resp.status === 200){

            let user_arr = [{id:"",value:"Choose User"}];
            for (var i = 0; i < result.length; i++) {
              let user_idemail = {};
              user_idemail["id"] = result[i]["id"];
              user_idemail["value"] = result[i]["email"]
              user_arr.push(user_idemail)
            }

            setUserobj(user_arr);
            setLoading(false);
          }
           else if(resp.status === 401){
              seterr1status(true);
              setLoading(false);
            }
          
          else{
              seterr5status(true);
              setLoading(false);
            }
        }

        else{
            let response = await fetch("/getusers");
            let result = await response.json();

            if(result["result"] === "failure"){
              seterr5status(true);
              setLoading(false);
            }
            else{
              setUserobj(result["result"]);
              setLoading(false);
            }

        }
      }
        catch(error){
            setLoading(false);
            seterr2status(true);
        }

        }
        listusers();

  };

  const handledel = () => {
    setLoading(true);

    if (user) {

        const userdel = async() => {

        try{
           if(process.env.REACT_APP_mode === "dev"){

            let headers = {
              'accept': 'application/json',
              'Authorization': adminauthtoken,
            }

            let response = await fetch(`https://api.ibmaspera.com/api/v1/admin/users/${user}`,{ method: "DELETE", headers})
            let result = await response;
        
            if(result.status === 204){
              setnotify2status(true);
            }

             else if(result.status === 401){
              seterr1status(true);
              setLoading(false);
            }

            else{
              seterr6status(true);
            }

            setUserobj([]);
            setLoading(false);
        }
        else{
          let response = await fetch('/deluser?userid=' + user)
          let result = await response.json();

          if(result["result"] === "success"){
            setnotify2status(true);
          }

          else{
            seterr6status(true);
          }
          
          setUserobj([]);
          setLoading(false);

        }
      }
        catch(error){
            seterr2status(true);
            setLoading(false);
        }

        }
        userdel();
    } 
    else {
      seterr3status(true);
      setLoading(false);
    }
  };

  const handlemember = () => {
    setLoading(true);

    if (user && workspace) {

        const addmember = async() => {

        try{

           if(process.env.REACT_APP_mode === "dev"){

            let reqbody = {
            can_invite_by_email: false,
            manager: userperm,
            member_id: user,
            member_type: 'user',
            storage_allowed: false,
            workspace_id: workspace
          };

            let headers = {
              'content-type': 'application/json',
              'accept': 'application/json',
              'Authorization': adminauthtoken,
             };


            let response = await fetch(`https://api.ibmaspera.com/api/v1/admin/workspace_memberships`,{ method: "POST", body: JSON.stringify(reqbody), json: true, headers})
            let resp = await response;
        
             if((resp.status === 202) || (resp.status === 204) ){
              setnotify3status(true);
              setuser('');
              setworkspace('');
              setUserobj([]);
              setWobj([]);
              setLoading(false);
            }
             else if(resp.status === 401){
              seterr1status(true);
              setLoading(false);
            }
            else{
              seterr7status(true);
              setuser('');
              setworkspace('');
              setUserobj([]);
              setWobj([]);
              setLoading(false);
            }          
        }
        else{

          let response = await fetch("/addmember?wid=" + workspace + "&userperms=" + userperm + "&userid=" + user)
          let result = await response.json();
          
          if(result["result"] === "success"){
              setnotify3status(true);
              setuser('');
              setworkspace('');
              setUserobj([]);
              setWobj([]);
              setLoading(false);
          }
          else{
              seterr7status(true);
              setuser('');
              setworkspace('');
              setUserobj([]);
              setWobj([]);
              setLoading(false);
          }
        }
      }
        catch(error){
            seterr2status(true);
            setLoading(false);
        }

        }
        addmember();
    } 
    
    else {
      seterr8status(true);
      setLoading(false);
    }
  };

  const handleuserselect = (event) => {
  setuser(event.target.value);
}

  const handleworkspaceselect = (event) => {
  setworkspace(event.target.value);
}

  function notifystatusf() {
    setnotifystatus(false);
  }
  
  function notifystatusf2() {
    setnotify2status(false);
  }
  function notifystatusf3() {
    setnotify3status(false);
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
  
  function err5closef() {
    seterr5status(false);
  }

  function err6closef() {
    seterr6status(false);
  }
  function err7closef() {
    seterr7status(false);
  }
  
  function err8closef() {
    seterr8status(false);
  }

const validEmail = (e) => {

      if(!e.target.value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)){
              seterremstate(true)
              seterremtext("Valid Email format required");
              setbuttonstate(true)
           }
      else{
            seterremstate(false)
            setbuttonstate(false)
        }        
            
      setemail(e.target.value)
    
  }

  return (
    <>

    <Form onSubmit={handleSubmit}>
      <TextInput type = "text" id={'email'} invalid = {erremstate} invalidText = {erremtext}  labelText = {'Email*'} placeholder = {'Email'} size = 'lg' value={email} onChange={validEmail} />

      <div className="TButtonArea">
        <Button kind="tertiary" type="submit" disabled = {buttonstate} > Add User </Button>
      </div>
      
    </Form>

     <Select labelText="Workspace*" size = "lg" value={workspace} onChange={handleworkspaceselect}>
          {wobj.map((item, i) => (
              <SelectItem value={item.id} key={i} text = {item.value} />
                            ))}
      </Select>

      <div className="TButtonArea">
        <Button kind="tertiary" type="submit" onClick={handleSubmit1} > List Workspaces </Button>
      </div>
    

    <br/>
    <br/>

    <h2> User Permissions </h2>
    <br/>
    <br/>

      <Select labelText="Permission Type*" size = "lg" value={userperm} onChange={e => setuserperm(e.target.value)}>
          {userperms.map((item, i) => (
              <SelectItem value={item.id} key={i} text = {item.value} />
                            ))}
      </Select>
    
    <br/>

      <Select labelText="User*" size = "lg" value={user} onChange={handleuserselect}>
          {userobj.map((item, i) => (
              <SelectItem value={item.id} key={i} text = {item.value} />
                            ))}
      </Select>

      <div className="TButtonArea">
        <Button kind="tertiary" type="submit" onClick={handleSubmit2} > List Users </Button>
      </div>


      <Loading active = {isLoading} description="Active loading indicator" withOverlay={true}/>


    <div className="ButtonArea">
        <Button kind="secondary" type="submit" onClick={handledel}> Delete Existing User </Button>
        <Button type="submit" onClick={handlemember}> Create Membership </Button>
    </div>

    {notifystatus && 
        <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>User added successfully</span>}
        timeout={4000}
        onClose = {notifystatusf}
        kind = 'success'
        title="Success Notification"
        />
      }

    {notifystatus2 && 
        <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>User deleted successfully</span>}
        timeout={4000}
        onClose = {notifystatusf2}
        kind = 'success'
        title="Success Notification"
        />
      }

    {notifystatus3 && 
        <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Membership created successfully</span>}
        timeout={4000}
        onClose = {notifystatusf3}
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
          subtitle={<span>Invalid input provided. Specify user to be added</span>}
          timeout={3000}
          onClose = {err3closef}
          title="Error Notification"
        />
      }
      {err4status && 
      <ToastNotification
          iconDescription="Close notification"
          subtitle={<span>User could not be added</span>}
          timeout={3000}
          onClose = {err4closef}
          title="Error Notification"
        />
      }
      
      {err5status && 
      <ToastNotification
          iconDescription="Close notification"
          subtitle={<span>Operation cannot be done</span>}
          timeout={3000}
          onClose = {err5closef}
          title="Error Notification"
        />
      }
     
     {err6status && 
      <ToastNotification
          iconDescription="Close notification"
          subtitle={<span>User could not be deleted</span>}
          timeout={3000}
          onClose = {err6closef}
          title="Error Notification"
        />
      }
     
     {err7status && 
      <ToastNotification
          iconDescription="Close notification"
          subtitle={<span>Membership could not be created</span>}
          timeout={3000}
          onClose = {err7closef}
          title="Error Notification"
        />
      }
    
    {err8status && 
      <ToastNotification
          iconDescription="Close notification"
          subtitle={<span>Invalid inputs provided. Specify user, workspace and permission type</span>}
          timeout={3000}
          onClose = {err8closef}
          title="Error Notification"
        />
      }

  
  <br/>
  <br/>
    </>
  );
};

export default Aoc2;