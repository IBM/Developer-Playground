/* eslint-disable */
import React, { useState} from 'react';
import { Button,TextInput, Form, Select, SelectItem, Loading, ToastNotification } from 'carbon-components-react';
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
            document.getElementById('panel').innerHTML = "";
            seterr3status(true); 
          }

          document.getElementById('map').innerHTML = "";
          document.getElementById('panel').innerHTML = "";

          var mapContainer = document.getElementById('map');
          var routeInstructionsContainer = document.getElementById('panel');

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
            document.getElementById('panel').innerHTML = "";
            
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
            document.getElementById('panel').innerHTML = "";
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
            document.getElementById('panel').innerHTML = "";
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
              addWaypointsToPanel(route);
              addManueversToPanel(route);
              addSummaryToPanel(route);
            }


            function onError(error) {
              
              document.getElementById('map').innerHTML = "";
              document.getElementById('panel').innerHTML = "";
              seterr3status(true); 
            }

            document.getElementById('map').innerHTML = "";
            document.getElementById('panel').innerHTML = "";

            var mapContainer = document.getElementById('map')
            var routeInstructionsContainer = document.getElementById('panel');


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
                document.getElementById('panel').innerHTML = "";
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
              document.getElementById('panel').innerHTML = "";
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
              document.getElementById('panel').innerHTML = "";
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
                  document.getElementById('map').innerHTML = "";
                  document.getElementById('panel').innerHTML = "";
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
              document.getElementById('map').innerHTML = "";
              document.getElementById('panel').innerHTML = "";
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
                <div id = 'panel' ></div>
                </div>
              }        
            </>
            );
};

export default Mapf1;
