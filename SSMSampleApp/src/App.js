import React from 'react'
import './App.css';
import SSMMain from './components/ssmmain.js';

import {Header,HeaderName} from "carbon-components-react/lib/components/UIShell";

function App() {
  
  return (

    <>
    
      <Header aria-label="IBM">
        <HeaderName prefix = "" href="#">
          <div Style="white-space: nowrap;">
            SaaS User Subscription and Management Sample Application
          </div>
          </HeaderName>
        </Header> 
      

    <div className="App">
     <div className = "AppContent">
    <br/>
    <br/>
    <br/>
    <br/>
      <h2>Subscription for OrgAccess </h2>     
            <SSMMain />
         
     

    </div>
    </div>

    </>

    
  )
}

export default App;
