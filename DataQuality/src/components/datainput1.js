import React, { useState} from 'react';
import Fileupload1 from './Fileupload1';
import Sdataset1 from './Sdataset1';

import { RadioButtonGroup, RadioButton  } from 'carbon-components-react';


function Datainput1({ setbuttonstate, setchoice, setfilepath, setfilename,  setufilepath, setufilename, ulabelerr, labelerr, dataseterr1}) {

const [displayCOption1, setdisplayCOption1] = useState('');
const [displaySOption1, setdisplaySOption1] = useState('');

 var showCustomOption1 = () => {
    
    setchoice('upload');
    setdisplayCOption1('Show');
    setdisplaySOption1('');


 } 

 var showSampleOption1 = () => { 
    setchoice('sample');
    setdisplaySOption1('Show');
    setdisplayCOption1('');
 }

  return (
    <>
    
    <RadioButtonGroup legendText="Choose the type of Dataset" name="radio-button-group1" >
      <RadioButton labelText="Upload your Dataset ( < 15 MB )" value="customdt1" id="customdt1" onClick={showCustomOption1} />
      <RadioButton labelText="Use Sample Datasets" value="sampledt1" id="sampledt1" onClick={showSampleOption1} />
    </RadioButtonGroup>

    <br/>
    <br/>

    {displayCOption1 &&    
    <div id="custom-dataset1">
      <Fileupload1 setufilepath = {setufilepath} setufilename = {setufilename} />
    </div>}

    {displaySOption1 &&  
    <div id="sample-dataset1">
      <Sdataset1 setbuttonstate = {setbuttonstate} setfilepath = {setfilepath} setfilename = {setfilename} dataseterr1 = {dataseterr1} />
    </div>}
    
       <br/>        
    </>
  );
};

export default Datainput1;
