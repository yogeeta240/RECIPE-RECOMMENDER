import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { 
      main: '#FFD700', // Golden yellow
      light: '#FFF8DC',
      dark: '#B8860B',
      contrastText: '#000000'
    },
    secondary: { 
      main: '#FFA500', // Orange
      light: '#FFB84D',
      dark: '#CC8400',
      contrastText: '#FFFFFF'
    },
    background: { 
      default: '#FFF8F5', // Warm white
      paper: '#FFFFFF'
    },
    text: {
      primary: '#2C3E50',
      secondary: '#7F8C8D'
    },
    error: {
      main: '#E74C3C'
    },
    warning: {
      main: '#F39C12'
    },
    info: {
      main: '#3498DB'
    },
    success: {
      main: '#27AE60'
    }
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { 
      fontWeight: 700, 
      fontSize: '2.5rem',
      lineHeight: 1.2
    },
    h2: { 
      fontWeight: 600, 
      fontSize: '2rem',
      lineHeight: 1.3
    },
    h3: { 
      fontWeight: 600, 
      fontSize: '1.75rem',
      lineHeight: 1.4
    },
    h4: { 
      fontWeight: 600, 
      fontSize: '1.5rem',
      lineHeight: 1.4
    },
    h5: { 
      fontWeight: 600, 
      fontSize: '1.25rem',
      lineHeight: 1.5
    },
    h6: { 
      fontWeight: 600, 
      fontSize: '1.125rem',
      lineHeight: 1.5
    },
    subtitle1: { 
      fontSize: '1rem',
      lineHeight: 1.5
    },
    body1: { 
      fontSize: '1rem',
      lineHeight: 1.6
    },
    body2: { 
      fontSize: '0.875rem',
      lineHeight: 1.6
    },
    button: {
      textTransform: 'none',
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 12
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.1)',
    '0px 4px 8px rgba(0, 0, 0, 0.1)',
    '0px 8px 16px rgba(0, 0, 0, 0.1)',
    '0px 12px 24px rgba(0, 0, 0, 0.15)',
    '0px 16px 32px rgba(0, 0, 0, 0.15)',
    '0px 20px 40px rgba(0, 0, 0, 0.15)',
    '0px 24px 48px rgba(0, 0, 0, 0.15)',
    '0px 28px 56px rgba(0, 0, 0, 0.15)',
    '0px 32px 64px rgba(0, 0, 0, 0.15)',
    '0px 36px 72px rgba(0, 0, 0, 0.15)',
    '0px 40px 80px rgba(0, 0, 0, 0.15)',
    '0px 44px 88px rgba(0, 0, 0, 0.15)',
    '0px 48px 96px rgba(0, 0, 0, 0.15)',
    '0px 52px 104px rgba(0, 0, 0, 0.15)',
    '0px 56px 112px rgba(0, 0, 0, 0.15)',
    '0px 60px 120px rgba(0, 0, 0, 0.15)',
    '0px 64px 128px rgba(0, 0, 0, 0.15)',
    '0px 68px 136px rgba(0, 0, 0, 0.15)',
    '0px 72px 144px rgba(0, 0, 0, 0.15)',
    '0px 76px 152px rgba(0, 0, 0, 0.15)',
    '0px 80px 160px rgba(0, 0, 0, 0.15)',
    '0px 84px 168px rgba(0, 0, 0, 0.15)',
    '0px 88px 176px rgba(0, 0, 0, 0.15)',
    '0px 92px 184px rgba(0, 0, 0, 0.15)'
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500
        }
      }
    }
  }
});

export default theme;