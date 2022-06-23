const express = require('express')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const config = require('./config.json');
const app = express()

const database = require('./utils/db');
const User = require('./models/user');
const File = require('./models/file')

app.use(bodyParser.json());
database.sync();


const routes = require('./routes/index');

app.use('/api', routes);


app.listen(3000, () => {
  console.log(`running on: http://0.0.0.0:${config.default_port}`);
})


var handbrake = require('./workers/handbrake');
var axel = require('./workers/axel');


setInterval( function() { axel() }, 5000 );
setInterval( function() { handbrake() }, 5000 );

