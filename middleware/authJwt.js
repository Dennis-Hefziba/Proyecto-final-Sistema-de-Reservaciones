//funcion que verifica que si se esta usando un token para acceder a las rutas
//de lo contrario devuelve no token provided
const cookieParser = require('cookie-parser');
const Role = require('../models/Role');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "No token found" });
    }

    jwt.verify(token, process.env.KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = decoded;
       //console.log(decoded); // Esto imprimirá el objeto decodificado para depuración
        next();
    });
}

const isUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) return res.status(404).json({error: "User not found"});

        const roles = await Role.find({_id: {$in: user.role}});
        for(let i = 0; i < roles.length; i++) {
        if(roles[i].name === "User") {
            next();
            return;
        }
        return res.status(403).json({ message: "User not recognized" });
    }
    } catch (e) {
        return res.status(403).json({message: "User not recognized", error: e})
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        
        const roles = await Role.find({ _id: { $in: user.role } });
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "Administrator") {
                next();
                return;
            }
        }
        return res.status(403).json({ message: "Only admins can process this request" });
    } catch (e) {
        return res.status(403).json({ message: "Only admins can process this request", error: e });
    }
};


module.exports = {
    verifyToken,
    isUser,
    isAdmin
}

