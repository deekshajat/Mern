import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">Notes App</Link>
            </div>
            <div className="nav-links">
                {user ? (
                    <div className="user-info">
                        <span className="welcome-text">Welcome, {user.username}!</span>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                ) : (
                    <div className="auth-links">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 