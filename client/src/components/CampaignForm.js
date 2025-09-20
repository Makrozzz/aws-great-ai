import React, { useState } from 'react';
import CampaignPreview from './CampaignPreview';

function CampaignForm() {
  const [formData, setFormData] = useState({
    description: '',
    image: null
  });
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Generate button clicked');
  setLoading(true);

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
    setLoading(false);
  }
};

  
  const handleSave = async () => {
    try {
      await fetch('http://localhost:8080/api/campaigns/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaign)
      });
      alert('Campaign saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
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
          
          <button type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Campaign'}
          </button>
        </form>
      </div>

      {campaign && (
        <div className="preview-section">
          <CampaignPreview campaign={campaign} onSave={handleSave} />
        </div>
      )}
    </div>
  );
}

export default CampaignForm;