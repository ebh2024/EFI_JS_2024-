import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/create-user">Create User</Link>
                </li>
                <li>
                    <Link to="/user-list">User List</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
