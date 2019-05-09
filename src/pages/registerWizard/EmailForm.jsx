import React from 'react';
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
    id: 'register.email.title',
    defaultMessage: 'Please enter your email',
    description: 'Please enter your email',
  },
  email: {
    id: 'register.email.help',
    defaultMessage: 'To identify yourself',
    description: 'To identify yourself',
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


class EmailForm extends React.Component {
  static propTypes = {
  }


  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleTextChange(event) { this.props.handleChange({name: 'email', value: event.target.value});  }
  handlePrevious = () => { this.props.handleChange({ name: 'email', value: "" }); this.props.previousStep(); };
  handleNext = () => { this.props.nextStep(); };

  render() {
    // State is NOT stored in this wizard tab, but in the parent (wizard component)
    const { state } = this.props;
    return (

      <div className={"flex-max-height flex-direction-column"}>

        <WizPageTitle message={messages.title} />

        <FormControl className={"flex-normal-height flex-direction-column huge-margin-down"}>
          <InputLabel htmlFor="email"><FormattedMessage id="register.email.label" defaultMessage="Your Email" /></InputLabel>
          <Input
            id="email"
            value={state.email}
            onChange={this.handleTextChange.bind(this)}
            aria-describedby="email-text"
            fullWidth
          />
          <FormHelperText id="email-text">{this.props.intl.formatMessage(messages.email)}</FormHelperText>
        </FormControl>

        <WizNavBar onClickNext={this.handleNext.bind(this)} onClickPrevious={this.handlePrevious.bind(this)} />

      </div>

    );
  }
}


export default injectIntl(withStyles(styles)(EmailForm));