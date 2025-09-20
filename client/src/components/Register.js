import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    // Mock registration - replace with real API call
    setTimeout(() => {
      const userData = {
        id: 1,
        name: formData.name,
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
            Join nebula.ai
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Enter your full name"
              />
            </div>
            
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
                placeholder="Create a password"
              />
            </div>
            
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Confirm your password"
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginBottom: '1rem' }}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <p style={{ textAlign: 'center', color: '#666' }}>
            Already have an account? <Link to="/login" style={{ color: '#667eea' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;