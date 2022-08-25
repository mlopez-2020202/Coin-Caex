'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secretKey = 'NewJsonWebTokenSecret';

exports.createToken = async(user)=>{
    try{
        const payload = {
            sub: user._id,
            nombre: user.nombre,
            apellido: user.apellido,
            correo: user.correo,
            iat: moment().unix(),
            exp: moment().add(3, 'hours').unix()
        }
        return jwt.encode(payload, secretKey);
    }catch(err){
        console.log(err);
        return err;
    }
}