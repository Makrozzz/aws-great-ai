import React, { useState, useEffect } from 'react';

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/campaigns');
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      // Mock data for development
      setCampaigns([
        {
          id: 1,
          title: 'Summer Sale Campaign',
          description: 'Promote summer collection with 50% off',
          platform: 'Instagram Post',
          contentStyle: 'viral',
          language: 'bilingual',
          createdAt: '2024-01-15T10:30:00Z',
          status: 'Published',
          engagement: { likes: 245, shares: 32, comments: 18 },
          mediaUrl: 'https://via.placeholder.com/300x300/667eea/ffffff?text=Summer+Sale'
        },
        {
          id: 2,
          title: 'New Product Launch',
          description: 'Introduce our latest tech gadget',
          platform: 'TikTok Video',
          contentStyle: 'professional',
          language: 'english',
          createdAt: '2024-01-14T15:45:00Z',
          status: 'Draft',
          engagement: { likes: 0, shares: 0, comments: 0 },
          mediaUrl: 'https://via.placeholder.com/300x300/764ba2/ffffff?text=Tech+Launch'
        },
        {
          id: 3,
          title: 'Brand Awareness',
          description: 'Build brand recognition in Malaysian market',
          platform: 'Instagram Story',
          contentStyle: 'minimalist',
          language: 'malay',
          createdAt: '2024-01-13T09:15:00Z',
          status: 'Published',
          engagement: { likes: 156, shares: 24, comments: 12 },
          mediaUrl: 'https://via.placeholder.com/300x300/22c55e/ffffff?text=Brand+Story'
        }
      ]);
    }
    setLoading(false);
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    if (filter === 'all') return true;
    return campaign.status.toLowerCase() === filter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-MY', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'published':
        return { background: '#dcfce7', color: '#166534' };
      case 'draft':
        return { background: '#fef3c7', color: '#92400e' };
      default:
        return { background: '#f3f4f6', color: '#374151' };
    }
  };

  if (loading) {
    return (
      <div className="main-content">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
          <p style={{ color: 'white' }}>Loading your campaigns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>Campaign History</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)' }}>Manage and track all your marketing campaigns</p>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: '600', color: '#333' }}>Filter by status:</span>
          {['all', 'published', 'draft'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`btn ${filter === status ? 'btn-primary' : 'btn-secondary'}`}
              style={{ textTransform: 'capitalize' }}
            >
              {status} ({status === 'all' ? campaigns.length : campaigns.filter(c => c.status.toLowerCase() === status).length})
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns Grid */}
      {filteredCampaigns.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>No campaigns found</h3>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            {filter === 'all' ? 'You haven\'t created any campaigns yet.' : `No ${filter} campaigns found.`}
          </p>
          <button 
            onClick={() => window.location.href = '/generator'} 
            className="btn btn-primary"
          >
            Create Your First Campaign
          </button>
        </div>
      ) : (
        <div className="grid grid-2" style={{ gap: '2rem' }}>
          {filteredCampaigns.map(campaign => (
            <div key={campaign.id} className="card">
              {/* Campaign Image */}
              <div style={{ marginBottom: '1rem' }}>
                <img 
                  src={campaign.mediaUrl} 
                  alt={campaign.title}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '8px' 
                  }}
                />
              </div>

              {/* Campaign Info */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h3 style={{ color: '#333', margin: 0 }}>{campaign.title}</h3>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    ...getStatusColor(campaign.status)
                  }}>
                    {campaign.status}
                  </span>
                </div>
                
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  {campaign.description}
                </p>

                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
                  <span>📱 {campaign.platform}</span>
                  <span>🎨 {campaign.contentStyle}</span>
                  <span>🌐 {campaign.language}</span>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
                  Created: {formatDate(campaign.createdAt)}
                </div>
              </div>

              {/* Engagement Stats */}
              {campaign.status === 'Published' && (
                <div style={{ 
                  background: 'rgba(102, 126, 234, 0.1)', 
                  padding: '1rem', 
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span>❤️ {campaign.engagement.likes}</span>
                    <span>🔄 {campaign.engagement.shares}</span>
                    <span>💬 {campaign.engagement.comments}</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary" style={{ flex: 1, fontSize: '0.9rem' }}>
                  View Details
                </button>
                <button className="btn btn-secondary" style={{ flex: 1, fontSize: '0.9rem' }}>
                  Duplicate
                </button>
                {campaign.status === 'Draft' && (
                  <button className="btn btn-primary" style={{ flex: 1, fontSize: '0.9rem' }}>
                    Publish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignHistory;