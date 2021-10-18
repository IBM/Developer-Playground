import React, { useState} from 'react';
import raw from 'raw.macro';
import { Button,TextInput, Loading, Select, SelectItem, ToastNotification  } from 'carbon-components-react';

const adminauthtoken = raw('../auth/adminauth.txt');
const userauthtoken = raw('../auth/userauth.txt');
const nuserauthtoken = raw('../auth/nodeauth.txt');

function Aoc3() {
  const [pkgname, setpkgname] = useState('');
  const [user, setuser] = useState('');
  const [pkg,setpkg] = useState('');
  const [file, setfile] = useState('');
  const [fileobj,setfileobj] = useState([]);
  const [userobj, setUserobj] = useState([]);
  const [pkgobj, setpkgobj] = useState([]);
  const [isLoading,setLoading] = useState(false);

  const [notifystatus, setnotifystatus] = useState(false);
  const [err1status, seterr1status] = useState(false);  
  const [err2status, seterr2status] = useState(false);
  const [err3status, seterr3status] = useState(false);
  const [err4status, seterr4status] = useState(false);
  const [err5status, seterr5status] = useState(false);


  const handleSubmit = () => {

    setLoading(true);

    if ((pkgname && user && file) && (pkgname.trim() !== "")) {

        const pkgcreate = async() => {

        try{

           if(process.env.REACT_APP_mode === "dev"){

            let headers = {
              'Authorization': adminauthtoken,
            };

            let response = await fetch(`https://api.ibmaspera.com/api/v1/admin/workspaces`,{ headers})
            let result = await response.json();

            let def_wksp_id = result[0]["id"];

            headers = {
              'content-type': 'application/json',
              'accept': 'application/json',
              'Authorization': userauthtoken,
            }

            let reqbody =
              {
                "recipients": [{ "id": user, "type": "user" }],
                "upload_notification_recipients": [],
                "download_notification_recipients": [], "bcc_recipients": [],
                "file_names": [file],
                "name": pkgname,
                "workspace_id": def_wksp_id,
                "encryption_at_rest": false,
                "single_source": true,
                "read": true,
                "transfers_expected": 1
              }

            response = await fetch(`https://api.ibmaspera.com/api/v1/packages`,{ method: "POST", body: JSON.stringify(reqbody), json: true, headers})
            result = await response.json();

            let pid = result["id"];
            let reqbody1 = {
              "sent": true,
              "transfers_expected": 1
            };

            headers = 
              {
                'content-type': 'application/json',
                'accept': 'application/json',
                'Authorization': userauthtoken,
              }
            
            response = await fetch(`https://api.ibmaspera.com/api/v1/packages/${pid}`,{ method: "PUT", body: JSON.stringify(reqbody1), json: true, headers})
            result = await response;

            if(result.status === 204){
              setnotifystatus(true);
              setpkgname('');
              setuser('');
              setfile('');
              setUserobj([]);
              setfileobj([]);
              setLoading(false);
            }
            
            else if(result.status === 401){
              seterr1status(true);
              setLoading(false);
            }

            else{
              seterr3status(true);
              setpkgname('');
              setuser('');
              setfile('');
              setUserobj([]);
              setfileobj([]);
              setLoading(false);
            } 
        }
        else{
          let response = await fetch("/sendpackages?pkgname=" + pkgname + "&filepkg=" + file + "&userid=" + user)
          let result = await response.json();

          if(result["result"] === "success"){
              setnotifystatus(true);
              setpkgname('');
              setuser('');
              setfile('');
              setUserobj([]);
              setfileobj([]);
              setLoading(false);
          }
          else{
              seterr3status(true);
              setpkgname('');
              setuser('');
              setfile('');
              setUserobj([]);
              setfileobj([]);
              setLoading(false);
          }

        }
      }
        catch(error){
            seterr2status(true);
            setLoading(false);
        }
        }
        pkgcreate();
    } 
    
    else {
      seterr4status(true);
      setLoading(false);
    }
  };

  const handleSubmit1 = () => {

    setLoading(true);

        const listfiles = async() => {

        try{
            
          if(process.env.REACT_APP_mode === "dev"){

            let headers = {
                'content-type': 'application/json',
                'accept': 'application/json',
                'Authorization': adminauthtoken,
                }

            let response = await fetch(`https://api.ibmaspera.com/api/v1/admin/nodes`, {headers})
            let result = await response.json();
            let rp = await response;

             if(rp.status === 401){
              seterr1status(true);
              setLoading(false);
            }
            else{
              var nodeurl = result[0]["url"].toString();
              var n = nodeurl.lastIndexOf(":");
              nodeurl = nodeurl.substring(0, n);

              headers = {
              'accept': 'application/json',
              'Authorization': adminauthtoken,
              }

              response = await fetch(`https://api.ibmaspera.com/api/v1/admin/workspaces`, {headers})
              result = await response.json();

              var homefileid = result[0]["home_file_id"].toString();
              var finalurl = nodeurl.concat('/files/').concat(homefileid).concat('/files');

              headers = {
                  'X-Aspera-AccessKey': process.env.REACT_APP_ASPERA_ACCESS_KEY,
                  'Authorization': nuserauthtoken
                }

              response = await fetch(`${finalurl}`, {headers})
              result = await response.json();
              let resp = await response;

              if(resp.status === 200){

                let file_list = [{id:"", name:"Choose File"}];
                
                  for (var i = 0; i < result.length; i++) {
                    let file_names = {};
                    file_names["id"] = result[i]["name"];
                    file_names["name"] = result[i]["name"];
                    file_list.push(file_names);
                  }

                setfileobj(file_list);
                setLoading(false);
              }

              else{
                seterr5status(true);
                setLoading(false);
              }
            }
        }
      
        else{
          let response = await fetch("/getfiles");
          let result = await response.json();

           if(result["result"] === "failure"){
                seterr5status(true);
                setLoading(false);
          }

          else{
            setfileobj(result["result"]);
            setLoading(false);
          }

        }
      }
        catch(error){
            setLoading(false);
            seterr2status(true);
        }

        }
        listfiles();
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

  const handleSubmit3 = () => {

    setLoading(true);

        const listpkgs = async() => {

        try{
            
          if(process.env.REACT_APP_mode === "dev"){

            let headers = {
            'accept': 'application/json',
            'Authorization': adminauthtoken,
          }

            let response = await fetch(`https://api.ibmaspera.com/api/v1/admin/packages?package_sent=true&deleted=false&include_draft=false&received=true`, {headers})
            let result = await response.json();
            let resp = await response;
        
             if(resp.status === 200){

              let pkg_arr = []
              for (var i = 0; i < result.length; i++) {
                let list_pkg = {};
                list_pkg["id"] = result[i]["id"];
                list_pkg["value"] = result[i]["name"]
                pkg_arr.push(list_pkg)
              }

              setpkgobj(pkg_arr);
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
            let response = await fetch("/getpackages");
            let result = await response.json();

            if(result["result"] === "failure"){
              seterr5status(true);
              setLoading(false);
            }
            else{
              setpkgobj(result["result"]);
              setLoading(false);
            }
        }
      }
        catch(error){
            setLoading(false);
            seterr2status(true);
        }

        }
        listpkgs();
  };

  const handlefileselect = (event) => {
  setfile(event.target.value);
  }

  const handleuserselect = (event) => {
  setuser(event.target.value);
  }

  const handlepkgselect = (event) => {
  setpkg(event.target.value);
  }

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
  
  function err5closef() {
    seterr5status(false);
  }


  return (
    <>

      <TextInput type = "text" id={'pkgname'} labelText = {'Package Name*'} placeholder = {'Package Name'} size = 'lg' value={pkgname} onChange={(e)=> setpkgname(e.target.value)} />
      <br/>
      <br/>
       <Select labelText="Choose File*" size = "lg" value={file} onChange={handlefileselect}>
          {fileobj.map((item, i) => (
              <SelectItem value={item.id} key={i} text = {item.name} />
                            ))}
      </Select>

      <div className="TButtonArea">
        <Button kind="tertiary" type="submit" onClick={handleSubmit1} > List Files </Button>
      </div>

      <br/>

      <Select labelText="Choose Recipient*" size = "lg" value={user} onChange={handleuserselect}>
          {userobj.map((item, i) => (
              <SelectItem value={item.id} key={i} text = {item.value} />
                            ))}
      </Select>

      <div className="TButtonArea">
        <Button kind="tertiary" type="submit" onClick={handleSubmit2} > List Users </Button>
      </div>


      
      <div className="PButtonArea" Style="padding-top: 16px;">
        <Button type="submit" onClick={handleSubmit}> Send Package </Button>
      </div>

<br/>
<br/>

  <h2>Existing Packages</h2>
  <br/>
  <br/>

 <Select labelText="View Packages" size = "lg" value={pkg} onChange={handlepkgselect}>
          {pkgobj.map((item, i) => (
              <SelectItem value={item.id} key={i} text = {item.value} />
                            ))}
  </Select>

      <div className="TButtonArea">
        <Button kind="tertiary" type="submit" onClick={handleSubmit3} > List Packages </Button>
      </div>

      <Loading active = {isLoading} description="Active loading indicator" withOverlay={true}/>

      {notifystatus && 
        <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Package sent successfully</span>}
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
          subtitle={<span>Package could not be sent</span>}
          timeout={3000}
          onClose = {err3closef}
          title="Error Notification"
        />
      }
      
      {err4status && 
      <ToastNotification
          iconDescription="Close notification"
          subtitle={<span>Invalid inputs provided. Specify package name, file and recipient</span>}
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

     
    </>
  );
};

export default Aoc3;