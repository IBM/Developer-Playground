import React, { useState} from 'react';
import raw from 'raw.macro';
import { Button,TextInput, Form, Loading, ToastNotification } from 'carbon-components-react';
import {DataTable,Table,TableHead,TableRow,TableHeader,TableBody,TableCell,TableContainer} from 'carbon-components-react';

function Alertw() {

  const [location, setlocation] = useState('');
  const [alertdata, setalertdata] = useState('');
  const [geocodeobj, setGeocodeobj] = useState({});
  const [errstate, seterrstate] = useState(false);
  const [errtext, seterrtext] = useState('A valid value is required');
  const [buttonstate, setbuttonstate] = useState(false);
  const [isLoading,setLoading] = useState(false);
  const [err1status, seterr1status] = useState(false);
  const [err2status, seterr2status] = useState(false);

  const handleSubmit = (e) => {
     e.preventDefault();
     setLoading(true);
  
    if (location) {

        const alertsv = async() => {

        try{
        
           if(process.env.REACT_APP_mode === "dev"){
            const authtoken = raw('./auth.txt');
            let headers = {'Authorization' : authtoken}
            let response = await fetch(`https://weather.cc.api.here.com/weather/1.0/report.json?product=alerts&name=${location}`,{ headers})
            let result = await response.json();

            if(JSON.stringify(result["alerts"]["alerts"]) !== '[]'){
            setalertdata(result["alerts"]["alerts"][0]["description"]);
            }
            else{
              setalertdata('No Severe Weather')
            }
          
            setGeocodeobj({...result});
            setLoading(false);
          }

          else{     
            let response = await fetch(`/getalerts?city=${location}`);
            let result = await response.json();

            
            if(JSON.stringify(result["alerts"]["alerts"]) !== '[]'){
                setalertdata(result["alerts"]["alerts"][0]["description"]);
            }
            else{
                setalertdata('No Severe Weather')
            }
          
          setGeocodeobj({...result});
          setLoading(false);
        }

        }
        catch(error){
            seterr2status(true);
            setLoading(false);
        }

        }
      alertsv();
      setlocation('');
      }
    else {
      seterr1status(true);
      setLoading(false);
    }
  };

const headers = [
  {
    key: 'country',
    header: 'Country',
  },
  {
    key: 'state',
    header: 'State',
  },
    {
    key: 'latitude',
    header: 'Latitude',
  },
      {
    key: 'longitude',
    header: 'Longitude',
  },
        {
    key: 'alert',
    header: 'Alert',
  },
  
];

const validLocf = (e) => {

      if(!e.target.value.match(/^[a-zA-Z]+$/)){
              seterrstate(true)
              seterrtext("Only letters allowed. No special characters or numbers");
              setbuttonstate(true)
           }
      
      else{
            seterrstate(false)
            setbuttonstate(false)
        }        
        
        setlocation(e.target.value)
  
}

  function err1closef() {
    seterr1status(false);
  }
  function err2closef() {
    seterr2status(false);
  }

  return (
    <>
      
       <Form onSubmit={handleSubmit}>

      <TextInput id={'location'} labelText = {'Location*'} size = 'lg' invalid = {errstate} invalidText = {errtext} helperText="Input values only in alphabets - City/Town/Street." placeholder = {'Location'} value={location} onChange={validLocf} />
      <br/>
      <div className="ButtonArea">
        <Button type="submit" disabled = {buttonstate} > Get Extreme Weather Warning </Button>
      </div>
      
      </Form>
        
    {err1status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Location input is empty. Please fill a valid Location</span>}
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

        <Loading active = {isLoading} description="Active loading indicator" withOverlay={true}/>

         {geocodeobj.alerts &&  <div className = "TableDisplay" >

              
              {geocodeobj.alerts && 
          
          <DataTable rows={geocodeobj.alerts.alerts} headers={headers}>
              {({ rows, headers, getHeaderProps}) => 
            (
              <TableContainer title="Alerts Result">
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
                    {geocodeobj.alerts && 
               

                      <TableRow >

                        <TableCell>{geocodeobj.alerts.country}</TableCell>
                        <TableCell>{geocodeobj.alerts.state}</TableCell>
                        <TableCell>{geocodeobj.alerts.latitude}</TableCell>
                        <TableCell>{geocodeobj.alerts.longitude}</TableCell>
                        <TableCell>{alertdata}</TableCell>
                      </TableRow>

               
            }
                  </TableBody>
                </Table>
                 </TableContainer>
            )
                }
          </DataTable>}

        </div>}

    </>
  );
};

export default Alertw;
