import React from 'react';
import { Redirect } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { injectIntl } from "react-intl";
// import { defineMessages } from 'react-intl.macro';
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
      identicalPasswords: false,
      longEnough: false,
      password2: ""
    };
    this.minLength = 6;
    this.handleTextChange = this.handleTextChange.bind(this)
    this.checkRetype = this.checkRetype.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrevious = this.handlePrevious.bind(this)
  }
  
  handleTextChange(event) {
    if(!this.props.isActive) return;
    const {value} = event.target;
    const {password} = this.props.state;
    const {password2, identicalPasswords, longEnough} = this.state;
    if(value === password) return;
    // check if length is enough
    const newLengthTest = value.length >= this.minLength;
    if(longEnough !== newLengthTest)
      this.setState({longEnough: newLengthTest});
    // check 2 passwords are the same
    const newIdenticalPasswords = password2 === value;
    if(identicalPasswords !== newIdenticalPasswords)
      this.setState({identicalPasswords: newIdenticalPasswords});   
    this.props.handleChange({name: 'password', value});
    }

  checkRetype(event) {
    if(!this.props.isActive) return;
    const {value} = event.target;
    const {password} = this.props.state;
    const {password2, identicalPasswords} = this.state;
    if(value === password2) return;
    this.setState({ password2: value });
    // check 2 passwords are the same
    const newIdenticalPasswords = password === value;
    if(identicalPasswords !== newIdenticalPasswords)
      this.setState({identicalPasswords: newIdenticalPasswords});
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
    const { name, email, password } = state;
    const { password2, identicalPasswords, longEnough } = this.state;

    // Return to the 1st page if all the previous infos are not filled in
    // (ex: return on this exact page)
    if(isActive && ( name === "" || email === "")) {
      console.debug('[>>> Register:PasswordForm ------>>>----- / >>>] Reason: name or email is empty');
      return <Redirect to='/' />
    }    

    return (

      <div className={"flex-normal-height flex-direction-column"}>

        <WizPageTitle message={this.props.intl.formatMessage({id: 'register.password.title'})} />

        <form onSubmit={this.handleNext} className={"flex-normal-height flex-direction-column"} noValidate>

          <div className={"flex-normal-height flex-direction-column"}>
            
            <input id="emailfield" type="text" defaultValue={name} autoComplete="username" className={classes.hidden} />

            <TextField
              id="new-password"
              autoComplete="new-password"
              autoFocus
              value={password}
              onChange={this.handleTextChange}
              type="password"
              label={this.props.intl.formatMessage({id: 'register.password.label'})}
              helperText={this.props.intl.formatMessage({id: 'register.password.help'}, {min: this.minLength})}
              error={password !== "" && !longEnough}
              fullWidth
            />
            <TextField
              id="new-password2"
              autoComplete="new-password"
              value={password2}
              onChange={this.checkRetype}
              type="password"
              label={this.props.intl.formatMessage({id: 'register.retype.help'})}
              helperText={this.props.intl.formatMessage({id: 'register.password.notIdentical'})}
              error={password2 !== "" && !identicalPasswords}
              fullWidth
              className={classes.marginTop}
            />
  
          </div>

          <WizNavBar nextIsSubmit  isNextDisabled={!identicalPasswords || !longEnough} onClickPrevious={this.handlePrevious.bind(this)} />

        </form>

      </div>

    );
  }
}


export default injectIntl(withStyles(styles)(PasswordForm));