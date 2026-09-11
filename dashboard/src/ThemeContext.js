import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#667eea',
        light: '#8b9ff0',
        dark: '#4c5aa1',
      },
      secondary: {
        main: '#764ba2',
        light: '#9370db',
        dark: '#5a3578',
      },
      success: {
        main: '#4CAF50',
        light: '#81C784',
        dark: '#388E3C',
      },
      error: {
        main: '#f44336',
        light: '#ef5350',
        dark: '#d32f2f',
      },
      warning: {
        main: '#ff9800',
        light: '#ffb74d',
        dark: '#f57c00',
      },
      info: {
        main: '#2196F3',
        light: '#64B5F6',
        dark: '#1976D2',
      },
      background: {
        default: '#f5f7fa',
        paper: '#ffffff',
      },
      text: {
        primary: '#1a1a1a',
        secondary: '#666666',
      },
      divider: '#e0e0e0',
    },
    typography: {
      fontFamily: '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell"',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        letterSpacing: '-1.5px',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 700,
        letterSpacing: '-0.5px',
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
      },
      body1: {
        fontSize: '0.95rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '6px',
          },
        },
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#667eea',
        light: '#8b9ff0',
        dark: '#4c5aa1',
      },
      secondary: {
        main: '#764ba2',
        light: '#9370db',
        dark: '#5a3578',
      },
      success: {
        main: '#66BB6A',
        light: '#81C784',
        dark: '#43A047',
      },
      error: {
        main: '#ef5350',
        light: '#e57373',
        dark: '#c62828',
      },
      warning: {
        main: '#FFA726',
        light: '#FFB74D',
        dark: '#F57C00',
      },
      info: {
        main: '#42A5F5',
        light: '#64B5F6',
        dark: '#1565C0',
      },
      background: {
        default: '#0f0f1e',
        paper: '#1a1a2e',
      },
      text: {
        primary: '#e0e0e0',
        secondary: '#b0b0b0',
      },
      divider: '#333333',
    },
    typography: {
      fontFamily: '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell"',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        letterSpacing: '-1.5px',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 700,
        letterSpacing: '-0.5px',
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
      },
      body1: {
        fontSize: '0.95rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
            },
            backgroundColor: '#16213e',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '6px',
          },
        },
      },
    },
  });

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
