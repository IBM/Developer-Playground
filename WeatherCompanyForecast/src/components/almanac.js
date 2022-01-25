import React, { useState, useEffect} from 'react';
import { Button, TextInput, Form, Loading, ToastNotification } from 'carbon-components-react';
import {DataTable,Table,TableHead,TableRow,TableHeader,TableBody,TableCell,TableContainer,Select,SelectItem} from 'carbon-components-react';

function Almanac({maplat, maplong}) {

  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [geocodeobj, setGeocodeobj] = useState({});
  const [isLoading,setLoading] = useState(false);
  
  const [errtext, seterrtext] = useState('A valid value is required');
  const [buttonstate, setbuttonstate] = useState(false);
  const [lterrstate, setlterrstate] = useState(false);
  const [lngerrstate, setlngerrstate] = useState(false);

  const [err1status, seterr1status] = useState(false); 
  const [err2status, seterr2status] = useState(false);
  const [err3status, seterr3status] = useState(false);

  const [refmtobj, setrefmtobj] = useState({});
  const [unit,setunit] = useState('m');
  const [day,setday] = useState('7');
  const [stday,setstday] = useState('01');
  const [stmonth,setstmonth] = useState('01');


      useEffect(() => {

    function autofill() {
      setlatitude(maplat);
      setlongitude(maplong);
      setlterrstate(false);
      setlngerrstate(false)
      setbuttonstate(false)
    }
    autofill();
  }, [maplat,maplong]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
      

  if (latitude && longitude) {

        const locationstr = latitude.concat(',').concat(longitude);
      
        const geocode2 = async() => {

        try{
        
          let apikey;

          if(process.env.REACT_APP_mode === "dev"){
            apikey = process.env.REACT_APP_WEATHER_API_KEY;
          }
          else{

           let keyresponse = await fetch('/getapikey');
           let keyresult = await keyresponse.json();
           apikey = keyresult["apikey"];

          }

            let response = await fetch(`https://api.weather.com/v3/wx/almanac/daily/${day}day?geocode=${locationstr}&units=${unit}&startDay=${stday}&startMonth=${stmonth}&format=json&apiKey=${apikey}`)
            let result = await response.json();

            const res = [];
            for(let i = 0; i < result["almanacRecordDate"].length; i++){
                res.push({
                  date: result["almanacRecordDate"][i],
                  yrmax: result["almanacRecordYearMax"][i], 
                  yrmin: result["almanacRecordYearMin"][i],
                  precipavg: result["precipitationAverage"][i],
                  temprecmax: result["temperatureRecordMax"][i],
                  temprecmin: result["temperatureRecordMin"][i]
                });
            }
            setrefmtobj(res)

            let formatter = {"items": [result]}
            setGeocodeobj(formatter);
            setLoading(false);

        }
        catch(error){
            seterr2status(true);
            setLoading(false);
        }

        }
      geocode2();
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
    key: 'date',
    header: 'Record Date',
  },
  {
    key: 'yrmax',
    header: 'Record Year Max',
  },
    {
    key: 'yrmin',
    header: 'Record Year Min',
  },
    {
    key: 'precipavg',
    header: 'Average Precipitation',
  },
    {
    key: 'temprecmax',
    header: 'Max Recorded Temperature',
  },
      {
    key: 'temprecmin',
    header: 'Min Recorded Temperature',
  }

];

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

const unitset = [
  {
    id: 'm',
    text: 'Metric system'
  },
  {
    id: 'e',
    text: 'Imperial system'
  },
     
];

const dayset = [
  {
    id: '5',
    text: '5-day'
  },
    {
    id: '7',
    text: '7-day'
  },
    {
    id: '10',
    text: '10-day'
  },
    {
    id: '15',
    text: '15-day'
  },
    {
    id: '30',
    text: '30-day'
  },
    {
    id: '45',
    text: '45-day'
  }
     
];

const stdayset = [
  {
    id: '01',
    text: '1st'
  },
    {
    id: '02',
    text: '2nd'
  },
    {
    id: '03',
    text: '3rd'
  },
    {
    id: '04',
    text: '4th'
  },
    {
    id: '05',
    text: '5th'
  },
    {
    id: '06',
    text: '6th'
  },
      {
    id: '07',
    text: '7th'
  },
      {
    id: '08',
    text: '8th'
  },
      {
    id: '09',
    text: '9th'
  },
      {
    id: '10',
    text: '10th'
  },
      {
    id: '11',
    text: '11th'
  },
      {
    id: '12',
    text: '12th'
  },
      {
    id: '13',
    text: '13th'
  },
      {
    id: '14',
    text: '14th'
  },
      {
    id: '15',
    text: '15th'
  },
      {
    id: '16',
    text: '16th'
  },
      {
    id: '17',
    text: '17th'
  },
      {
    id: '18',
    text: '18th'
  },
      {
    id: '19',
    text: '19th'
  },
      {
    id: '20',
    text: '20th'
  },
      {
    id: '21',
    text: '21st'
  },
      {
    id: '22',
    text: '22nd'
  },
      {
    id: '23',
    text: '23th'
  },
      {
    id: '24',
    text: '24th'
  },
      {
    id: '25',
    text: '25th'
  },
      {
    id: '26',
    text: '26th'
  },
      {
    id: '27',
    text: '27th'
  },
      {
    id: '28',
    text: '28th'
  },
      {
    id: '29',
    text: '29th'
  },
      {
    id: '30',
    text: '30th'
  },
      {
    id: '31',
    text: '31st'
  }
];
const stmonthset = [
  {
    id: '01',
    text: 'Jan'
  },
    {
    id: '02',
    text: 'Feb'
  },
    {
    id: '03',
    text: 'Mar'
  },
    {
    id: '04',
    text: 'Apr'
  },
    {
    id: '05',
    text: 'May'
  },
    {
    id: '06',
    text: 'Jun'
  },
      {
    id: '07',
    text: 'Jul'
  },
      {
    id: '08',
    text: 'Aug'
  },
      {
    id: '09',
    text: 'Sep'
  },
      {
    id: '10',
    text: 'Oct'
  },
      {
    id: '11',
    text: 'Nov'
  },
      {
    id: '12',
    text: 'Dec'
  }   
];

const handleunitchoice = (event) => {
      //console.log(event.target.value);
      setunit(event.target.value);
}
const handledaychoice = (event) => {
      //console.log(event.target.value);
      setday(event.target.value);
}
const handlestdaychoice = (event) => {
      //console.log(event.target.value);
      setstday(event.target.value);
}
const handlestmonthchoice = (event) => {
      //console.log(event.target.value);
      setstmonth(event.target.value);
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

      <div className="TextArea" >
      <Select labelText="Choose number of days" size = "lg" value={day} onChange={handledaychoice}>
          {dayset.map((item, i) => (
              <SelectItem value={item.id} key={i} text = {item.text} />
                    ))}
      </Select>
      </div>

      <div className="TextArea" >
               <Select labelText="Choose units of measure" size = "lg" value={unit} onChange={handleunitchoice}>
          {unitset.map((item, i) => (
              <SelectItem value={item.id} key={i} text = {item.text} />
                    ))}
       </Select>
      </div>


      <div className="TextArea" >
                <Select labelText="Choose start day" size = "lg" value={stday} onChange={handlestdaychoice}>
          {stdayset.map((item, i) => (
              <SelectItem value={item.id} key={i} text = {item.text} />
                    ))}
      </Select>
      </div>
        
      <div className="TextArea" >
                <Select labelText="Choose start month" size = "lg" value={stmonth} onChange={handlestmonthchoice}>
          {stmonthset.map((item, i) => (
              <SelectItem value={item.id} key={i} text = {item.text} />
                    ))}
      </Select>
      </div>
        

      <div className="CButtonArea" >
        <Button type="submit" disabled = {buttonstate}> Get Almanac</Button>
      </div>

      </Form>

  {err1status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Latitude, Longitude  values cannot be empty</span>}
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


      {/* {JSON.stringify(geocodeobj)} */}

     {geocodeobj.items && 
         <div className = "TableDisplay">
              {geocodeobj.items && 
          
          <DataTable rows={geocodeobj.items} headers={headers}>
              {({ rows, headers, getHeaderProps}) => 
            (
              <TableContainer title="Almanac Results">
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
                    {refmtobj.map((row, index) => {
                return (
                    
                      <TableRow key={index} >
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.yrmax}</TableCell>
                        <TableCell>{row.yrmin}</TableCell>
                        <TableCell>{row.precipavg}</TableCell>
                        <TableCell>{row.temprecmax}</TableCell>
                        <TableCell>{row.temprecmin}</TableCell>
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

export default Almanac;
