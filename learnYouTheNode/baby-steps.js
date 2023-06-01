const input = process.argv;
let sum = 0;

for(let i = 0; i < input.length; i++){
    if(!isNaN(input[i])){
        sum += Number(input[i]);
    }
}
console.log(sum);