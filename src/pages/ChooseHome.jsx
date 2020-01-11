import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import { userActions } from '../_actions/userActions';
import Box from '@material-ui/core/Box'; // ! must be at the end of the material-ui imports !
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Create, Add } from '@material-ui/icons'
import { injectIntl, FormattedMessage } from "react-intl";
import { withStyles } from '@material-ui/core/styles';
import ButtonWithOneInputModal from './utils/ButtonWithOneInputModal';

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
    marginBottom: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
});


class ChooseHome extends React.Component {

  constructor(props) {
    super(props);

    this.onJoinHome = this.onJoinHome.bind(this)
    this.onNewHome = this.onNewHome.bind(this)
  }

  onJoinHome = async (idHome) => {
    await this.props.joinHome(idHome);    
    console.info("ChooseHome.onJoinHome - after dispatch - idHome:", idHome);  
  }
  

  onNewHome = async (labelHome) => {
    await this.props.joinNewHome(labelHome, "");    
    console.info("ChooseHome.onNewHome - after dispatch - labelHome:", labelHome);  
  }


  render() {
    const { classes } = this.props;
    
    if (!this.props.isAuthenticated) { 
      console.log('[>>> ChooseHome ------>>>----- / >>>] Reason: not logged in');
      return <Redirect to='/' />
    };

    if (this.props.isAuthenticated && this.props.home) {
        console.log('[>>> ChooseHome ------>>>----- / >>>] Reason: house was chosen');
        return <Redirect to='/' /> 
    }    

    console.debug('[--- C ---] Component: ChooseHome');


    return (
      <React.Fragment>

        <Box mt={5} display="flex" flexDirection="column" >
          <Typography variant="h5" align="center" gutterBottom >
            <FormattedMessage id="app.almost_there" />
          </Typography>
        </Box>


        <div className={classes.layout}>
          <Grid container spacing={6}>
              <Grid item sm={12} md={6} container direction="column">
                <Grid className={classes.subtitle} item>
                  <Grid className={classes.subtitle} item >
                    <ButtonWithOneInputModal 
                      btnLabel={this.props.intl.formatMessage({id: 'home.join.title'})}
                      btnIcon="btnHome"
                      modalTitle={this.props.intl.formatMessage({id: 'home.join.short'})}
                      modalText={this.props.intl.formatMessage({id: 'home.join.message'})}
                      inputLabel={this.props.intl.formatMessage({id: 'home.join.code'})}
                      onOk={this.onJoinHome}
                    >
                      <Add className={classes.leftIcon} />
                    </ButtonWithOneInputModal>                  
                  </Grid>
                  <Typography variant="body1" component="h2" color="primary">
                    <FormattedMessage id="app.home.join" />
                  </Typography>
                </Grid>
                <Grid className={classes.subtitle} item >

                </Grid>
              </Grid>

              <Grid item sm={12} md={6}>
                <Grid className={classes.subtitle} item>
                  <Grid className={classes.subtitle} item >
                    <ButtonWithOneInputModal 
                      btnLabel={this.props.intl.formatMessage({id: 'home.new.title'})}
                      btnIcon="btnHome"
                      modalTitle={this.props.intl.formatMessage({id: 'home.new.short'})}
                      modalText={this.props.intl.formatMessage({id: 'home.new.message'})}
                      inputLabel={this.props.intl.formatMessage({id: 'home.new.label'})}
                      onOk={this.onNewHome}
                    >
                      <Create className={classes.leftIcon} />
                    </ButtonWithOneInputModal>   
                  </Grid>
                  <Typography variant="body1" component="h2" color="primary">
                    <FormattedMessage id="app.home.new" />
                  </Typography>
                </Grid>
              </Grid>
                          
          </Grid>
        </div>   


        </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  joinHome: userActions.joinHome,
  joinNewHome: userActions.joinNewHome,
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.loggedIn,
  home: state.user.home
});
const connectedChooseHome = connect(mapStateToProps, mapDispatchToProps)(ChooseHome);

export default injectIntl(withStyles(styles)(connectedChooseHome));