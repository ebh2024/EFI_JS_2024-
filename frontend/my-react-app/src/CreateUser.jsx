import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="container mt-5">
            <h1 className="text-center mb-4">Create User</h1>
            {message && <div className="alert alert-info">{message}</div>}
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="isAdmin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                            <label htmlFor="isAdmin" className="form-check-label">Admin</label>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Create User</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;
