const express = require('express');
const route = express.Router();
const {login, signup, logout, profile} = require('../controllers/auth.controller');
const {verifyToken} = require('../middleware/authJwt');

route.post('/login', login);
route.post('/signup', signup);
route.post('/logout', logout);
route.get('/profile', verifyToken, profile);

module.exports = route;