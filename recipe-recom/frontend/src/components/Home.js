import React from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

const Home = () => {
  const { theme: currentTheme } = useTheme();

  

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        backgroundImage: 'url(/assets/background.webp)', // Fallback image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: currentTheme === 'dark' 
            ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9))'
            : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7))',
          zIndex: 1,
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          py: 12,
        }}
      >
        {/* Logo Placeholder */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Lora, serif',
              fontWeight: 700,
              color: currentTheme === 'dark' ? '#ecf0f1' : '#ffffff',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              letterSpacing: '2px',
            }}
          >
            Recipe Recommender
          </Typography>
        </Box>

        {/* Hero Section */}
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'Georgia, serif',
            fontWeight: 600,
            color: currentTheme === 'dark' ? '#ecf0f1' : '#ffffff',
            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)',
            mb: 3,
            fontSize: { xs: '2rem', md: '3.5rem' },
            lineHeight: 1.2,
          }}
        >
          Elevate Your Culinary Experience
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: currentTheme === 'dark' ? '#bdc3c7' : '#e0e0e0',
            mb: 6,
            maxWidth: '700px',
            fontFamily: 'Helvetica, Trebuchet MS, Verdana, sans-serif',
            fontWeight: 400,
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)',
          }}
        >
          Discover personalized recipes powered by AI, tailored to your ingredients and preferences, with a seamless and intuitive interface.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/make-recipe"
          sx={{
            fontSize: '1.1rem',
            padding: '10px 30px',
            bgcolor: currentTheme === 'dark' ? '#34495e' : '#2c3e50',
            color: '#ffffff',
            borderRadius: 8,
            textTransform: 'none',
            '&:hover': {
              bgcolor: currentTheme === 'dark' ? '#2c3e50' : '#1a252f',
            },
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
          }}
        >
          Start Cooking Now
        </Button>

        {/* Feature Highlights */}
        <Grid
          container
          spacing={6}
          sx={{
            mt: 10,
            maxWidth: '1000px',
            color: currentTheme === 'dark' ? '#ecf0f1' : '#ffffff',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Lora, serif', fontWeight: 600, mb: 2, color: currentTheme === 'dark' ? '#ecf0f1' : '#ffffff' }}
            >
              Tailored Recipes
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontFamily: 'Roboto, sans-serif', color: currentTheme === 'dark' ? '#bdc3c7' : '#bdc3c7' }}
            >
              Create recipes based on your available ingredients with AI precision.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Lora, serif', fontWeight: 600, mb: 2, color: currentTheme === 'dark' ? '#ecf0f1' : '#ffffff' }}
            >
              Community Hub
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontFamily: 'Roboto, sans-serif', color: currentTheme === 'dark' ? '#bdc3c7' : '#bdc3c7' }}
            >
              Connect and share with a global community of food enthusiasts.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Lora, serif', fontWeight: 600, mb: 2, color: currentTheme === 'dark' ? '#ecf0f1' : '#ffffff' }}
            >
              User-Friendly
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontFamily: 'Roboto, sans-serif', color: currentTheme === 'dark' ? '#bdc3c7' : '#bdc3c7' }}
            >
              Enjoy a sleek, easy-to-navigate platform for all your cooking needs.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;