'use strict'

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nombre: String,
    apellido: String,
    contrasena: String,
    correo: String,

});

module.exports = mongoose.model('User', userSchema);