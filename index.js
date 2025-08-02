const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Basic route
app.get('/', (req, res) => {
  res.send('PostGen Backend API Running');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/preferences', require('./routes/preferences'));
app.use('/api/agreement', require('./routes/agreement'));
app.use('/api/twitter', require('./routes/twitter'));

// New enhanced routes for My Posts & Tweets
app.use('/api/approved-posts', require('./routes/approvedPosts'));
app.use('/api/scheduled-posts', require('./routes/scheduledPosts'));
app.use('/api/post-templates', require('./routes/postTemplates'));
app.use('/api/schedule-templates', require('./routes/scheduleTemplates'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 