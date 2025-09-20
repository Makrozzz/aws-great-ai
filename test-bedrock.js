require('dotenv').config();
const { generateText } = require('./services/awsService');

async function test() {
  try {
    const result = await generateText('Test prompt for eco-friendly water bottle');
    console.log('✅ Bedrock working:', result);
  } catch (error) {
    console.error('❌ Bedrock error:', error.message);
  }
}

test();