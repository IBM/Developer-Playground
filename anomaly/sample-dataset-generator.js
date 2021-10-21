const fs = require('fs');

let time = Date.now();

let data = []
//TOTAL ENTRIES/ROWS IN DATASET
let numEntries = 100
//NUMBER OF VARIABLES
let numVariables = 5
//MAX VALUE OF VARIABLE
let maxLimit = 20
for (let i = 0; i < numEntries; i++) {
    let entry = {}
    for (let j = 0; j < numVariables; j++) {
        let varName = `num${j+1}`
        entry[varName] = Math.floor(Math.random() * maxLimit) + 1
    }
    time -= 600000
    data.push({
        time,
        ...entry
    })
}
let i = 1
let files = fs.readdirSync("../sample-datasets")
while(true){
    if(files.includes(`sample-${i}.json`))
        i += 1
    else{
    fs.writeFileSync(`../sample-datasets/sample-${i}.json`, JSON.stringify(data))
    console.log(`Dataset sample-${i}.json stored at /sample-datasets/sample-${i}.json`)
    break
    }
}