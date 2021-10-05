import React, { useState} from 'react';
import raw from 'raw.macro';
import { Button,TextInput, Form, Loading, ToastNotification } from 'carbon-components-react';
import {DataTable,Table,TableHead,TableRow,TableHeader,TableBody,TableCell,TableContainer} from 'carbon-components-react';

function Weather2() {

  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [geocodeobj, setGeocodeobj] = useState({});
  const [isLoading,setLoading] = useState(false);
  const [lterrstate, setlterrstate] = useState(false);
  const [lngerrstate, setlngerrstate] = useState(false);
  const [lterrtext, setlterrtext] = useState('A valid value is required');
  const [lnerrtext, setlnerrtext] = useState('A valid value is required');
  const [buttonstate, setbuttonstate] = useState(false);

  const [err1status, seterr1status] = useState(false);
  const [err2status, seterr2status] = useState(false);
  const [err3status, seterr3status] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (latitude && longitude) {
      
        const weathersv2 = async() => {

        try{
        
          if(process.env.REACT_APP_mode === "dev"){

            const authtoken = raw('./auth.txt');
            let headers = {'Authorization' : authtoken}
            let response = await fetch(`https://weather.cc.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude=${latitude}&longitude=${longitude}`,{ headers})
            let result = await response.json();
            
            setGeocodeobj({...result});
            setLoading(false);
          
            if(JSON.stringify(result.dailyForecasts) === '[]'){
            seterr3status(true); 
            setGeocodeobj({});
          }
        }

        else{
            let response = await fetch(`/getweeklyforecast?lat=${latitude}&long=${longitude}`);
            let result = await response.json();

          setGeocodeobj({...result});
          setLoading(false);
          if(JSON.stringify(result.dailyForecasts) === '[]'){
            seterr3status(true); 
            setGeocodeobj({});
          }
        }

        }
        catch(error){
            seterr2status(true);
            setLoading(false);
        }

        }
          weathersv2();
          setlatitude('');
          setlongitude('');
      }
      
      else {
      seterr1status(true);
      setLoading(false);
    }
  };


const headers = [
  {
    key: 'day',
    header: 'Day',
  },
  {
    key: 'description',
    header: 'Description',
  },
    {
    key: 'max temperature',
    header: 'Max Temperature',
  },
      {
    key: 'min temperature',
    header: 'Min Temperature',
  },
        {
    key: 'weathericon',
    header: '',
  },
  
];

const validLatf = (e) => {

         if(!e.target.value.match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?){2}$/)){
              setlterrstate(true)
              setlterrtext("Only valid co-ordinates allowed. No characters");
              setbuttonstate(true)
           }
        else{
            setlterrstate(false)
            setbuttonstate(false)
        }        
        
        setlatitude(e.target.value)
    
    
}
const validLongf = (e) => {

         if(!e.target.value.match(/^\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?){2}$/)){
              setlngerrstate(true)
              setlnerrtext("Only valid co-ordinates allowed. No characters");
              setbuttonstate(true)
           }
        else{
            setlngerrstate(false)
            setbuttonstate(false)
        }        
        
        setlongitude(e.target.value)
    
    
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
    <>

      <Form onSubmit={handleSubmit}>

    <div className="TextArea" >
      <TextInput id={'latitude'} labelText = {'Latitude*'} size = 'lg' invalid = {lterrstate} invalidText = {lterrtext}  helperText="Add valid co-ordinates." placeholder = {'Latitude'} value={latitude} onChange={validLatf} /> <br/>
    </div>
    <div className="TextArea" >  
      <TextInput id={'longitude'} labelText = {'Longitude*'} size = 'lg' invalid = {lngerrstate} invalidText = {lnerrtext} helperText="Add valid co-ordinates." placeholder = {'Longitude'} value={longitude} onChange={validLongf} />
    </div>  
      <br/>
       <div className="CButtonArea">
         <Button type="submit" disabled = {buttonstate} > Get Weather Forecast </Button>
       </div>

      </Form>


       {err1status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Latitude, Longitude values cannot be empty</span>}
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
        subtitle={<span>No data results available</span>}
        timeout={3000}
        onClose = {err3closef}
        title="Error Notification"
      />
      }

      <Loading active = {isLoading} description="Active loading indicator" withOverlay={true}/>


         {geocodeobj.dailyForecasts &&     
        
        <div className = "TableDisplay">

              {geocodeobj.dailyForecasts && 
          
          <DataTable rows={geocodeobj.dailyForecasts.forecastLocation.forecast} headers={headers}>
              {({ rows, headers, getHeaderProps}) => 
            (
              <TableContainer title="Weather Results">
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
                    {geocodeobj.dailyForecasts && geocodeobj.dailyForecasts.forecastLocation.forecast.map((row, index) => {
                return (

                      <TableRow key={index} >

                        <TableCell>{row.weekday}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>{row.highTemperature}</TableCell>
                        <TableCell>{row.lowTemperature}</TableCell>
                        <TableCell><img src={row.iconLink} alt="Logo" /></TableCell>
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

    </>
  );
};

export default Weather2;
