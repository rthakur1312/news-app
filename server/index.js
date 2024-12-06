
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors'); 

const app = express();
const port = 5000;
const OpenAI = require("openai");
require('dotenv').config();

// Enable CORS for frontend (React app)
app.use(cors());


const API_KEY_open = process.env.OPENAI_API_KEY;



app.get('/scrape', async (req, res) => {
    const { url, summaryLength } = req.query;
  
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }
  
    try {
      // Step 1: Scrape the article content
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
  
      const articleContent = $('article').text().trim();
      const articleImage = $('meta[property="og:image"]').attr('content') || '';
  
      if (!articleContent) {
        return res.status(404).json({ error: "No article content found at the provided URL." });
      }
  
      // Step 2: Send the scraped content to OpenAI for summary
      const openAIResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `Summarize the following article in ${summaryLength} words: ${articleContent}` },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY_open}`,
          },
        }
      );
  
      const summary = openAIResponse.data.choices[0].message.content;
  
      // Step 3: Send the response back to the client
      res.json({
        content: articleContent,
        image_url: articleImage,
        summary: summary,
      });
    } catch (error) {
      // Detailed error handling for better debugging
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
        return res.status(error.response.status).json({ error: error.response.data });
      } else {
        console.error("Error message:", error.message);
        return res.status(500).json({ error: "An unexpected error occurred." });
      }
    }
  });
  
  app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
  });