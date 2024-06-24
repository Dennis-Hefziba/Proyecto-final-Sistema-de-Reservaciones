const express = require('express');
const routes = express.Router();
const Booking = require('../models/Booking');
const {getBookings, getBookingsById, createBooking, updateBookingById, deleteBookingById} = require('../controllers/bookings.controller');
 
//Metodo get para obtener todas las reservaciones
//Funcion traida de carpeta controllers
routes.get('/', getBookings);

//Metodo get para obtener por id
//Funcion traida de carpeta controllers
routes.get('/:id', getBookingsById);

//Metodo Post para agregar una nueva reservacion
//Funcion traida de carpeta controllers
routes.post('/', createBooking);

//Metodo put para obtener por id
//Funcion traida de carpeta controllers
routes.put('/:id', updateBookingById);

//Metodo delete para obtener por id
//Funcion traida de carpeta controllers
routes.delete('/:id', deleteBookingById);

module.exports = routes;