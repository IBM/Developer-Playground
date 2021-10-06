import React, { useState} from 'react';
import raw from 'raw.macro';
import { Button,TextInput, Link , Form, Loading, ToastNotification } from 'carbon-components-react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer
} from 'carbon-components-react';

function SSMMain() {
  const [gname, setgname] = useState('');
  const [fname, setfname] = useState('');
  const [email, setemail] = useState('');
  const [inviteid, setinviteid] = useState('');

  const [custobj, setCustobj] = useState({});
  const [subsobj, setSubsobj] = useState({});
  const [isLoading,setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [notifystatus, setnotifystatus] = useState(false);
  const [notifystatus2, setnotifystatus2] = useState(false);
  const [notifystatus3, setnotifystatus3] = useState(false);
  const [err1status, seterr1status] = useState(false);  
  const [err2status, seterr2status] = useState(false);
  const [err3status, seterr3status] = useState(false);

  const [errstate1, seterrstate1] = useState(false); 
  const [errtext1, seterrtext1] = useState('A valid name is required');
  const [errstate2, seterrstate2] = useState(false); 
  const [errtext2, seterrtext2] = useState('A valid name is required');
  const [erremstate, seterremstate] = useState(false); 
  const [erremtext, seterremtext] = useState('A valid email is required');
  const [buttonstate, setbuttonstate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

        const getSubscrpts = async() => {

        try{
            if(process.env.REACT_APP_mode === "dev"){
              let authtoken = raw('./auth.txt');
              let headers = {
                  'X-IBM-Client-Id': process.env.REACT_APP_CLIENT_ID,
                  'X-IBM-Client-Secret': process.env.REACT_APP_CLIENT_SECRET,
                  'Authorization': authtoken,
                  'accept': 'application/json',
              }
              let response = await fetch(`https://api.ibm.com/scx/sbs_orgaccess/customer?emailAddress=${process.env.REACT_APP_USERNAME}&_namedQuery=getCustomersByContactEmail`,{ headers})
              let result = await response.json();

              let cust_id = JSON.parse(result["List"][0]["Id"]);
              
              response = await fetch(`https://api.ibm.com/scx/run/sbs_orgaccess/subscription?_namedQuery=getSubscriptionByCustomer&customerId=${cust_id}`, { headers})
              result = await response.json();

              setCustobj({...result});
              setLoading(false);

            }

            else{
              let response = await fetch('/getmysubscriptions')
              let result = await response.json();

              setCustobj({...result});
              setLoading(false);
            }
            
          
        }
        catch(error){
            seterr2status(true);
            setLoading(false);
        }

        }
        getSubscrpts();

  };

    const getSubsHandler = (id) => {

      setLoading(true);

       const getSubs = async() => {

        try{

           if(process.env.REACT_APP_mode === "dev"){
            let authtoken = raw('./auth.txt');
            let headers = {
                'X-IBM-Client-Id': process.env.REACT_APP_CLIENT_ID,
                'X-IBM-Client-Secret': process.env.REACT_APP_CLIENT_SECRET,
                'Authorization': authtoken,
                'accept': 'application/json',
            }

            let response = await fetch(`https://api.ibm.com/scx/run/sbs_orgaccess/subscriber?subscriptionId=${id}&_namedQuery=getSubscriberListBySubscription`, { headers})
            let result = await response.json();

            setSubsobj({...result});
            setLoading(false);

           }

           else{

            let response = await fetch('/getSubscribers?id=' + id);
            let result = await response.json();
            
            setSubsobj({...result});
            setLoading(false);
           }
            
          }
        
        catch(error){
            seterr2status(true);
            setLoading(false);
        }

        }
        getSubs();
  }

  const inviteHandler = (id) => {
    setShowForm(true);
    setinviteid(id);
  }

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if(gname && fname && email) {

       const inviteUser = async() => {

        try{
          if(process.env.REACT_APP_mode === "dev"){
                
            let authtoken = raw('./auth.txt');
            let headers = {
                'X-IBM-Client-Id': process.env.REACT_APP_CLIENT_ID,
                'X-IBM-Client-Secret': process.env.REACT_APP_CLIENT_SECRET,
                'Authorization': authtoken,
                'accept': 'application/json',
                'content-type': 'application/json'
            }
             let reqbody = {
                "Subscriber": {
                  "Person": {
                    "GivenName": gname,
                    "EmailAddress": email,
                    "FamilyName": fname,
                    "RoleSet": [
                      "CustomerAdministrator",
                      "AppDeveloper"
                    ]
                  }
                }
            };

            let response = await fetch(`https://api.ibm.com/scx/run/sbs_orgaccess/subscriber/inviteUser?subscriptionId=${inviteid}`, { method: "POST", body: JSON.stringify(reqbody), headers})
            let result = await response.json();

            if(result["InviteUser"]["SuccessMessage"] === "User created and entitled in inviter's organization."){
              setnotifystatus(true);
              setShowForm(false);
              setTimeout(() => {
                setSubsobj({});
              }, 1000);
              setLoading(false);
            }

            else if(result["InviteUser"]["SuccessMessage"] === "User exists in same organization and entitled with specified subscription."){
              setnotifystatus3(true);
              setShowForm(false);
              setTimeout(() => {
                setSubsobj({});
              }, 1000);
              setLoading(false);
            }

            else {
              seterr1status(true);
              setLoading(false);
            }

          }
          
          else{

            let response = await fetch('/inviteuser?givenname=' + gname + '&useremail=' + email + '&familyname=' + fname + '&subspid=' + inviteid)
            let result = await response.json();
                        
            if(result["InviteUser"]["SuccessMessage"] === "User created and entitled in inviter's organization."){
              setnotifystatus(true);
              setShowForm(false);
              setTimeout(() => {
                setSubsobj({});
              }, 1000);
              setLoading(false);
            }

            else if(result["InviteUser"]["SuccessMessage"] === "User exists in same organization and entitled with specified subscription."){
              setnotifystatus3(true);
              setShowForm(false);
              setTimeout(() => {
                setSubsobj({});
              }, 1000);
              setLoading(false);
            }

            else {
              seterr1status(true);
              setLoading(false);
            }

          }
        }
        catch(error){
            console.log(error);
            seterr2status(true);
            setLoading(false);
        }

        }
        inviteUser();

      setgname('');
      setfname('');
      setemail('');

     }

     else {
      seterr3status(true);
      setLoading(false);
    }
  } 


 const revokeHandler = (subid,seatid) => {

     setLoading(true);
     const revokeSubs = async() => {

        try{
           if(process.env.REACT_APP_mode === "dev"){
                
            let authtoken = raw('./auth.txt');
            let headers = {
                'X-IBM-Client-Id': process.env.REACT_APP_CLIENT_ID,
                'X-IBM-Client-Secret': process.env.REACT_APP_CLIENT_SECRET,
                'Authorization': authtoken,
                'accept': 'application/json',
            }

            let response = await fetch(`https://api.ibm.com/scx/run/sbs_orgaccess/subscriber/${subid}/seat/${seatid}`, { headers, method: "POST"})
            let result = await response;

             if(result["status"] === 204){
              setnotifystatus2(true);
              setTimeout(() => {
                setSubsobj({});
              }, 1000);
              setLoading(false);
            }
            
            else {
              seterr1status(true);
              setLoading(false);
            }

           }

           else{
            let response = await fetch('/revokesubscription?subid=' + subid + '&seatid=' + seatid)
            let result = await response.json();
            
             if(result["result"] === "success"){
              setnotifystatus2(true);
              setTimeout(() => {
                setSubsobj({});
              }, 1000);
              setLoading(false);
            }            
            else {
              seterr1status(true);
              setLoading(false);
            }
          }
          }
        
        catch(error){
            seterr2status(true);
            setLoading(false);
        }

        }
      revokeSubs();
 }

const headers = [
    {
    key: 'partnumber',
    header: 'Part Number',
  },
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'numofseats',
    header: 'Number of Available Seats',
  },
    {
    key: 'subscrpstate',
    header: 'Subscription State',
  },
  {
    key: 'action1',
    header: 'Action',
  },
    {
    key: 'action2',
    header: '',
  },
];

