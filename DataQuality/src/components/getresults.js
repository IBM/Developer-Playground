import React, { useState} from 'react';
import { Button, Loading, Form, TextInput} from 'carbon-components-react';
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
  const [msg , setmsg] = useState('');
  const [metric , setmetric] = useState('');
  const [methodology , setmethodology] = useState('');
  const [fresult , setfresult] = useState('');
  const [score , setscore] = useState('');
  const [isLoading,setLoading] = useState(false);

  const [numbercolumns, setnumbercolumns] = useState('');
  const [numbersamples, setnumbersamples] = useState('');
  const [datecolumns, setdatecolumns] = useState('');
  const [numericalcolumns, setnumericalcolumns] = useState('');
  const [stringcolumns, setstringcolumns] = useState('');


  const onSubmit = (e) => {
     setLoading(true);
     e.preventDefault();
    
    callResults()
    .then((resp) => {
      
      console.log("RES: ", resp["Job ID"])
      console.log("RES MSG: ", resp["Message"])
      console.log("RES Metric : ", resp["String Col"])

      if(resp["Metric"] === "Data Profiler"){
        setjobid(resp["Job ID"]);
        setmsg(resp["Message"]);
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
      setmsg(resp["Message"]);
      setmetric(resp["Metric"]);
      setmethodology(resp["Methodology"]);
      setfresult(resp["Result"]);
      setscore(resp["Score"]);
      setLoading(false);
      }
      
    })
    .catch((err) => {
      console.log(err)
      setLoading(false);
    });
     
  }
  
   const callResults = async () => {

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
    key: 'jobid',
    header: 'Job ID',
  },
  {
    key: 'message',
    header: 'Message',
  },
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
    jobid: jobid,
    message: msg,
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
    
  headers = [
  {
    key: 'jobid',
    header: 'Job ID',
  },
  {
    key: 'message',
    header: 'Message',
  },
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
    jobid: jobid,
    message: msg,
    metric: metric,
    methodology: methodology,
    result: parse(fresult),
    score: score
  }
];
  
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
        
        {/* <Button type="submit" onClick={testingHandler} > Testing for Label and Dataset </Button> */}
        <br/>
        <br/>
        {/* <Button className = "parameterbutton" disabled = {buttonstate} kind="ghost" type="submit" onClick={onClickHandler} > Fetch Results </Button> */}
      



       <Loading active = {isLoading} description="Active loading indicator" withOverlay={true}/>




         { methodology && <DataTable rows={rows} headers={headers}>
              {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
                <TableContainer title="Results Analysis">
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


      </div>
    );
  
}

export default Results;

//a0d2ba00-ed7f-4966-b4c8-a4cb87ab42f7