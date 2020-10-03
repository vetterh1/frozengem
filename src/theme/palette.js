import {
  amber,
  blue,
  blueGrey,
  green,
  indigo,
  orange,
  red,
  grey
} from "@material-ui/core/colors";


const chosenColors =  {
  primary: {
    superlight: indigo[50],
    light: indigo[200],
    medium: indigo[400],
    main: indigo[700],
    dark: indigo[900]
  },
  secondary: {
    superlight: amber[200],
    light: amber[300],
    medium: amber[400],
    main: amber[500],
    dark: amber[700]
  },
  backgroundColor: {
    superlight: grey[50],
    light: grey[100],
    main: grey[200],
    dark: grey[500]
  },
}




const palette =  {
  // type: 'dark',
  primary: {
    superlight: chosenColors.primary.superlight,
    light: chosenColors.primary.light,
    main: chosenColors.primary.main,
    dark: chosenColors.primary.dark
  },
  secondary: {
    superlight: chosenColors.secondary.superlight,
    light: chosenColors.secondary.light,
    main: chosenColors.secondary.main,
    dark: chosenColors.secondary.dark
  },
  main: {
      backgroundColor: chosenColors.backgroundColor.light
  },
  header: {
    color: chosenColors.primary.dark,
    backgroundColor: chosenColors.primary.medium
  },
  bottomNavigation: {
    backgroundColor: chosenColors.backgroundColor.main
  },
  detailsCard: {
    backgroundColor: chosenColors.backgroundColor.main,
  },
  itemCard: {
    backgroundColor: chosenColors.backgroundColor.main,
    avatarBackgroundColor: {
      expired: red["A700"],
      next_30_days: red[500],
      within_3_months: orange[500],
      later: green[500]
    },
    cardBackgroundColor: {
      expired: red[100],
      next_30_days: red[50],
      within_3_months: orange[50],
      later: green[50]
    }
  },
  matrixCard: {
    selected: amber[100]
  },
  text: {
    primary: blueGrey[900],
    secondary: blueGrey[600],
    link: blue[600]
  }
  // divider: grey[200]
};


export default palette;

/*






const palette =  {
  // type: 'dark',
  primary: {
    superlight: chosenColors.primary.superlight,
    light: chosenColors.primary.light,
    main: chosenColors.primary.main,
    dark: chosenColors.primary.dark
  },
  secondary: {
    superlight: chosenColors.secondary.superlight,
    light: chosenColors.secondary.light,
    main: chosenColors.secondary.main,
    dark: chosenColors.secondary.dark
  },
  container: {
      backgroundColor: chosenColors.primary.light
  },
  itemCard: {
    avatarBackgroundColor: {
      expired: red["A700"],
      next_30_days: red[500],
      within_3_months: orange[500],
      later: green[500]
    },
    cardBackgroundColor: {
      expired: red[100],
      next_30_days: red[50],
      within_3_months: orange[50],
      later: green[50]
    }
  },
  matrixCard: {
    selected: amber[100]
  },
  text: {
    primary: blueGrey[900],
    secondary: blueGrey[600],
    link: blue[600]
  }
  // divider: grey[200]
};











export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: colors.indigo[900],
    main: colors.indigo[500],
    light: colors.indigo[100]
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue['A400'],
    light: colors.blue['A400']
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  background: {
    default: '#F4F6F8',
    paper: white
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200]
};
*/
