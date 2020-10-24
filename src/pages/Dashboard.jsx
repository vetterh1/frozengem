import React from 'react';
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


const Dashboard = ({ classes }) => {

  console.debug('[--- FC ---] Functional component: Dashboard');

  return (
    <div className={classes.layout}>
      <Filters />
      <Container maxWidth="xl" className={classes.container}>
        <ItemsList />
      </Container>
    </div>          
  );
}

export default withStyles(styles)(Dashboard);