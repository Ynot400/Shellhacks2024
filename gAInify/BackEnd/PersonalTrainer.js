require('dotenv').config();  // Load the environment variables from the .env file
const https = require('https');

async function personalTrainer(userMessage) {
  // Define the message in the correct format for gpt-4-turbo, with system message
  const data = JSON.stringify({
    model: "gpt-4-turbo",
    messages: [
      {
        role: "system",
        content: "You are a personal trainer. You must only answer questions related to fitness, nutrition, and personal training. Avoid discussing any unrelated topics. Fit your responses concisely for the client, they value brevity. Keep responses under 300 tokens."
      },
      {
        role: "user",
        content: userMessage  // Use the dynamic user message here
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

  // Return a promise that resolves when the API response is received
  return new Promise((resolve, reject) => {
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
            const result = response.choices[0].message.content.trim();
            console.log('ChatGPT says:', result);
            resolve(result);  // Resolve the promise with the result
          } else {
            console.error('No choices available in response.');
            reject('No valid response from the API.');
          }
        } catch (error) {
          console.error('Error parsing response:', error);
          reject(error);
        }
      });
    });

    req.on('error', (e) => {
      console.error('Request error:', e);
      reject(e);  // Reject the promise in case of an error
    });

    req.write(data);
    req.end();
  });
}

module.exports = { personalTrainer };
