const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const createToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.KEY, {expiresIn: '1d'}, (err, token) => {
            if(err) reject(err);
            resolve(token);
        })
    })
}

module.exports = {
    createToken,
}