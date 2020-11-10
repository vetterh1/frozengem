import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => {
  return {

    cardAndSeparation: {
      display: "flex",
      flexDirection: "column",
      height: "100%",

      marginBottom: (density) => theme.spacing(density === 1 ? 3 : 5),
      marginRight: (density) => theme.spacing(density === 1 ? 1 : 2),

      [theme.breakpoints.down('xs')]: {
        flexBasis: "100%",
        // Mobile / xs: No margin bottom, separation instead
        marginBottom: "0 !important",
        // Mobile / xs: Add a margin left
        marginLeft: (density) => theme.spacing(density === 1 ? 1 : 2),
      },

      [theme.breakpoints.up('sm')]: {
        flexBasis: (density) => `calc(${density === 1 ? "33.33%" : "50%"} - ${theme.spacing(density === 1 ? 1 : 2)}px)`,
      },      

      [theme.breakpoints.up('md')]: {
        flexBasis: (density) => `calc(${density === 1 ? "25%" : (density === 2 ? "33.33%" : "50%")} - ${theme.spacing(density === 1 ? 1 : 2)}px)`,
      },      

      [theme.breakpoints.up('lg')]: {
        flexBasis: (density) => `calc(${density === 1 ? "20%" : (density === 2 ? "25%" : "33.33%")} - ${theme.spacing(density === 1 ? 1 : 2)}px)`,
      },      

      [theme.breakpoints.up('xl')]: {
        flexBasis: (density) => `calc(${density === 1 ? "20%" : "25%"} - ${theme.spacing(density === 1 ? 1 : 2)}px)`,
      },      
  
    },





    card: {
      display: "flex",
      flexDirection: "column",

      // Mobile / xs : image on the left, text on the right
      [theme.breakpoints.down('xs')]: {
        flexDirection: "row",
      },
    },


    cardImage: {
      marginBottom: (density) => theme.spacing(density),

      // Mobile / xs : image on the left (smaller), text on the right (larger)
      [theme.breakpoints.down('xs')]: {
        flexBasis: (density) => `calc(${density === 1 ? "40%" : "50%"} - ${theme.spacing(1)}px)`,
        marginRight: (density) => theme.spacing(density),
      },
    },


    cardText: {
      display: "flex",
      flexDirection: "column",
      // flexGrow: 1,

      // Mobile / xs : image on the left (smaller), text on the right (larger)
      [theme.breakpoints.down('xs')]: {
        flexBasis: (density) => `calc(${density === 1 ? "60%" : "50%"} - ${theme.spacing(1)}px)`,
      },
    },




    cardMain: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      // flexGrow: 1,
    },


    cardCode: {
      display: "flex",
      alignSelf: "flex-start",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      padding: "2px 6px",
      color: "white",
    },

    
    cardExpiration: {
      display: "flex",
      alignSelf: "flex-start",
    },


    cardExpirationText: {
      marginLeft: theme.spacing(1),
    },



    // Mobile / xs: display separation between cards
    separation: {
      [theme.breakpoints.up('sm')]: {
        display: "none",
      },    
      width: "100%",
      height: "1px",
      backgroundColor: theme.palette.divider,
      marginBottom: (density) => theme.spacing(density),
      marginRight: (density) => theme.spacing(density === 1 ? 1 : 2),      
      [theme.breakpoints.down('xs')]: {
        // Mobile / xs: No margin right
        marginRight: "0 !important",
      },      
    },

  }
});


export default useStyles;