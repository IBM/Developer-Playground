import React, { useState} from 'react';
import raw from 'raw.macro';
import { Button,TextInput, Form, Loading, ToastNotification } from 'carbon-components-react';
import {DataTable,Table,TableHead,TableRow,TableHeader,TableBody,TableCell,TableContainer} from 'carbon-components-react';

function Transit1() {

  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [isLoading,setLoading] = useState(false);

  const [geocodeobj, setGeocodeobj] = useState({});
  const [errtext, seterrtext] = useState('A valid value is required');
  const [buttonstate, setbuttonstate] = useState(false);

  const [err1status, seterr1status] = useState(false);
  const [err2status, seterr2status] = useState(false);
  const [err3status, seterr3status] = useState(false);


    const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (latitude && longitude) {
          

      const locationstr = latitude.concat(',').concat(longitude);
      
        const searchsv2 = async() => {

        try{

         if(process.env.REACT_APP_mode === "dev"){
            const authtoken = raw('./auth.txt');
            let headers = {'Authorization' : authtoken}
            let response = await fetch(`https://transit.hereapi.com/v8/stations?in=${locationstr}`,{ headers})
            let result = await response.json();
            setGeocodeobj({...result});
          setLoading(false);

          if(JSON.stringify(result.stations) === '[]'){
             seterr3status(true);  
             setGeocodeobj({});
          }
         }
         else{            
            let response = await fetch(`/getstations?location=${locationstr}`);
            let result = await response.json();

          setGeocodeobj({...result});
          setLoading(false);

          if(JSON.stringify(result.stations) === '[]'){
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
      searchsv2();
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
    key: 'id',
    header: 'Id',
  },
  {
    key: 'name',
    header: 'Name',
  },
    {
    key: 'location',
    header: 'Location',
  },
];
const [lterrstate, setlterrstate] = useState(false);
const [lngerrstate, setlngerrstate] = useState(false);

const validLatf = (e) => {

         if(!e.target.value.match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?){2}$/)){
              setlterrstate(true)
              seterrtext("Only valid co-ordinates allowed. No characters");
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
              seterrtext("Only valid co-ordinates allowed. No characters");
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
        <TextInput id={'latitude'} labelText = {'Latitude*'} invalid = {lterrstate} invalidText = {errtext} helperText="Add valid co-ordinates." placeholder = {'Latitude'} size = 'lg' value={latitude} onChange={validLatf} />
      </div>
      <div className="TextArea" >
        <TextInput id={'longitude'} labelText = {'Longitude*'} invalid = {lngerrstate} invalidText = {errtext} helperText="Add valid co-ordinates." placeholder = {'Longitude'} size = 'lg' value={longitude} onChange={validLongf} />
      </div>
      <div className="ButtonArea">
        <Button type="submit" disabled = {buttonstate} > Get Transit Stations </Button>
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
        subtitle={<span>Stations not found</span>}
        timeout={3000}
        onClose = {err3closef}
        title="Error Notification"
      />
      }


    <Loading active = {isLoading} description="Active loading indicator" withOverlay={true}/>


 {geocodeobj.stations && 
         <div className = "TableDisplay">
            {geocodeobj.stations && 
          
          <DataTable rows={geocodeobj.stations} headers={headers}>
              {({ rows, headers, getHeaderProps}) => 
            (
              <TableContainer title="Public Transit Results">
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
                    {geocodeobj.stations && geocodeobj.stations.map((row, index) => {
                return (

                      <TableRow key={index} >

                        <TableCell>{row.place.id}</TableCell>
                        <TableCell>{row.place.name}</TableCell>
                        <TableCell>{row.place.location.lat + "," + row.place.location.lng}</TableCell>
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

export default Transit1;
