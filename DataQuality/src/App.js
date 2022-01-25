import React, {useState} from 'react'
import './App.css';

import { Tabs, Tab } from 'carbon-components-react';
import {Header,HeaderName} from "carbon-components-react/lib/components/UIShell";


import Datainput from './components/datainput';
import Results from './components/getresults';
import Dataquality from './components/dataquality';
import Datainput1 from './components/datainput1';
import Datasetquality from './components/datasetquality';


function App() {

  const [LabelInput, setLabelInput] = useState('');
  const [uLabelInput, setuLabelInput] = useState('');
  const [ulabelerr, setulabelerr] = useState('');
  const [ufilepath, setufilepath] = useState('');
  const [ufilename, setufilename] = useState('');
  const [filepath, setfilepath] = useState('');
  const [filename, setfilename] = useState('');
  const [labelerr, setlabelerr] = useState('');
  const [dataseterr, setdataseterr] = useState('');
  const [dataseterr1, setdataseterr1] = useState('');
  const [choice, setchoice] = useState('upload');

  const [buttonstate, setbuttonstate] = useState(true);

  return (

    <>
     <Header aria-label="IBM">
       <HeaderName href="#" prefix="">
            <div Style="white-space: nowrap;">
            Data Quality for AI Application
            </div>
      </HeaderName>
     </Header> 

    <div className="App">
      <div className = "AppContent">
      <br/>
      <br/>
      <br/>
      <br/>

       <Tabs type='container'>
          <Tab id="tab-q1" label="Data Quality">
            <h2> Data Quality Processing </h2>
            <br/>
            <br/>
            <Datainput setbuttonstate = {setbuttonstate} setchoice = {setchoice} labelerr = {labelerr} dataseterr = {dataseterr} ulabelerr = {ulabelerr} setufilepath = {setufilepath} setufilename = {setufilename} setfilepath = {setfilepath} setfilename = {setfilename} setLabelInput = {setLabelInput} setuLabelInput = {setuLabelInput} />
            
            <h5> Check parameters </h5>
            <br/>
            <Dataquality buttonstate = {buttonstate} choice = {choice} setlabelerr = {setlabelerr} setulabelerr = {setulabelerr} setdataseterr = {setdataseterr} filepath = {filepath} filename = {filename} ufilepath = {ufilepath} ufilename = {ufilename} LabelInput = {LabelInput} uLabelInput = {uLabelInput} /> 

          </Tab>

          <Tab id="tab-q2" label="Dataset Quality">
            <h2> Data Quality Processing </h2>
            <br/>
            <br/>
            <Datainput1 setbuttonstate = {setbuttonstate} setchoice = {setchoice} dataseterr1 = {dataseterr1}  setufilepath = {setufilepath} setufilename = {setufilename} setfilepath = {setfilepath} setfilename = {setfilename} />

            <h5> Check parameters </h5>
            <br/>
            <Datasetquality buttonstate = {buttonstate} choice = {choice}  setdataseterr1 = {setdataseterr1} filepath = {filepath} filename = {filename} ufilepath = {ufilepath} ufilename = {ufilename} /> 

          </Tab>
        </Tabs> 
      <Results />

      </div>
    </div>

    </>

    
  )
}

export default App;