const headers1 = [
  {
    key: 'subid',
    header: 'Subscriber ID',
  },
    {
    key: 'orgname',
    header: 'Org Name',
  },
  {
    key: 'givenname',
    header: 'Given Name',
  },
  {
    key: 'substate',
    header: 'Subscriber State',
  },
  {
    key: 'revokeaction',
    header: 'Action',
  },
];

 function notifystatusf() {
    setnotifystatus(false);
  }

  function notifystatusf2() {
    setnotifystatus2(false);
  }

  function notifystatusf3() {
    setnotifystatus3(false);
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

  const validGname = (e) => {

      if(!e.target.value.match(/^[a-zA-Z]+$/)){
              seterrstate1(true)
              seterrtext1("Only letters allowed. No special characters or numbers");
              setbuttonstate(true)
           }
      else{
            seterrstate1(false)
            setbuttonstate(false)
        }        
            
      setgname(e.target.value)
    
  }
  const validFname = (e) => {

      if(!e.target.value.match(/^[a-zA-Z]+$/)){
              seterrstate2(true)
              seterrtext2("Only letters allowed. No special characters or numbers");
              setbuttonstate(true)
           }
      else{
            seterrstate2(false)
            setbuttonstate(false)
        }        
            
      setfname(e.target.value)
    
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
      <div className="ButtonArea">
        <Button type="submit" > Get My Subscriptions </Button>
      </div>
      
    </Form>

      <Loading active = {isLoading} description="Active loading indicator" withOverlay={true}/>

  {notifystatus && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Invited user to Subscription</span>}
        timeout={9000}
        onClose = {notifystatusf}
        kind = 'success'
        title="Success Notification"
      />
      }

    {notifystatus2 && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Revoked Subscriber</span>}
        timeout={9000}
        onClose = {notifystatusf2}
        kind = 'success'
        title="Success Notification"
      />
      }

      {notifystatus3 && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>User exists in same organization and entitled with specified subscription</span>}
        timeout={5000}
        onClose = {notifystatusf3}
        kind = 'success'
        title="Success Notification"
      />
      }

   {err1status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Operation cannot be done</span>}
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
        subtitle={<span>Fields cannot be empty</span>}
        timeout={3000}
        onClose = {err3closef}
        title="Error Notification"
      />
      }


       {custobj.List && 
         <div className = "TableDisplay" >

          {custobj.List && 
          
          <DataTable rows={custobj.List} headers={headers}>
              {({ rows, headers, getHeaderProps}) => 
            (
              <TableContainer title="Subscription Results">
                <Table>
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {custobj.List && custobj.List.map((row, index) => {
                return (

                      <TableRow key={index} >

                        <TableCell>{row.PartNumber}</TableCell>
                        <TableCell>{row.Name}</TableCell>
                        <TableCell>{row.NumberOfAvailableSeats}</TableCell>
                        <TableCell>{row.SubscriptionState}</TableCell>
                        <TableCell><Link onClick={() => getSubsHandler(row.Id)}>Get Subscribers</Link></TableCell>
                        <TableCell><Link onClick={() => inviteHandler(row.Id)}>Invite to Subscription</Link></TableCell>

                      </TableRow>

                );
            })}
                  </TableBody>
                </Table>
                </TableContainer>
            )
                }
          </DataTable>}

        </div>} 

         {subsobj.List && 
         <div className = "TableDisplay" >

          {subsobj.List && 
          
          <DataTable rows={subsobj.List} headers={headers1}>
              {({ rows, headers, getHeaderProps}) => 
            (
              <TableContainer title="Subscriber Results">
                <Table>
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subsobj.List && subsobj.List.map((row, index) => {
                return (

                      <TableRow key={index} >

                        <TableCell>{row.SeatSet[0].SubscriberId}</TableCell>
                        <TableCell>{row.Person.OrgName}</TableCell>
                        <TableCell>{row.Person.GivenName}</TableCell>
                        <TableCell>{row.SubscriberState}</TableCell>
                        <TableCell><Link onClick={() => revokeHandler(row.SeatSet[0].SubscriberId,row.SeatSet[0].Id)}>Revoke</Link></TableCell>

                      </TableRow>

                );
            })}
                  </TableBody>
                </Table>
                </TableContainer>
            )
                }
          </DataTable>}

        </div>} 

        {showForm && (
         <Form onSubmit={handleInviteSubmit} >
        <div className="TextArea" >
          <TextInput type = "text" id={'gname'}  invalid = {errstate1} invalidText = {errtext1} labelText = {'Given Name*'} placeholder = {'Given Name'} size = 'lg' value={gname} onChange={validGname} /> <br/>
        </div>

        <div className="TextArea" >
          <TextInput type = "text" id={'fname'}  invalid = {errstate2} invalidText = {errtext2} labelText = {'Family Name*'} placeholder = {'Family Name'} size = 'lg' value={fname} onChange={validFname} /> <br/>
        </div>
        
        <div className="TextArea" >
          <TextInput type = "text" id={'email'}  invalid = {erremstate} invalidText = {erremtext} labelText = {'Email Address*'} placeholder = {'Email address'} size = 'lg' value={email} onChange={validEmail} /> 
        </div>
        
        <div className="ButtonArea">
          <Button type="submit" disabled = {buttonstate}> Invite </Button>
        </div>
        </Form>
      )}


    </>
  );
};

export default SSMMain;