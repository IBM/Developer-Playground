import React from "react";
import "./App.css";
import { Tabs, Tab } from "carbon-components-react";
import {
  Header,
  HeaderName,
} from "carbon-components-react/lib/components/UIShell";

import Geocode1 from "./components/geocodef1";
import Geocode2 from "./components/geocodef2";
import Search1 from "./components/searchf1";
import Search2 from "./components/searchf2";
import Weather1 from "./components/weatherf1";
import Weather2 from "./components/weatherf2";
import Alertw from "./components/alertw";

function App() {
  return (
    <>
      <Header aria-label="IBM">
        <HeaderName href="#" prefix="">
          <div Style="white-space: nowrap;">
            HERE Geocoding Sample Application
          </div>
        </HeaderName>
      </Header>

      <div className="App">
        <div className="AppContent">
          <br />
          <br />
          <br />
          <br />

          <h2>Location Details</h2>
          <br />
          <br />
          <Tabs type="container">
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

          <h2>Search Services</h2>
          <br />
          <br />
          <Tabs type="container">
            <Tab id="tab-s1" label="By Area">
              <div className="TabArea">
              <Search1 />
              </div>
            </Tab>
            <Tab id="tab-s2" label="By Co-ordinates">
              <div className="TabArea">
              <Search2 />
              </div>
            </Tab>
          </Tabs>

          <h2> Weather Services </h2>
          <br />
          <br />
          <Tabs type="container">
            <Tab id="tab-w1" label="By Area">
              <div className="TabArea">
              <Weather1 />
              </div>
            </Tab>
            <Tab id="tab-w2" label="By Co-ordinates">
              <div className="TabArea">
              <Weather2 />
              </div>
            </Tab>
          </Tabs>

          <h2> Extreme Weather Warnings </h2>
          <br />
          <br />
          <Alertw />
          <br />
        </div>
      </div>
    </>
  );
}

export default App;
