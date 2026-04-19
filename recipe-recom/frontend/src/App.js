
// ✅ ALL IMPORTS MUST BE AT THE TOP
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Container, Typography, AppBar, Toolbar, Button, Box, CircularProgress, Alert } from '@mui/material';
import { ThemeProvider, useTheme } from './ThemeContext';
import Home from './components/Home';
import ThemeToggle from './components/ThemeToggle';
import IngredientInput from './components/IngredientInput';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import CommunityFeed from './components/CommunityFeed';
import UserProfile from './components/UserProfile';
import theme from './theme';
import ErrorBoundary from './components/ErrorBoundary';

// ✅ BASE URL
const BASE_URL = "https://recipe-recommender-uowv.onrender.com";

// ✅ RETRY FUNCTION (MOVED BELOW IMPORTS)
const fetchWithRetry = async (url, retries = 3, delay = 3000) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network error");
    return response;
  } catch (error) {
    if (retries > 0) {
      console.log("Retrying...");
      await new Promise(res => setTimeout(res, delay));
      return fetchWithRetry(url, retries - 1, delay);
    } else {
      throw error;
    }
  }
};

function AppContent() {
  const { theme: currentTheme } = useTheme();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchWithRetry(`${BASE_URL}/api/recipes?page=${page}&limit=10`);
        const data = await response.json();
        setRecommendations(data.recipes);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError("Failed to fetch recipes. Please wait...");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [page]);

  const fetchRecommendations = async (data) => {
    setLoading(true);
    setError(null);
    try {
      if (!data) data = { preferences: [] };

      const response = await fetchWithRetry(`${BASE_URL}/api/recipes?page=1&limit=100`);
      const result = await response.json();

      const { recipes: allRecipes } = result;
      const preferences = Array.isArray(data.preferences) ? data.preferences : [];

      if (preferences.length > 0) {
        const filteredRecipes = allRecipes.filter(recipe =>
          recipe &&
          Array.isArray(recipe.tags) &&
          preferences.some(pref =>
            typeof pref === 'string' && recipe.tags.includes(pref.toLowerCase())
          )
        );
        setRecommendations(filteredRecipes.length > 0 ? filteredRecipes : allRecipes);
      } else {
        setRecommendations(allRecipes);
      }

    } catch (error) {
      setError("Retrying... please wait ⏳");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Recipe Recommender
          </Typography>

          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/community">Community</Button>
          <Button color="inherit" component={Link} to="/profile">Profile</Button>
          <Button color="inherit" component={Link} to="/make-recipe">Make Recipe</Button>

          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/community" element={<CommunityFeed />} />
        <Route path="/profile" element={<UserProfile />} />

        <Route path="/make-recipe" element={
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h3" align="center" gutterBottom>
              Create Your Recipe
            </Typography>

            <IngredientInput onSubmit={fetchRecommendations} />

            {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 2 }} />}
            {error && <Alert severity="info">{error}</Alert>}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {recommendations.length > 0 ? (
                recommendations.map((recipe) => (
                  <RecipeCard key={recipe._id} recipe={recipe} />
                ))
              ) : (
                !loading && (
                  <Typography>
                    Enter ingredients to get recommendations!
                  </Typography>
                )
              )}
            </Box>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  sx={{ mr: 1 }}
                >
                  Previous
                </Button>

                <Button
                  variant="contained"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </Box>
            )}
          </Container>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <MuiThemeProvider theme={theme}>
        <Router>
          <ErrorBoundary>
            <AppContent />
          </ErrorBoundary>
        </Router>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;

