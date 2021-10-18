import React from 'react'
import './App.css';
import {Header,HeaderName} from "carbon-components-react/lib/components/UIShell";
import Aoc1 from './components/aoc1';
import Aoc2 from './components/aoc2';
import Aoc3 from './components/aoc3';

function App() {
  
  return (
    <>
      <Header aria-label="IBM">
        <HeaderName prefix = "" href="#">
          <div Style="white-space: nowrap;">
            Aspera on Cloud Sample Application
          </div>
          </HeaderName>
        </Header> 

    <div className="App">
     <div className = "AppContent">
    <br/>
    <br/>
    <br/>
    <br/>
     <h2>Workspace Details</h2>
      <br/>
      <br/>
      <Aoc1/>

      <h2>Membership Details</h2>
      <br/>
      <br/>
      <Aoc2/>

     <h2>Workspace Packages</h2>
      <br/>
      <br/>
      <Aoc3/>
    
    </div>
    </div>

    </>

    
  )
}

export default App;
