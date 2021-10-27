import React, { useState} from 'react';
import Fileupload from './Fileupload';
import Sdataset from './Sdataset';

import { RadioButtonGroup, RadioButton  } from 'carbon-components-react';


function Datainput({ setbuttonstate, setchoice, setLabelInput, setuLabelInput, setfilepath, setfilename,  setufilepath, setufilename, ulabelerr, labelerr, dataseterr}) {

const [displayCOption, setdisplayCOption] = useState('');
const [displaySOption, setdisplaySOption] = useState('');

 var showCustomOption = () => {
    
    setchoice('upload');
    setdisplayCOption('Show');
    setdisplaySOption('');


 } 

 var showSampleOption = () => { 
    setchoice('sample');
    setdisplaySOption('Show');
    setdisplayCOption('');
 }

  return (
    <>
    
    <RadioButtonGroup legendText="Choose the type of Dataset" name="radio-button-group" >
      <RadioButton labelText="Upload your Dataset" value="customdt" id="customdt" onClick={showCustomOption} />
      <RadioButton labelText="Use Sample Datasets" value="sampledt" id="sampledt" onClick={showSampleOption} />
    </RadioButtonGroup>

    <br/>
    <br/>
  

    {displayCOption &&    
    <div id="custom-dataset">
      <Fileupload ulabelerr = {ulabelerr} setuLabelInput = {setuLabelInput} setufilepath = {setufilepath} setufilename = {setufilename} />
    </div>}

    {displaySOption &&  
    <div id="sample-dataset">
      <Sdataset setbuttonstate = {setbuttonstate} setLabelInput = {setLabelInput} setfilepath = {setfilepath} setfilename = {setfilename} labelerr = {labelerr} dataseterr = {dataseterr} />
    </div>}
    
       <br/>        
     
    </>
  );
};

export default Datainput;
