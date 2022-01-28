/* eslint-disable */
import React, { useState} from 'react';
import { Button,TextInput, Form, Loading,ToastNotification } from 'carbon-components-react';
import {DataTable,Table,TableHead,TableRow,TableHeader,TableBody,TableCell,TableContainer} from 'carbon-components-react';

import raw from 'raw.macro';
import H from "@here/maps-api-for-javascript";
import 'here-js-api/styles/mapsjs-ui.css';
const apikey = process.env.REACT_APP_APIKEY;
const authtoken = raw('./auth.txt');

function Localweather({setmaplat, setmaplong}){

  const [fromloc,setfromloc] = useState('');
  const [ferrstate, setferrstate] = useState(false);
  const [ferrtext, setferrtext] = useState('A valid value is required');
  const [buttonstate, setbuttonstate] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [lang,setlang] = useState('en-US');

  const [mapdisplay,setmapdisplay] = useState('');
  const [refmtobj, setrefmtobj] = useState({});
  const [geocodeobj, setGeocodeobj] = useState({});

  const [err1status, seterr1status] = useState(false); 
  const [err2status, seterr2status] = useState(false); 
  const [err3status, seterr3status] = useState(false); 
  const [err4status, seterr4status] = useState(false); 

  const headers = [
  {
    key: 'day',
    header: 'Day of Week',
  },
  {
    key: 'forecast',
    header: 'Forecast',
  },
];

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

function listenMapTap(map) {

    map.addEventListener('tap', function (evt) {

    var mapcoord = map.screenToGeo(evt.currentPointer.viewportX,
            evt.currentPointer.viewportY);

    var coordlat = Math.abs(mapcoord.lat.toFixed(4)) + ((mapcoord.lat > 0) ? 'N' : 'S').toString();
    var coordlong = Math.abs(mapcoord.lng.toFixed(4)) + ((mapcoord.lng > 0) ? 'E' : 'W').toString();

    if(coordlat.charAt(coordlat.length - 1) === "S"){
      coordlat = Number(coordlat.slice(0, -1)) * -1
    }
    else{
      coordlat = Number(coordlat.slice(0, -1))
    }

    if(coordlong.charAt(coordlong.length - 1) === "W"){
      coordlong = Number(coordlong.slice(0, -1)) * -1
    }
    else{
      coordlong = Number(coordlong.slice(0, -1))
    }

    setmaplat(coordlat.toString());
    setmaplong(coordlong.toString());

    })
}

 function setUpClickListener(map,dfl) {

  map.addEventListener('tap', function (evt) {
    var coord = map.screenToGeo(evt.currentPointer.viewportX,
            evt.currentPointer.viewportY);

    console.log(Math.abs(coord.lat.toFixed(4)) +
        ((coord.lat > 0) ? 'N' : 'S') +
        ' ' + Math.abs(coord.lng.toFixed(4)) +
         ((coord.lng > 0) ? 'E' : 'W'))

    var latcoord = Math.abs(coord.lat.toFixed(4)) + ((coord.lat > 0) ? 'N' : 'S').toString();
    var longcoord = Math.abs(coord.lng.toFixed(4)) + ((coord.lng > 0) ? 'E' : 'W').toString();

    if(latcoord.charAt(latcoord.length - 1) === "S"){
      latcoord = Number(latcoord.slice(0, -1)) * -1
    }
    else{
      latcoord = Number(latcoord.slice(0, -1))
    }

    if(longcoord.charAt(longcoord.length - 1) === "W"){
      longcoord = Number(longcoord.slice(0, -1)) * -1
    }
    else{
      longcoord = Number(longcoord.slice(0, -1))
    }

            const geocode2 = async() => {

                setLoading(true);


        try{

          var locationstr = latcoord.toString().concat(',').concat(longcoord.toString());
          console.log(locationstr);
        
          // if(process.env.REACT_APP_mode === "dev"){
            // let headers = {'Authorization' : authtoken}
            

            // short weather
            let response = await fetch(`https://api.weather.com/v3/wx/observations/current?geocode=${locationstr}&format=json&units=e&language=${lang}&apiKey=${process.env.REACT_APP_WEATHER_API_KEY}`)
            let result = await response.json();

            
            // setshortwx(result["wxPhraseShort"].toString())
            console.log(result["wxPhraseShort"].toString());

            //setshortweather(result["wxPhraseShort"].toString())
                            var bubble = new H.ui.InfoBubble({ lng: longcoord, lat: latcoord }, {
                    content: `<b> The weather is ${result["wxPhraseShort"].toString()}</b>`
                });
                //Add info bubble to the UI:

                var ui = H.ui.UI.createDefault(map, dfl);
                ui.addBubble(bubble);
                
                setTimeout(function() {
                let bubbles = ui.getBubbles()

                  bubbles.forEach((bubble) => {
                        bubble.close()
                  });
                
              }, 2000);

              // week forecast
               response = await fetch(`https://api.weather.com/v3/wx/forecast/daily/7day?geocode=${locationstr}&format=json&units=e&language=${lang}&apiKey=${process.env.REACT_APP_WEATHER_API_KEY}`)
               result = await response.json();

            //const mapArrays = (result["dayOfWeek"], result["narrative"]) => {
            const res = [];
            for(let i = 0; i < result["dayOfWeek"].length; i++){
                res.push({
                  day: result["dayOfWeek"][i],
                  forecast: result["narrative"][i]
                });
            }
            setrefmtobj(res)


            let formatter = {"items": [result]}
            setGeocodeobj(formatter);
            setLoading(false);
    
          }
          catch(error){
            //console.log("issue with obtaining forecast data");
              seterr2status(true);
              setLoading(false);
              setmapdisplay('');
              setGeocodeobj({})
          }
        }
         geocode2();


  });
}

function setMap(latc,longc){
  var platform = new H.service.Platform({
              apikey: apikey
            });

            var defaultLayers = platform.createDefaultLayers();

            var map = new H.Map(document.getElementById('map'),
              defaultLayers.vector.normal.map, {
            center:{lat: latc,lng:longc},
              zoom: 11,
              pixelRatio: window.devicePixelRatio || 1
            });

            window.addEventListener('resize', () => map.getViewPort().resize());

            setUpClickListener(map,defaultLayers); 
            listenMapTap(map); 

            var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));           

}
 
 const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setmapdisplay('Route');

    if (fromloc ) {
   
        const mapsv2 = async() => {

        try{
            
            const headers = {'Authorization' : authtoken}
            let fresponse = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${fromloc}`,{ headers})
            let fresult = await fresponse.json();

            const from = [fresult.items[0]["position"]["lat"].toString(),fresult.items[0]["position"]["lng"].toString()];
            
            document.getElementById('map').innerHTML = "";

            setMap(from[0],from[1]);            
          }

           catch(error){
              seterr3status(true);
              setLoading(false);
              setmapdisplay('');
              setGeocodeobj({})
            }

    }
      mapsv2();
      setfromloc('');
      setLoading(false);
  }
  
  else {
      seterr1status(true);
      setLoading(false);
    }
  };
           

    const validfLocf = (e) => {

      if(!e.target.value.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)){
        setferrstate(true)
        setferrtext("Only letters allowed. No special characters or numbers");
        setbuttonstate(true)
        }
      
        else{
          setferrstate(false)
          setbuttonstate(false)
        }                            
      setfromloc(e.target.value)
                
                
      }


            return(
             <>
            
        <Form onSubmit={handleSubmit}>

        <div className="TextArea" >
          <TextInput id={'fromloc'} labelText = {'Location'} invalid = {ferrstate} invalidText = {ferrtext} placeholder = {'Location'} size = 'lg' value={fromloc} onChange={validfLocf} />
        </div>
     
             <div className="CButtonArea" >
                <Button type="submit" disabled = {buttonstate} > Get Local Weather </Button>
                {/* <span style={{marginLeft:24}}></span>
                <Button kind="tertiary" onClick={autoFillValues} >AutoFill LatLong</Button> */}
             </div>

        </Form>

        <Loading active = {isLoading} description="Active loading indicator" withOverlay={true}/>


        <div className="mapweather">
            
            { mapdisplay &&
                <div id = 'map' ></div>

                }
        
      {geocodeobj.items && 
         <div className = "TableDisplaymapw">
              {geocodeobj.items && 
          
          <DataTable rows={geocodeobj.items} headers={headers}>
              {({ rows, headers, getHeaderProps}) => 
            (
              <TableContainer title="Weather Forecast Results">
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
                        <TableCell>{row.day}</TableCell>
                        <TableCell>{row.forecast}</TableCell>
                      
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

  </div>
    {err1status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Location cannot be empty</span>}
        timeout={3000}
        onClose = {err1closef}
        title="Error Notification"
      />
      }
    
    {err2status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Error obtaining weather data</span>}
        timeout={3000}
        onClose = {err2closef}
        title="Error Notification"
      />
      }
          {err3status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Error obtaining map data</span>}
        timeout={3000}
        onClose = {err3closef}
        title="Error Notification"
      />
      }
    
    {err4status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Cannot Auto-fill</span>}
        timeout={3000}
        onClose = {err4closef}
        title="Error Notification"
      />
      }

            </>
            );
};

export default Localweather;
