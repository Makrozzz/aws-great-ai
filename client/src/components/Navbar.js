import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/" className="logo">
          nebula.ai
        </Link>
        
        {user && (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/dashboard" className={`nav-btn ${location.pathname === '/dashboard' ? 'primary' : ''}`}>
              Dashboard
            </Link>
            <Link to="/generator" className={`nav-btn ${location.pathname === '/generator' ? 'primary' : ''}`}>
              Create Campaign
            </Link>
            <Link to="/history" className={`nav-btn ${location.pathname === '/history' ? 'primary' : ''}`}>
              History
            </Link>
          </div>
        )}
      </div>
      
      <div className="nav-links">
        {user ? (
          <>
            <span className="nav-btn">Hi, {user.name}</span>
            <button onClick={onLogout} className="nav-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">
              Login
            </Link>
            <Link to="/register" className="nav-btn primary">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;