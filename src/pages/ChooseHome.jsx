// TODO Refactor this file for Redux
// TODO Test this file after redux changes

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import { userActions } from '../_actions/userActions';
import Box from '@material-ui/core/Box'; // ! must be at the end of the material-ui imports !
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Create, Add } from '@material-ui/icons'
import { defineMessages, FormattedMessage } from "react-intl";
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


const messages = defineMessages({


  joinCode: {
    id: 'home.join.code',
    defaultMessage: 'Home Code',
    description: 'Home Code',
  },
  newTitle: {
    id: 'home.new.title',
    defaultMessage: 'Create a new home',
    description: 'Create a new home',
  },
  newShort: {
    id: 'home.new.short',
    defaultMessage: 'New home',
    description: 'New home',
  },
  newMessage: {
    id: 'home.new.message',
    defaultMessage: 'Please give a name to your home :)',
    description: 'Please give a name to your home :)',
  },  
  newLabel: {
    id: 'home.new.message',
    defaultMessage: 'Home name',
    description: 'Home name',
  },
  success: {
    id: 'home.join.success',
    defaultMessage: 'You are all set!',
    description: 'You are all set!',
  },    
  error_not_found: {
    id: 'home.join.error_not_found',
    defaultMessage: 'Sorry, this code is unknown, please try again... ',
    description: 'Sorry, this code is unknown, please try again... ',
  },
  error: {
    id: 'home.join.error',
    defaultMessage: 'Sorry, an error occured, please try again... ',
    description: 'Sorry, an error occured, please try again... ',
  },

});

// TODO move enqueueSnackbar calls & intl to userActions home methods


class ChooseHome extends React.Component {

  constructor(props) {
    super(props);

    this.onJoinHome = this.onJoinHome.bind(this)
    this.onNewHome = this.onNewHome.bind(this)
  }

  onJoinHome = async (idHome) => {
    await this.props.joinHome(idHome);    
    console.log("ChooseHome.onJoinHome - after dispatch - idHome:", idHome);  
  }
      
    //   const key = this.props.enqueueSnackbar(
    //     this.props.intl.formatMessage(messages.success), 
    //     {variant: 'success', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {this.props.closeSnackbar(key);}}
    //   );  

    // } catch (error) {
    //   console.error("onJoinHome error: ", JSON.stringify(error));
    //   const key = this.props.enqueueSnackbar(
    //     this.props.intl.formatMessage( error.response.status === 404 ? messages.error_not_found : messages.error), 
    //     {variant: 'error', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {this.props.closeSnackbar(key);}}
    //   ); 
    // }

  onNewHome = async (labelHome) => {
    await this.props.joinNewHome(labelHome, "");    
    console.log("ChooseHome.onNewHome - after dispatch - labelHome:", labelHome);  
  }
    //   const key = this.props.enqueueSnackbar(
    //     this.props.intl.formatMessage(messages.success), 
    //     {variant: 'success', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {this.props.closeSnackbar(key);}}
    //   );  

    // } catch (error) {
    //   console.error("onJoinNewHome error: ", JSON.stringify(error));
    //   const key = this.props.enqueueSnackbar(
    //     this.props.intl.formatMessage( messages.error), 
    //     {variant: 'error', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {this.props.closeSnackbar(key);}}
    //   ); 
    // }


  render() {
    const { classes } = this.props;
    
    const { isAuthenticated } = this.props;
    if (isAuthenticated) { 
      console.log("Redirect to home as already logged in");
      return <Redirect to='/' />
    };

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
                      inputLabel={this.props.intl.formatMessage({id: 'home.new.message'})}
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
const mapStateToProps = state => ({isAuthenticated: state.user.loggedIn});

const connectedChooseHome = connect(mapStateToProps, mapDispatchToProps)(ChooseHome);

export default withStyles(styles)(connectedChooseHome);