import React from 'react';
import { Redirect } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { injectIntl } from "react-intl";
import { WizNavBar, WizPageTitle} from "../utils/WizUtilComponents";


const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing(6),
  },
  hidden: {
    display: "none",
  },
});


class PasswordForm extends React.Component {
  static propTypes = {
  }


  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrevious = this.handlePrevious.bind(this)
  }
  
  handleTextChange(event) {
    if(!this.props.isActive) return;
    const {value} = event.target;
    const {password} = this.props.state;
    if(value === password) return;
    this.props.handleChange({name: 'password', value});
    }

  handlePrevious = () => { this.props.handleChange({ name: 'password', value: "" }); this.props.previousStep(); };
  
  handleNext = (e) => {
    //e.preventDefault should always be the first thing in the function
    e.preventDefault();

    this.props.onSubmit();
  };

  render() {
    // State is NOT stored in this wizard tab, but in the parent (wizard component)
    const { state, isActive, classes } = this.props;
    const { email, password, registrationInProgress, registrationFinished } = state;

    // Return to the 1st page if all the previous infos are not filled in
    // (ex: return on this exact page)
    if(isActive && ( email === "")) {
      console.log("Redirect to home as email empty (PasswordForm) - email:", email);
      return <Redirect to='/' />
    }    

    return (

      <div className={"flex-normal-height flex-direction-column"}>

        <WizPageTitle message={this.props.intl.formatMessage({id: 'register.password.title'})} />

        <form onSubmit={this.handleNext} className={"flex-normal-height flex-direction-column"} noValidate>

          <div className={"flex-normal-height flex-direction-column"}>
            
            <input id="emailfield" type="text" defaultValue={email} autoComplete="email" className={classes.hidden} />

            <TextField
              id="new-password"
              autoComplete="new-password"
              autoFocus
              value={password}
              onChange={this.handleTextChange}
              type="password"
              label={this.props.intl.formatMessage({id: 'register.password.label'})}
              fullWidth
              disabled={registrationInProgress || registrationFinished}
            />
  
          </div>

          { registrationInProgress && <CircularProgress  size={68} /> }

          <WizNavBar nextIsSubmit onClickPrevious={this.handlePrevious.bind(this)} />

        </form>

      </div>

    );
  }
}


export default injectIntl(withStyles(styles)(PasswordForm));