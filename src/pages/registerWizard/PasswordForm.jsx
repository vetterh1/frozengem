import React from 'react';
import { Redirect } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { TextField } from '@material-ui/core';
import { injectIntl } from "react-intl";
import { defineMessages } from 'react-intl.macro';
import { WizNavBar, WizPageTitle} from "../utils/WizUtilComponents";



const messages = defineMessages({
  title: {
    id: 'register.password.title',
    defaultMessage: 'Please enter your password',
    description: 'Please enter your password',
  },
  passwordLabel: {
    id: 'register.password.label',
    defaultMessage: 'Your password',
    description: 'Your password',
  },
  password: {
    id: 'register.password.help',
    defaultMessage: 'Minimum {min} characters',
    description: 'Minimum 6 characters',
  },
  retype: {
    id: 'register.retype.help',
    defaultMessage: 'Please re-enter your password',
    description: 'Please re-enter your password',
  },  
  passwordIdentical: {
    id: 'register.password.notIdentical',
    defaultMessage: 'The two passwords should match',
    description: 'The two passwords should match',
  },
});



const styles = theme => ({
  inputs: {
    marginTop: theme.spacing(6),
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
  }
  
  handleTextChange(event) {
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
  handleNext = () => { this.props.nextStep(); };

  render() {
    // State is NOT stored in this wizard tab, but in the parent (wizard component)
    const { state, isActive, classes } = this.props;
    const { name, email, password } = state;
    const { password2, identicalPasswords, longEnough } = this.state;

    // Return to the 1st page if all the previous infos are not filled in
    // (ex: return on this exact page)
    // if(isActive && ( name === "" || email === "")) {
    //   return <Redirect to='/' />
    // }    

    return (

      <div className={"flex-max-height flex-direction-column"}>

        <WizPageTitle message={messages.title} />

        <FormControl className={"flex-max-height flex-direction-column huge-margin-down"}>
          <TextField
            id="password"
            value={password}
            onChange={this.handleTextChange}
            type="password"
            label={this.props.intl.formatMessage(messages.passwordLabel)}
            helperText={this.props.intl.formatMessage(messages.password, {min: this.minLength})}
            error={!longEnough}
            fullWidth
            className={classes.inputs}
          />
          <TextField
            id="password2"
            value={password2}
            onChange={this.checkRetype}
            type="password"
            label={this.props.intl.formatMessage(messages.retype)}
            helperText={this.props.intl.formatMessage(messages.passwordIdentical)}
            error={password2 !== "" && !identicalPasswords}
            fullWidth
            className={classes.inputs}
          />

        </FormControl>

        <WizNavBar onClickNext={this.handleNext.bind(this)}  isNextDisabled={!identicalPasswords || !longEnough} onClickPrevious={this.handlePrevious.bind(this)} />

      </div>

    );
  }
}


export default injectIntl(withStyles(styles)(PasswordForm));