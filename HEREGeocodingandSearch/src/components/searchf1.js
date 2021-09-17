import React, { useState} from 'react';
import raw from 'raw.macro';
import { Button,TextInput, Form, Loading, ToastNotification } from 'carbon-components-react';
import {DataTable,Table,TableHead,TableRow,TableHeader,TableBody,TableCell,TableContainer} from 'carbon-components-react';

const authtoken = raw('./auth.txt');

function Search1(){

  const [location, setlocation] = useState('');
  const [areaquery, setareaquery] = useState('');
  const [geocodeobj, setGeocodeobj] = useState({});
  const [isLoading,setLoading] = useState(false);
  const [errstate, seterrstate] = useState(false);
  const [errtext, seterrtext] = useState('A valid value is required');
  const [arerrstate, setarerrstate] = useState(false);
  const [arerrtext, setarerrtext] = useState('A valid value is required');
  const [buttonstate, setbuttonstate] = useState(false);

  const [err1status, seterr1status] = useState(false);
  const [err2status, seterr2status] = useState(false);
  const [err3status, seterr3status] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

     if (location && areaquery) {

        const searchstr = location.concat('+').concat(areaquery);

        const searchsv1 = async() => {

        try{
        
            const headers = {'Authorization' : authtoken}
            let response = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${searchstr}`,{ headers})
            let result = await response.json();

          setGeocodeobj({...result});
          setLoading(false);

          if(JSON.stringify(result.items) === '[]'){
            seterr3status(true);
            setGeocodeobj({});
          }
 
        }
        catch(error){
             seterr2status(true);
             setLoading(false);
        }
        }
         searchsv1();
         setlocation('');
         setareaquery('');
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
    key: 'address',
    header: 'Address',
  },
    {
    key: 'location',
    header: 'Location',
  },
];

const validLoc = (e) => {

      if(!e.target.value.match(/^[a-zA-Z]+$/)){
              seterrstate(true)
              seterrtext("Only letters allowed. No special characters or numbers");
              setbuttonstate(true)
          }
      else{
            seterrstate(false)
            setbuttonstate(false)
        }        
      setlocation(e.target.value);
}

const validArea = (e) => {

      if(!e.target.value.match(/^[a-zA-Z]+$/)){
              setarerrstate(true)
              setarerrtext("Only letters allowed. No special characters or numbers");
              setbuttonstate(true)
           }
      else{
            setarerrstate(false)
            setbuttonstate(false)
        }        

        setareaquery(e.target.value);
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
      <TextInput id={'location'} labelText = {'Location*'} size = 'lg' invalid = {errstate} invalidText = {errtext} helperText="Input values only in alphabets - City/Town/Street." placeholder = {'Location'} value={location} onChange={validLoc} /> <br/>
    </div>

     <div className="TextArea" >
      <TextInput id={'area-query'} labelText = {'Area*'} size = 'lg' invalid = {arerrstate} invalidText = {arerrtext} helperText="Input values only in alphabets - Public places/Hotels/Restaurants." placeholder = {'Query: Area/Address'} value={areaquery} onChange={validArea} />
      </div>
      
      <br/>
      <div className="CButtonArea">
        <Button type="submit" disabled = {buttonstate} > Get Places Near You </Button>
      </div>

      </Form>

      {err1status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Location and Area input is empty. Please fill a valid Location and area</span>}
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


       {geocodeobj.items && 
         <div className = "TableDisplay" >

                    {geocodeobj.items && 
          
          <DataTable rows={geocodeobj.items} headers={headers}>
              {({ rows, headers, getHeaderProps}) => 
            (
              <TableContainer title="Search Results">
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
                    {geocodeobj.items && geocodeobj.items.map((row, index) => {
                return (

                      <TableRow key={index} >

                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.address.label}</TableCell>
                        <TableCell>{row.position.lat + "," + row.position.lng}</TableCell>
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

export default Search1;
