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
    };
  }
  
  handleTextChange(event) { this.props.handleChange({name: 'password', value: event.target.value});  }
  handleTextChange2(event) { this.props.handleChange({name: 'password2', value: event.target.value});   /* Should check passwords are the same */ }
  handlePrevious = () => { this.props.handleChange({ name: 'password', value: "" }); this.props.previousStep(); };
  handleNext = () => { this.props.nextStep(); };

  render() {
    // State is NOT stored in this wizard tab, but in the parent (wizard component)
    const { state, isActive } = this.props;

    // Return to the 1st page if all the previous infos are not filled in
    // (ex: return on this exact page)
    const {name, email} = state;
    if(isActive && ( name === "" || email == "")) {
      return <Redirect to='/' />
    }    

    return (

      <div className={"flex-max-height flex-direction-column"}>

        <WizPageTitle message={messages.title} />

        <FormControl className={"flex-normal-height flex-direction-column huge-margin-down"}>

          <InputLabel htmlFor="password"><FormattedMessage id="register.password.label" defaultMessage="Your Password" /></InputLabel>
          <Input
            id="password"
            value={state.password}
            onChange={this.handleTextChange.bind(this)}
            type="password"
            minlength="6" maxlength="18" 
            aria-describedby="password-text"
            fullWidth
          />
          <FormHelperText id="password-text">{this.props.intl.formatMessage(messages.password)}</FormHelperText>

          {/* <InputLabel htmlFor="password2"><FormattedMessage id="register.password2.label" defaultMessage="Retype your Password" /></InputLabel>
          <Input
            id="password2"
            value={state.password2}
            onChange={this.handleTextChange2.bind(this)}
            aria-describedby="password2-text"
            fullWidth
          />
          <FormHelperText id="password2-text">{this.props.intl.formatMessage(messages.password2)}</FormHelperText> */}

        </FormControl>

        <WizNavBar onClickNext={this.handleNext.bind(this)} onClickPrevious={this.handlePrevious.bind(this)} />

      </div>

    );
  }
}


export default injectIntl(withStyles(styles)(PasswordForm));