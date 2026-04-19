import React from 'react';
import { Button } from '@mui/material';
import { useTheme } from '../ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outlined"
      sx={{
        color: theme === 'dark' ? 'grey.100' : 'grey.800',
        borderColor: theme === 'dark' ? 'grey.600' : 'grey.400',
        '&:hover': {
          borderColor: theme === 'dark' ? 'grey.500' : 'grey.600',
          bgcolor: theme === 'dark' ? 'grey.800' : 'grey.100',
        },
        textTransform: 'none',
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </Button>
  );
};

export default ThemeToggle;