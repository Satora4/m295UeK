const express = require('express')
const app = express()
const port = 3000

app.get('/', (request, response) => {
  response.send('Hello World!')
})

// Auftrag 1
app.get('/now', (request, response) => {
    let ts = Date.now();
    let date_time = new Date(ts);

    response.send(date_time.toString());
})

// Auftrag 2
app.get('/zli', (request, response) => {
    response.redirect("https://www.zli.ch/")
})

// Auftrag 3
app.get('/name', (request, response) => {
    const listOfNames = ["Noah","Lukas", "felix", "Leon", "Luca", "Jonas", "Leo", "Maximilian", "Milan", "Matteo", "Theo", "Moritz", "Emil", "Oskar", "Julian", "Anton" ,"Max", "Paul", "Liam", "Samuel"];
    let randomNr = Math.floor(Math.random() * 20);
    response.send(listOfNames[randomNr]);
})

// Auftrag 4
app.get('/html', (request, response) => {
    response.sendFile("/workspaces/m295UeK/express-hello/Auftrag_Request_Response/recourses/HelloWorld.html");
})

// Auftrag 5
app.get('/image', (request, response) => {
    response.sendFile("/workspaces/m295UeK/express-hello/Auftrag_Request_Response/recourses/image.jpg");
})

// Auftrag 6
app.get('/teapot', (request, response) => {
    response.sendStatus(418);
})

// Auftrag 7
app.get('/user-agent', (request, response) => {
    response.send(request.headers["user-agent"]);
})

// Auftrag 8
app.get('/secret', (request, response) => {
    response.sendStatus(403);
})

// Auftrag 9
app.get('/xml', (request, response) => {
    response.sendFile("/workspaces/m295UeK/express-hello/Auftrag_Request_Response/recourses/HelloWorld.xml");
})

// Auftrag 10
app.get('/me', (request, response) => {
    const me = {
        firstname: "Joel",
        lastname: "Vontobel",
        age: 19,
        city: "Egg bei Zürich",
        eyeColor: "Blue"
    }
    response.send(me);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})