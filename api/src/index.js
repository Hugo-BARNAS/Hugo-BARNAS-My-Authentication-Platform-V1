const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

//IMPORT ROUTES

let route = require('./routes/signUpIn');
app.use('/', route);


const port = process.env.port || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})