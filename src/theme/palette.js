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
    medium: grey[200],
    main: grey[300],
    dark: grey[500]
  }
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
    backgroundColor: chosenColors.backgroundColor.light
  },
  bottomNavigation: {
    backgroundColor: chosenColors.backgroundColor.main
  },
  detailsCard: {
    backgroundColor: chosenColors.backgroundColor.main,
  },
  itemCard: {
    backgroundColor: chosenColors.backgroundColor.main,
    backgroundColorAlternate: chosenColors.backgroundColor.medium,
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
    },
  },
  matrixCard: {
    selected: amber[100]
  },
  text: {
    primary: blueGrey[900],
    secondary: blueGrey[600],
    link: blue[600]
  },
  divider: chosenColors.backgroundColor.main
};


export default palette;