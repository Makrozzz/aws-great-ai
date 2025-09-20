const { generateText, generateImage, extractKeywords, uploadToS3 } = require('./awsService');
const { saveCampaignToDB, getCampaignsFromDB } = require('./dbService');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

async function generateCampaign(description, imagePath) {
  // Generate enhanced campaign content
  const prompt = `Create a marketing campaign for: ${description}. 
  Generate:
  1. A compelling caption (max 150 words)
  2. 5 relevant hashtags
  3. A detailed image description for product visualization
  
  Format as JSON: {"caption": "", "hashtags": [], "imagePrompt": ""}`;
  
  const campaign = await generateText(prompt);
  console.log('Bedrock AI Response:', campaign);
  
  // Extract keywords from description
  const keywords = extractKeywords(description);
  
  return {
    id: uuidv4(),
    description,
    caption: campaign.caption,
    hashtags: campaign.hashtags,
    keywords,
    imageUrl: "https://picsum.photos/512/512",
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