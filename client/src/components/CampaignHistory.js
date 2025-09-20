import React, { useState, useEffect } from 'react';

function CampaignHistory() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/campaigns');
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading campaigns...</div>;

  return (
    <div className="campaign-history">
      <h2>Campaign History</h2>
      
      {campaigns.length === 0 ? (
        <p>No campaigns yet. Create your first campaign!</p>
      ) : (
        <div className="campaigns-grid">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="campaign-card">
              <div className="campaign-image">
                {campaign.image_url ? (
                  <img src={campaign.image_url} alt="Campaign" />
                ) : (
                  <div className="placeholder">No Image</div>
                )}
              </div>
              <div className="campaign-info">
                <p className="description">{campaign.description}</p>
                <p className="caption">{campaign.caption}</p>
                <div className="hashtags">
                  {campaign.hashtags?.map((tag, index) => (
                    <span key={index} className="hashtag">#{tag}</span>
                  ))}
                </div>
                <small className="date">
                  {new Date(campaign.created_at).toLocaleDateString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CampaignHistory;