const http = require("http");
const bl = require('bl');

http.get(process.argv[2], function callback(response) {

    response.pipe(bl(function (err, data) {
        let text = data.toString();
        console.log(text.split("").length);
        console.log(text)
    }))
});