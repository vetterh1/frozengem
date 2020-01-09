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
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
});


const Dashboard = ({ classes }) => {

  console.debug('[--- FC ---] Functional component: Dashboard');

  return (
    <div className={classes.layout}>
      <Filters />
      <Container maxWidth="md" className={classes.container}>
        <ItemsList />
      </Container>
    </div>          
  );
}

export default withStyles(styles)(Dashboard);