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


var [datasetquery, setdatasetquery] = useState(dataset[0].id);

const handledatasetChange = (event) => 
{
    setdatasetquery(event.target.value);
    setfilepath(event.target.value);
    setfilename(event.target.options[event.target.options.selectedIndex].text);
    
    setTimeout(() => {
      if(event.target.value  === "credit-g.csv"){
    }
  
  else if(event.target.value  === "breast-cancer.csv"){
    }
  else if(event.target.value  === 'adult.csv'){
    }

    }, 100);

  };
	
	return (

        <div className="tab">
            <Select labelText="Sample Dataset*" invalidText="Choose Dataset" invalid = {dataseterr1}  size = "lg" value={datasetquery} onChange={handledatasetChange}>
                {dataset.map((item, i) => (
                    <SelectItem value={item.id} key={i} text = {item.value} />
                            ))}
            </Select>


            <br/>
            <br/>

      </div>

	);
	
}

export default Sdataset1;