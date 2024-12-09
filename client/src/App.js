import './App.css';
import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NewsCard from './components/NewsCard';
import axios from 'axios';
import Navigation from './components/Navigation';
import {  Button} from '@mui/material';
import { Box, keyframes } from "@mui/system";


const theme = createTheme({

});

const bounceAnimation = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-20px);
    opacity: 0.6;
  }
`;

function App() {
  const [newsArticles, setNewsArticles] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [sections, setSections] = useState([]);
  const [page, setPage] = useState(12); 
  const [selectedSections, setSelectedSections] = useState([]);
  const [searchValue, setSearchValue] = useState('')
  const [summaryLength, setSummaryLength] = useState('70')
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY; 

   // Function to fetch sections from the API
   const fetchSections = async () => {
    const url = `https://content.guardianapis.com/sections?api-key=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.response && data.response.results) {
        setSections(data.response.results); 
      }
    } catch (error) {
      setError('Error fetching sections');
    }
  };

  const sectionQuery = selectedSections.join('%20AND%20');
  console.log('sectionQuery', sectionQuery);

  // fetch news articles
  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://content.guardianapis.com/search?page=1&page-size=${page}&q=${sectionQuery}&api-key=${API_KEY}`;
      
      console.log(url);
      setLoading(true);
      
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.response.results.length > 0) {
          const articlesWithContent = await Promise.all(
            data.response.results.map(async (article) => {
              const scrapedData = await axios.get('https://news-app-server-taupe.vercel.app/scrape', {
                params: { 
                  url: article.webUrl,
                  summaryLength: summaryLength
                },
              });
              return {
                ...article,
                article_content: scrapedData.data.content,
                image_url: scrapedData.data.image_url,
                summary: scrapedData.data.summary,
              };
            })
          );

          // If new articles are fetched, append them to the existing articles
          setNewsArticles((prevArticles) => [
            ...articlesWithContent,
          ]);
        }
      } catch (error) {
        setError('Error fetching news data');
      } finally {
        setLoading(false); 
      }
    };

    fetchNews();
  }, [page, selectedSections, summaryLength]); 

   // Fetch sections once the component mounts
   useEffect(() => {
    fetchSections();
  }, []);

  // Function to handle loading more articles
  const loadMoreArticles = () => {
    setPage((prevPage) => prevPage + 12); 
  };

  const handleSectionToggle = (section) => {
    setSelectedSections((prev) =>
      prev.includes(section.id)
        ? prev.filter((id) => id !== section.id) 
        : [...prev, section.id] 
    );
  };

  const handleSearchValue = (value) => {
    setSearchValue(value);
  }

  const updateSelectedSections = (value) => {
    setSelectedSections((prev) => {
      return [...prev, value];
    });
  };

  const handleDelete = (index) => {
    setSelectedSections((prev) => prev.filter((item, i) => i !== index));
  };

  const updateSummaryLength = (length) => {
      setSummaryLength(length)
  }

  console.log('news', newsArticles)
  console.log('sections', sections)
  console.log('selectedSections', selectedSections)

  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

  
      
      {error && <p>{error}</p>}
    <Navigation handleSearchValue={handleSearchValue} searchValue={searchValue} updateSelectedSections={updateSelectedSections} />

      <NewsCard newsarticles={newsArticles} sections={sections} handleSection={handleSectionToggle} selectedSections={selectedSections} handleDelete={handleDelete} updateSummaryLength={updateSummaryLength} />


      {loading &&    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px", 
        paddingBottom:'3rem'
      }}
    >
      {[0, 1, 2].map((index) => (
        <Box
          key={index}
          sx={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: "#a3a1a1",
            animation: `${bounceAnimation} 0.6s infinite alternate`,
            animationDelay: `${index * 0.2}s`, // Staggered animation for each dot
          }}
        />
      ))}
    </Box>}


      {!loading && !error && (
       <Box display="flex" justifyContent="center" alignItems="center" style={{marginBottom:'3rem'}}>
       <Button onClick={loadMoreArticles} variant="contained">
         Show More
       </Button>
     </Box>
      )}
    </ThemeProvider>
  );
}

export default App;
