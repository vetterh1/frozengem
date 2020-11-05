const styles = (theme) => ({
    card: {
      backgroundColor: theme.transparency ? "transparent" : null,
      backdropFilter: theme.transparency ? "blur(10px) contrast(0.2) brightness(1.8)" : null,
    },
  
    details_image_section: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
    },
    details_image_media: {
      height: "25vh",
    },
    details_image_close: {
      position: "absolute",
      top: "10px",
      left: "10px",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      padding: "5px 10px",
      color: "white",
    },
    details_image_code: {
      position: "absolute",
      right: "30px",
      top: "10px",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      borderRadius: "4px",
      padding: "10px",
      color: "white",
    },
    details_image_camera: {
      position: "absolute",
      bottom: "10px",
      right: "10px",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: "10px",
      color: "white",
    },
    huge_image_camera: {
      position: "absolute",
      top: "50px",
      right: "50px",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: "10px",
      color: "white",
    },
    details_image_category: {
      position: "absolute",
      bottom: "10px",
      left: "10px",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      padding: "5px 10px",
      color: "white",
    },
    details_remove: {
      position: "absolute",
      top: "-12px",
      left: "-8px",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      color: "white",
    },
    details_help: {
      position: "absolute",
      top: "-8px",
      right: "-8px",
      zLayer: "2000",
    },
  
  
  
  
  
  
  
    back_link: {
      display: 'flex',
    },
    back_icon: {
      width: 24,
      height: 24,
    },  
  
  
  
  
  
    // Mobile / smalls (depends on density) : image full width
    // larger : image on the left (smaller), text on the right (larger)
          
    detailsUpperSection: {
      display: "flex",
      flexDirection: "column",
    },
  
    detailsUpperSectionDensity1: {
      [theme.breakpoints.up('xs')]: {
        flexDirection: "row",
      },
    },
  
    detailsUpperSectionDensity2: {
      [theme.breakpoints.up('sm')]: {
        flexDirection: "row",
      },
    },
  
    detailsUpperSectionDensity3: {
      [theme.breakpoints.up('sm')]: {
        flexDirection: "row",
      },
    },
  
  
    // Mobile / smalls (depends on density) : image full width
    // larger : image on the left (smaller), text on the right (larger)
    detailsImage: {
    },
  
    detailsImageDensity1: {
      [theme.breakpoints.up('xs')]: {
        flexBasis: `calc(40% - ${theme.spacing(1)}px)`,
        marginRight: theme.spacing(1),
      },
      marginBottom: theme.spacing(1),
    },
    detailsImageDensity2: {
      [theme.breakpoints.up('sm')]: {
        flexBasis: `calc(50% - ${theme.spacing(1)}px)`,
        marginRight: theme.spacing(2),
      },
      marginBottom: theme.spacing(2),
    },
  
    detailsImageDensity3: {
      [theme.breakpoints.up('sm')]: {
        flexBasis: `calc(50% - ${theme.spacing(1)}px)`,
        marginRight: theme.spacing(2),
      },
      marginBottom: theme.spacing(3),
    },
  
  });
  
  export default styles;