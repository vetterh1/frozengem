import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => {
  return {

    cardAndSeparation: {
      display: "flex",
      flexDirection: "column",


      
      [theme.breakpoints.down('xs')]: {
        width: "100%",
        // Mobile / xs: No margin bottom, separation instead
        marginBottom: 0,
        // Mobile / xs: No gutter on the right
        marginRight: 0,

      },

      [theme.breakpoints.up('sm')]: {
        // NOT mobile: add some margin!
        marginBottom: (density) => theme.spacing(density === 1 ? 3 : 5),
        // Gutter on the right of the element:
        marginRight: (density) => theme.spacing(density),

        width: (density) => `calc(${density === 1 ? "33.33%" : "50%"} - ${theme.spacing(density)}px)`,
      },      

      [theme.breakpoints.up('md')]: {
        width: (density) => `calc(${density === 1 ? "25%" : (density === 2 ? "33.33%" : "50%")} - ${theme.spacing(density)}px)`,
      },      

      [theme.breakpoints.up('lg')]: {
        width: (density) => `calc(${density === 1 ? "20%" : (density === 2 ? "25%" : "33.33%")} - ${theme.spacing(density)}px)`,
      },      

      [theme.breakpoints.up('xl')]: {
        width: (density) => `calc(${density === 1 ? "20%" : "25%"} - ${theme.spacing(density)}px)`,
      },      
  
    },





    card: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,

      // Mobile / xs : image on the left, text on the right
      [theme.breakpoints.down('xs')]: {
        flexDirection: "row",
      },
    },

    cardImageArea: {
      flexGrow: 1,
      marginBottom: (density) => theme.spacing(density),

      // Mobile / xs : image on the left (smaller), text on the right (larger)
      [theme.breakpoints.down('xs')]: {
        width: (density) => `calc(${density === 1 ? "40%" : "50%"} - ${theme.spacing(1)}px)`,
        marginRight: (density) => theme.spacing(density),
      },
    },

    cardImage: {
      flexGrow: 1,
    },


    cardText: {
      display: "flex",
      flexDirection: "column",
      // flexGrow: 1,

      // Mobile / xs : image on the left (smaller), text on the right (larger)
      [theme.breakpoints.down('xs')]: {
        width: (density) => `calc(${density === 1 ? "60%" : "50%"} - ${theme.spacing(1)}px)`,
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