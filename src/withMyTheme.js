import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { indigo, amber, orange, red, green } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({

  overrides: {
    MuiContainer: {
      gutters: {
        [defaultTheme.breakpoints.up('sm')]: {
          paddingLeft: '4px',
          paddingRight: '4px',
        },
      },
    },
  },

  palette: {
    // type: 'dark',
    primary: {
      light: indigo[100],
      main: indigo[700],
      dark: indigo[900],
    },
    secondary: {
      superlight: amber[200],
      light: amber[300],
      main: amber[500],
      dark: amber[700],
    },
    itemCard: {
      avatarBackgroundColor: {
        expired: red['A700'],
        next_30_days: red[500],
        within_3_months: orange[500],
        later: green[500],
      },
      cardBackgroundColor: {
        expired: red[100],
        next_30_days: red[50],
        within_3_months: orange[50],
        later: green[50],
      },
    },
    matrixCard: {
      selected: amber[100],
    },
    typographyKO: {
      htmlFontSize: 20,
      fontSize: 20,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },    
    typography: {
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '"Lato"',
        'sans-serif'
      ].join(',')
    },    
  },
});


function withMyTheme(Component) {
  function withMyTheme(props) {
    return (
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    );
  }

  return withMyTheme;
}

export default withMyTheme;