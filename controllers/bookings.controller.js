const Booking = require('../models/Booking');
const User = require('../models/User');

const getBookings = async(req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getBookingsById = async(req, res) => {
    const bookingId = await Booking.findById(req.params.id);
    try {
        if(!bookingId) {
            res.status(404).json({error: "Booking not found"});
        }
        res.status(200).json(bookingId);
    } catch (error) {
        res.status(500).json({error: error.message});

    }
};                  

const createBooking = async(req, res) => {
    const {fullName, bookingDate, time, people, phoneNumber, comments} = req.body;
    try {

        const existingBooking = await Booking.findOne({fullName, time});
        if(existingBooking) {
            return res.status(400).json({error: "Ya existe una reserva con el mismo nombre y fecha de reserva"});
        }

        const newBooking = new Booking({fullName, bookingDate, time, people, phoneNumber, comments});
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updateBookingById = async (req, res) => {
    const {fullName, bookingDate, time, people, phoneNumber, comments} = req.body;
    try {
        const bookingId = await Booking.findById(req.params.id);
        if(!bookingId) {
            res.status(404).json({error: "Booking id not found"});
        }

        bookingId.fullName = fullName || bookingId.fullName;
        bookingId.bookingDate = bookingDate || bookingId.bookingDate;
        bookingId.time = time || bookingId.time;
        bookingId.people = people || bookingId.people;
        bookingId.phoneNumber = phoneNumber || bookingId.phoneNumber;
        bookingId.comments = comments || bookingId.comments;

        await bookingId.save();
        res.status(200).json(bookingId);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const deleteBookingById = async (req, res) => {
    const bookingId = await Booking.findByIdAndDelete(req.params.id);
    try {
        if(!bookingId) {
            res.status(404).json({error: "Booking not found"});
        }
        res.status(200).json({message: "Booking sucessfully eliminated"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};



module.exports = {
    getBookings,
    getBookingsById,
    createBooking,
    updateBookingById,
    deleteBookingById
};