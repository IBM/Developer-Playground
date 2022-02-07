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
  TableCell,
  TableContainer
} from 'carbon-components-react';
import H from "@here/maps-api-for-javascript";
import 'here-js-api/styles/mapsjs-ui.css';
import raw from 'raw.macro';

function Mapf2(){

  const [fromloc,setfromloc] = useState('');
  const [toloc,settoloc] = useState('');
  const [ferrstate, setferrstate] = useState(false);
  const [ferrtext, setferrtext] = useState('A valid value is required');
  const [terrstate, setterrstate] = useState(false);
  const [terrtext, setterrtext] = useState('A valid value is required');
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
 const [mapdisplay,setmapdisplay] = useState('');
 
 const handleModeChange = (event) => {
    setmodequery(event.target.value);
  }

    function toMMSS(duration) {
        return Math.floor(duration / 60) + ' minutes ' + (duration % 60) + ' seconds.';
    }

  const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setmapdisplay('Route')

    if (fromloc && toloc) {
   
        const mapsv2 = async() => {

        try{

          let apikey,fresponse,fresult,from,tresponse,tresult,to;
        
            apikey = process.env.REACT_APP_APIKEY;
            const authtoken = raw('./auth.txt');
            let headers = {'Authorization' : authtoken}
            fresponse = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${fromloc}`,{ headers})
            tresponse = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${toloc}`,{ headers})

            fresult = await fresponse.json();
            from = [fresult.items[0]["position"]["lat"].toString(),fresult.items[0]["position"]["lng"].toString()].toString();
            tresult = await tresponse.json();
            to = [tresult.items[0]["position"]["lat"].toString(), tresult.items[0]["position"]["lng"].toString()].toString();

          
           if(modequery === "pubtransport"){

            function calculateRouteFromAtoB (platform) {
              var router = platform.getPublicTransitService(),
                  routeRequestParams = {
                    origin: from,
                    destination: to,
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
              document.getElementById('map2').innerHTML = "";
              setrouteaxnobj({});
              seterr3status(true); 
            }

            document.getElementById('map2').innerHTML = "";
            setrouteaxnobj({});

            var mapContainer = document.getElementById('map2');
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
              document.getElementById('map2').innerHTML = "";
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
              //console.log("Error: Map info/Transit info unavailable");
              document.getElementById('map2').innerHTML = "";
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
                  document.getElementById('map2').innerHTML = "";
                  setrouteaxnobj({});
                }
            }

            function addManueversToPanel(route) {
                try{
                    setrouteaxnobj(route.sections[0]);
                }

                catch(err){
                    document.getElementById('map2').innerHTML = "";
                    setrouteaxnobj({});
                    console.log("Results unavailable");
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
                    origin: from,
                    destination: to,
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
            //   addWaypointsToPanel(route);
            }


            function onError(error) {
              document.getElementById('map2').innerHTML = "";
              setrouteaxnobj({});
              seterr3status(true); 
            }

            document.getElementById('map2').innerHTML = "";
            setrouteaxnobj({});

            var mapContainer = document.getElementById('map2')

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
                document.getElementById('map2').innerHTML = "";
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
              //console.log("Error: Map info/Transit info unavailable");
              document.getElementById('map2').innerHTML = "";
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
                  document.getElementById('map2').innerHTML = "";
                  setrouteaxnobj({});
                }
            }


            function addManueversToPanel(route) {
                try{
                    setrouteaxnobj(route.sections[0]);
                }

                catch(err){
                    document.getElementById('map2').innerHTML = "";
                    setrouteaxnobj({});
                    console.log("Results unavailable");
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
      setTimeout(mapsv2, 2000);
      setfromloc('');
      settoloc('');
  }
      else {
      seterr1status(true);
      setLoading(false);
    }
  };

    const validfLocf = (e) => {

      if(!e.target.value.match(/^[a-zA-Z]+$/)){
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

      const validtLocf= (e) => {
               

        if(!e.target.value.match(/^[a-zA-Z]+$/)){
                          setterrstate(true)
                          setterrtext("Only letters allowed. No special characters or numbers");
                          setbuttonstate(true)
                      }
       else{
            setterrstate(false)
            setbuttonstate(false)
           }        
          settoloc(e.target.value)
                
                
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
            <TextInput id={'fromloc'} labelText = {'From*'} invalid = {ferrstate} invalidText = {ferrtext} placeholder = {'From'} size = 'lg' value={fromloc} onChange={validfLocf} />
          </div>
          <div className="TextArea" >
            <TextInput id={'toloc'} labelText = {'To*'} invalid = {terrstate} invalidText = {terrtext} placeholder = {'To'} size = 'lg' value={toloc} onChange={validtLocf} />
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
        subtitle={<span>From and To locations should not be empty</span>}
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

            { mapdisplay &&
              <div id = "route-display2">
                <br/>
                <br/>
                <div id = 'map2' ></div>
                <br/>
              </div> }
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

export default Mapf2;
