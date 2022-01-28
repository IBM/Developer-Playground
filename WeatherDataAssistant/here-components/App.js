import React, {useState} from 'react'
import './App.css';
import {Header,HeaderName} from "carbon-components-react/lib/components/UIShell";
import { Tabs, Tab } from 'carbon-components-react';

import Localweather from './components/progcomp';
import Weekforecast from './components/weatherforecast';
import Hourlyforecast from './components/hourlyforecast';
import Intradayforecast from './components/intradayforecast';
import Dailyhistory from './components/dailyhist';
import Hourlyhistory from './components/hourlyhist';
import Almanac from './components/almanac';

import HotelSearch from './components/hotels';
import TransitSearch from './components/transit';
import AirportSearch from './components/airport';

function App() {
  
    const [maplat,setmaplat] = useState('');
    const [maplong, setmaplong] = useState('');

  return (

    <>
    
      <Header aria-label="IBM">
        <HeaderName prefix = "" href="#">
          <div Style="white-space: nowrap;">
            Weather Company Data Sample Application
            </div>
          </HeaderName>
        </Header> 

    <div className="App">
     <div className = "AppContent">
      <br/>
      <br/>
      <br/>
      <br/>

    <h2>Forecast Details</h2>
      <br/>
      <br/>

    <Tabs type='container'>
          <Tab id="tab-q1" label="Daily Forecast">
            <div className="TabArea">
            <Weekforecast maplat = {maplat} maplong = {maplong}/>
            </div>
          </Tab>
          <Tab id="tab-q2" label="Hourly Forecast">
            <div className="TabArea">
            <Hourlyforecast maplat = {maplat} maplong = {maplong}/>
            </div>
          </Tab>
           <Tab id="tab-q3" label="Intraday Forecast">
             <div className="TabArea">
             <Intradayforecast maplat = {maplat} maplong = {maplong}/>
             </div>
          </Tab>
    </Tabs>

    <h2>Historical Forecast </h2>
      <br/>
      <br/>

       <Tabs type='container'>
          <Tab id="tab-q1" label="Daily History">
            <div className="TabArea">
              <Dailyhistory maplat = {maplat} maplong = {maplong}/>
            </div>
          </Tab>
          <Tab id="tab-q2" label="Hourly History">
            <div className="TabArea">
            <Hourlyhistory maplat = {maplat} maplong = {maplong}/>
            </div>
          </Tab>

           <Tab id="tab-q3" label="Almanac">
            <div className="TabArea">
             <Almanac maplat = {maplat} maplong = {maplong} />
            </div>
          </Tab>
    </Tabs>
    
    <h2>Map View </h2>
    <br/>
    <br/>
      <Localweather setmaplat={setmaplat} setmaplong={setmaplong}/>

      <br/>
      <br/>
      <br/>

    <h2>Transportation</h2>
      <br/>
      <br/>

    <Tabs type='container'>
          <Tab id="tab-q1" label="Transit Stations">
            <div className="TabArea">
            <TransitSearch maplat = {maplat} maplong = {maplong}/>
            </div>
          </Tab>
          <Tab id="tab-q2" label="Airports">
            <div className="TabArea">
            <AirportSearch maplat = {maplat} maplong = {maplong}/>
            </div>
          </Tab>
           <Tab id="tab-q3" label="Hotels">
             <div className="TabArea">
             <HotelSearch maplat = {maplat} maplong = {maplong}/>
             </div>
          </Tab>
    </Tabs>
    </div>
    </div>  


    </>

    
  )
}

export default App;
