import React from 'react';

const CampaignForm = ({ data, onChange, onGenerate, loading }) => {
  const handleInputChange = (field, value) => {
    onChange({ [field]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    onChange({ productImages: files });
  };

  return (
    <div className="card glitter-form">
      <h2 style={{ marginBottom: '2rem', color: '#60a5fa' }}>Campaign Details</h2>
      
      {/* Product Description */}
      <div className="form-group">
        <label>Product/Campaign Description</label>
        <textarea
          value={data.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="form-control"
          rows="4"
          placeholder="Describe your product or campaign goals..."
          style={{ resize: 'vertical' }}
        />
      </div>

      {/* Image Upload */}
      <div className="form-group">
        <label>Product Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="form-control"
        />
        {data.productImages.length > 0 && (
          <div style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
            {data.productImages.length} image(s) selected
          </div>
        )}
      </div>

      {/* Content Style */}
      <div className="form-group">
        <label>Content Style</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
          {['professional', 'funny', 'viral', 'minimalist'].map(style => (
            <button
              key={style}
              type="button"
              onClick={() => handleInputChange('contentStyle', style)}
              className={`btn ${data.contentStyle === style ? 'btn-primary' : 'btn-secondary'}`}
              style={{ textTransform: 'capitalize' }}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Platform Format */}
      <div className="form-group">
        <label>Platform Format</label>
        <select
          value={data.platformFormat}
          onChange={(e) => handleInputChange('platformFormat', e.target.value)}
          className="form-control"
        >
          <option value="instagram-post">Instagram Post</option>
          <option value="instagram-story">Instagram Story</option>
          <option value="tiktok-video">TikTok Video</option>
          <option value="facebook-post">Facebook Post</option>
          <option value="banner">Banner Ad</option>
        </select>
      </div>

      {/* Tone of Voice */}
      <div className="form-group">
        <label>Tone of Voice</label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['casual', 'persuasive', 'youthful', 'professional'].map(tone => (
            <button
              key={tone}
              type="button"
              onClick={() => handleInputChange('toneOfVoice', tone)}
              className={`btn ${data.toneOfVoice === tone ? 'btn-primary' : 'btn-secondary'}`}
              style={{ textTransform: 'capitalize' }}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>

      {/* Media Type */}
      <div className="form-group">
        <label>Media Type</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['image', 'video', 'both'].map(type => (
            <button
              key={type}
              type="button"
              onClick={() => handleInputChange('mediaType', type)}
              className={`btn ${data.mediaType === type ? 'btn-primary' : 'btn-secondary'}`}
              style={{ textTransform: 'capitalize' }}
            >
              {type === 'both' ? 'Image + Video' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="form-group">
        <label>Language</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[
            { value: 'english', label: 'English' },
            { value: 'malay', label: 'Bahasa Malaysia' },
            { value: 'bilingual', label: 'Bilingual' }
          ].map(lang => (
            <button
              key={lang.value}
              type="button"
              onClick={() => handleInputChange('language', lang.value)}
              className={`btn ${data.language === lang.value ? 'btn-primary' : 'btn-secondary'}`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={loading || !data.description.trim()}
        className="btn btn-primary"
        style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }}
      >
        {loading ? '🤖 Generating...' : '✨ Generate Campaign'}
      </button>
    </div>
  );
};

export default CampaignForm;