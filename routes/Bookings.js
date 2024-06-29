const express = require('express');
const routes = express.Router();
const Booking = require('../models/Booking');
const {getBookings, getBookingsById, createBooking, updateBookingById, deleteBookingById} = require('../controllers/bookings.controller');
const {verifyToken, isUser, isAdmin} = require('../middleware/authJwt'); 

//Metodo get para obtener todas las reservaciones
//Funcion traida de carpeta controllers
routes.get('/', [verifyToken, isAdmin], getBookings); //solo usuarios admin con tokens activos pueden ver todas las reservas

//Metodo get para obtener por id
//Funcion traida de carpeta controllers
routes.get('/:id', [verifyToken, isAdmin], getBookingsById); //solo usuarios admin con tokens activos pueden ver reservas por id

//Metodo Post para agregar una nueva reservacion
//Funcion traida de carpeta controllers
routes.post('/', [verifyToken, isUser, isAdmin], createBooking);

//Metodo put para obtener por id
//Funcion traida de carpeta controllers
routes.put('/:id', updateBookingById);

//Metodo delete para obtener por id
//Funcion traida de carpeta controllers
routes.delete('/:id', [verifyToken], deleteBookingById);

module.exports = routes;