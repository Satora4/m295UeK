const express = require('express');
const app = express();
const zeiterfassung = require('../8_Auftrag_Zeiterfassung/index.js');
const port = 3000;

app.use('/8', zeiterfassung);

app.listen(port, () => {
    console.log(`Example Router listening on port ${port}`);
});