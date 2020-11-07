// React
import React from 'react';
import { Redirect } from "react-router";
// Redux
import { connect } from 'react-redux';
// HOC
import { makeStyles } from '@material-ui/core/styles';
// MUI
import Container from '@material-ui/core/Container';
// Components
import ItemsList from 'pages/utils/ItemsList'
import Filters from 'pages/Filters'
// Utilities
import clsx from "clsx";



const useStyles = makeStyles(theme => {
  return {

    layout: {
      display: "flex",
      flexDirection: "column",
      width: 'auto',
    },

    container: {
      paddingLeft: (density) => theme.spacing(density === 1 ? 1 : (density === 2 ? 3 : 5)),
      paddingRight: (density) => theme.spacing(density === 1 ? 1 : (density === 2 ? 3 : 5)),
      [theme.breakpoints.down('xs')]: {
        paddingLeft: "0px !important",
        paddingRight: "0px !important",
      },
    },
  }
});


const Dashboard = ({ 
  // From Redux:
  loggedIn,
  density,
}) => {
  console.debug('[--- FC ---] Functional component: Dashboard');

  const classes = useStyles(density);

  if (!loggedIn) {
    console.debug("[>>> Dashboard ------>>>----- / >>>] Reason: not logged in");
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.layout}>
      <Filters />
      <Container maxWidth="xl" className={classes.container}>
        <ItemsList />
      </Container>
    </div>          
  );
}



const mapStateToProps = state => ({
  loggedIn: state?.user?.loggedIn,
  density: state?.user?.density,
});
const connectedDashboard = connect(mapStateToProps, null)(Dashboard);

export default connectedDashboard;