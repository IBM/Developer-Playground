import React, { useState} from 'react';
import { Button, Loading, Form, TextInput, ToastNotification} from 'carbon-components-react';
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
import parse from 'html-react-parser';

function  Results() {

  const [jobid , setjobid] = useState('');
  const [metric , setmetric] = useState('');
  const [methodology , setmethodology] = useState('');
  const [fresult , setfresult] = useState('');
  const [score , setscore] = useState('');
  const [isLoading,setLoading] = useState(false);
  const [err1status, seterr1status] = useState(false); 
  const [err2status, seterr2status] = useState(false);
  const [err3status, seterr3status] = useState(false);
  const [numbercolumns, setnumbercolumns] = useState('');
  const [numbersamples, setnumbersamples] = useState('');
  const [datecolumns, setdatecolumns] = useState('');
  const [numericalcolumns, setnumericalcolumns] = useState('');
  const [stringcolumns, setstringcolumns] = useState('');


  const onSubmit = (e) => {
     setLoading(true);
     e.preventDefault();

     if(jobid && jobid.trim()){
    
      try{
    callResults()
    .then((resp) => {

      if(JSON.stringify(resp) === JSON.stringify({})){
        seterr1status(true);
        setLoading(false);
      }

      else if(JSON.stringify(resp) === '{"result":"Invalid"}'){
        setLoading(false);
        seterr3status(true);
      }

      else{

      if(resp["Metric"] === "Data Profiler"){
        setjobid(resp["Job ID"]);
        setmetric(resp["Metric"]);
        setmethodology(resp["Methodology"]);
        setnumbercolumns(resp["Number of Columns"]);
        setnumbersamples(resp["Number of Samples"]);
        setdatecolumns(resp["Date Col"].toString());
        setnumericalcolumns(resp["Numerical Col"].toString());
        setstringcolumns(resp["String Col"].toString());
        setLoading(false);
      }

      else{
      setjobid(resp["Job ID"]);
      setmetric(resp["Metric"]);
      setmethodology(resp["Methodology"]);
      setfresult(resp["Result"]);
      setscore(resp["Score"]);
      setLoading(false);
      }
    
    }

    })
  }
  catch(err){
    setLoading(false);
    seterr3status(true);
  }
  }
    else{
      setLoading(false);
      seterr3status(true);
    }
     
  }
  
   const callResults = async () => {

    let resp = await fetch('/conncheck');
    let res = await resp.json();
    
      if (res['result'] === '{"message": "Welcome to Data Quality for AI"}') {
      }
      else{
         seterr2status(true); 
      }

      let response = await fetch('/results?jobid=' + jobid);
      let body = await response.json();
    
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body.result;
    
  };

 var headers = [];
 var rows = [];

  if(metric === "Data Profiler"){
    headers = [
  {
    key: 'metric',
    header: 'Metric',
  },
  {
    key: 'methodology',
    header: 'Methodology',
  },
  {
    key: 'numbercolumns',
    header: 'Number of Columns',
  },
    {
    key: 'numbersamples',
    header: 'Number of Samples',
  },
    {
    key: 'datecolumns',
    header: 'Date Columns',
  },
  
  {
    key: 'numericalcolumns',
    header: 'Numerical Columns',
  },
  {
    key: 'stringcolumns',
    header: 'String Columns',
  }
  
];

 rows = [
  {
    id: 'a',
    metric: metric,
    methodology: methodology,
    numbercolumns: numbercolumns,
    numbersamples: numbersamples,
    datecolumns: datecolumns,
    numericalcolumns: numericalcolumns,
    stringcolumns: stringcolumns
  }
];

  }

  else{

    try{
    
  headers = [
  {
    key: 'metric',
    header: 'Metric',
  },
  {
    key: 'methodology',
    header: 'Methodology',
  },
  {
    key: 'result',
    header: 'Result',
  },
  {
    key: 'score',
    header: 'Score',
  },
  
];

 rows = [
  {
    id: 'a',
    metric: metric,
    methodology: methodology,
    result: parse(fresult),
    score: score
  }
];
}
catch(err){
  seterr3status(true);
}
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

return (
     <div>

      <Form autoComplete="off" onSubmit={onSubmit}>

      <h2>Fetch Processed Results </h2>
      <br/>
      <br/>
      <TextInput id={'result'} labelText = {'Fetch Results'} placeholder = {'Job ID'} value={jobid} onChange={(e) => setjobid(e.target.value)} />
      <br/>
      <div className="ButtonArea">
          <Button className = "parameterbutton" kind="tertiary" type="submit"  > Fetch Results </Button>
      </div>
    </Form>
        
        <br/>
        <br/>

       <Loading active = {isLoading} description="Active loading indicator" withOverlay={true}/>

         { methodology && <DataTable rows={rows} headers={headers}>
              {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
                <TableContainer title="Analysis">
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

  {err1status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Results are getting processed. Try again in a few moments</span>}
        timeout={3000}
        onClose = {err1closef}
        title="Error Notification"
      />
      }
        {err2status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Invalid Client ID or Secret. Stop the application before updating your credentials</span>}
        timeout={4000}
        onClose = {err2closef}
        title="Error Notification"
      />
      }
    
    {err3status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Invalid Job ID</span>}
        timeout={3000}
        onClose = {err3closef}
        title="Error Notification"
      />
      }

      </div>
    );
  
}

export default Results;
