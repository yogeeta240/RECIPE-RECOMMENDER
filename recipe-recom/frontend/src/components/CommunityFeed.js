import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Pagination, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

const Community = () => {
  const navigate = useNavigate();
  const { theme: currentTheme } = useTheme();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/recipes?page=${page}&limit=6`);
        if (!response.ok) throw new Error(`Failed to fetch recipes: ${response.status}`);
        const data = await response.json();
        setRecipes(data.recipes);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError('Failed to load recipes. Please try again.');
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [page]);

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
  if (error) return <Typography variant="h6" sx={{ textAlign: 'center', my: 4, color: 'error.main' }}>{error}</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          fontFamily: 'Playfair Display, serif',
          textAlign: 'center',
          color: currentTheme === 'dark' ? 'grey.100' : 'text.primary',
        }}
      >
        Community Recipes
      </Typography>
      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item key={recipe._id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                bgcolor: currentTheme === 'dark' ? 'grey.800' : 'background.paper',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
              onClick={() => handleRecipeClick(recipe._id)}
            >
              <CardMedia
                component="img"
                height="200"
                image={recipe.imageUrl || 'https://via.placeholder.com/400x300?text=Recipe+Image'}
                alt={recipe.name}
                sx={{ objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ color: currentTheme === 'dark' ? 'grey.100' : 'text.primary' }}
                >
                  {recipe.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: currentTheme === 'dark' ? 'grey.300' : 'text.secondary' }}
                >
                  Prep Time: {recipe.prepTime} mins | Difficulty: {recipe.difficulty}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ '& .MuiPaginationItem-root': { color: currentTheme === 'dark' ? 'grey.100' : 'text.primary' } }}
        />
      </Box>
    </Container>
  );
};

export default Community;