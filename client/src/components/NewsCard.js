import { Card, CardContent, CardMedia, Typography, Grid, Button, Chip, Stack, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';

const colors = [
  { background: '#DEE3FF', font: '#000000' },
  { background: '#008A75', font: '#ffffff' },
  { background: '#14236E', font: '#ffffff' },
  { background: '#A16AC8', font: '#ffffff' },
];

function NewsCard({ newsarticles, sections, handleSection, selectedSections, handleDelete, updateSummaryLength }) {

  const [showAllSections, setShowAllSections] = useState(false);

  function selectFunction(event) {
    updateSummaryLength(event.target.value);
  }


  return (
    <>
      <Box sx={{width:'80%', margin:'auto'}}>
        <Typography variant="h2" sx={{ textAlign: 'center', margin: '20px 0' }}>
          All the News <br /> <b>Short and Simple.</b>
        </Typography>
        {/* Section Filters */}
        <Grid container spacing={2} sx={{ marginBottom: 3, justifyContent: 'center' }}>
          {(showAllSections ? sections : sections.slice(0, 14)).map((section, index) => (
            <Grid item key={index}>
              <Button
                variant={selectedSections.includes(section.id) ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => handleSection(section)}
              >
                {section.editions[0].webTitle}
              </Button>
            </Grid>
          ))}
        </Grid>
        {sections.length > 14 && (
          <Grid container justifyContent="center">
            <Button onClick={() => setShowAllSections(!showAllSections)} variant="contained" sx={{backgroundColor:'#DEE3FF', color:'#000'}}>
              {showAllSections ? 'Show less' : 'Show All ...'}
            </Button>
          </Grid>
        )}
           <Box direction="row" spacing={1} flexWrap="wrap" sx={{padding:'2rem', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <Box>
        {selectedSections.map((query, index) => (
          <Chip
          key={index}
          label={query}
          color="primary"
          deleteIcon={
            <span
              style={{
                fontWeight: "bold",
                fontSize: "10px",
                color: "#008A75", 
                cursor: "pointer", 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "5px"
              }}
            >
              X
            </span>
          }
          onDelete={() => handleDelete(index)}
          variant="outlined"
          sx={{
            border: "1px solid #008A75",
            color: "#008A75",
            marginRight: '0.5rem',
            marginBottom:'0.75rem'
          }}
        />
        ))}
        </Box>
        <Box sx={{ width: 200 }}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="summary-length-label">Summary Length</InputLabel>
        <Select
          labelId="summary-length-label"
          label="Summary Length"
          onChange={selectFunction}
        >
          <MenuItem value="50">Short (50 words)</MenuItem>
          <MenuItem value="100">Medium (100 words)</MenuItem>
          <MenuItem value="200">Long (200 words)</MenuItem>
        </Select>
      </FormControl>
    </Box>

      </Box>
      </Box>
      <Grid container spacing={3} sx={{ padding: '2.75rem', alignItems:'stretch' }}>
  {newsarticles.length > 0 &&
    newsarticles.map((item, index) => {
      const color = colors[index % colors.length];
      return (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: color.background,
              color: color.font,
              borderRadius: '1rem',
              minHeight: '388px',
              padding: '2rem 1.75rem',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              transform: 'rotateZ(0deg) translateZ(10px)',
              height: '100%',
              '&:hover': {
                transform: 'rotateZ(-1.5deg) translateZ(0px)',
              },
            }}
          >
            <CardMedia
              component="img"
              sx={{ height: 200, objectFit: 'cover' }}
              image={item.image_url}
              alt={`Image ${index}`}
            />
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: color.font }}
              >
                {item.webTitle}
              </Typography>
              <Typography
                variant="body2"
                paragraph
                sx={{ color: color.font }}
              >
                {item.summary}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: color.font }}
              >
                <a
                  href={item.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: color.font }}
                >
                  View full article
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    })}
</Grid>

    </>
  );
}

export default NewsCard;
