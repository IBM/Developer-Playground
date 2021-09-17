import React from 'react'
import './App.css';

import { Tabs, Tab } from 'carbon-components-react';
import {Header,HeaderName} from "carbon-components-react/lib/components/UIShell";

import Geocode1 from './components/geocodef1';
import Geocode2 from './components/geocodef2';
import Transit1 from './components/transitf1';
import Transit2 from './components/transitf2';
import Mapf1 from './components/mapf1';
import Mapf2 from './components/mapf2';

function App() {
  
  return (

    <>
    
      <Header aria-label="IBM">
        <HeaderName prefix = "" href="#">
          <div Style="white-space: nowrap;">
            HERE Public Transit Sample Application
            </div>
          </HeaderName>
        </Header> 

    <div className="App">
     <div className = "AppContent">
    <br/>
    <br/>
    <br/>
    <br/>
     <h2>Location Details</h2>

        <Tabs type='container'>
          <Tab id="tab-g1" label="Get Co-ordinates">
            <div className="TabArea">
            <Geocode1 />
            </div>
          </Tab>
          <Tab id="tab-g2" label="Get Area">
            <div className="TabArea">
            <Geocode2 />
            </div>
          </Tab>
        </Tabs>
     
      
       <h2>Public Transit Services</h2>

         <Tabs type='container'>
          <Tab id="tab-s1" label="Transit Stations">
            <div className="TabArea">
            <Transit1 />
            </div>
          </Tab>
          <Tab id="tab-s2" label="Next Departures">
            <div className="TabArea">
            <Transit2 />
            </div>
          </Tab>
        </Tabs>

      <h2> Route Services </h2>

         <Tabs type='container'>
          <Tab id="tab-t1" label="By Co-ordinates">
            <div className="TabArea">
            <Mapf1 />
            </div>
          </Tab>
          <Tab id="tab-t2" label="By Area">
            <div className="TabArea">
             <Mapf2 />
             </div>
          </Tab>
        </Tabs>

      <br/>

    </div>
    </div>

    </>

    
  )
}

export default App;
