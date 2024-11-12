import React, { useState } from 'react';
import './components/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('/api/login', {  // Cambiado a /api/login
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.access_token) {
                // Almacenar el token y los datos del usuario
                localStorage.setItem('access_token', data.access_token);
                console.log(data.user); // Asegúrate de que data.user no es undefined

                // Redirigir a otra página o actualizar la interfaz según sea necesario
                window.location.href = '/user-list';
            } else {
                setMessage('Invalid username or password');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
