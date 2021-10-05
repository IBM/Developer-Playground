import React, { useState} from 'react';
import raw from 'raw.macro';
import { Button,TextInput, Form, Loading, ToastNotification } from 'carbon-components-react';
import {DataTable,Table,TableHead,TableRow,TableHeader,TableBody,TableCell,TableContainer} from 'carbon-components-react';

function Weather1() {

  const [location, setlocation] = useState('');
  const [geocodeobj, setGeocodeobj] = useState({});
  const [errstate, seterrstate] = useState(false);
  const [errtext, seterrtext] = useState('A valid value is required');
  const [buttonstate, setbuttonstate] = useState(false);
  const [isLoading,setLoading] = useState(false);

  const [err1status, seterr1status] = useState(false);
  const [err2status, seterr2status] = useState(false);
  const [err3status, seterr3status] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (location) {
          
        const weathersv1 = async() => {

        try{
        
           if(process.env.REACT_APP_mode === "dev"){

            const authtoken = raw('./auth.txt');
            let headers = {'Authorization' : authtoken}
            let response = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${location}`,{ headers})
            let result = await response.json();

            let lat = result.items[0]["position"]["lat"].toString();
            let long = result.items[0]["position"]["lng"].toString();
            
            response = await fetch(`https://weather.cc.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude=${lat}&longitude=${long}`,{ headers})
            result = await response.json();

            setGeocodeobj({...result});
            setLoading(false);

          if(JSON.stringify(result.dailyForecasts) === '[]'){
            seterr3status(true);
            setGeocodeobj({});
          }
        }
        else{
            let response = await fetch(`/addrgeocode?queryst=${location}`);
            let result = await response.json();

            let lat = result.items[0]["position"]["lat"].toString();
            let long = result.items[0]["position"]["lng"].toString();

            response = await fetch(`/getweeklyforecast?lat=${lat}&long=${long}`);
            result = await response.json();

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
          weathersv1();
          setlocation('');
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
function err3closef() {
  seterr3status(false);
}


  return (
    <>

    <Form onSubmit={handleSubmit}>

      <TextInput id={'location'} labelText = {'Location*'} size = 'lg' invalid = {errstate} invalidText = {errtext} helperText="Input values only in alphabets - City/Town/Street." placeholder = {'Location'} value={location} onChange={validLocf} />
      <br/>
      <div className="ButtonArea">
         <Button type="submit" disabled = {buttonstate} > Get Weather Forecast </Button>
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
  
  {err3status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>No results available</span>}
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

export default Weather1;
