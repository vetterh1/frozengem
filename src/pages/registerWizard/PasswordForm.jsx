import React from 'react';
import { Redirect } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { injectIntl } from "react-intl";
import { defineMessages, FormattedMessage } from 'react-intl.macro';
import { WizNavBar, WizPageTitle} from "../utils/WizUtilComponents";



const messages = defineMessages({
  title: {
    id: 'register.password.title',
    defaultMessage: 'Please enter your password',
    description: 'Please enter your password',
  },
  password: {
    id: 'register.password.help',
    defaultMessage: 'Minimum 6 characters / numbers',
    description: 'Minimum 6 characters / numbers',
  },  
  password2: {
    id: 'register.password2.help',
    defaultMessage: 'It should match with what you entered above',
    description: 'It should match with what you entered above',
  },
});



const styles = theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    textAlign: 'center',
    marginLeft: theme.spacing(2),
  },  
  divWizard: {
    marginTop: theme.spacing(2),
  },
});


class PasswordForm extends React.Component {
  static propTypes = {
  }


  constructor(props) {
    super(props);
    this.state = {
      password2: "---"
    };
    this.handleTextChange = this.handleTextChange.bind(this)
    this.checkRetype = this.checkRetype.bind(this)
  }
  
  handleTextChange(event) {
    const {value} = event.target;
    const {password} = this.props.state;
    const {password2} = this.state;
    if(value === password) return;
    // if(event.target.value !== password2)
    //   this.setState((state) => { return {validData: !state.validData}; })    
    this.props.handleChange({name: 'password', value});
    }

  checkRetype(event) {
    // const {value} = event.target;
    // const {password} = this.props.state;
    // const {password2} = this.state;
    // if(value === password2) return;
    // this.setState({ password2 });    
    // Verify if same as password
    // if(password !== password2)
    //   this.setState((state) => { return {validData: !state.validData}; })
  }

  handlePrevious = () => { this.props.handleChange({ name: 'password', value: "" }); this.props.previousStep(); };
  handleNext = () => { this.props.nextStep(); };

  render() {
    // State is NOT stored in this wizard tab, but in the parent (wizard component)
    const { state, isActive } = this.props;
    const { name, email, password } = state;
    const { password2 } = this.state;
    console.log("PASSW ", password2)
    // Return to the 1st page if all the previous infos are not filled in
    // (ex: return on this exact page)
    // if(isActive && ( name === "" || email === "")) {
    //   return <Redirect to='/' />
    // }    

    return (

      <div className={"flex-max-height flex-direction-column"}>

        <WizPageTitle message={messages.title} />

        <FormControl className={"flex-max-height flex-direction-column huge-margin-down"}>

          <InputLabel htmlFor="password"><FormattedMessage id="register.password.label" defaultMessage="Your Password" /></InputLabel>
          <Input
            id="password"
            value={password}
            onChange={this.handleTextChange}
            type="password"
            minLength="6"
            maxLength="18" 
            aria-describedby="password-text"
            fullWidth
          />
          <FormHelperText id="password-text">{this.props.intl.formatMessage(messages.password)}</FormHelperText>

          {/* <InputLabel htmlFor="password2"><FormattedMessage id="register.password2.label" defaultMessage="Retype your Password" /></InputLabel> */}
          <Input
            id="password2"
            // value={password2}
            // onChange={this.checkRetype}
            type="password"
            minLength="6"
            maxLength="18" 
            aria-describedby="password2-text"
            fullWidth
          />
          {/* <FormHelperText id="password2-text">{this.props.intl.formatMessage(messages.password2)}</FormHelperText> */}

        </FormControl>

        <WizNavBar onClickNext={this.handleNext.bind(this)} onClickPrevious={this.handlePrevious.bind(this)} />

      </div>

    );
  }
}


export default injectIntl(withStyles(styles)(PasswordForm));