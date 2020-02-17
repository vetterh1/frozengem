import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from "react-intl";
import AcUnit from '@material-ui/icons/AcUnit';
import AccessTime from '@material-ui/icons/AccessTime';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Box from '@material-ui/core/Box'; // ! must be at the end of the material-ui imports !
// import Container from '@material-ui/core/Container';
// import Header from '../navigation/Header';

const styles = theme => ({
  layout: {
    width: 'auto',
    padding: `${theme.spacing(8)}px 0`,
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  largeIcon: {
    width: 48,
    height: 48,
    marginBottom: theme.spacing(2),
  },
});


class MainPageContent extends React.Component {

  render() {
    const { classes } = this.props;
    console.debug("MainPageContent - props=", this.props);

    return (
      <>
        {/* <Header />
        <Container>
          <> */}
            <Box mt={5} display="flex" flexDirection="column" >
              <Typography variant="h1" color="primary" align="center" gutterBottom>
                <FormattedMessage id="app.title" />
              </Typography>
              <Typography variant="h3" align="center" gutterBottom >
                <FormattedMessage id="app.subtitle" />
              </Typography>
              <Grid container justify="center">
                <Grid item>
                  <Box mt={2} mb={4}>
                    <Button variant="contained" color="secondary" component={Link} to="/register">
                      <FormattedMessage id="button.getstarted" />
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <div className={classes.layout}>
              <Grid container spacing={5}>
                  <Grid item sm={12} md={4} container direction="column">
                    <Grid className={classes.subtitle} item>
                      <AcUnit color="primary" className={classes.largeIcon} />
                      <Typography variant="h2" color="primary">
                        <FormattedMessage id="app.reason1.title" />
                      </Typography>
                    </Grid>
                    <Grid item >
                      <Typography>
                        <FormattedMessage id="app.reason1.text" />
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item sm={12} md={4}>
                    <Grid className={classes.subtitle} item>
                      <AccessTime color="primary" className={classes.largeIcon} />
                      <Typography variant="h2" color="primary">
                        <FormattedMessage id="app.reason2.title" />
                      </Typography>
                    </Grid>
                    <Grid item >
                      <Typography>
                        <FormattedMessage id="app.reason2.text" />
                      </Typography>
                    </Grid>
                  </Grid>
                      
                  <Grid item sm={12} md={4}>
                    <Grid className={classes.subtitle} item>
                      <NoteAdd color="primary" className={classes.largeIcon} />
                      <Typography variant="h2" color="primary">
                        <FormattedMessage id="app.reason3.title" />
                      </Typography>
                    </Grid>
                    <Typography>
                      <FormattedMessage id="app.reason3.text" />
                    </Typography>
                  </Grid>
                                
              </Grid>
            </div>   
          {/* </>
        </Container> */}

        {/* <div>
          <Typography>
            Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"             title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
          </Typography>
        </div> */}
      </>
    );
  }
}

export default withStyles(styles)(MainPageContent);