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
    id: 'register.name.title',
    defaultMessage: 'Please enter your name',
    description: 'Please enter your name',
  },
  name: {
    id: 'register.name.help',
    defaultMessage: 'To know who stored what',
    description: 'To know who stored what',
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


class NameForm extends React.Component {
  static propTypes = {
  }


  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleTextChange(event) { this.props.handleChange({name: 'name', value: event.target.value});  }
  handlePrevious = () => { this.props.handleChange({ name: 'name', value: "" }); this.props.previousStep(); };
  handleNext = () => { this.props.nextStep(); };

  render() {
    // State is NOT stored in this wizard tab, but in the parent (wizard component)
    const { state } = this.props;
    return (

      <div className={"flex-max-height flex-direction-column"}>

        <WizPageTitle message={messages.title} />

        <FormControl className={"flex-normal-height flex-direction-column huge-margin-down"}>
          <InputLabel htmlFor="name"><FormattedMessage id="register.name.label" defaultMessage="Your Name" /></InputLabel>
          <Input
            id="name"
            value={state.name}
            onChange={this.handleTextChange.bind(this)}
            aria-describedby="name-text"
            fullWidth
          />
          <FormHelperText id="name-text">{this.props.intl.formatMessage(messages.name)}</FormHelperText>
        </FormControl>

        <WizNavBar onClickNext={this.handleNext.bind(this)} onClickPrevious={this.handlePrevious.bind(this)} />

      </div>

    );
  }
}


export default injectIntl(withStyles(styles)(NameForm));