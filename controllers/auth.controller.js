const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {createToken} = require('../helpers/tokenGenerator');
const dotenv = require('dotenv').config();
const Role = require('../models/Role');

const signup = async (req, res) => {

    const {userName, email, password, role} = req.body;

    try {

        const allowedRoles = ["User", "Administrator"];
        if(role && !allowedRoles.includes(role)) return res.status(400).json({message: "Rol does not exist"});

        console.log("Contrasena sin encriptacion: ", req.body.password);
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
        const token = await createToken({id: saveUser._id})

        res.cookie("token", token); //establecer la respuesta en una cookie

        res.status(200).json({
            user: newUser,
            token: token
        });
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const userFound = await User.findOne({email});
        if(!userFound) return res.status(400).json({message: "User not found"});
        const matchPassword = await User.comparePassword(req.body.password, userFound.password);
        if(!matchPassword) return res.status(401).json({message: "Email or password incorrect"});
        const token = await createToken({id: userFound._id});
        res.cookie("token", token);
        res.status(201).json({token: token});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
    
}

const logout = async(req, res) => {
    try {
        res.cookie("token", "", {
            expires: new Date(0),
            httpOnly: true, //httpOnly: true asegura que la cookie no sea accesible desde JavaScript del lado del cliente, solo se puede enviar en solicitudes HTTP. Esto ayuda a proteger contra ataques XSS.
            secure: true, //secure: true indica que la cookie solo debe enviarse a través de conexiones HTTPS. Debe ajustarse a false en entornos de desarrollo que no utilicen HTTPS
            sameSite: 'strict' //sameSite: 'strict' restringe el envío de la cookie solo a solicitudes del mismo sitio, lo que ayuda a prevenir ataques CSRF.
        });

        res.status(200).json({message: "Logout successful"});

    } catch (e) {
        res.status(500).json({message: "Logout failed", error: e.message});
    }
}

const profile = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id);
        if (!userFound) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({
            id: userFound._id,
            userName: userFound.userName,
            email: userFound.email
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = {
    signup,
    login,
    logout,
    profile
}