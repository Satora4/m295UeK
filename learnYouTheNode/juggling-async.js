const http = require("http");
const bl = require('bl');

function getURLResponse(argNumber) {
    return new Promise((resolve, rejects) => {
        http.get(process.argv[argNumber], function callback(response) {
            response.pipe(bl(function (err, data) {
                console.log(data.toString());
                resolve();
            }))
        });
    })
}

async function logResponse() {
    for(let i = 2; i <= 4; i++) {
        await getURLResponse(i);
    }
}

logResponse();