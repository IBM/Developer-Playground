/* eslint-disable */
import React, { useState} from 'react';
import { Button,TextInput, Form, Select, SelectItem, Loading, ToastNotification } from 'carbon-components-react';
 import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell
} from 'carbon-components-react';
import H from "@here/maps-api-for-javascript";
import 'here-js-api/styles/mapsjs-ui.css';

function Mapf1(){

  const [fromcoord,setfromcoord] = useState('');
  const [tocoord,settocoord] = useState('');
  const [fcerrstate, setfcerrstate] = useState(false);
  const [fcerrtext, setfcerrtext] = useState('A valid value is required');
  const [tcerrstate, settcerrstate] = useState(false);
  const [tcerrtext, settcerrtext] = useState('A valid value is required');
  const [buttonstate, setbuttonstate] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [err1status, seterr1status] = useState(false);
  const [err2status, seterr2status] = useState(false);
  const [err3status, seterr3status] = useState(false);

  const [routeaxnobj, setrouteaxnobj] = useState({});
  const [routesummary, setroutesummary] = useState('');

  const modes = [
  {
    id: 'car',
    value: 'Drive a Car',
  },
  {
    id: 'pedestrian',
    value: 'Let me Walk',
  },
  {
    id: 'pubtransport',
    value: 'Use Public Transport',
  },
];


 const [modequery, setmodequery] = useState(modes[0].id);
 const [mapdisplay1,setmapdisplay1] = useState('');

 const handleModeChange = (event) => {
    setmodequery(event.target.value);
  }

    function toMMSS(duration) {
        return Math.floor(duration / 60) + ' minutes ' + (duration % 60) + ' seconds.';
     }

   const handleSubmit = (e) => {
      e.preventDefault(); 
      setLoading(true);
      setmapdisplay1('Route')

    if (fromcoord && tocoord) {

        const mapsv = async() => {

        try{

          let apikey;

          if(process.env.REACT_APP_mode === "dev"){
            apikey = process.env.REACT_APP_APIKEY;
          }
          else{

           let keyresponse = await fetch('/getapikey');
           let keyresult = await keyresponse.json();
           apikey = keyresult["apikey"];

          }

          if(modequery === "pubtransport"){

          function calculateRouteFromAtoB (platform) {
            var router = platform.getPublicTransitService(),
                routeRequestParams = {
                  origin: fromcoord,
                  destination: tocoord,
                  return: 'polyline,actions,travelSummary'
                };


            router.getRoutes(
              routeRequestParams,
              onSuccess,
              onError
            );
          }

          function onSuccess(result) {
            var route = result.routes[0];
            addRouteShapeToMap(route);
            addManueversToMap(route);
            addManueversToPanel(route);
            addSummaryToPanel(route);
          }

          function onError(error) {
            document.getElementById('map').innerHTML = "";
            setrouteaxnobj({});
            seterr3status(true); 
          }

          document.getElementById('map').innerHTML = "";
          setrouteaxnobj({});

          var mapContainer = document.getElementById('map');

          var platform = new H.service.Platform({
            apikey: apikey
          });
          var defaultLayers = platform.createDefaultLayers();

          var map = new H.Map(mapContainer,
            defaultLayers.vector.normal.map,{
            center: {lat:52.5160, lng:13.3779},
            zoom: 13,
            pixelRatio: window.devicePixelRatio || 1
          });

          window.addEventListener('resize', () => map.getViewPort().resize());

          var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

          var ui = H.ui.UI.createDefault(map, defaultLayers);

          var bubble;

          function openBubble(position, text){
          if(!bubble){
              bubble =  new H.ui.InfoBubble(
                position,
                {content: text});
              ui.addBubble(bubble);
            } else {
              bubble.setPosition(position);
              bubble.setContent(text);
              bubble.open();
            }
          }

          function addRouteShapeToMap(route){

            try{
            var group = new H.map.Group();
            route.sections.forEach(function(section) {
              group.addObject(
                new H.map.Polyline(
                  H.geo.LineString.fromFlexiblePolyline(section.polyline), {
                    style: {
                      lineWidth: 4,
                      strokeColor: 'rgba(0, 128, 255, 0.7)'
                    }
                  }
                )
              );
            });

            map.addObject(group);
            map.getViewModel().setLookAtData({
              bounds: group.getBoundingBox()
            });
            }
          catch(err){
            document.getElementById('map').innerHTML = "";
            setrouteaxnobj({});
            seterr2status(true);
          }
          }

          function addManueversToMap(route){
            try{
            var svgMarkup = '<svg width="18" height="18" ' +
              'xmlns="http://www.w3.org/2000/svg">' +
              '<circle cx="8" cy="8" r="8" ' +
                'fill="#1b468d" stroke="white" stroke-width="1"  />' +
              '</svg>',
              dotIcon = new H.map.Icon(svgMarkup, {anchor: {x:8, y:8}}),
              group = new  H.map.Group(),
              i;

              route.sections.forEach((section) => {
                let poly = H.geo.LineString.fromFlexiblePolyline(section.polyline).getLatLngAltArray();
              
                let actions = section.actions;
                if (actions) {
                  for (i = 0;  i < actions.length; i += 1) {
                    let action = actions[i];
                    var marker =  new H.map.Marker({
                      lat: poly[action.offset * 3],
                      lng: poly[action.offset * 3 + 1]},
                      {icon: dotIcon});
                    marker.instruction = action.instruction;
                    group.addObject(marker);
                  }
                }
              });

              group.addEventListener('tap', function (evt) {
                map.setCenter(evt.target.getGeometry());
                openBubble(
                  evt.target.getGeometry(), evt.target.instruction);
              }, false);
            
              map.addObject(group);
              }
          catch(err){
            document.getElementById('map').innerHTML = "";
            setrouteaxnobj({});
          }
          }


         function addSummaryToPanel(route) {

                try{
                    let distance = route.sections[0].travelSummary.length.toString();
                    let duration = toMMSS(route.sections[0].travelSummary.duration).toString();
                    let str = "Route Distance and Duration: " + distance + ' m,  ' + duration
                    setroutesummary(str)
                }
                
                catch(err){
                  //console.log(err);
                  document.getElementById('map').innerHTML = "";
                  setrouteaxnobj({});
                }
            }

            function addManueversToPanel(route) {
                try{
                    setrouteaxnobj(route.sections[0]);
                }

                catch(err){
                    document.getElementById('map').innerHTML = "";
                    setrouteaxnobj({});
                    //console.log("Results unavailable");
                    }
            }
          
           

          setTimeout(() => setLoading(false),5000);
          calculateRouteFromAtoB (platform);
          
          }

          else{

            function calculateRouteFromAtoB(platform) {
              var router = platform.getRoutingService(null, 8),
                  routeRequestParams = {
                    routingMode: 'fast',
                    transportMode: modequery,
                    origin: fromcoord,
                    destination: tocoord,
                    return: 'polyline,turnByTurnActions,actions,instructions,travelSummary'
                  };

              router.calculateRoute(
                routeRequestParams,
                onSuccess,
                onError
              );
            }

            function onSuccess(result) {
              var route = result.routes[0];

              addRouteShapeToMap(route);
              addManueversToMap(route);
              addManueversToPanel(route);
              addSummaryToPanel(route);
            }


            function onError(error) {
              
              document.getElementById('map').innerHTML = "";
              setrouteaxnobj({});
              seterr3status(true); 
            }

            document.getElementById('map').innerHTML = "";
            setrouteaxnobj({});

            var mapContainer = document.getElementById('map')

            var platform = new H.service.Platform({
              apikey: apikey
            });

            var defaultLayers = platform.createDefaultLayers();

            var map = new H.Map(mapContainer,
              defaultLayers.vector.normal.map, {
              center: {lat: 52.5160, lng: 13.3779},
              zoom: 13,
              pixelRatio: window.devicePixelRatio || 1
            });

            window.addEventListener('resize', () => map.getViewPort().resize());

              var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
              
              var ui = H.ui.UI.createDefault(map, defaultLayers);
              
              var bubble;

            function openBubble(position, text) {
              if (!bubble) {
                bubble = new H.ui.InfoBubble(
                  position,
                  {content: text});
                ui.addBubble(bubble);
              } else {
                bubble.setPosition(position);
                bubble.setContent(text);
                bubble.open();
              }
            }

            function addRouteShapeToMap(route) {
              try{
              route.sections.forEach((section) => {
                let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

                let polyline = new H.map.Polyline(linestring, {
                  style: {
                    lineWidth: 4,
                    strokeColor: 'rgba(0, 128, 255, 0.7)'
                  }
                });

                map.addObject(polyline);
                map.getViewModel().setLookAtData({
                  bounds: polyline.getBoundingBox()
                });
              });
            }
              catch(err){
                seterr2status(true);
                document.getElementById('map').innerHTML = "";
                setrouteaxnobj({});
              }
            }


            function addManueversToMap(route) {

              var svgMarkup = '<svg width="18" height="18" ' +
                'xmlns="http://www.w3.org/2000/svg">' +
                '<circle cx="8" cy="8" r="8" ' +
                  'fill="#1b468d" stroke="white" stroke-width="1" />' +
                '</svg>',
                dotIcon = new H.map.Icon(svgMarkup, {anchor: {x:8, y:8}}),
                group = new H.map.Group(),
                i,
                j;

              try{
              route.sections.forEach((section) => {
                let poly = H.geo.LineString.fromFlexiblePolyline(section.polyline).getLatLngAltArray();

                let actions = section.actions;
                for (i = 0; i < actions.length; i += 1) {
                  let action = actions[i];
                  var marker = new H.map.Marker({
                    lat: poly[action.offset * 3],
                    lng: poly[action.offset * 3 + 1]},
                    {icon: dotIcon});
                  marker.instruction = action.instruction;
                  group.addObject(marker);
                }

                group.addEventListener('tap', function (evt) {
                  map.setCenter(evt.target.getGeometry());
                  openBubble(evt.target.getGeometry(), evt.target.instruction);
                }, false);

                map.addObject(group);
              });
            }
            catch(err){
              document.getElementById('map').innerHTML = "";
              setrouteaxnobj({});
            }
            }

            
            function addSummaryToPanel(route) {

                try{
                    let distance = route.sections[0].travelSummary.length.toString();
                    let duration = toMMSS(route.sections[0].travelSummary.duration).toString();
                    let str = "Route Distance and Duration: " + distance + ' m,  ' + duration
                    setroutesummary(str)
                }
                
                catch(err){
                  //console.log(err);
                  document.getElementById('map').innerHTML = "";
                  setrouteaxnobj({});
                }
            }


            function addManueversToPanel(route) {
                try{
                    setrouteaxnobj(route.sections[0]);
                }

                catch(err){
                    document.getElementById('map').innerHTML = "";
                    setrouteaxnobj({});
                    //console.log("Results unavailable");
                    }
            }
            
            setTimeout(() => setLoading(false),5000);
            calculateRouteFromAtoB(platform);
            
            }

          }

        catch(error){
          setLoading(false);
          seterr2status(true);
        }

        }
        setTimeout(mapsv, 2000);
        setfromcoord('');
        settocoord('');
      }
    else {
      setLoading(false);
      seterr1status(true);
    }
    };


const validfCoordf = (e) => {

         if(!e.target.value.match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?){2}$/)){
              setfcerrstate(true)
              setfcerrtext("Only valid co-ordinates allowed. No characters");
              setbuttonstate(true)
              
           }
        else{
            setfcerrstate(false)
            setbuttonstate(false)
        }       
        setfromcoord(e.target.value)
    
    
}
const validtCoordf = (e) => {

         if(!e.target.value.match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?){2}$/)){
              settcerrstate(true)
              settcerrtext("Only valid co-ordinates allowed. No characters");
              setbuttonstate(true)
              
           }
        else{
            settcerrstate(false)
            setbuttonstate(false)
        }                
        settocoord(e.target.value)
    
    
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

    const headers = [
  {
    key: 'routesummary',
    header: routesummary,
  }
];

  return(
    <>    
        <Form onSubmit={handleSubmit}>

            <div className="TextArea" >
            <TextInput id={'fromcoord'} labelText = {'From*'} placeholder = {'From Co-ordinates'} invalid = {fcerrstate} invalidText = {fcerrtext} size = 'lg' value={fromcoord} onChange={validfCoordf} />
            </div>
            <div className="TextArea" >
            <TextInput id={'tocoord'} labelText = {'To*'} placeholder = {'To Co-ordinates'} invalid = {tcerrstate} invalidText = {tcerrtext} size = 'lg' value={tocoord} onChange={validtCoordf} />
            </div>
              <Select labelText="Mode of Transport*" value={modequery} onChange={handleModeChange}>
                    {modes.map((item, i) => (
                    <SelectItem value={item.id} key={i} text = {item.value} />
                    ))}
              </Select>
              
             <div className="ButtonAreamap">
                <Button type="submit" disabled = {buttonstate} > Get my Route </Button>
             </div>

        </Form>

  {err1status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Latitude, Longitude values for the From and To locations should not be empty</span>}
        timeout={3000}
        onClose = {err1closef}
        title="Error Notification"
      />
      }

  {err2status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Results unavailable</span>}
        timeout={3000}
        onClose = {err2closef}
        title="Error Notification"
      />
      }

  {err3status && 
    <ToastNotification
        iconDescription="Close notification"
        subtitle={<span>Cannot reach remote server</span>}
        timeout={3000}
        onClose = {err3closef}
        title="Error Notification"
      />
      }

        <Loading active = {isLoading} description="Active loading indicator" withOverlay={true}/>

      <br/>

              { mapdisplay1 &&
              <div id = "route-display">
                <br/>
                <br/>
                  <div id = 'map' ></div>
                    <br/>
                </div>
              }  
            <br/>
            <br/>
            <br/>
      {routeaxnobj.actions && 
         <div className = "TableDisplay">


              {routeaxnobj.actions &&
          
          <DataTable rows={routeaxnobj.actions} headers={headers}>
              {({ rows, headers, getHeaderProps}) => 
            (
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
                    {routeaxnobj.actions && routeaxnobj.actions.map((row, index) => {

                        var direction = 'arrow ' + (row.direction || '') + row.action;
                return (

                      <TableRow key={index} >
                        <TableCell><span className={direction}></span> {row.instruction}</TableCell>
                      </TableRow>

                );
            })}
                  </TableBody>
                </Table>
            )
                }
          </DataTable>}

        </div>}      
            </>
            );
};

export default Mapf1;
