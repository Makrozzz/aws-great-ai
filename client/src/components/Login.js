import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock authentication - replace with real API call
    setTimeout(() => {
      const userData = {
        id: 1,
        name: formData.email.split('@')[0],
        email: formData.email
      };
      onLogin(userData);
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="main-content">
      <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
        <div className="card">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#667eea' }}>
            Welcome Back
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Enter your password"
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginBottom: '1rem' }}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <p style={{ textAlign: 'center', color: '#666' }}>
            Don't have an account? <Link to="/register" style={{ color: '#667eea' }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;