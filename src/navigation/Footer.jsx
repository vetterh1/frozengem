import React from 'react';
import { withRouter } from "react-router";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function WhyFrozenGem() {
  return (
    <React.Fragment>
      <Typography component="h4" gutterBottom>
        Why?
      </Typography>
      <Typography gutterBottom >
        This project was started out of despair. Despair everytime we discard food because we don't remember what it is, when it was added. Despair every other night when we don't know what to cook... even though we know we have put so many good homemade leftovers in the freezer... but not / badly labelled!
      </Typography>
    </React.Fragment>
  );
}

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Built with love by '}
      <Link color="inherit" href="https://www.linkedin.com/in/lvetter">
        Laurent Vetterhoeffer
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(4),
    margingBottom: "0px",
    backgroundColor: theme.palette.secondary.light,
  },
  footerContainer: {
  },
}));




function Footer(props) {
  const classes = useStyles();
  const onMainPage = props.location.pathname === '/';

  return (
    <footer className={classes.footer}>
      <Container maxWidth="md" className={classes.footerContainer}>
        {onMainPage && <WhyFrozenGem />}
        <MadeWithLove />
      </Container>
    </footer>
  );
}

export default withRouter(Footer);
