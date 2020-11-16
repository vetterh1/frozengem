import React from 'react';
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import config from 'data/config'

function WhyFrozenGem() {
  return (
    <React.Fragment>
      <Typography component="h3" gutterBottom>
        <FormattedMessage id="footer.why" />
        
      </Typography>
      <Typography gutterBottom >
        <FormattedMessage id="footer.whyanswer" />
      </Typography>
    </React.Fragment>
  );
}

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary">
      <FormattedMessage id="footer.builtby" />
      <Link color="inherit" href="https://www.linkedin.com/in/lvetter">
        Laurent Vetterhoeffer
      </Link>
      {config.version ? ` - ${config.version}` : '.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(2),
    marginTop: -theme.spacing(2),
    margingBottom: 0,
    backgroundColor: theme.palette.footer.backgroundColor,
  },
  footerContainer: {
  },
}));




function Footer({
  // From other HOC
  location,
}) {
  const classes = useStyles();
  const onMainPage = location.pathname === '/';

  return (
    <footer className={classes.footer}>
      <Container maxWidth="md" className={classes.footerContainer}>
        {onMainPage && <WhyFrozenGem />}
        <MadeWithLove />
        {/* <!-- CookiePro Cookies Settings button start --> */}
        <button id="ot-sdk-btn" className="ot-sdk-show-settings">Cookie Settings</button>
        {/* <!-- CookiePro Cookies Settings button end --> */}
      </Container>
    </footer>
  );
}
export default withRouter(Footer);
