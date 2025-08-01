const TwitterCredentials = require('../models/TwitterCredentials');
const GeneratedContent = require('../models/GeneratedContent');
const axios = require('axios');

// Save Twitter credentials
exports.saveTwitterCredentials = async (req, res) => {
  try {
    const { twitterUsername, twitterHandle, twitterPassword, apiKey, apiSecret, accessToken, accessTokenSecret } = req.body;
    
    // Check if user already has Twitter credentials
    let existingCredentials = await TwitterCredentials.findOne({ user: req.user._id });
    
    if (existingCredentials) {
      // Update existing credentials
      existingCredentials.twitterUsername = twitterUsername;
      existingCredentials.twitterHandle = twitterHandle;
      existingCredentials.twitterPassword = twitterPassword;
      existingCredentials.apiKey = apiKey;
      existingCredentials.apiSecret = apiSecret;
      existingCredentials.accessToken = accessToken;
      existingCredentials.accessTokenSecret = accessTokenSecret;
      existingCredentials.isLinked = true;
      existingCredentials.linkedAt = new Date();
      await existingCredentials.save();
    } else {
      // Create new credentials
      const credentials = new TwitterCredentials({
        user: req.user._id,
        twitterUsername,
        twitterHandle,
        twitterPassword,
        apiKey,
        apiSecret,
        accessToken,
        accessTokenSecret,
        isLinked: true,
        linkedAt: new Date(),
      });
      await credentials.save();
    }
    
    res.status(201).json({ 
      message: 'Twitter credentials saved successfully',
      isLinked: true 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Twitter credentials status
exports.getTwitterStatus = async (req, res) => {
  try {
    const credentials = await TwitterCredentials.findOne({ user: req.user._id });
    res.json({ 
      isLinked: credentials ? credentials.isLinked : false,
      twitterUsername: credentials ? credentials.twitterUsername : null,
      twitterHandle: credentials ? credentials.twitterHandle : null,
      linkedAt: credentials ? credentials.linkedAt : null
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

  // Generate content using external API
  exports.generateContent = async (req, res) => {
    try {
      // Get user's Twitter credentials
      const credentials = await TwitterCredentials.findOne({ user: req.user._id });
      if (!credentials || !credentials.isLinked) {
        return res.status(400).json({ message: 'Twitter account not linked. Please link your Twitter account first.' });
      }
      
      // Create a pending generated content record
      const generatedContent = new GeneratedContent({
        user: req.user._id,
        status: 'pending'
      });
      await generatedContent.save();
      
             // Prepare data for external API according to the specified structure
       const apiData = {
         user_credentials: {
           twitter_username: credentials.twitterUsername,
           twitter_password: credentials.twitterPassword,
           target_handle: credentials.twitterHandle // Using the handle without @ symbol
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
       
       // Log the data being sent to external API (without sensitive info)
       console.log('Sending data to external API:', {
         ...apiData,
         user_credentials: {
           twitter_username: apiData.user_credentials.twitter_username,
           target_handle: apiData.user_credentials.target_handle,
           // password is not logged for security
         }
       });
      
      // Call external API running on localhost:8000
      try {
        const response = await axios.post(process.env.EXTERNAL_API_URL || 'http://localhost:8000/v1/full_generation', apiData, {
          timeout: 60000 // 60 seconds timeout (increased for scraping)
        });
        
        // Log the response for debugging
        console.log('External API Response:', response.data);
        
        // Update generated content with response
        // Handle different possible response structures
        const responseData = response.data;
        generatedContent.extractedKeywords = responseData.extractedKeywords || responseData.keywords || [];
        generatedContent.generatedPrompt = responseData.generatedPrompt || responseData.prompt || '';
        generatedContent.generatedContent = responseData.generatedContent || responseData.content || '';
        generatedContent.status = 'completed';
        generatedContent.externalApiResponse = responseData;
        await generatedContent.save();
        
        res.json({
          message: 'Content generated successfully',
          generatedContent: {
            id: generatedContent._id,
            extractedKeywords: generatedContent.extractedKeywords,
            generatedPrompt: generatedContent.generatedPrompt,
            generatedContent: generatedContent.generatedContent
          }
        });
        
      } catch (apiError) {
        // Handle external API error
        console.error('External API Error:', apiError);
        console.error('Error Details:', {
          message: apiError.message,
          status: apiError.response?.status,
          data: apiError.response?.data
        });
        
        generatedContent.status = 'failed';
        generatedContent.errorMessage = apiError.message;
        await generatedContent.save();
        
        res.status(500).json({ 
          message: 'Failed to generate content from external API',
          error: apiError.message,
          details: apiError.response?.data || 'No additional details'
        });
      }
      
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Get user's generated content
exports.getGeneratedContent = async (req, res) => {
  try {
    const contents = await GeneratedContent.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10); // Get last 10 generated contents
    
    res.json(contents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get specific generated content
exports.getGeneratedContentById = async (req, res) => {
  try {
    const content = await GeneratedContent.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    
    if (!content) {
      return res.status(404).json({ message: 'Generated content not found' });
    }
    
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Twitter credentials
exports.deleteTwitterCredentials = async (req, res) => {
  try {
    await TwitterCredentials.findOneAndDelete({ user: req.user._id });
    res.json({ message: 'Twitter credentials deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 