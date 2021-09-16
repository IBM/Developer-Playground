/* eslint-disable */

import React, { useState} from 'react';
import { Button,TextInput, Form, Select, SelectItem, Loading, ToastNotification } from 'carbon-components-react';
import raw from 'raw.macro';
import H from "@here/maps-api-for-javascript";
import 'here-js-api/styles/mapsjs-ui.css';
const apikey = process.env.REACT_APP_APIKEY;
const authtoken = raw('./auth.txt');

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

  const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setmapdisplay('Route')

    if (fromloc && toloc) {
   
        const mapsv2 = async() => {

        try{
            
            const headers = {'Authorization' : authtoken}
            let fresponse = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${fromloc}`,{ headers})
            let fresult = await fresponse.json();

            const from = [fresult.items[0]["position"]["lat"].toString(),fresult.items[0]["position"]["lng"].toString()].toString();

            let tresponse = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${toloc}`,{ headers})
            let tresult = await tresponse.json();


            const to = [tresult.items[0]["position"]["lat"].toString(), tresult.items[0]["position"]["lng"].toString()].toString();
          
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
              document.getElementById('panel2').innerHTML = "";
              seterr3status(true); 
            }

            document.getElementById('map2').innerHTML = "";
            document.getElementById('panel2').innerHTML = "";

            var mapContainer = document.getElementById('map2');
            var routeInstructionsContainer = document.getElementById('panel2');

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
              document.getElementById('panel2').innerHTML = "";
            }
            }


            function addSummaryToPanel(route){
              try{
              let duration = 0,
                  distance = 0;

              route.sections.forEach((section) => {
                distance += section.travelSummary.length;
                duration += section.travelSummary.duration;
              });

              var summaryDiv = document.createElement('div'),
              content = '';
              content += '<b>Total distance</b>: ' + distance  + 'm. <br/>';
              content += '<b>Travel Time</b>: ' + duration.toMMSS();


              summaryDiv.style.fontSize = 'small';
              summaryDiv.style.marginLeft ='5%';
              summaryDiv.style.marginRight ='5%';
              summaryDiv.innerHTML = content;
              routeInstructionsContainer.appendChild(summaryDiv);
            }
            catch(err){
              document.getElementById('panel2').innerHTML = "";
              //console.log("pubtransport info err");
            }
            }

            function addManueversToPanel(route){
              try{
              var nodeOL = document.createElement('ol');

              nodeOL.style.fontSize = 'small';
              nodeOL.style.marginLeft ='5%';
              nodeOL.style.marginRight ='5%';
              nodeOL.className = 'directions';

              route.sections.forEach((section) => {
                if (section.actions) {
                  section.actions.forEach((action, idx) => {
                    var li = document.createElement('li'),
                        spanArrow = document.createElement('span'),
                        spanInstruction = document.createElement('span');

                    spanArrow.className = 'arrow ' + (action.direction || '') + action.action;
                    spanInstruction.innerHTML = section.actions[idx].instruction;
                    li.appendChild(spanArrow);
                    li.appendChild(spanInstruction);

                    nodeOL.appendChild(li);
                  });
                }
              });
              routeInstructionsContainer.appendChild(nodeOL);
            }
            catch(err){
              document.getElementById('panel2').innerHTML = "";
            }
            }


              Number.prototype.toMMSS = function () {
                return  Math.floor(this / 60)  +' minutes '+ (this % 60)  + ' seconds.';
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
              addWaypointsToPanel(route);
              addManueversToPanel(route);
              addSummaryToPanel(route);
            }


            function onError(error) {
              document.getElementById('map2').innerHTML = "";
              document.getElementById('panel2').innerHTML = "";
              seterr3status(true); 
            }

            document.getElementById('map2').innerHTML = "";
            document.getElementById('panel2').innerHTML = "";


            var mapContainer = document.getElementById('map2')
            var routeInstructionsContainer = document.getElementById('panel2');


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
                document.getElementById('panel2').innerHTML = "";
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
              document.getElementById('panel2').innerHTML = "";
            }
            }


            function addWaypointsToPanel(route) {
              try{
              var nodeH3 = document.createElement('h3'),
                labels = [];

              route.sections.forEach((section) => {
                labels.push(
                  section.turnByTurnActions[0].nextRoad.name[0].value)
                labels.push(
                  section.turnByTurnActions[section.turnByTurnActions.length - 1].currentRoad.name[0].value)
              });

              nodeH3.textContent = labels.join(' - ');
              routeInstructionsContainer.innerHTML = '';
              routeInstructionsContainer.appendChild(nodeH3);
                }
            catch(err){
              document.getElementById('panel2').innerHTML = "";
            }
            }

            function addSummaryToPanel(route) {
              let duration = 0,
                distance = 0;
              try{
              route.sections.forEach((section) => {
                distance += section.travelSummary.length;
                duration += section.travelSummary.duration;
              });

              var summaryDiv = document.createElement('div'),
                content = '<b>Total distance</b>: ' + distance + 'm. <br />' +
                  '<b>Travel Time</b>: ' + toMMSS(duration) + ' (in current traffic)';

              summaryDiv.style.fontSize = 'small';
              summaryDiv.style.marginLeft = '5%';
              summaryDiv.style.marginRight = '5%';
              summaryDiv.innerHTML = content;
              routeInstructionsContainer.appendChild(summaryDiv);
              }

                catch(err){
                  //console.log(err);
                  document.getElementById('map2').innerHTML = "";
                  document.getElementById('panel2').innerHTML = "";
                }
            }


            function addManueversToPanel(route) {
              var nodeOL = document.createElement('ol');

              nodeOL.style.fontSize = 'small';
              nodeOL.style.marginLeft ='5%';
              nodeOL.style.marginRight ='5%';
              nodeOL.className = 'directions';

              try{
              route.sections.forEach((section) => {
                section.actions.forEach((action, idx) => {
                  var li = document.createElement('li'),
                    spanArrow = document.createElement('span'),
                    spanInstruction = document.createElement('span');

                  spanArrow.className = 'arrow ' + (action.direction || '') + action.action;
                  spanInstruction.innerHTML = section.actions[idx].instruction;
                  li.appendChild(spanArrow);
                  li.appendChild(spanInstruction);

                  nodeOL.appendChild(li);
                });
              });

              routeInstructionsContainer.appendChild(nodeOL);
            }
            catch(err){
              document.getElementById('map2').innerHTML = "";
              document.getElementById('panel2').innerHTML = "";
              console.log("Results unavailable");
            }
            }

            function toMMSS(duration) {
              return Math.floor(duration / 60) + ' minutes ' + (duration % 60) + ' seconds.';
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
      mapsv2();
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
                <div id = 'panel2' ></div>
              </div> }
            </>
            );
};

export default Mapf2;