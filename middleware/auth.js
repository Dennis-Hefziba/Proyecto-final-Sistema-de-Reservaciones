const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) {
        res.status(403).send("Token required for the session");
    }

}

