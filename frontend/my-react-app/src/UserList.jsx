import React, { useState, useEffect } from 'react';
import './components/UserList.css';
const UserList = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        fetch('/api/users', {  // Ajuste aquí: /api/users
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setUsers(data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    const handleDelete = (userId) => {
        const token = localStorage.getItem('access_token');

        fetch(`/api/users/${userId}`, {  // Ajuste aquí: /api/users/${userId}
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.msg) {
                setMessage(data.msg);
                setUsers(users.filter(user => user.id !== userId));
            }
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <div>
            <h1>User List</h1>
            {message && <p>{message}</p>}
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} (Admin: {user.is_admin ? 'Yes' : 'No'})
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
