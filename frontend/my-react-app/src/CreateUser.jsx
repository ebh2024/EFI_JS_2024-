import React, { useState } from 'react';

const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('access_token');

        fetch('/api/users', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username, password, is_admin: isAdmin })
        })
        .then(response => response.json())
        .then(data => {
            if (data.msg) {
                setMessage(data.msg);
            } else {
                setMessage('User created successfully');
                setUsername('');
                setPassword('');
                setIsAdmin(false);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <div>
            <h1>Create User</h1>
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
                <label htmlFor="isAdmin">Admin:</label>
                <input
                    type="checkbox"
                    id="isAdmin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <button type="submit">Create User</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateUser;
