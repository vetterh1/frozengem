import { createMuiTheme } from '@material-ui/core';

import palette from 'theme/palette';
import typography from 'theme/typography';
// import overrides from 'theme/overrides';

const theme = createMuiTheme({
  spacing: 10,
  breakpoints: {
    values: {
      xs: 0,
      sm: 575,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },  
  image: "url(bg-snow.jpg)",
  palette,
  typography,
//   overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

export default theme;