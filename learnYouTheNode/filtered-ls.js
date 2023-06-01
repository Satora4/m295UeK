const fs = require('fs');
let file = "";

function searchfiles(callback) {
    fs.readdir(process.argv[2], function doneReading(err, dir) {
        dir.forEach(element => {
            if(element.endsWith("." + process.argv[3])){
                file = element;
                callback();
            }
        });
    });
}

function logFiles() {
    console.log(file);
}

searchfiles(logFiles);