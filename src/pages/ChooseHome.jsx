import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box'; // ! must be at the end of the material-ui imports !
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Create, Add } from '@material-ui/icons'
import { withSnackbar } from 'notistack';
import { injectIntl, defineMessages, FormattedMessage } from "react-intl";
import { withStyles } from '@material-ui/core/styles';
import { withUserInfo } from '../auth/withUserInfo';
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
  joinTitle: {
    id: 'home.join.title',
    defaultMessage: 'Join an existing home',
    description: 'Join an existing home',
  },
  joinShort: {
    id: 'home.join.short',
    defaultMessage: 'Join',
    description: 'Join',
  },
  joinMessage: {
    id: 'home.join.message',
    defaultMessage: 'You need to ask an existing user for his home code',
    description: 'You need to ask an existing user for his home code',
  },
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
    id: 'home.new.label',
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



class ChooseHome extends React.Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {...this.defaultState};

    this.onJoinHome = this.onJoinHome.bind(this)
    this.onNewHome = this.onNewHome.bind(this)
  }

  onJoinHome = async (idHome) => {
    console.log("onJoinHome ", idHome);
    const { joinHome } = this.props.userInfo;
    try {
      await joinHome(idHome);    
      
      const key = this.props.enqueueSnackbar(
        this.props.intl.formatMessage(messages.success), 
        {variant: 'success', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {this.props.closeSnackbar(key);}}
      );  

    } catch (error) {
      console.error("onJoinHome error: ", JSON.stringify(error));
      const key = this.props.enqueueSnackbar(
        this.props.intl.formatMessage( error.response.status === 404 ? messages.error_not_found : messages.error), 
        {variant: 'error', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {this.props.closeSnackbar(key);}}
      ); 
    }
  }

  onNewHome = async (labelHome) => {
    console.log("onNewHome ", labelHome);
    const { joinNewHome } = this.props.userInfo;
    try {
      await joinNewHome(labelHome, "");    
      
      const key = this.props.enqueueSnackbar(
        this.props.intl.formatMessage(messages.success), 
        {variant: 'success', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {this.props.closeSnackbar(key);}}
      );  

    } catch (error) {
      console.error("onJoinNewHome error: ", JSON.stringify(error));
      const key = this.props.enqueueSnackbar(
        this.props.intl.formatMessage( messages.error), 
        {variant: 'error', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {this.props.closeSnackbar(key);}}
      ); 
    }
  }

  render() {
    const { classes } = this.props;
    // const { isAuthenticated } = this.props.userInfo;
    // const greyWhenNoUserInfo = isAuthenticated() ? '' : 'auth-required';

    return (
      <React.Fragment>

        <Box mt={5} display="flex" flexDirection="column" >
          <Typography variant="h5" align="center" gutterBottom >
            <FormattedMessage id="app.almost_there" defaultMessage="You are almost there!" />
          </Typography>
        </Box>


        <div className={classes.layout}>
          <Grid container spacing={6}>
              <Grid item sm={12} md={6} container direction="column">
                <Grid className={classes.subtitle} item>
                  <Grid className={classes.subtitle} item >
                    <ButtonWithOneInputModal 
                      btnLabel={this.props.intl.formatMessage(messages.joinTitle)}
                      btnIcon="btnHome"
                      modalTitle={this.props.intl.formatMessage(messages.joinShort)}
                      modalText={this.props.intl.formatMessage(messages.joinMessage)}
                      inputLabel={this.props.intl.formatMessage(messages.joinCode)}
                      onOk={this.onJoinHome}
                    >
                      <Add className={classes.leftIcon} />
                    </ButtonWithOneInputModal>                  
                  </Grid>
                  <Typography variant="body1" component="h2" color="primary">
                    <FormattedMessage id="app.home.join" defaultMessage="...if someone in your home is already using FrozenGem" />
                  </Typography>
                </Grid>
                <Grid className={classes.subtitle} item >

                </Grid>
              </Grid>

              <Grid item sm={12} md={6}>
                <Grid className={classes.subtitle} item>
                  <Grid className={classes.subtitle} item >
                    <ButtonWithOneInputModal 
                      btnLabel={this.props.intl.formatMessage(messages.newTitle)}
                      btnIcon="btnHome"
                      modalTitle={this.props.intl.formatMessage(messages.newShort)}
                      modalText={this.props.intl.formatMessage(messages.newMessage)}
                      inputLabel={this.props.intl.formatMessage(messages.newLabel)}
                      onOk={this.onNewHome}
                    >
                      <Create className={classes.leftIcon} />
                    </ButtonWithOneInputModal>   
                  </Grid>
                  <Typography variant="body1" component="h2" color="primary">
                    <FormattedMessage id="app.home.new" defaultMessage="...if you are the first user in your home" />
                  </Typography>
                </Grid>
              </Grid>
                          
          </Grid>
        </div>   


        </React.Fragment>
    );
  }
}

export default injectIntl(withUserInfo(withSnackbar(withStyles(styles)(ChooseHome))));