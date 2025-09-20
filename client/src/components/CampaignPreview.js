import React from 'react';

function CampaignPreview({ campaign, onSave }) {
  return (
    <div className="campaign-preview">
      <h3>Campaign Preview</h3>
      
      <div className="social-mockup">
        <div className="instagram-post">
          <div className="post-header">
            <div className="profile-pic"></div>
            <span>your_business</span>
          </div>
          
          <div className="post-image">
            {campaign.imageUrl ? (
              <img src={campaign.imageUrl} alt="Generated content" />
            ) : (
              <div className="placeholder-image">Generated Image</div>
            )}
          </div>
          
          <div className="post-content">
            <p className="caption">{campaign.caption}</p>
            <div className="hashtags">
              {campaign.hashtags?.map((tag, index) => (
                <span key={index} className="hashtag">#{tag}</span>
              ))}
            </div>
            <div className="keywords">
              <strong>Keywords:</strong> {campaign.keywords?.join(', ')}
            </div>
          </div>
        </div>
      </div>
      
      <button className="save-button" onClick={onSave}>
        Save Campaign
      </button>
    </div>
  );
}

export default CampaignPreview;