'use strict'

const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user.model');

exports.validateData = async(data) =>{
    let keys = Object.keys(data), msg = '';

    for(let key of keys){
        if(data[key] !== null && data[key] !== undefined && data[key] !== '') continue;
        msg += `The params ${key} es obligatorio\n`
    }
    return msg.trim();
}

exports.findUser = async (correo)=>{
    try{
     let exist = await User.findOne({correo:correo}).lean()
     return exist;
    }catch(err){
        return err;
    }
 }

 exports.findUserById = async (id)=>{
    try{
     let exist = await User.findOne({_id:id}).lean()
     return exist;
    }catch(err){
        return err;
    }
 }

 exports.encryptPassword = async (contrasena) => {
    try{
        return bcrypt.hashSync(contrasena);
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.checkPassword = async (contrasena, hash)=>{
    try{
        return bcrypt.compareSync(contrasena, hash);
    }catch(err){
        console.log(err);
        return err;
    }
}