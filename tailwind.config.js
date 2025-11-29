module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Posting endpoint
app.post('/blast',(req,res)=>{
  const {message,platforms} = req.body;
  console.log('Blasting:',message,'to',platforms);
  res.json({status:'success',platforms});
});

// Feed endpoint (mock data for now)
app.get('/feed',(req,res)=>{
  const feed = [
    {
      id: 1,
      platform: "Facebook",
      sender: "John Doe",
      organizationSize: "large",
      topicTags: ["AI","Healthcare"],
      content: "Exciting AI breakthrough today!",
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      platform: "Reddit",
      sender: "u/techguru",
      organizationSize: "small",
      topicTags: ["Startups"],
      content: "Check out this new app launch.",
      timestamp: new Date().toISOString()
    }
  ];
  feed.sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp));
  res.json(feed);
});

// OAuth scaffolding placeholder
app.get('/auth/facebook',(req,res)=>{
  res.json({message:"OAuth flow placeholder - connect Facebook API here"});
});

const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>console.log(`✅ Backend running on port ${PORT}`));
{
  "name": "social-blast-backend",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "body-parser": "^1.20.2",
    "dotenv": "^16.0.3"
  },
  "scripts": {
    "start": "node server.js"
  }
}
PORT=3001
FB_CLIENT_ID=your_facebook_client_id
FB_CLIENT_SECRET=your_facebook_client_secret
