import React, { useState } from 'react';
import CampaignPreview from './CampaignPreview';

function CampaignForm() {
  const [formData, setFormData] = useState({
    description: '',
    image: null
  });
  const [campaign, setCampaign] = useState({
    id: null,
    description: '',
    caption: '',
    hashtags: [],
    keywords: [],
    imageUrl: '',
    imagePrompt: ''
  });
  const [loading, setLoading] = useState({
    text: false,
    image: false,
    full: false
  });

  const handleGenerateText = async () => {
    if (!formData.description.trim()) {
      alert('Please enter a description first');
      return;
    }

    console.log('Generate text button clicked');
    setLoading(prev => ({ ...prev, text: true }));

    try {
      const response = await fetch('http://localhost:8080/api/campaigns/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: formData.description })
      });
      const result = await response.json();
      
      setCampaign(prev => ({
        ...prev,
        description: formData.description,
        caption: result.caption,
        hashtags: result.hashtags,
        keywords: result.keywords,
        imagePrompt: result.imagePrompt
      }));
    } catch (error) {
      console.error('Error generating text:', error);
      alert('Failed to generate text content. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, text: false }));
    }
  };

  const handleGenerateImage = async () => {
    const imagePrompt = campaign.imagePrompt || formData.description;
    
    if (!imagePrompt.trim()) {
      alert('Please generate text content first or enter a description');
      return;
    }

    console.log('Generate image button clicked');
    setLoading(prev => ({ ...prev, image: true }));

    try {
      const response = await fetch('http://localhost:8080/api/campaigns/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          imagePrompt: campaign.imagePrompt,
          description: formData.description 
        })
      });
      const result = await response.json();
      
      setCampaign(prev => ({
        ...prev,
        imageUrl: result.imageUrl
      }));

      if (result.fallback) {
        alert(`Image generation failed: ${result.error}. Using placeholder image.`);
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, image: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Generate full campaign button clicked');
    setLoading(prev => ({ ...prev, full: true }));

    // ✅ Use formData from state, rename to avoid conflict
    const payload = new FormData();
    payload.append("description", formData.description);
    if (formData.image) {
      payload.append("image", formData.image);
    }

    try {
      const response = await fetch('http://localhost:8080/api/campaigns/generate', {
        method: 'POST',
        body: payload
      });
      const result = await response.json();
      setCampaign(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(prev => ({ ...prev, full: false }));
    }
  };

  
  const handleSave = async () => {
    if (!campaign.caption && !campaign.imageUrl) {
      alert('Please generate some content before saving');
      return;
    }

    try {
      const campaignToSave = {
        ...campaign,
        id: campaign.id || Date.now().toString(),
        createdAt: new Date()
      };

      await fetch('http://localhost:8080/api/campaigns/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignToSave)
      });
      alert('Campaign saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save campaign. Please try again.');
    }
  };

  return (
    <div className="campaign-form">
      <div className="form-section">
        <h2>Create New Campaign</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Describe your product/campaign goal:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="e.g., Eco-friendly water bottles for active lifestyle..."
              required
            />
          </div>
          
          <div className="form-group">
            <label>Upload reference image (optional):</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
            />
          </div>

          <div className="generation-buttons">
            <button 
              type="button" 
              className="generate-text-btn"
              onClick={handleGenerateText}
              disabled={loading.text || !formData.description.trim()}
            >
              {loading.text ? 'Generating Text...' : 'Generate Text Content'}
            </button>
            
            <button 
              type="button" 
              className="generate-image-btn"
              onClick={handleGenerateImage}
              disabled={loading.image || (!campaign.imagePrompt && !formData.description.trim())}
            >
              {loading.image ? 'Generating Image...' : 'Generate Image'}
            </button>
            
            <button 
              type="submit" 
              className="generate-full-btn"
              disabled={loading.full || loading.text || loading.image}
            >
              {loading.full ? 'Generating...' : 'Generate Full Campaign'}
            </button>
          </div>
        </form>
      </div>

      {(campaign.caption || campaign.imageUrl) && (
        <div className="preview-section">
          <CampaignPreview campaign={campaign} onSave={handleSave} />
        </div>
      )}
    </div>
  );
}

export default CampaignForm;