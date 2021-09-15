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
            <Geocode1 />
          </Tab>
          <Tab id="tab-g2" label="Get Area">
            <Geocode2 />
          </Tab>
        </Tabs>
     
      
       <h2>Public Transit Services</h2>

         <Tabs type='container'>
          <Tab id="tab-s1" label="Transit Stations">
            <Transit1 />
          </Tab>
          <Tab id="tab-s2" label="Next Departures">
            <Transit2 />
          </Tab>
        </Tabs>

      <h2> Route Services </h2>

         <Tabs type='container'>
          <Tab id="tab-t1" label="By Co-ordinates">
            <Mapf1 />
          </Tab>
          <Tab id="tab-t2" label="By Area">
             <Mapf2 />
          </Tab>
        </Tabs>

      <br/>

    </div>
    </div>

    </>

    
  )
}

export default App;
