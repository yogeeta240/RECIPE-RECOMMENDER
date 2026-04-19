import React, { useState, useEffect } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box, Avatar, Card, CardContent, Chip, Snackbar, Alert, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({ dietary: [], cuisine: [] });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{"dietary": [], "cuisine": []}');
    setPreferences(savedPreferences);
  }, []);

  const handleSave = () => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    setSnackbarMessage('Preferences saved successfully!');
    setSnackbarOpen(true);
  };

  const handleReset = () => {
    setPreferences({ dietary: [], cuisine: [] });
    localStorage.removeItem('userPreferences');
    setSnackbarMessage('Preferences reset!');
    setSnackbarOpen(true);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Playfair Display, serif', textAlign: 'center', mb: 4 }}>
        User Profile
      </Typography>
      
      <Card sx={{ maxWidth: 800, mx: 'auto', boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          {/* User Info Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', mr: 3 }}>
              <PersonIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Box>
              <Typography variant="h5" gutterBottom>
                Recipe Explorer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Customize your recipe preferences to get better recommendations
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Preferences Section */}
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Your Preferences
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Dietary Preferences</InputLabel>
              <Select
                multiple
                value={preferences.dietary}
                onChange={(e) => setPreferences({ ...preferences, dietary: e.target.value })}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                <MenuItem value="vegan">Vegan</MenuItem>
                <MenuItem value="vegetarian">Vegetarian</MenuItem>
                <MenuItem value="gluten-free">Gluten-Free</MenuItem>
                <MenuItem value="dairy-free">Dairy-Free</MenuItem>
                <MenuItem value="keto">Keto</MenuItem>
                <MenuItem value="paleo">Paleo</MenuItem>
                <MenuItem value="low-carb">Low-Carb</MenuItem>
                <MenuItem value="halal">Halal</MenuItem>
                <MenuItem value="kosher">Kosher</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Cuisine Preferences</InputLabel>
              <Select
                multiple
                value={preferences.cuisine}
                onChange={(e) => setPreferences({ ...preferences, cuisine: e.target.value })}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                <MenuItem value="asian">Asian</MenuItem>
                <MenuItem value="italian">Italian</MenuItem>
                <MenuItem value="mexican">Mexican</MenuItem>
                <MenuItem value="indian">Indian</MenuItem>
                <MenuItem value="mediterranean">Mediterranean</MenuItem>
                <MenuItem value="american">American</MenuItem>
                <MenuItem value="chinese">Chinese</MenuItem>
                <MenuItem value="japanese">Japanese</MenuItem>
                <MenuItem value="thai">Thai</MenuItem>
                <MenuItem value="french">French</MenuItem>
                <MenuItem value="greek">Greek</MenuItem>
                <MenuItem value="spanish">Spanish</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button 
              variant="outlined" 
              onClick={handleReset}
              sx={{ minWidth: 120 }}
            >
              Reset
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSave}
              sx={{ minWidth: 120 }}
            >
              Save Preferences
            </Button>
          </Box>

          {/* Quick Actions */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                variant="text" 
                onClick={() => navigate('/make-recipe')}
                sx={{ textTransform: 'none' }}
              >
                Create Recipe
              </Button>
              <Button 
                variant="text" 
                onClick={() => navigate('/')}
                sx={{ textTransform: 'none' }}
              >
                Browse Recipes
              </Button>
            </Box>
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
    </Container>
  );
};

export default UserProfile;