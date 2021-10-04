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

function Datasetquality({ choice, filepath, filename, ufilepath, ufilename, setdataseterr1}) {

  const [jobid , setjobid] = useState('');
  const [msg , setmsg] = useState('');
  const [isLoading,setLoading] = useState(false);
  const [buttonstate, setbuttonstate] = useState(false);
  const [err1status, seterr1status] = useState(false);

  const onDCClickHandler = (e) => {

    setLoading(true);
    if(choice === "upload"){

       console.log("TESTING (API End): Upload file chosen: ", ufilename);
       
       if(ufilename === ""){
          console.log('No file uploaded');
          //alert("No File uploaded");
          seterr1status(true);
          setLoading(false);
          //setbuttonstate(true)
        }
      else{
        //console.log('file uploaded: ', ufilepath);
        callDatacompleteness()
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

    if(choice === "sample"){

      console.log("TESTING (API End): Sample file chosen: ", filename);
      
       if(filename === "Select Dataset" || filename === ""){
          setdataseterr1(true);
          setbuttonstate(true);
          setLoading(false);
          //console.log("DATASET NOT CHOSEN");
        }

      else{
        setdataseterr1(false);
        setbuttonstate(false);

        callDatacompleteness()
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

  const onDDClickHandler = (e) => {

    setLoading(true);
    if(choice === "upload"){

       console.log("TESTING (API End): Upload file chosen: ", ufilename);
       
       if(ufilename === ""){
          console.log('No file uploaded');
          //alert("No File uploaded");
          seterr1status(true);
          setLoading(false);
          //setbuttonstate(true)
        }
       else{
         callDataduplicates()
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

    if(choice === "sample"){

      console.log("TESTING (API End): Sample file chosen: ", filename);
      
       if(filename === "Select Dataset" || filename === ""){
          setdataseterr1(true);
          setbuttonstate(true);
          setLoading(false);
        }
       
      else{
           setdataseterr1(false);
           setbuttonstate(false)
           callDataduplicates()
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

  const onDHClickHandler = (e) => {

    setLoading(true);
    if(choice === "upload"){

       console.log("TESTING (API End): Upload file chosen: ", ufilename);       
       
       if(ufilename === ""){
          console.log('No file uploaded');
          //alert("No File uploaded");
          seterr1status(true);
          setLoading(false);
          //setbuttonstate(true)
        }
       
       else{
          callDatahomogeneity()
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

    if(choice === "sample"){

      console.log("TESTING (API End): Sample file chosen: ", filename);
      
        if(filename === "Select Dataset" || filename === ""){
          setdataseterr1(true);
          setbuttonstate(true);
          setLoading(false);
        }

        else{
           setdataseterr1(false);
           setbuttonstate(false);
           callDatahomogeneity()
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
  
 const onDPClickHandler = (e) => {

    setLoading(true);
    if(choice === "upload"){

       console.log("TESTING (API End): Upload file chosen: ", ufilename);
       
       if(ufilename === ""){
          console.log('No file uploaded');
          //alert("No File uploaded");
          seterr1status(true);
          setLoading(false);
          //setbuttonstate(true)
        }
      else{
        setdataseterr1(false);
        setbuttonstate(false);
         callDataprofile()
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

    if(choice === "sample"){

      console.log("TESTING (API End): Sample file chosen: ", filename);
      
        if(filename === "Select Dataset" || filename === ""){
          setdataseterr1(true);
          setbuttonstate(true);
          setLoading(false);

        }

        else{
          setdataseterr1(false);
          setbuttonstate(false);
          callDataprofile()
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
    
 
  const callDatacompleteness = async () => {

    if(choice === "upload"){
      let response = await fetch('/datacompleteness?fpath=' + ufilepath + '&fname=' + ufilename);
      console.log("upload req api:  ", response["url"]);
      let body = await response.json();
    
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body.result;
    
    }

    if(choice === "sample"){

      let response = await fetch('/datacompleteness?fpath=' + filepath + '&fname=' + filename);
      console.log("sample req api:  ", response["url"]);
      let body = await response.json();
    
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body.result;

    }


  };

  const callDataduplicates = async () => {

    if(choice === "upload"){
      let response = await fetch('/dataduplicates?fpath=' + ufilepath + '&fname=' + ufilename);
      console.log("upload req api:  ", response["url"]);
      let body = await response.json();
    
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body.result;
    
    }

    if(choice === "sample"){

      let response = await fetch('/dataduplicates?fpath=' + filepath + '&fname=' + filename);
      console.log("sample req api:  ", response["url"]);
      let body = await response.json();
    
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body.result;

    }


  };

  const callDatahomogeneity = async () => {
    if(choice === "upload"){
      let response = await fetch('/datahomogeneity?fpath=' + ufilepath + '&fname=' + ufilename);
      console.log("upload req api:  ", response["url"]);
      let body = await response.json();
    
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body.result;
    
    }

    if(choice === "sample"){

      let response = await fetch('/datahomogeneity?fpath=' + filepath + '&fname=' + filename);
      console.log("sample req api:  ", response["url"]);
      let body = await response.json();

     console.log("BODY: ", body);


      if (response.status !== 200) {
        throw Error(body.message)
         
      }
      return body.result;

    }


  };

  const callDataprofile = async () => {
    if(choice === "upload"){
      let response = await fetch('/dataprofile?fpath=' + ufilepath + '&fname=' + ufilename);
      console.log("upload req api:  ", response["url"]);
      let body = await response.json();
    
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body.result;
    
    }

    if(choice === "sample"){

      let response = await fetch('/dataprofile?fpath=' + filepath + '&fname=' + filename);
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
      <CodeSnippet type="inline" feedback="Copied to clipboard" ><CopyFile24 /></CodeSnippet>
    </CopyToClipboard> 
  }
];
  
    return (
     <div className = "dqdiv">
         <div className="ButtonArea">
           <Button className = "parameterbutton"  kind="tertiary" type="submit" onClick={onDCClickHandler} > Data Completeness </Button>
           <Button className = "parameterbutton"  kind="tertiary" type="submit" onClick={onDDClickHandler} > Data Duplicates </Button>
           <Button className = "parameterbutton"  kind="tertiary" type="submit" onClick={onDHClickHandler} > Data Homogeneity </Button>
           <Button className = "parameterbutton"  kind="tertiary" type="submit" onClick={onDPClickHandler} > Data Profile </Button>
          {/* <Button className = "parameterbutton" disabled = {buttonstate} kind="tertiary" type="submit" onClick={onDPClickHandler} > Data Profile </Button> */}

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

export default Datasetquality;

      // if((filename === "Select Dataset" || " ") || (filepath === "") || (LabelInput === "Select Column" || ""))
      // {
      //     setdataseterr(true);
      //     setbuttonstate(true)
      // }