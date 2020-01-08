import React from 'react';
import { Redirect } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { injectIntl, FormattedMessage } from "react-intl";
import Button from '@material-ui/core/Button';
import { WizNavBar, WizPageTitle} from "../utils/WizUtilComponents";



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
          {intl.formatMessage({id: 'register.registered.newHome'})}
        </Button>        
        <Button variant="contained" color="primary" onClick={onClickJoinHome}>
          {intl.formatMessage({id: 'register.registered.joinHome'})}
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
      console.log("Redirect to home as name or email or password empty");
      return <Redirect to='/' />
    }    

    return (

      <div className={"flex-normal-height flex-direction-column"}>

        <div className={"flex-normal-height flex-direction-column"}>
          <WizPageTitle message={this.props.intl.formatMessage({id: 'register.registered.title'})} />

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