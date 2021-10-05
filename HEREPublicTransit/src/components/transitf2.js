import React, { useState} from 'react';
import raw from 'raw.macro';
import { Button,TextInput, Form, Link, Loading, ToastNotification } from 'carbon-components-react';
import {DataTable,Table,TableHead,TableRow,TableHeader,TableBody,TableCell,TableContainer} from 'carbon-components-react';

function Transit2(){

  const [location, setlocation] = useState('');
  const [radius, setradius] = useState('');
  const [geocodeobj, setGeocodeobj] = useState({});
  const [depobj, setdepobj] = useState({});

  const [locerrstate, setlocerrstate] = useState(false);
  const [locerrtext, setlocerrtext] = useState('A valid value is required');
  const [raderrstate, setraderrstate] = useState(false);
  const [raderrtext, setraderrtext] = useState('A valid value is required');
  const [buttonstate, setbuttonstate] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [err1status, seterr1status] = useState(false);
  const [err2status, seterr2status] = useState(false);
  const [err3status, seterr3status] = useState(false);
  const [err4status, seterr4status] = useState(false);

    const departureSubmit = (depval) => {
    setLoading(true);
    displaydeparture(depval);

  }

  const displaydeparture = (depvalue) => {

    setdepobj(geocodeobj.boards[depvalue].departures);
    setLoading(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
      
    if (location && radius) {

        const transt1 = async() => {

        try{

           if(process.env.REACT_APP_mode === "dev"){
            const authtoken = raw('./auth.txt');
            let headers = {'Authorization' : authtoken}
            let response = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${location}`,{ headers})
            let result = await response.json();
            let locstr = [result.items[0]["position"]["lat"].toString(),result.items[0]["position"]["lng"].toString()].toString().concat(";r=").concat(radius);
            
            response = await fetch(`https://transit.hereapi.com/v8/departures?in=${locstr}`,{ headers})
            result = await response.json();

            setGeocodeobj({...result});
            setLoading(false);

            if(JSON.stringify(result.boards) === '[]'){
              seterr3status(true); 
              setGeocodeobj({});
            }
            if(result.hasOwnProperty('title')){
              seterr4status(true); 
              setGeocodeobj({});
            }

          }
          else{    
            let response = await fetch(`/addrgeocode?queryst=${location}`);
            let result = await response.json();

            let locstr = [result.items[0]["position"]["lat"].toString(),result.items[0]["position"]["lng"].toString()].toString().concat(";r=").concat(radius);
            
            response = await fetch(`/getdepartures?location=${locstr}`);
            result = await response.json();            

          setGeocodeobj({...result});
          setLoading(false);

          if(JSON.stringify(result.boards) === '[]'){
             seterr3status(true); 
             setGeocodeobj({});
          }
          if(result.hasOwnProperty('title')){
            seterr4status(true); 
            setGeocodeobj({});
          }
        }
 
        }
        catch(error){
            seterr2status(true);
            setLoading(false);
        }

        }
      
        transt1();
        setlocation('');
        setradius('');
      }
      else {
      seterr1status(true);
      setLoading(false);
    }
  };

const headers = [
  {
    key: 'name',
    header: 'Name',
  },
    {
    key: 'location',
    header: 'Location',
  },
      {
    key: 'listing',
    header: '',
  },
];

const headers1 = [
  {
    key: 'departure time',
    header: 'Departure Time',
  },
    {
    key: 'departure transport',
    header: 'Mode of Transport',
  },
  {
    key: 'departure point',
    header: 'Destination'
  }
];

function capitalize(word) {
  return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

const validLocf = (e) => {

         if(!e.target.value.match(/^[a-zA-Z]+$/)){
              setlocerrstate(true)
              setlocerrtext("Only letters allowed. No special characters or numbers");
              setbuttonstate(true)
           }
        else{
            setlocerrstate(false)
            setbuttonstate(false)
        }        
        
        setlocation(e.target.value)
    
    
}

const validRadf = (e) => {

         if(!e.target.value.match(/^[0-9]*$/)){
              setraderrstate(true)
              setraderrtext("Only numbers allowed. No special characters or letters");
              setbuttonstate(true)
           }
        else{
            setraderrstate(false)
            setbuttonstate(false)
        }        
        
        setradius(e.target.value)
    
    
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

  return (
    <>

      <Form onSubmit={handleSubmit}>

      <div className="TextArea" >
        <TextInput id={'location'} labelText = {'Location*'} invalid = {locerrstate} invalidText = {locerrtext} helperText="Input values only in alphabets - City/Town/Street." placeholder = {'Location'} size = 'lg' value={location} onChange={validLocf} />
      </div>
      <div className="TextArea" >
        <TextInput id={'radius'} labelText = {'Radius in metres*'} invalid = {raderrstate} invalidText = {raderrtext} placeholder = {'Radius'} helperText="Input value in numbers." size = 'lg' value={radius} onChange={validRadf} />
      </div>

       <div className="ButtonArea">
          <Button type="submit" disabled = {buttonstate}> Get Places Near You </Button>
      </div>
      </Form>

      {err1status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Location, Radius values should not be empty</span>}
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
        subtitle={<span>No Departures Found</span>}
        timeout={3000}
        onClose = {err3closef}
        title="Error Notification"
      />
      }
  
  {err4status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Invalid input. Radius must be in range of 0-999999999 metres</span>}
        timeout={3000}
        onClose = {err4closef}
        title="Error Notification"
      />
      }

    <Loading active = {isLoading} description="Active loading indicator" withOverlay={true}/>

     {geocodeobj.boards && 
        <div className = "TableDisplay">

            {geocodeobj.boards && 
          
          <DataTable rows={geocodeobj.boards} headers={headers}>
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
                    {geocodeobj.boards && geocodeobj.boards.map((row, index) => {
                return (

                      <TableRow key={index} >

                        <TableCell>{row.place.name}</TableCell>
                        <TableCell>{row.place.location.lat + "," + row.place.location.lng}</TableCell>
                        <TableCell><Link onClick={() => departureSubmit(index)}>List Destinations</Link></TableCell>
                      </TableRow>

                );
            })}
                  </TableBody>
                </Table>
                </TableContainer>
            )
                }
          </DataTable>}

          <br/>
          <br/>
          
          {depobj[0] && 
          
          <DataTable rows={depobj} headers={headers1}>
              {({ rows, headers, getHeaderProps}) => 
            (
              <TableContainer title="Destination Results">
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
                    {depobj && depobj.map((row, index) => {
                return (

                      <TableRow key={index} >

                        <TableCell>{row.time}</TableCell>
                        <TableCell>{capitalize(row.transport.mode)}</TableCell>
                        <TableCell>{row.transport.headsign}</TableCell>
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

export default Transit2;
