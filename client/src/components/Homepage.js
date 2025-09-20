import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [trends, setTrends] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    // Mock data
    setTrends([
      { id: 1, title: 'Sustainable Products', engagement: '2.3M', growth: '+15%' },
      { id: 2, title: 'Local Malaysian Brands', engagement: '1.8M', growth: '+22%' },
      { id: 3, title: 'Tech Gadgets', engagement: '1.5M', growth: '+8%' },
      { id: 4, title: 'Food & Beverage', engagement: '3.1M', growth: '+12%' }
    ]);

    setHashtags([
      '#MalaysianMade', '#SustainableLiving', '#TechMalaysia', '#LocalBrand',
      '#EcoFriendly', '#Innovation', '#SmallBusiness', '#MadeInMalaysia'
    ]);

    setStats({
      totalUsers: '12.5K',
      campaignsCreated: '45.2K',
      avgEngagement: '23.8%',
      timeSaved: '2.1M hrs'
    });
  }, []);

  return (
    <div className="main-content">
      {/* Greeting Section */}
      <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'white' }}>
          Welcome to nebula.ai
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2rem' }}>
          AI-powered marketing campaigns for Malaysian SMEs
        </p>
        
        {/* Quick Actions */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem', justifyContent: 'center' }}>
          <Link to="/generator" className="btn btn-primary">
            🚀 Start Creating
          </Link>
          <Link to="/login" className="btn btn-secondary">
            📊 View Dashboard
          </Link>
          <button className="btn btn-secondary">
            📈 See Analytics
          </button>
        </div>
      </section>

      {/* Dashboard Overview */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '2rem', color: 'white', textAlign: 'center' }}>Platform Overview</h2>
        <div className="grid grid-2">
          <div className="card">
            <h3 style={{ color: '#60a5fa', marginBottom: '0.5rem' }}>Total Users</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{stats.totalUsers}</div>
          </div>
          <div className="card">
            <h3 style={{ color: '#60a5fa', marginBottom: '0.5rem' }}>Campaigns Created</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{stats.campaignsCreated}</div>
          </div>
          <div className="card">
            <h3 style={{ color: '#60a5fa', marginBottom: '0.5rem' }}>Avg. Engagement</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e' }}>{stats.avgEngagement}</div>
          </div>
          <div className="card">
            <h3 style={{ color: '#60a5fa', marginBottom: '0.5rem' }}>Time Saved</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>{stats.timeSaved}</div>
          </div>
        </div>
      </section>

      {/* Statistics Graph */}
      <section style={{ marginBottom: '3rem' }}>
        <div className="card">
          <h2 style={{ marginBottom: '2rem', color: 'white', textAlign: 'center' }}>Campaign Performance</h2>
          <div style={{ height: '300px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
            {/* Mock Graph */}
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', display: 'flex', alignItems: 'end', gap: '10px', height: '200px' }}>
              {[65, 45, 80, 55, 90, 70, 85].map((height, index) => (
                <div key={index} style={{
                  flex: 1,
                  height: `${height}%`,
                  background: `linear-gradient(to top, #3b82f6, #60a5fa)`,
                  borderRadius: '4px 4px 0 0',
                  boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)'
                }} />
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: '0', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Today's Trends */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '2rem', color: 'white', textAlign: 'center' }}>Today's Ad Trends in Malaysia</h2>
        <div className="grid grid-2">
          {trends.map(trend => (
            <div key={trend.id} className="card">
              <h3 style={{ color: '#60a5fa', marginBottom: '0.5rem' }}>{trend.title}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Engagement: {trend.engagement}</span>
                <span style={{ color: '#22c55e', fontWeight: '600' }}>{trend.growth}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Viral Hashtags */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '2rem', color: 'white', textAlign: 'center' }}>Trending Hashtags</h2>
        <div className="card">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {hashtags.map((hashtag, index) => (
              <span 
                key={index} 
                style={{ 
                  background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)', 
                  color: 'white', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '20px', 
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)'
                }}
              >
                {hashtag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 style={{ marginBottom: '2rem', color: 'white', textAlign: 'center' }}>Why Choose nebula.ai?</h2>
        <div className="grid grid-3">
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
            <h3 style={{ marginBottom: '1rem', color: '#60a5fa' }}>AI-Powered</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Generate professional content using advanced AI models trained for Malaysian market</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
            <h3 style={{ marginBottom: '1rem', color: '#60a5fa' }}>Lightning Fast</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Create complete campaigns in minutes, not hours or days</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
            <h3 style={{ marginBottom: '1rem', color: '#60a5fa' }}>Malaysian-Focused</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Optimized for local trends, language, and cultural preferences</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;