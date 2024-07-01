import React, { useEffect, useState } from 'react';
import { getBookings } from '../api/api';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const token = document.cookie.split('=')[1]; // Assumes cookie is in the format "token=..."
            const bookings = await getBookings(token);
            setBookings(bookings);
        };
        fetchBookings();
    }, []);

    return (
        <div>
            <h1>Bookings</h1>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking._id}>{booking.fullName} - {booking.bookingDate}</li>
                ))}
            </ul>
        </div>
    );
};

export default Bookings;
