// Created with the Help of ChatGPT
// On how to set the Summarys, Tags, etc: https://www.npmjs.com/package/swagger-autogen#endpoints
// Befor running the Application run:
// npm install swagger-autogen fs js-yaml

const swaggerAutogen = require('swagger-autogen')();
const fs = require('fs');
const yaml = require('js-yaml');

const outputFile = './express-hello/4_Bibliothek/swagger.yaml';
const endpointsFiles = ['./express-hello/4_Bibliothek/index.js'];

swaggerAutogen(outputFile, endpointsFiles)
    .then(() => {
        const jsonData = fs.readFileSync(outputFile, 'utf8');
        const yamlData = yaml.dump(JSON.parse(jsonData));
        fs.writeFileSync(outputFile, yamlData, 'utf8');
        console.log('Swagger YAML file generated successfully.');
    })
    .catch((err) => {
        console.error('Error generating Swagger YAML file:', err);
    });