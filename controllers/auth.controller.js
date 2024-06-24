const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const Role = require('../models/Role');

const signup = async (req, res) => {

    const {userName, email, password, role} = req.body;

    try {
        const encryptedPassword = await User.encryptPassword(password);
        const newUser = new User({
            userName,
            email,
            password: encryptedPassword,
            role
        })

        if (role) {
            //verificar que tipo de role se asigno el usuario o si no lo hizo
            const foundRole = await Role.find({name: {$in: role}});
            newUser.role = foundRole.map(role => role._id); //asignamos el id del rol 
        } else {
            //asignar role por default
            const defaultRole = await Role.findOne({name: "User"});
            newUser.role = [defaultRole.id]; //asignarle id unico para su usuario
        }

        const saveUser = await newUser.save();
        console.log(saveUser);
        const token = jwt.sign({id: saveUser._id}, process.env.KEY, {
            expiresIn: 600 //10m en segundos
        })

        res.status(201).json({
            user: newUser,
            token: token
        });
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const login = async (req, res) => {
    const {email} = req.body;
    const userFound = await User.findOne({email}).populate("role");

    if(!userFound) return res.status(404).json({message: "User not found"});
    console.log(userFound);
    res.json({token: ''});
}

module.exports = {
    signup,
    login
}