const fs = require('fs');
var lines = undefined;

function countNewLines (callback){
    fs.readFile(process.argv[2], function doneReading(err, fileContents){
        var str = fileContents.toString();
        var array = str.split("\n");
        lines = array.length -1;
        callback();
    })   
}

function logLines() {
    console.log(lines);
}

countNewLines(logLines);