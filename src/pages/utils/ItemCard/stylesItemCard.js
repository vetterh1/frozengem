import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => {
  return {



    cardAndSeparation: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },

    cardAndSeparationDensity1: {
      [theme.breakpoints.down('xs')]: {
        flexBasis: `calc(100% - ${theme.spacing(1)}px)`,
        // Mobile / xs: No margin bottom, separation instead
      },
      [theme.breakpoints.up('sm')]: {
        flexBasis: `calc(33.33% - ${theme.spacing(1)}px)`,
        marginBottom: theme.spacing(3),
      },
      [theme.breakpoints.up('md')]: {
        flexBasis: `calc(25% - ${theme.spacing(1)}px)`,
        marginBottom: theme.spacing(3),
      },
      [theme.breakpoints.up('lg')]: {
        flexBasis: `calc(20% - ${theme.spacing(1)}px)`,
        marginBottom: theme.spacing(3),
      },

      marginRight: theme.spacing(1),
    },



    cardAndSeparationDensity2: {
      [theme.breakpoints.down('xs')]: {
        flexBasis: `calc(100% - ${theme.spacing(2)}px)`,
        // Mobile / xs: No margin bottom, separation instead
      },
      [theme.breakpoints.up('sm')]: {
        flexBasis: `calc(50% - ${theme.spacing(2)}px)`,
        marginBottom: theme.spacing(5),
      },
      [theme.breakpoints.up('md')]: {
        flexBasis: `calc(33.33% - ${theme.spacing(2)}px)`,
        marginBottom: theme.spacing(5),
      },
      [theme.breakpoints.up('lg')]: {
        flexBasis: `calc(25% - ${theme.spacing(2)}px)`,
        marginBottom: theme.spacing(5),
      },

      marginRight: theme.spacing(2),
    },


    cardAndSeparationDensity3: {
      [theme.breakpoints.down('xs')]: {
        flexBasis: `calc(100% - ${theme.spacing(2)}px)`,
        // Mobile / xs: No margin bottom, separation instead
      },
      [theme.breakpoints.up('sm')]: {
        flexBasis: `calc(50% - ${theme.spacing(2)}px)`,
        marginBottom: theme.spacing(5),
      },
      [theme.breakpoints.up('lg')]: {
        flexBasis: `calc(33.33% - ${theme.spacing(2)}px)`,
        marginBottom: theme.spacing(5),
      },
      [theme.breakpoints.up('xl')]: {
        flexBasis: `calc(25% - ${theme.spacing(2)}px)`,
        marginBottom: theme.spacing(5),
      },

      marginRight: theme.spacing(2),
    },





    card: {
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.down('xs')]: {
        // Mobile / xs : image on the left, text on the right
        flexDirection: "row",
      },
    },


    cardImage: {
    },

    cardImageDensity1: {
      [theme.breakpoints.down('xs')]: {
        // Mobile / xs : image on the left (smaller), text on the right (larger)
        flexBasis: `calc(40% - ${theme.spacing(1)}px)`,
        marginRight: theme.spacing(1),
      },
      marginBottom: theme.spacing(1),
    },
    cardImageDensity2: {
      [theme.breakpoints.down('xs')]: {
        // Mobile / xs : image on the left, text on the right
        flexBasis: `calc(50% - ${theme.spacing(1)}px)`,
        marginRight: theme.spacing(2),
      },
      marginBottom: theme.spacing(2),
    },

    cardImageDensity3: {
      [theme.breakpoints.down('xs')]: {
        // Mobile / xs : image on the left, text on the right
        flexBasis: `calc(50% - ${theme.spacing(1)}px)`,
        marginRight: theme.spacing(2),
      },
      marginBottom: theme.spacing(3),
    },



    cardText: {
      display: "flex",
      flexDirection: "column",
      // flexGrow: 1,
    },

    cardTextDensity1: {
      [theme.breakpoints.down('xs')]: {
        // Mobile / xs : image on the left (smaller), text on the right (larger)
        flexBasis: `calc(60% - ${theme.spacing(1)}px)`,
      },
    },

    cardTextDensity2: {
      [theme.breakpoints.down('xs')]: {
        // Mobile / xs : image on the left, text on the right
        flexBasis: `calc(50% - ${theme.spacing(1)}px)`,
      },
    },

    cardTextDensity3: {
      [theme.breakpoints.down('xs')]: {
        // Mobile / xs : image on the left, text on the right
        flexBasis: `calc(50% - ${theme.spacing(2)}px)`,
      },
    },




    cardMain: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      // flexGrow: 1,
    },


    details_image_code: {
      display: "flex",
      alignSelf: "flex-start",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      borderRadius: "3px",
      padding: "0px 4px",
      color: "white",
    },

    
    // Mobile / xs: display separation between cards
    separation: {
      [theme.breakpoints.up('sm')]: {
        display: "none",
      },    
      width: "100%",
      height: "1px",
      backgroundColor: theme.palette.divider,
    },

    separationDensity1: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },  

    separationDensity2: {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },  

    separationDensity3: {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },  

  }
});


export default useStyles;