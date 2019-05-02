import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, createTheme } from '@material-ui/styles';
import indigo from '@material-ui/core/colors/indigo';
import amber from '@material-ui/core/colors/amber';
import CssBaseline from '@material-ui/core/CssBaseline';


const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      light: indigo[100],
      main: indigo[700],
      dark: indigo[900],
    },
    secondary: {
      light: amber[300],
      main: amber[500],
      dark: amber[700],
    },
  },
});

// function getTheme(theme) {
//   return createMuiTheme({
//     palette: {
//       type: theme.paletteType,
//       background: {
//         default: theme.paletteType === 'light' ? #000' : '#fff',
//       },
//     },
//   });
// }

// const theme = getTheme({
//   paletteType: 'light',
// });

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