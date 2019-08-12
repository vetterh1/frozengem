import React from 'react';
import { Redirect } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { injectIntl, defineMessages, FormattedMessage } from "react-intl";
import Button from '@material-ui/core/Button';
import { WizNavBar, WizPageTitle} from "../utils/WizUtilComponents";


const messages = defineMessages({
  title: {
    id: 'register.registered.title',
    defaultMessage: 'Finalize your registration...',
    description: 'Finalize your registration...',
  },
  newHome: {
    id: 'register.registered.newHome',
    defaultMessage: 'New home',
    description: 'New home',
  },
  joinHome: {
    id: 'register.registered.joinHome',
    defaultMessage: 'Join existing home',
    description: 'Join existing home',
  },
});



const styles = theme => ({
  showArea: {
    display: 'flex',
  },
  hideArea: {
    display: 'none',
  },
});



const RegistrationSuccessInt = ({intl, onClickNewHome, onClickJoinHome}) => {
  console.log("!------> RegistrationSuccess")

  return (
    <div className="big-margin-top big-margin-down flex-normal-height flex-direction-row flex-justifiy-around">
      <div className={"flex-normal-height flex-direction-row flex-justifiy-around huge-margin-top"}>
        <Button variant="contained" color="secondary" onClick={onClickNewHome}>
          {intl.formatMessage(messages.newHome)}
        </Button>        
        <Button variant="contained" color="primary" onClick={onClickJoinHome}>
          {intl.formatMessage(messages.joinHome)}
        </Button>        
      </div>

    </div>
  );
}
const RegistrationSuccess = injectIntl(RegistrationSuccessInt);


const RegistrationButtonAreaInt = ({registrationInProgress, onClickRegister}) => {
  console.log("!------> RegistrationButtonArea: registrationInProgress=", registrationInProgress)

  if(registrationInProgress) return(<CircularProgress  size={68} />);
  return (
    <div className="big-margin-top big-margin-down">
      <Button
        variant="contained"
        color="primary"
        onClick={onClickRegister}
        disabled={registrationInProgress}
        fullWidth
      >
        <FormattedMessage id="register.registered.button" defaultMessage="Register!" />
      </Button>          
    </div>
  );
}
const RegistrationButtonArea = injectIntl(RegistrationButtonAreaInt);




class NameForm extends React.Component {
  static propTypes = {
  }


  constructor(props) {
    super(props);
    this.state = {
    };
    this.onClickRegister = this.onClickRegister.bind(this);
  }


  handlePrevious = () => { this.props.previousStep(); };

  onClickRegister = () => { this.props.onClickRegister(); };


  render() {
    const { state } = this.props;
    const {name, email, password, registrationInProgress, registrationFinished, registrationSuccess} = state;
  

    // Return to the 1st page if all the previous infos are not filled in
    // (ex: return on this exact page)
    if(this.props.isActive && ( name === "" || email === "" || password === "")) {
      console.log("!------> redirect home (empty params): name=", name, ", email=", email, ", password=", password, ", isActive=", this.props.isActive)
      return <Redirect to='/' />
    }    

    return (

      <div className={"flex-normal-height flex-direction-column"}>

        <div className={"flex-normal-height flex-direction-column"}>
          <WizPageTitle message={this.props.intl.formatMessage(messages.title)} />

          <div className={"flex-normal-height flex-direction-row flex-justifiy-around"}>
            { !(registrationFinished && registrationSuccess) && <RegistrationButtonArea onClickRegister={this.onClickRegister} registrationInProgress={registrationInProgress} /> }
            { (registrationFinished && registrationSuccess) && <RegistrationSuccess /> }
          </div>
        </div>

        <div className={"flex-normal-height flex-direction-column"}>
            &nbsp;
        </div>

        <WizNavBar onClickPrevious={this.handlePrevious.bind(this)} />

      </div>

    );
  }
}


export default injectIntl(withStyles(styles)(NameForm));