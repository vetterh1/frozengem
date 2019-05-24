import React from 'react';
import { Redirect } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { injectIntl } from "react-intl";
import { defineMessages } from 'react-intl.macro';
import { WizNavBar, WizPageTitle} from "../utils/WizUtilComponents";
import validateEmail from "../../utils/validateEmail";



const messages = defineMessages({
  title: {
    id: 'register.email.title',
    defaultMessage: 'Please enter your email',
    description: 'Please enter your email',
  },
  emailLabel: {
    id: 'register.email.label',
    defaultMessage: 'Your email',
    description: 'Your email',
  },
  email: {
    id: 'register.email.help',
    defaultMessage: 'This will be your login',
    description: 'This will be your login',
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
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrevious = this.handlePrevious.bind(this)
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
  
  handleNext = (e) => {
    //e.preventDefault should always be the first thing in the function
    e.preventDefault();

    this.props.nextStep(); 
  };

  render() {
    const {name} = this.props.state;
    if(this.props.isActive && name === "") {
      console.log(`EmailForm.render: name=${name} isActive=${this.props.isActive}`);
      return <Redirect to='/' />
    }

    // State is NOT stored in this wizard tab, but in the parent (wizard component)
    const { state } = this.props;
    const { email } = state;
    const {validData} = this.state;
    return (

      <div className={"flex-max-height flex-direction-column"}>

        <WizPageTitle message={messages.title} />

        <form onSubmit={this.handleNext} className={"flex-max-height flex-direction-column huge-margin-down"} noValidate>

          <div className={"flex-max-height flex-direction-column"}>

            <TextField
                id="email"
                autoComplete="email"
                autoFocus
                value={email}
                type="email"
                onChange={this.handleTextChange}
                label={this.props.intl.formatMessage(messages.emailLabel)}
                helperText={this.props.intl.formatMessage(validData ? messages.email : messages.emailError)}
                error={email !== "" && !validData}
                fullWidth
              />
      
          </div>

          <WizNavBar nextIsSubmit isNextDisabled={!validData} onClickPrevious={this.handlePrevious} />

        </form>

      </div>

    );
  }
}


export default injectIntl(withStyles(styles)(EmailForm));