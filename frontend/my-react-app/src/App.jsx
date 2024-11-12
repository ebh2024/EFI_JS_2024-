import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Ajuste aquí
import Login from './Login';
import CreateUser from './CreateUser';
import UserList from './UserList';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/user-list" element={<UserList />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
