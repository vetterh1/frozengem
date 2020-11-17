// React
import React from 'react';
import PropTypes from "prop-types";
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




const useStyles = makeStyles(theme => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    width: 'auto',
  },

  container: {
    paddingLeft: (density) => theme.spacing(density <= 2 ? 4 : 5),
    paddingRight: (density) => theme.spacing(density <= 2 ? 4 : 5),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: (density) => theme.spacing(density === 1 ? 2 : 3),
      paddingRight: (density) => theme.spacing(density === 1 ? 2 : 3),
    },
  },
}));


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


Dashboard.propTypes = {
  // Props from redux
  loggedIn: PropTypes.bool.isRequired,
  density: PropTypes.oneOf([1, 2, 3]),
};


const mapStateToProps = state => ({
  loggedIn: state?.user?.loggedIn,
  density: state?.user?.density,
});
const connectedDashboard = connect(mapStateToProps, null)(Dashboard);

export default connectedDashboard;