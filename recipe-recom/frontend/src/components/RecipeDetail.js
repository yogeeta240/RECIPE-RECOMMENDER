import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Button, CircularProgress, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingListModal from './ShoppingListModal';
import StarRating from './StarRating';
import { useTheme } from '../ThemeContext';

const RecipeDetail = () => {
  const { id } = useParams(); // Get ID from URL (e.g., /recipe/000000000000000000000002)
  const { theme: currentTheme } = useTheme();
  const [recipe, setRecipe] = useState(null);
  const [initialRating, setInitialRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openShoppingModal, setOpenShoppingModal] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching recipe with ID:', id); // Debug log
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
        console.log('Fetch response status:', response.status); // Debug log
        if (!response.ok) throw new Error(`Failed to fetch recipe: ${response.status}`);
        const data = await response.json();
        console.log('Fetched recipe:', data); // Debug log
        setRecipe(data);
      } catch (error) {
        setError('Failed to load recipe. Please try again.');
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRating = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch(`http://localhost:5000/api/ratings/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const { rating } = await response.json();
            setInitialRating(rating);
          }
        }
      } catch (error) {
        console.error('Failed to fetch rating:', error);
      }
    };

    if (id) {
      fetchRecipe();
      fetchRating();
    }
  }, [id]);

  const handleRatingChange = async (newRating) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to rate recipes');
        return;
      }
      const response = await fetch('http://localhost:5000/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipeId: id, rating: newRating }),
      });
      if (!response.ok) throw new Error('Failed to save rating');
      setInitialRating(newRating);
    } catch (error) {
      setError('Failed to save rating');
      console.error('Error saving rating:', error);
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
  if (error) return <Alert severity="error" sx={{ mx: 'auto', my: 4, maxWidth: 600 }}>{error}</Alert>;
  if (!recipe) return <Typography variant="h6" sx={{ textAlign: 'center', my: 4 }}>Recipe not found</Typography>;

  return (
    <Container
      sx={{
        py: 4,
        backgroundImage: 'ur[](https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1350)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: currentTheme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(205, 72, 15, 0.7)',
          zIndex: -1,
        },
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontFamily: 'Playfair Display, serif',
          color: currentTheme === 'dark' ? 'grey.100' : 'white',
        }}
      >
        {recipe.name}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <img
            src={recipe.imageUrl || 'https://via.placeholder.com/400x300?text=Recipe'}
            alt={recipe.name}
            style={{ width: '100%', borderRadius: 12 }}
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              color: currentTheme === 'dark' ? 'grey.300' : 'text.secondary',
            }}
          >
            Prep Time: {recipe.prepTime} mins | Difficulty: {recipe.difficulty} | Tags: {recipe.tags?.join(', ') || 'None'}
          </Typography>
          <StarRating
            recipeId={recipe._id}
            initialRating={initialRating}
            onRatingChange={handleRatingChange}
          />
          <Accordion
            defaultExpanded
            sx={{
              bgcolor: currentTheme === 'dark' ? 'grey.800' : 'background.paper',
              color: currentTheme === 'dark' ? 'grey.100' : 'text.primary',
              mt: 2,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: currentTheme === 'dark' ? 'grey.100' : 'text.primary' }} />}>
              <Typography variant="h6">Ingredients</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {recipe.ingredients?.map((ing, index) => (
                  <li key={index} style={{ color: currentTheme === 'dark' ? 'grey.300' : 'text.secondary' }}>
                    {ing.name} - {ing.quantity}
                  </li>
                )) || <p>No ingredients available</p>}
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              bgcolor: currentTheme === 'dark' ? 'grey.800' : 'background.paper',
              color: currentTheme === 'dark' ? 'grey.100' : 'text.primary',
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: currentTheme === 'dark' ? 'grey.100' : 'text.primary' }} />}>
              <Typography variant="h6">Instructions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ol>
                {recipe.instructions?.map((step, index) => (
                  <li key={index} style={{ color: currentTheme === 'dark' ? 'grey.300' : 'text.secondary' }}>
                    {step}
                  </li>
                )) || <p>No instructions available</p>}
              </ol>
            </AccordionDetails>
          </Accordion>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              mt: 2,
              bgcolor: currentTheme === 'dark' ? 'grey.700' : 'secondary.main',
              '&:hover': { bgcolor: currentTheme === 'dark' ? 'grey.600' : 'secondary.dark' },
            }}
            onClick={() => setOpenShoppingModal(true)}
            aria-label="Generate shopping list"
          >
            Generate Shopping List
          </Button>
        </Box>
      </Box>
      <ShoppingListModal
        open={openShoppingModal}
        onClose={() => setOpenShoppingModal(false)}
        ingredients={recipe?.ingredients || []}
      />
    </Container>
  );
};

export default RecipeDetail;