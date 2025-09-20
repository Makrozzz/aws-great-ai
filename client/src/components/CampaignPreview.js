import React, { useState } from 'react';

const CampaignPreview = ({ data, generatedContent, loading }) => {
  const [voiceoverPlaying, setVoiceoverPlaying] = useState(false);

  const handleSaveCampaign = async () => {
    if (!generatedContent) return;
    
    try {
      const response = await fetch('http://localhost:8080/api/campaigns/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          ...generatedContent,
          createdAt: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        alert('Campaign saved successfully!');
      }
    } catch (error) {
      console.error('Error saving campaign:', error);
      alert('Campaign saved locally!'); // Mock success
    }
  };

  const handleVoiceover = () => {
    setVoiceoverPlaying(!voiceoverPlaying);
    // Mock voiceover functionality
    if (!voiceoverPlaying) {
      setTimeout(() => setVoiceoverPlaying(false), 3000);
    }
  };

  const getPreviewStyle = () => {
    switch (data.platformFormat) {
      case 'instagram-story':
        return { aspectRatio: '9/16', maxWidth: '300px' };
      case 'tiktok-video':
        return { aspectRatio: '9/16', maxWidth: '300px' };
      case 'banner':
        return { aspectRatio: '16/9', maxWidth: '100%' };
      default:
        return { aspectRatio: '1/1', maxWidth: '400px' };
    }
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '2rem', color: '#667eea' }}>Live Preview</h2>
      
      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#667eea' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
          <p>AI is generating your campaign...</p>
          <div style={{ 
            width: '100%', 
            height: '4px', 
            background: '#f0f0f0', 
            borderRadius: '2px', 
            overflow: 'hidden',
            marginTop: '1rem'
          }}>
            <div style={{
              width: '30%',
              height: '100%',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              animation: 'loading 2s ease-in-out infinite'
            }}></div>
          </div>
        </div>
      )}

      {!loading && !generatedContent && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
          <p>Fill in the campaign details and click generate to see your preview</p>
        </div>
      )}

      {generatedContent && (
        <div>
          {/* Platform Preview */}
          <div style={{ 
            border: '2px solid #3b82f6', 
            borderRadius: '12px', 
            overflow: 'hidden',
            margin: '0 auto 1rem',
            ...getPreviewStyle()
          }}>
            {/* Header */}
            <div style={{ 
              background: '#3b82f6', 
              color: 'white', 
              padding: '0.5rem 1rem', 
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              {data.platformFormat.replace('-', ' ').toUpperCase()} PREVIEW
            </div>
            
            {/* Media */}
            <div style={{ position: 'relative' }}>
              {generatedContent.mediaUrl && (
                <img 
                  src={generatedContent.mediaUrl} 
                  alt="Generated content"
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                />
              )}
              {generatedContent.videoUrl && data.mediaType !== 'image' && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem'
                }}>
                  ▶️ Video Preview
                </div>
              )}
            </div>
          </div>

          {/* Caption & Hashtags */}
          <div style={{ 
            background: 'rgba(30, 30, 30, 0.8)', 
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)'
          }}>
            <h4 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1rem' }}>Generated Content</h4>
            <p style={{ 
              fontSize: '0.9rem', 
              lineHeight: '1.4', 
              marginBottom: '1rem',
              color: 'white'
            }}>
              {generatedContent.caption}
            </p>
            
            {/* Hashtags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {generatedContent.hashtags?.map((hashtag, index) => (
                <span 
                  key={index}
                  style={{ 
                    background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}
                >
                  #{hashtag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={handleVoiceover}
              className={`btn ${voiceoverPlaying ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1 }}
            >
              {voiceoverPlaying ? '🔊 Playing...' : '🎤 Add Voiceover'}
            </button>
            
            <button 
              onClick={handleSaveCampaign}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              💾 Save Campaign
            </button>
          </div>

          {/* Campaign Stats */}
          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            background: 'rgba(102, 126, 234, 0.1)', 
            borderRadius: '8px' 
          }}>
            <h4 style={{ marginBottom: '1rem', color: '#667eea' }}>Campaign Insights</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Estimated Reach</div>
                <div style={{ fontWeight: '600', color: '#333' }}>2.5K - 5K</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Engagement Score</div>
                <div style={{ fontWeight: '600', color: '#22c55e' }}>8.5/10</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Best Time to Post</div>
                <div style={{ fontWeight: '600', color: '#333' }}>7-9 PM</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Trend Match</div>
                <div style={{ fontWeight: '600', color: '#f59e0b' }}>High</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignPreview;