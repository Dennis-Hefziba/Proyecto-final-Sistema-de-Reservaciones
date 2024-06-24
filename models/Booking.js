const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    bookingDate: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    people: {
        type: Number,
        require: true,
    },
    phoneNumber: {
        type: Number,
        require: true
    },
    comments: {
        type: String,
        require: false
    }
    

})

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;