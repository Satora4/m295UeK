const express = require('express');

const app = express();
const port = 3000;

app.get('/now/:tz', (request, response) => {
  const tz = request.params.tz.replace('-', '/');
  const date = new Date();
  response.send(date.toLocaleString('en-US', { timeZone: tz }));
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/names', (request, response) => {
  response.sendFile('/workspaces/m295UeK/express-hello/3_Auftrag_Request_Response/form.html');
});

const listOfNames = ['Niculin', 'Quentin', 'Erik'];
app.post('/addName', (request, response) => {
  const body = request.body.name;
  listOfNames.push(body);
  response.send(listOfNames);
});

app.post('/deleteName', (request, response) => {
  const body = request.body.name;
  for (let i = 0; i < listOfNames.length; i += 1) {
    if (listOfNames[i] === body) {
      listOfNames.splice(i, 1);
      response.send(listOfNames).status(204);
      break;
    }
  }
});

app.get('/secret2', (request, response) => {
  const auth = request.headers.authorization;
  if (auth === 'Basic aGFja2VyOjEyMzQ=') {
    response.sendStatus(200);
  } else {
    response.sendStatus(401);
  }
});

app.get('/chuck', async (request, response) => {
  const joke = await fetch('https://api.chucknorris.io/jokes/random')
    .then((data) => data.json())
    .then((json) => json.value);
  response.send(joke.replace('Chuck Norris', request.query.name));
});

const me = {
  firstname: 'Joel',
  lastname: 'Vontobel',
  age: 19,
  city: 'Egg bei Zürich',
  eyeColor: 'Blue',
};

app.patch('/editName', async (request, response) => {
  const newData = request.body;
  await Object.assign(me, newData);
  response.send(me);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
