import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [editUser, setEditUser] = useState(null);
    const [editedUsername, setEditedUsername] = useState('');
    const [editedIsAdmin, setEditedIsAdmin] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        const token = localStorage.getItem('access_token');
        fetch('/api/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error('Error:', error));
    };

    const handleDelete = (userId) => {
        const token = localStorage.getItem('access_token');
        fetch(`/api/users/${userId}`, {
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
                setTimeout(() => setMessage(''), 3000); // Ocultar mensaje después de 3 segundos
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const handleEdit = (user) => {
        setEditUser(user);
        setEditedUsername(user.username);
        setEditedIsAdmin(user.is_admin);
    };

    const handleSave = () => {
        const token = localStorage.getItem('access_token');
        fetch(`/api/users/${editUser.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: editedUsername,
                is_admin: editedIsAdmin,
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                setMessage("User updated successfully!");

                // Actualizar el usuario en el estado de users
                setUsers(users.map(user => 
                    user.id === editUser.id ? { ...user, username: editedUsername, is_admin: editedIsAdmin } : user
                ));
                
                setEditUser(null); // Ocultar el formulario de edición
                setTimeout(() => setMessage(''), 3000); // Ocultar mensaje después de 3 segundos
            }
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">User List</h1>
            {message && <div className="alert alert-info">{message}</div>}

            <div className="card">
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Admin</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.is_admin ? 'Yes' : 'No'}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm me-2"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleEdit(user)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {editUser && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit User</h5>
                                <button type="button" className="btn-close" onClick={() => setEditUser(null)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editedUsername}
                                        onChange={(e) => setEditedUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="adminCheck"
                                        checked={editedIsAdmin}
                                        onChange={(e) => setEditedIsAdmin(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="adminCheck">
                                        Admin
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setEditUser(null)}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={handleSave}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;
