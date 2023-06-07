const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'supersecret',
	resave: false,
	saveUninitialized: false,
  cookie: {}
}));

const admCredentials = { email: "joel@vontobelfamily.ch", password: "1234"}

app.post('/login', (request, response) => {
    const {email, password} = request.body;

    if(email?.toLowerCase() === admCredentials.email && password === admCredentials.password) {
        request.session.email = email;

        return response.status(200).json({ email: request.session.email });
    }

    return response.status(401).json({ error: "Invalid credentials" });
});

app.get('/verify', (request, response) => {
    if(request.session.email) {
    return response.status(200).json({ email: request.session.email}); 
    }

    return response.status(401).json({ error: "Not logged in" });
})

app.delete('/logout', function (request, response) {
	if (request.session.email) {
		request.session.email = null

		return response.status(200).send()
	}

  return response.status(401).json({ error: "Not logged in" })
})

app.use(session({
  secret: 'supersecret',
	resave: false,
	saveUninitialized: true,
  cookie: {}
}))

app.get('/', function (request, response, _) {
  // request.session is the object that holds the information of this specific session
  request.session.views = (request.session.views || 0) + 1
  console.log(request.session)

  response.end(request.session.views + ' views')
})

app.post('/name/:name', (request, response) => {
    const name = request.params.name;
    request.session.name = name;

    response.sendStatus(200);
});

app.get('/name', (request, response) => {
    response.send(request.session.name);
});

app.delete('/name', (request, response) => {
    request.session.name = null;

    response.send(request.session.name).statusCode(204);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});