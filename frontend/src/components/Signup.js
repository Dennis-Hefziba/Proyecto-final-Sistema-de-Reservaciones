import React, { useState } from 'react';
import { signup } from '../api/api';

const Signup = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await signup({ userName, email, password, role });
        document.cookie = `token=${response.token}`;
        window.location.href = '/'; // Redirigir a la página de inicio o de reservas
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="User">User</option>
                    <option value="Administrator">Administrator</option>
                </select>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;

