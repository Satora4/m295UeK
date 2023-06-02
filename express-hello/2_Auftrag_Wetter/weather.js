const express = require('express')
const app = express()
const port = 3000

function getApiPath(zip) {
  return `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${zip}00`;
}

app.get("/:zip", async (request, response) => {

  // const data = await fetch(getApiPath(request.params.zip));
  // const json = data.json();
  // response.send("Es sind " + json.currentWeather.temperature.toString() + " Grad.");

  await fetch(getApiPath(request.params.zip))
    .then((data) => data.json())
    .then((json) => response.send("Es sind " + json.currentWeather.temperature.toString() + " Grad."));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});