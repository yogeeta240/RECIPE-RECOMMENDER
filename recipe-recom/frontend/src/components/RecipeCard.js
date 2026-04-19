import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box, Chip, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ShareMenu from './ShareMenu';
import StarRating from './StarRating';
import { useTheme } from '../ThemeContext';

const RecipeCard = ({ recipe }) => {
  const { theme: currentTheme } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareOpen, setShareOpen] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setIsFavorite(favorites.includes(recipe._id));
  }, [recipe._id]);

  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter(id => id !== recipe._id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
      setSnackbarMessage('Removed from favorites');
    } else {
      favorites.push(recipe._id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
      setSnackbarMessage('Added to favorites');
    }
    
    setIsFavorite(!isFavorite);
    setSnackbarOpen(true);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          m: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          },
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: currentTheme === 'dark' ? 'grey.900' : 'background.paper',
          color: currentTheme === 'dark' ? 'grey.100' : 'text.primary',
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={recipe.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={recipe.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
          }}
          sx={{
            '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.3s ease',
            },
          }}
        />
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{
              mb: 1,
              fontWeight: 600,
              color: currentTheme === 'dark' ? 'grey.100' : 'text.primary',
            }}
          >
            <Link
              to={`/recipe/${recipe._id}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              {recipe.name}
            </Link>
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
            <Chip
              label={`${recipe.prepTime} min`}
              size="small"
              color="primary"
              variant="outlined"
              sx={{
                bgcolor: currentTheme === 'dark' ? 'grey.800' : 'primary.50',
                color: currentTheme === 'dark' ? 'grey.100' : 'primary.main',
                borderColor: currentTheme === 'dark' ? 'grey.600' : 'primary.main',
              }}
            />
            <Chip
              label={recipe.difficulty}
              size="small"
              color="secondary"
              variant="outlined"
              sx={{
                bgcolor: currentTheme === 'dark' ? 'grey.800' : 'secondary.50',
                color: currentTheme === 'dark' ? 'grey.100' : 'secondary.main',
                borderColor: currentTheme === 'dark' ? 'grey.600' : 'secondary.main',
              }}
            />
          </Box>

          {recipe.tags && recipe.tags.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
              {recipe.tags.slice(0, 2).map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: currentTheme === 'dark' ? 'grey.700' : 'grey.100',
                    color: currentTheme === 'dark' ? 'grey.100' : 'text.secondary',
                    fontSize: '0.75rem',
                  }}
                />
              ))}
            </Box>
          )}

          <Typography
            variant="body2"
            sx={{
              mb: 1,
              color: currentTheme === 'dark' ? 'grey.400' : 'text.secondary',
            }}
          >
            Ingredients: {recipe.ingredients?.length || 0} items
          </Typography>

          <StarRating recipeId={recipe._id} initialRating={parseInt(localStorage.getItem(`rating-${recipe._id}`)) || 0} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <IconButton
              onClick={handleFavoriteToggle}
              color={isFavorite ? 'secondary' : 'default'}
              sx={{
                '&:hover': {
                  bgcolor: currentTheme === 'dark' ? 'grey.800' : 'secondary.50',
                },
              }}
            >
              <FavoriteIcon
                sx={{
                  color: isFavorite
                    ? currentTheme === 'dark'
                      ? 'secondary.light'
                      : 'secondary.main'
                    : currentTheme === 'dark'
                    ? 'grey.600'
                    : 'grey.400',
                }}
              />
            </IconButton>
            <IconButton
              data-recipe-id={recipe._id}
              onClick={(e) => setShareOpen(e.currentTarget)}
              sx={{
                '&:hover': {
                  bgcolor: currentTheme === 'dark' ? 'grey.800' : 'primary.50',
                },
              }}
            >
              <ShareIcon sx={{ color: currentTheme === 'dark' ? 'grey.100' : 'text.primary' }} />
            </IconButton>
            <ShareMenu
              open={Boolean(shareOpen)}
              onClose={() => setShareOpen(null)}
              anchorEl={shareOpen}
              recipeId={recipe._id}
            />
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RecipeCard;