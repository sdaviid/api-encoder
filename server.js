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
  console.log('Servidor de exemplo aberto na porta: 3000')
})


var handbrake = require('./workers/handbrake');
var axel = require('./workers/axel');


setInterval( function() { console.log('rodou axel run'); axel() }, 10000 );
setInterval( function() { console.log('rodou handbrake run'); handbrake() }, 15000 );

