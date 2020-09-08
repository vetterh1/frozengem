import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';
// import overrides from './overrides';

const theme = createMuiTheme({
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