import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '../ThemeContext';

const StarRating = ({ recipeId, initialRating = 0 }) => {
  const { theme: currentTheme } = useTheme();
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = (newRating) => {
    setRating(newRating);
    localStorage.setItem(`rating-${recipeId}`, newRating);
  };

  return (
    <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }} role="group" aria-label="Rate this recipe">
      {[1, 2, 3, 4, 5].map((star) => (
        <Box
          key={star}
          component="span"
          sx={{
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: star <= (hoverRating || rating)
              ? currentTheme === 'dark' ? '#ffd700' : '#ffb300'
              : currentTheme === 'dark' ? 'grey.600' : 'grey.300',
            transition: 'color 0.2s ease',
          }}
          onClick={() => handleRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleRating(star);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Rate ${star} stars`}
        >
          ★
        </Box>
      ))}
    </Box>
  );
};

export default StarRating;