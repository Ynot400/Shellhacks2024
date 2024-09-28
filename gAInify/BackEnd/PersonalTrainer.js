console.log('Hello, World!');

require('dotenv').config();  // Load the environment variables from the .env file
const https = require('https');

// Define the message in the correct format for gpt-3.5-turbo, with system message
const data = JSON.stringify({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "You are a personal trainer. You must only answer questions related to fitness, nutrition, and personal training. Avoid discussing any unrelated topics."
    },
    {
      role: "user",
      content: "I've been doing this program for 2 weeks, why have I not lost weight?"
    }
  ],
  max_tokens: 300,
  temperature: 0.7,
});

const apiKey = process.env.OPENAI_API_KEY;  // Read the API key from .env file

const options = {
  hostname: 'api.openai.com',
  path: '/v1/chat/completions',  // Use the correct path for chat completion models
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,  // Use the API key here
  },
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      
      // Log the full API response for inspection
      console.log('Full API response:', response);
      
      // Now attempt to access the 'choices' property
      if (response.choices && response.choices[0]) {
        console.log('ChatGPT says:', response.choices[0].message.content.trim());
      } else {
        console.error('No choices available in response.');
      }
    } catch (error) {
      console.error('Error parsing response:', error);
    }
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.write(data);
req.end();
