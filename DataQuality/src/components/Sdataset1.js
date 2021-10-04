import { Select, SelectItem} from 'carbon-components-react';
import React, { useState} from 'react';

function Sdataset1({setfilepath, setfilename, dataseterr1}) {
   

  const dataset = [
  
    {
    id: '',
    value: 'Select Dataset',
  },

  {
    id: 'adult.csv',
    value: 'adult.csv',
  },
  {
    id: 'breast-cancer.csv',
    value: 'breast-cancer.csv',
  },
  {
    id: 'credit-g.csv',
    value: 'credit-g.csv',
  },
];

// const bcancerlabels = [ 'Select Column',
//   'Class',       'age',
//   'menopause',   'tumor-size',
//   'inv-nodes',   'node-caps',
//   'deg-malig',   'breast',
//   'breast-quad', 'irradiat'
// ];

// const creditlabels = [ 'Select Column',
//   'checking_status', 'duration',
//   'credit_history',  'purpose',
//   'credit_amount',   'savings_status',
//   'employment',      'installment_commitment',
//   'personal_status', 'other_parties',
//   'residence_since', 'property_magnitude',
//   'age',             'other_payment_plans',
//   'housing',         'existing_credits',
//   'job',             'num_dependents',
//   'own_telephone',   'foreign_worker',
//   'class'
// ];

// const adultlabels = [ 'Select Column',
//   'age',            'workclass',
//   'fnlwgt',         'education',
//   'education-num',  'marital-status',
//   'occupation',     'relationship',
//   'race',           'sex',
//   'capital-gain',   'capital-loss',
//   'hours-per-week', 'native-country',
//   'income'
// ];


var [datasetquery, setdatasetquery] = useState(dataset[0].id);
// var [labelcol, setlabelcol] = useState(['']);

const handledatasetChange = (event) => 

{
    
    setdatasetquery(event.target.value);
    // setlabelcol(['']);
    setfilepath(event.target.value);
    setfilename(event.target.options[event.target.options.selectedIndex].text);
    


    setTimeout(() => {
      if(event.target.value  === "credit-g.csv"){
    //   setlabelcol(creditlabels);
    }
  
  else if(event.target.value  === "breast-cancer.csv"){
    //   setlabelcol(bcancerlabels);
    }
  else if(event.target.value  === 'adult.csv'){
        //   setlabelcol(adultlabels);      
    }

    }, 100);

    console.log("(On dataset change): Sample file chosen: ", event.target.options[event.target.options.selectedIndex].text);
    // console.log("(On dataset change): F1 Index value: ", event.target.options.selectedIndex);
    // console.log("TESTING (On dataset change): Label applied for Metric: ", LabelInput);
  };


  
  
    // const labelSubmit = (e) => {

    //   setLabelInput(e.target[e.target.selectedIndex].text);      
    //   console.log("Label: ", e.target[e.target.selectedIndex].text);

    // }

 
	
	return (

        <div className="tab">
            <Select labelText="Sample Dataset*" invalidText="Choose Dataset" invalid = {dataseterr1}  size = "lg" value={datasetquery} onChange={handledatasetChange}>
                {dataset.map((item, i) => (
                    <SelectItem value={item.id} key={i} text = {item.value} />
                            ))}
            </Select>


            <br/>
            <br/>

             {/* <Select labelText="Label Column" invalidText="Choose Dataset and Label Column" invalid = {labelerr} size = "lg" onChange = {labelSubmit}> */}
              
              {/* <SelectItem text="Choose a Label Column"  /> */}

                {/* {labelcol.map((item, i) => (
                    <SelectItem value={item.id} key={i} text = {item} />
                            ))}
            </Select> */}
        
              


      </div>

	);
	
}

export default Sdataset1;