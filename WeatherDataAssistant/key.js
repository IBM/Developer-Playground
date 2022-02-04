var fs = require('fs');
var array = fs.readFileSync('key.txt').toString().split("\n");

function getRandomItem(arr) {

    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];

    return item;
}

const result = getRandomItem(array);
console.log(result);
