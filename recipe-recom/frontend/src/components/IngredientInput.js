import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const IngredientInput = ({ onSubmit }) => {
  const [preferences, setPreferences] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const prefs = preferences
      .split(',')
      .map(pref => pref.trim())
      .filter(pref => pref.length > 0);
    onSubmit({ preferences: prefs });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        label="Enter Ingredients or Preferences (e.g., vegetarian, quick)"
        value={preferences}
        onChange={(e) => setPreferences(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
        placeholder="e.g., vegetarian, spicy, quick"
      />
      <Button type="submit" variant="contained" color="primary" disabled={!preferences.trim()}>
        Submit
      </Button>
    </Box>
  );
};

export default IngredientInput;