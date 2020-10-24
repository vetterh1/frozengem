import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';
// import overrides from './overrides';

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
  density: 2, // 1=compact, 2=default, 3=comfortable
  transparency: false,
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