import React, { useEffect, useState } from 'react';
import { getBookings } from '../api/api';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = document.cookie.split('=')[1]; // Assumes cookie is in the format "token=..."
                const bookingsData = await getBookings(token);
                setBookings(bookingsData);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div>
            <h1>Bookings</h1>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking._id}>
                        {booking.fullName} - {booking.bookingDate}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Bookings;
