import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import CampaignGenerator from './components/CampaignGenerator';
import CampaignHistory from './components/CampaignHistory';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/generator" element={user ? <CampaignGenerator /> : <Navigate to="/login" />} />
          <Route path="/history" element={user ? <CampaignHistory /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;