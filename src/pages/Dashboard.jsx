import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router";
import clsx from "clsx";
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import ItemsList from './utils/ItemsList'
import Filters from './Filters'



const styles = theme => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    width: 'auto',
  },
  container: {
  },

  containerDensity1: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },

  containerDensity2: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },

  containerDensity3: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
  },

});


const Dashboard = ({ 
  // From Redux:
  loggedIn,
  density,
  // From other HOC:
    classes
}) => {
  console.debug('[--- FC ---] Functional component: Dashboard');

  if (!loggedIn) {
    console.debug("[>>> Dashboard ------>>>----- / >>>] Reason: not logged in");
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.layout}>
      <Filters />
      <Container maxWidth="xl" className={clsx(
            classes.container, 
            density === 1 && classes.containerDensity1,
            density === 2 && classes.containerDensity2,
            density === 3 && classes.containerDensity3,
      )}>
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

export default withStyles(styles)(connectedDashboard);