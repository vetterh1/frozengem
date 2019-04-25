import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import green from '@material-ui/core/colors/green';
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
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
  typography: {
    useNextVariants: true,
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

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;