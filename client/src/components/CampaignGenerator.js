import React, { useState } from 'react';
import CampaignForm from './CampaignForm';
import CampaignPreview from './CampaignPreview';

const CampaignGenerator = () => {
  const [campaignData, setCampaignData] = useState({
    description: '',
    productImages: [],
    contentStyle: 'professional',
    platformFormat: 'instagram-post',
    toneOfVoice: 'casual',
    mediaType: 'image',
    language: 'english'
  });
  
  const [generatedContent, setGeneratedContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormChange = (newData) => {
    setCampaignData({ ...campaignData, ...newData });
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/campaigns/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignData)
      });
      
      const result = await response.json();
      setGeneratedContent(result);
    } catch (error) {
      console.error('Error generating campaign:', error);
      // Mock data for development
      setGeneratedContent({
        caption: "🌟 Discover the perfect blend of style and comfort! Our latest collection brings you premium quality at unbeatable prices. Made with love in Malaysia for the modern lifestyle. #MalaysianMade #QualityFirst",
        hashtags: ['MalaysianMade', 'QualityFirst', 'StyleAndComfort', 'PremiumQuality', 'ModernLifestyle', 'LocalBrand', 'Affordable', 'Trendy'],
        mediaUrl: 'https://via.placeholder.com/400x400/667eea/ffffff?text=Generated+Image',
        videoUrl: campaignData.mediaType === 'video' ? 'https://via.placeholder.com/400x400/764ba2/ffffff?text=Generated+Video' : null
      });
    }
    setLoading(false);
  };

  return (
    <div className="main-content">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>Campaign Generator</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)' }}>Create engaging marketing campaigns with AI</p>
      </div>

      <div className="grid grid-2" style={{ gap: '2rem', alignItems: 'start' }}>
        <CampaignForm 
          data={campaignData}
          onChange={handleFormChange}
          onGenerate={handleGenerate}
          loading={loading}
        />
        
        <CampaignPreview 
          data={campaignData}
          generatedContent={generatedContent}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CampaignGenerator;