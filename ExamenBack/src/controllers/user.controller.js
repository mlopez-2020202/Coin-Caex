'use strict'

const User = require('../models/user.model');
const jwt = require('../services/jwt');
const { validateData, findUser, checkPassword, encryptPassword} = require('../utils/validate');

exports.test = (req, res)=>{
    try{
        return res.send({message: 'Test running'});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error'})
    }
}

exports.register = async(req, res)=>{
    try{
        const params = req.body;
        let data = {
            nombre: params.nombre,
            apellido: params.apellido,
            correo: params.correo,
            contrasena: params.contrasena,
        };
        let msg = await validateData(data);

        if(msg) return res.status(400).send(msg);
        let userExist = await findUser(data.correo);
        if(userExist) return res.status(400).send({message: 'El correo ya se encuentra en uso'});
        else{   
            data.contrasena = await encryptPassword(params.contrasena);

            let user = new User(data);
            await user.save();
            return res.send({message: 'Usuario creado satisfactoriamente'});
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error registrando un usuario'});
    }
}

exports.login = async(req, res)=>{
    try{
        const params = req.body;
        let data = {
            correo: params.correo,
            contrasena: params.contrasena
        }

        let msg = await validateData(data);

        if(msg) return res.status(400).send(msg);
        let userExist = await findUser(data.correo);
        if(userExist && await checkPassword(data.contrasena, userExist.contrasena)){
            let token = await jwt.createToken(userExist);
            delete userExist.contrasena;

            return res.send({token, message: `Sesión iniciada, bienvenido ${userExist.correo}`, user: userExist});
        }else return res.status(401).send({message: 'Credenciales incorrectas'});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error iniciado sesión'});
    }
}