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
              <div className="placeholder-image">
                {campaign.caption ? 'Click "Generate Image" to add visual content' : 'Generated Image'}
              </div>
            )}
          </div>
          
          <div className="post-content">
            {campaign.caption ? (
              <p className="caption">{campaign.caption}</p>
            ) : (
              <p className="caption placeholder-text">Click "Generate Text Content" to add caption...</p>
            )}
            
            <div className="hashtags">
              {campaign.hashtags && campaign.hashtags.length > 0 ? (
                campaign.hashtags.map((tag, index) => (
                  <span key={index} className="hashtag">#{tag}</span>
                ))
              ) : (
                <span className="placeholder-text">Hashtags will appear here...</span>
              )}
            </div>
            
            {campaign.keywords && campaign.keywords.length > 0 && (
              <div className="keywords">
                <strong>Keywords:</strong> {campaign.keywords.join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <button 
        className="save-button" 
        onClick={onSave}
        disabled={!campaign.caption && !campaign.imageUrl}
      >
        Save Campaign
      </button>
    </div>
  );
}

export default CampaignPreview;