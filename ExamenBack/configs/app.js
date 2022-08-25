'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const port = process.env.PORT || 3200;

//Importación de las Rutas//

const userRoutes = require('../src/routes/user.routes');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet({}));
app.use(cors());

app.use('/user', userRoutes);

exports.initServer = ()=> app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
});