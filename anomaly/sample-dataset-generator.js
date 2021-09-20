const fs = require('fs');

let time = Date.now();

let even = 997
let odd = 3
let data = []
for (let i = 0; i < 1000; i++) {
    let num = Math.floor(Math.random() * 50) + 1
    if (num % 2 === 0)
        even -= 1
    else
        odd -= 1
    if (even < 0) {
        while (num % 2 === 0) {
            num = Math.floor(Math.random() * 50) + 1
        }
        even += 1
        odd -= 1
    } else if (odd < 0) {
        while (num % 2 !== 0) {
            num = Math.floor(Math.random() * 50) + 1
        }
        odd += 1
        even -= 1
    }
    time += 600000
    data.push({
        time,
        num: 100
    })
}
fs.writeFileSync("./data3.json",JSON.stringify(data))