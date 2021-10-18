const fs = require('fs');

let time = Date.now();

let data = []
let numEntries = 100
let numVariables = 1
let maxLimit = 50
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
fs.writeFileSync("./data3.json", JSON.stringify(data))