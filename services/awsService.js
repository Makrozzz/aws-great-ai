const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function generateText(prompt) {
  console.log('🔍 Generating text with prompt:', prompt.substring(0, 100) + '...');
  
  const input = {
    modelId: "meta.llama3-8b-instruct-v1:0",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      prompt: prompt,
      max_gen_len: 300,
      temperature: 0.7,
      top_p: 0.9
    })
  };

  const command = new InvokeModelCommand(input);
  const response = await bedrockClient.send(command);

  const decoded = new TextDecoder().decode(response.body);
  const responseBody = JSON.parse(decoded);
  
  console.log('✅ Bedrock response received');
  
  if (responseBody.generation) {
    const generatedText = responseBody.generation;
    console.log('Raw generation:', generatedText);
    
    // Try to extract JSON from the response
    const jsonMatch = generatedText.match(/\{[\s\S]*?\}/);
    
    if (jsonMatch) {
      try {
        const cleanJson = jsonMatch[0].replace(/\n/g, ' ').replace(/\s+/g, ' ');
        return JSON.parse(cleanJson);
      } catch (e) {
        console.error('Failed to parse JSON:', e.message);
        console.error('Extracted text:', jsonMatch[0]);
        
        // Fallback: create structured response from text
        return {
          caption: generatedText.substring(0, 150),
          hashtags: ['MalaysianMade', 'LocalBrand', 'QualityFirst', 'Innovation', 'SmallBusiness'],
          imagePrompt: 'Professional product showcase with modern Malaysian aesthetic'
        };
      }
    }
    
    // If no JSON found, create response from raw text
    return {
      caption: generatedText.substring(0, 150),
      hashtags: ['MalaysianMade', 'LocalBrand', 'QualityFirst', 'Innovation', 'SmallBusiness'],
      imagePrompt: 'Professional product showcase with modern Malaysian aesthetic'
    };
  }
  
  throw new Error("No generation returned from Llama 3");
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Upload buffer to S3 and return public URL
async function uploadToS3(buffer, key, contentType = "image/png") {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return `https://${params.Bucket}.s3.amazonaws.com/${key}`;
}

// Generate image using Nova Canvas
async function generateImage(prompt) {
  console.log("🎨 Starting image generation with prompt:", prompt);
  
  const input = {
    modelId: "amazon.nova-canvas-v1:0",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      taskType: "TEXT_IMAGE",
      textToImageParams: {
        text: prompt,
        negativeText: "blurry, low quality, distorted"
      },
      imageGenerationConfig: {
        numberOfImages: 1,
        height: 512,
        width: 512,
        cfgScale: 8.0,
        seed: Math.floor(Math.random() * 1000000)
      }
    })
  };

  console.log("📤 Sending request to Bedrock:", JSON.stringify(input, null, 2));

  try {
    const command = new InvokeModelCommand(input);
    const response = await bedrockClient.send(command);

    const decoded = new TextDecoder().decode(response.body);
    const responseBody = JSON.parse(decoded);

    console.log("✅ Nova Canvas response received");

    if (responseBody.images && responseBody.images[0]) {
      return Buffer.from(responseBody.images[0], "base64");
    } else {
      throw new Error("No image data found in Nova Canvas response");
    }

  } catch (error) {
    console.error("❌ Error during image generation:", error);
    throw error;
  }
}

// Alternative function to try different model versions
async function generateImageFallback(prompt) {
  const models = [
    "amazon.titan-image-generator-v1:0",
    "amazon.titan-image-generator-g1:latest",
    "stability.stable-diffusion-xl-base-v1-0" // Alternative model
  ];

  for (const modelId of models) {
    try {
      console.log(`🔄 Trying model: ${modelId}`);
      
      const input = {
        modelId: modelId,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify(
          modelId.includes("stability") ? {
            // Stable Diffusion format
            text_prompts: [{ text: prompt }],
            cfg_scale: 10,
            seed: 0,
            steps: 50,
            width: 512,
            height: 512
          } : {
            // Titan format
            taskType: "TEXT_IMAGE",
            textToImageParams: { text: prompt },
            imageGenerationConfig: {
              numberOfImages: 1,
              height: 512,
              width: 512,
              cfgScale: 8.0
            }
          }
        )
      };

      const command = new InvokeModelCommand(input);
      const response = await bedrockClient.send(command);
      const decoded = new TextDecoder().decode(response.body);
      const responseBody = JSON.parse(decoded);

      // Handle different response formats
      if (responseBody.images && responseBody.images[0]) {
        return Buffer.from(responseBody.images[0], "base64");
      } else if (responseBody.artifacts && responseBody.artifacts[0]) {
        return Buffer.from(responseBody.artifacts[0].base64, "base64");
      } else if (responseBody.image) {
        return Buffer.from(responseBody.image, "base64");
      }
      
    } catch (error) {
      console.log(`❌ Failed with ${modelId}:`, error.message);
      continue;
    }
  }
  
  throw new Error("All image generation models failed");
}


function extractKeywords(text) {
  // Remove punctuation, split by spaces, filter out short/common words
  const stopWords = ['the', 'and', 'for', 'with', 'a', 'an', 'of', 'to', 'in', 'on', 'at', 'by', 'is', 'it', 'this', 'that'];
  return text
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .split(/\s+/)
    .map(word => word.toLowerCase())
    .filter(word => word.length > 3 && !stopWords.includes(word));
}

module.exports = {
  generateText,
  generateImage,
  extractKeywords,
  uploadToS3
}

// Only run CLI if called directly
if (require.main === module) {
  async function main() {
    const prompt = process.argv.slice(2).join(" ");
    if (!prompt) {
      console.log("Usage: node generateImageCLI.js <your prompt>");
      return;
    }

    try {
      console.log("Generating image for prompt:", prompt);
      const imageBuffer = await generateImage(prompt);

      if (!imageBuffer || imageBuffer.length === 0) {
        console.error("❌ Image generation failed: no data returned from Titan.");
        return;
      }

      console.log("✅ Image generated successfully! Buffer size:", imageBuffer.length);

      const key = `cli-images/${Date.now()}.png`;
      const url = await uploadToS3(imageBuffer, key);

      console.log("✅ Image uploaded successfully!");
      console.log("S3 URL:", url);
    } catch (err) {
      console.error("❌ Failed to generate/upload image:", err.message);
    }
  }

  main();
}
