const axios = require('axios');

async function testExternalAPI() {
  try {
    console.log('Testing connection to external API...');
    
    // Test data
    const testData = {
      user_credentials: {
        twitter_username: "test_user",
        twitter_password: "test_password",
        target_handle: "test_user"
      },
      max_tweets: 100,
      prompt_generation_mode: "full",
      prompt_style: "food blogging",
      prompt_length: "tweet",
      content_style: "food blogging",
      content_length: "tweet",
      max_content_length: 300,
      temperature: 0.8,
      use_trained_model: true
    };

    console.log('Sending test data to external API...');
    console.log('URL: http://localhost:8000/v1/full_generation');
    
    const response = await axios.post('http://localhost:8000/v1/full_generation', testData, {
      timeout: 60000
    });

    console.log('✅ External API connection successful!');
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
    
  } catch (error) {
    console.error('❌ External API connection failed!');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testExternalAPI(); 