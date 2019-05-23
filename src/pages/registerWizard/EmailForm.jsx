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
import validateEmail from "../../utils/validateEmail";



const messages = defineMessages({
  title: {
    id: 'register.email.title',
    defaultMessage: 'Please enter your email',
    description: 'Please enter your email',
  },
  email: {
    id: 'register.email.help',
    defaultMessage: 'To identify yourself',
    description: 'To identify yourself',
  },
  emailError: {
    id: 'register.email.error',
    defaultMessage: 'Please enter a valid email',
    description: 'Please enter a valid email',
  },
});



const styles = theme => ({
});


class EmailForm extends React.Component {
  static propTypes = {
  }


  constructor(props) {
    super(props);
    this.state = {
      validData: false,
    }; 
  }



  handleTextChange(event) {
    const {value} = event.target;
    if(value === this.props.state.email) return;
    // Verify if email is valid (Next btn only if valid!)
    if(validateEmail(value) !== this.state.validData)
      this.setState((state) => { return {validData: !state.validData}; })
    // Save in parent
    this.props.handleChange({name: 'email', value});
  }

  handlePrevious = () => { this.props.handleChange({ name: 'email', value: "" }); this.props.previousStep(); };
  handleNext = () => { this.props.nextStep(); };

  render() {
    const {name} = this.props.state;
    if(this.props.isActive && name === "") {
      return <Redirect to='/' />
    }

    // State is NOT stored in this wizard tab, but in the parent (wizard component)
    const { state } = this.props;
    const {validData} = this.state;
    return (

      <div className={"flex-max-height flex-direction-column"}>

        <WizPageTitle message={messages.title} />

        <FormControl className={"flex-max-height flex-direction-column huge-margin-down"}>
          <InputLabel htmlFor="email" error={!validData}><FormattedMessage id="register.email.label" defaultMessage="Your Email" /></InputLabel>
          <Input
            id="email"
            value={state.email}
            onChange={this.handleTextChange.bind(this)}
            type="email"
            aria-describedby="email-text"
            fullWidth
          />
          <FormHelperText id="email-text" error={!validData}>{this.props.intl.formatMessage(validData ? messages.email : messages.emailError)}</FormHelperText>
        </FormControl>

        <WizNavBar onClickNext={this.handleNext.bind(this)} isNextDisabled={!validData} onClickPrevious={this.handlePrevious.bind(this)} />

      </div>

    );
  }
}


export default injectIntl(withStyles(styles)(EmailForm));