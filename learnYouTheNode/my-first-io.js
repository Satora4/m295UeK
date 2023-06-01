const fs = require('fs');

const str = fs.readFileSync(process.argv[2]).toString();
const array = str.split("\n");
console.log(array.length -1);