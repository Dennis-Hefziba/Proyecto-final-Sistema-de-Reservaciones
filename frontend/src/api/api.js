const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const signup = async (userData) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return await response.json();
};

export const login = async (userData) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return await response.json();
};

export const getBookings = async (token) => {
    const response = await fetch(`${API_URL}/booking`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
};


