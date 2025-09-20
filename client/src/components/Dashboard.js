import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    thisMonth: 0,
    engagement: '0%',
    savedTime: '0h'
  });
  const [recentCampaigns, setRecentCampaigns] = useState([]);

  useEffect(() => {
    // Mock data - replace with API calls
    setStats({
      totalCampaigns: 12,
      thisMonth: 5,
      engagement: '23.5%',
      savedTime: '48h'
    });

    setRecentCampaigns([
      {
        id: 1,
        title: 'Summer Sale Campaign',
        platform: 'Instagram',
        createdAt: '2024-01-15',
        status: 'Published'
      },
      {
        id: 2,
        title: 'New Product Launch',
        platform: 'TikTok',
        createdAt: '2024-01-14',
        status: 'Draft'
      },
      {
        id: 3,
        title: 'Brand Awareness',
        platform: 'Instagram Story',
        createdAt: '2024-01-13',
        status: 'Published'
      }
    ]);
  }, []);

  return (
    <div className="main-content">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>Dashboard</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)' }}>Welcome back! Here's your campaign overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-2" style={{ marginBottom: '3rem' }}>
        <div className="card">
          <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Total Campaigns</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>{stats.totalCampaigns}</div>
        </div>
        <div className="card">
          <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>This Month</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>{stats.thisMonth}</div>
        </div>
        <div className="card">
          <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Avg. Engagement</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e' }}>{stats.engagement}</div>
        </div>
        <div className="card">
          <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Time Saved</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>{stats.savedTime}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/generator" className="btn btn-primary">
            🚀 Create New Campaign
          </Link>
          <Link to="/history" className="btn btn-secondary">
            📊 View All Campaigns
          </Link>
          <button className="btn btn-secondary">
            📈 Analytics
          </button>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Recent Campaigns</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#667eea' }}>Campaign</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#667eea' }}>Platform</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#667eea' }}>Created</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#667eea' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentCampaigns.map(campaign => (
                <tr key={campaign.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{campaign.title}</td>
                  <td style={{ padding: '1rem', color: '#666' }}>{campaign.platform}</td>
                  <td style={{ padding: '1rem', color: '#666' }}>{campaign.createdAt}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      background: campaign.status === 'Published' ? '#dcfce7' : '#fef3c7',
                      color: campaign.status === 'Published' ? '#166534' : '#92400e'
                    }}>
                      {campaign.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;