import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box'; // ! must be at the end of the material-ui imports !
import Typography from '@material-ui/core/Typography';
import { withSnackbar } from 'notistack';
import { FormattedMessage } from 'react-intl.macro';
import { injectIntl } from "react-intl";
import { defineMessages } from 'react-intl.macro';
import { withStyles } from '@material-ui/core/styles';
import { withUserInfo } from '../auth/withUserInfo';
import ModalOneInput from './utils/ModalOneInput';

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
    defaultMessage: 'New home',
    description: 'New home',
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
      const res = await joinHome(idHome);    
      
      this.props.enqueueSnackbar(
        this.props.intl.formatMessage(messages.success), 
        {variant: 'success', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}}
      );  

    } catch (error) {
      // console.error("onJoinHome error: ", JSON.stringify(error));
      this.props.enqueueSnackbar(
        this.props.intl.formatMessage( error.response.status === 404 ? messages.error_not_found : messages.error), 
        {variant: 'error', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}}
      ); 
    }
  }

  onNewHome = (labelHome) => {
    console.log("onNewHome ", labelHome);
  }

  render() {
    const { classes } = this.props;
    // const { isAuthenticated } = this.props.userInfo;
    // const greyWhenNoUserInfo = isAuthenticated() ? '' : 'auth-required';

    return (
      <React.Fragment>

        <Box mt={5} display="flex" flexDirection="column" >
          <Typography component="h1" variant="h2" color="primary" align="center" gutterBottom>
            <FormattedMessage id="dashboard.title" defaultMessage="FrozenGem dashboard" />
          </Typography>
          <Typography variant="h5" align="center" gutterBottom >
            <FormattedMessage id="dashboard.subtitle" defaultMessage="Here is what you have in your freezer" />
          </Typography>
        </Box>

        <div className={classes.layout}>
          <ModalOneInput 
            btnLabel={this.props.intl.formatMessage(messages.joinTitle)}
            btnIcon="btnHome"
            modalTitle={this.props.intl.formatMessage(messages.joinShort)}
            modalText={this.props.intl.formatMessage(messages.joinMessage)}
            inputLabel={this.props.intl.formatMessage(messages.joinCode)}
            onOk={this.onJoinHome}
          />
          <ModalOneInput 
            btnLabel={this.props.intl.formatMessage(messages.newTitle)}
            btnIcon="btnHome"
            modalTitle={this.props.intl.formatMessage(messages.newShort)}
            modalText={this.props.intl.formatMessage(messages.newMessage)}
            inputLabel={this.props.intl.formatMessage(messages.newLabel)}
            onOk={this.onNewHome}
          />


        </div>   

        </React.Fragment>
    );
  }
}

export default injectIntl(withUserInfo(withSnackbar(withStyles(styles)(ChooseHome))));