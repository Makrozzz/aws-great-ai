const { generateText, generateImage, extractKeywords, uploadToS3 } = require('./awsService');
const { saveCampaignToDB, getCampaignsFromDB } = require('./dbService');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

async function generateCampaign(campaignData) {
  const {
    description,
    contentStyle = 'professional',
    platformFormat = 'instagram-post',
    toneOfVoice = 'casual',
    mediaType = 'image',
    language = 'english',
    imagePaths = []
  } = campaignData;

  // Create enhanced prompt based on campaign parameters
  const prompt = `Create a marketing campaign for: ${description}
  
  Campaign Requirements:
  - Content Style: ${contentStyle}
  - Platform: ${platformFormat}
  - Tone: ${toneOfVoice}
  - Language: ${language}
  - Target Market: Malaysia
  
  Generate:
  1. A compelling caption (max 150 words) that matches the style and tone
  2. 8 relevant hashtags for Malaysian market
  3. A detailed image description for product visualization
  
  ${language === 'bilingual' ? 'Mix English and Bahasa Malaysia naturally.' : ''}
  ${language === 'malay' ? 'Write in Bahasa Malaysia.' : ''}
  
  Format as JSON: {"caption": "", "hashtags": [], "imagePrompt": ""}`;
  
  const campaign = await generateText(prompt);
  console.log('Bedrock AI Response:', campaign);
  
  // Generate image if needed
  let mediaUrl = null;
  let videoUrl = null;
  
  if (mediaType === 'image' || mediaType === 'both') {
    try {
      const imageResult = await generateImageContent(campaign.imagePrompt || description);
      mediaUrl = imageResult.imageUrl;
    } catch (error) {
      console.error('Image generation failed:', error);
      mediaUrl = "https://via.placeholder.com/400x400/667eea/ffffff?text=Generated+Image";
    }
  }
  
  if (mediaType === 'video' || mediaType === 'both') {
    // Mock video URL for now
    videoUrl = "https://via.placeholder.com/400x400/764ba2/ffffff?text=Generated+Video";
  }
  
  // Extract keywords from description
  const keywords = extractKeywords(description);
  
  return {
    id: uuidv4(),
    description,
    contentStyle,
    platformFormat,
    toneOfVoice,
    mediaType,
    language,
    caption: campaign.caption,
    hashtags: campaign.hashtags,
    keywords,
    mediaUrl,
    videoUrl,
    createdAt: new Date()
  };
}

async function generateTextContent(description) {
  console.log('🎯 Generating text content for:', description);
  
  const prompt = `Create a marketing campaign for: ${description}. 
  Generate:
  1. A compelling caption (max 150 words)
  2. 5 relevant hashtags
  3. A detailed image description for product visualization
  
  Format as JSON: {"caption": "", "hashtags": [], "imagePrompt": ""}`;
  
  const textContent = await generateText(prompt);
  console.log('Generated text content:', textContent);
  
  // Extract keywords from description
  const keywords = extractKeywords(description);
  
  return {
    caption: textContent.caption,
    hashtags: textContent.hashtags,
    imagePrompt: textContent.imagePrompt,
    keywords,
    type: 'text'
  };
}

async function generateImageContent(imagePrompt) {
  console.log('🎨 Generating image for prompt:', imagePrompt);
  
  try {
    // Generate image using AWS Bedrock
    const imageBuffer = await generateImage(imagePrompt);
    
    if (!imageBuffer || imageBuffer.length === 0) {
      throw new Error('No image data returned from generator');
    }
    
    // Upload to S3
    const key = `generated-images/${Date.now()}-${Math.random().toString(36).substring(7)}.png`;
    const imageUrl = await uploadToS3(imageBuffer, key, 'image/png');
    
    console.log('✅ Image generated and uploaded:', imageUrl);
    
    return {
      imageUrl,
      type: 'image'
    };
  } catch (error) {
    console.error('❌ Image generation failed:', error.message);
    
    // Return placeholder image if generation fails
    return {
      imageUrl: "https://picsum.photos/512/512",
      type: 'image',
      fallback: true,
      error: error.message
    };
  }
}

async function saveCampaign(campaignData) {
  return await saveCampaignToDB(campaignData);
}

async function getCampaigns() {
  return await getCampaignsFromDB();
}

module.exports = {
  generateCampaign,
  generateTextContent,
  generateImageContent,
  saveCampaign,
  getCampaigns
};