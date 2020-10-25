import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router";
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
    // [theme.breakpoints.up('sm')]: {
    //   paddingLeft: theme.spacing(5),
    //   paddingRight: theme.spacing(5),
    // },
  },
});


const Dashboard = ({ 
  // From Redux:
  loggedIn,
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
      <Container maxWidth="xl" className={classes.container}>
        <ItemsList />
      </Container>
    </div>          
  );
}



const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});
const connectedDashboard = connect(mapStateToProps, null)(Dashboard);

export default withStyles(styles)(connectedDashboard);