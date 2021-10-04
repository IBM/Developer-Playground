import React, { useState} from 'react';
import { Button, Loading, TableContainer, CodeSnippet, ToastNotification} from 'carbon-components-react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from 'carbon-components-react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyFile24 } from '@carbon/icons-react';

function Dataquality({ choice, LabelInput, uLabelInput, filepath, filename, ufilepath, ufilename, setulabelerr, setlabelerr, setdataseterr}) {

  const [jobid , setjobid] = useState('');
  const [msg , setmsg] = useState('');
  const [isLoading,setLoading] = useState(false);
  const [buttonstate, setbuttonstate] = useState(false);
  const [err1status, seterr1status] = useState(false);

  const onLPClickHandler = (e) => {

    setLoading(true);
    if(choice === "upload"){

       console.log("TESTING (API End): Upload file chosen: ", ufilename);
       console.log("TESTING (API End): Upload Label applied for Metric: ", uLabelInput);
       
       if(ufilename === ""){
          console.log('No file uploaded');
          //alert("No File uploaded");
          seterr1status(true);
          setLoading(false);
          //setbuttonstate(true)
        }

        else{

          if(!uLabelInput){
            setulabelerr(true);
            setLoading(false);
          }
          else{
            setulabelerr(false);
            callLabelpurity()
              .then((resp) => {
                // console.log("RES: ", resp["JobID"])
                // console.log("RES MSG: ", resp["message"])
                setjobid(resp["JobID"]);
                setmsg(resp["message"]);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err)
                setLoading(false);
              });
          }
        }
    }

    if(choice === "sample"){

      console.log("TESTING (API End): Sample file chosen: ", filename);
      console.log("TESTING (API End): Label applied for Metric: ", LabelInput);
      
      if((filename === "Select Dataset" || filename === "")){
          console.log('select dataset chosen');
          setdataseterr(true);
          setLoading(false);
          //setbuttonstate(true);
        
        }
      
      else{
        
        setdataseterr(false);
        if((LabelInput === "Select Column" || LabelInput === "")){
          setlabelerr(true);
          // seterr2status(true);
          setLoading(false);
        }
        else{
          setlabelerr(false);
          callLabelpurity()
              .then((resp) => {
                // console.log("RES: ", resp["JobID"])
                // console.log("RES MSG: ", resp["message"])
                setjobid(resp["JobID"]);
                setmsg(resp["message"]);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err)
                setLoading(false);
              });
        }
      }
        

    }

  }

  const onODClickHandler = (e) => {

    setLoading(true);
    if(choice === "upload"){

       console.log("TESTING (API End): Upload file chosen: ", ufilename);
       console.log("TESTING (API End): Upload Label applied for Metric: ", uLabelInput);
       
       if(ufilename === ""){
          console.log('No file uploaded');
          //alert("No File uploaded");
          seterr1status(true);
          setLoading(false);
          //setbuttonstate(true)
        }
    
        else{

          if(!uLabelInput){
            setulabelerr(true);
            setLoading(false);
          }
          else{
            setulabelerr(false);
             callOutlierdetection()
              .then((resp) => {
                // console.log("RES: ", resp["JobID"])
                // console.log("RES MSG: ", resp["message"])
                setjobid(resp["JobID"]);
                setmsg(resp["message"]);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err)
                setLoading(false);
              });
            }
    }
  }

    if(choice === "sample"){

      console.log("TESTING (API End): Sample file chosen: ", filename);
      console.log("TESTING (API End): Label applied for Metric: ", LabelInput);
      
      if((filename === "Select Dataset" || filename === "")){
          setdataseterr(true);
          // setbuttonstate(true)
          setLoading(false);
        }
       else{
        
        setdataseterr(false);
        if((LabelInput === "Select Column" || LabelInput === "")){
          setlabelerr(true);
          // seterr2status(true);
          setLoading(false);
        }
        else{
          setlabelerr(false);
             callOutlierdetection()
              .then((resp) => {
                // console.log("RES: ", resp["JobID"])
                // console.log("RES MSG: ", resp["message"])
                setjobid(resp["JobID"]);
                setmsg(resp["message"]);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err)
                setLoading(false);
              });
        }
      }
  }
}
  const onCPClickHandler = (e) => {

    setLoading(true);
    if(choice === "upload"){

       console.log("TESTING (API End): Upload file chosen: ", ufilename);
       console.log("TESTING (API End): Upload Label applied for Metric: ", uLabelInput);
       
       if(ufilename === ""){
          console.log('No file uploaded');
          //alert("No File uploaded");
          seterr1status(true);
          setLoading(false);
          //setbuttonstate(true)
        }
      
          else{

          if(!uLabelInput){
            setulabelerr(true);
            setLoading(false);
          }
          else{
            setulabelerr(false);
              callClassparity()
                .then((resp) => {
                  // console.log("RES: ", resp["JobID"])
                  // console.log("RES MSG: ", resp["message"])
                  setjobid(resp["JobID"]);
                  setmsg(resp["message"]);
                  setLoading(false);
                })
                .catch((err) => {
                  console.log(err)
                  setLoading(false);
                });
            }
        }
       
    }

    if(choice === "sample"){

      console.log("TESTING (API End): Sample file chosen: ", filename);
      console.log("TESTING (API End): Label applied for Metric: ", LabelInput);
      
        if((filename === "Select Dataset" || filename === "")){
          setdataseterr(true);
          // setbuttonstate(true)
          setLoading(false);
        }

      else{
        
        setdataseterr(false);
        if((LabelInput === "Select Column" || LabelInput === "")){
          setlabelerr(true);
          // seterr2status(true);
          setLoading(false);
        }
        else{
          setlabelerr(false);
            callClassparity()
                .then((resp) => {
                  // console.log("RES: ", resp["JobID"])
                  // console.log("RES MSG: ", resp["message"])
                  setjobid(resp["JobID"]);
                  setmsg(resp["message"]);
                  setLoading(false);
                })
                .catch((err) => {
                  console.log(err)
                  setLoading(false);
                });
        }
      }
     
    }  
  }
  
 const onCOClickHandler = (e) => {

    setLoading(true);
    if(choice === "upload"){

       console.log("TESTING (API End): Upload file chosen: ", ufilename);
       console.log("TESTING (API End): Upload Label applied for Metric: ", uLabelInput);
       
       if(ufilename === ""){
          console.log('No file uploaded');
          //alert("No File uploaded");
          seterr1status(true);
          setLoading(false);
          //setbuttonstate(true)
        }
       else{

          if(!uLabelInput){
            setulabelerr(true);
            setLoading(false);
          }
          else{
            setulabelerr(false);
             callClassoverlap()
              .then((resp) => {
                // console.log("RES: ", resp["JobID"])
                // console.log("RES MSG: ", resp["message"])
                setjobid(resp["JobID"]);
                setmsg(resp["message"]);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err)
                setLoading(false);
              });
            }
      }  
    }

    if(choice === "sample"){

      console.log("TESTING (API End): Sample file chosen: ", filename);
      console.log("TESTING (API End): Label applied for Metric: ", LabelInput);
      
      if((filename === "Select Dataset" || filename === "")){
          setdataseterr(true);
          // setbuttonstate(true)
          setLoading(false);
        }
      
      else{
        
        setdataseterr(false);
        if((LabelInput === "Select Column" || LabelInput === "")){
          setlabelerr(true);
          // seterr2status(true);
          setLoading(false);
        }
        else{
          setlabelerr(false);
             callClassoverlap()
              .then((resp) => {
                // console.log("RES: ", resp["JobID"])
                // console.log("RES MSG: ", resp["message"])
                setjobid(resp["JobID"]);
                setmsg(resp["message"]);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err)
                setLoading(false);
              });
        }
      }
     
   
    }
  }
    
 
  const callClassparity = async () => {

    if(choice === "upload"){
      let response = await fetch('/classparity?label=' + uLabelInput + '&fpath=' + ufilepath + '&fname=' + ufilename);
      console.log("upload req api:  ", response["url"]);
      let body = await response.json();
    
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body.result;
    
    }

    if(choice === "sample"){

      let response = await fetch('/classparity?label=' + LabelInput + '&fpath=' + filepath + '&fname=' + filename);
      console.log("sample req api:  ", response["url"]);
      let body = await response.json();
    
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body.result;

    }


  };

  const callLabelpurity= async () => {

    if(choice === "upload"){
      let response = await fetch('/labelpurity?label=' + uLabelInput + '&fpath=' + ufilepath + '&fname=' + ufilename);
      console.log("upload req api:  ", response["url"]);
      let body = await response.json();
    
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body.result;
    
    }

    if(choice === "sample"){

      let response = await fetch('/labelpurity?label=' + LabelInput + '&fpath=' + filepath + '&fname=' + filename);
      console.log("sample req api:  ", response["url"]);
      let body = await response.json();
    
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body.result;

    }


  };

  const callClassoverlap = async () => {
    if(choice === "upload"){
      let response = await fetch('/classoverlap?label=' + uLabelInput + '&fpath=' + ufilepath + '&fname=' + ufilename);
      console.log("upload req api:  ", response["url"]);
      let body = await response.json();
    
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body.result;
    
    }

    if(choice === "sample"){

      let response = await fetch('/classoverlap?label=' + LabelInput + '&fpath=' + filepath + '&fname=' + filename);
      console.log("sample req api:  ", response["url"]);
      let body = await response.json();
    
      console.log("sample response:  ", body);

      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body.result;

    }


  };

  const callOutlierdetection= async () => {
    if(choice === "upload"){
      let response = await fetch('/outlierdetection?label=' + uLabelInput + '&fpath=' + ufilepath + '&fname=' + ufilename);
      console.log("upload req api:  ", response["url"]);
      let body = await response.json();
    
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body.result;
    
    }

    if(choice === "sample"){

      let response = await fetch('/outlierdetection?label=' + LabelInput + '&fpath=' + filepath + '&fname=' + filename);
      console.log("sample req api:  ", response["url"]);
      let body = await response.json();
    
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body.result;

    }
  };

  function err1closef() {
    seterr1status(false);
  }
  
  const headers = [
  {
    key: 'jobid',
    header: 'Job ID',
  },
  {
    key: 'message',
    header: 'Message',
  },
  {
    key:'copyfunc',
    header:''
  }
  
];
  const rows = [
  {
    id: 'a',
    jobid: jobid,
    message: msg,
    copyfunc:  <CopyToClipboard text={jobid}>
      <CodeSnippet type="inline" feedback="Copied to clipboard" ><CopyFile24 Style = "width: 24px ; height: 24px" /></CodeSnippet>
    </CopyToClipboard> 

  }
];
  
    return (
     <div className = "dqdiv">
         <div className="ButtonArea">
           <Button className = "parameterbutton" kind="tertiary" type="submit" onClick={onCOClickHandler} > Get Class Overlap </Button>
           <Button className = "parameterbutton" kind="tertiary" type="submit" onClick={onLPClickHandler} > Get Label Purity </Button>
           <Button className = "parameterbutton" kind="tertiary" type="submit" onClick={onODClickHandler} > Detect Outliers </Button>
           <Button className = "parameterbutton" kind="tertiary" type="submit" onClick={onCPClickHandler} > Get Class Parity </Button>
            
            {/* <Button className = "parameterbutton" disabled = {buttonstate} kind="tertiary" type="submit" onClick={onCPClickHandler} > Get Class Parity </Button> */}

         </div>

  {err1status && 
    <ToastNotification
        // caption="00:00:00 AM"
        iconDescription="Close notification"
        subtitle={<span>No File uploaded</span>}
        timeout={3000}
        onClose = {err1closef}
        title="Error Notification"
      />
      }

      <Loading active = {isLoading} description="Active loading indicator" withOverlay={true}/>

         { jobid && <div className = "TableDisplay" >
         { jobid && <DataTable rows={rows} headers={headers}>
              {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => 
              (
                <TableContainer title="Parameter Job">
                <Table {...getTableProps()}>
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
                    {rows.map((row) => (
                      <TableRow {...getRowProps({ row })}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                 </TableContainer>
              )}
          </DataTable>}
          </div>}
          

      </div>
    );
  
}

export default Dataquality;