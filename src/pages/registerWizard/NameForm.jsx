import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { TextField } from '@material-ui/core';
import { injectIntl } from "react-intl";
import { defineMessages } from 'react-intl.macro';
import { WizNavBar, WizPageTitle} from "../utils/WizUtilComponents";



const messages = defineMessages({
  title: {
    id: 'register.name.title',
    defaultMessage: 'Please enter your name',
    description: 'Please enter your name',
  },
  nameLabel: {
    id: 'register.name.label',
    defaultMessage: 'Your name',
    description: 'Your name',
  },
  name: {
    id: 'register.name.help',
    defaultMessage: 'Minimum {min} characters',
    description: 'Minimum 4 characters',
  },
});



const styles = theme => ({
});


class NameForm extends React.Component {
  static propTypes = {
  }


  constructor(props) {
    super(props);
    this.state = {
    };
    this.minLength = 4;
    this.handleTextChange = this.handleTextChange.bind(this)
  }


  handleTextChange(event) {
    this.props.handleChange({name: 'name', value: event.target.value});
    const {value} = event.target;
    const {name} = this.props.state;
    const {longEnough} = this.state;
    if(value === name) return;
    // check if length is enough
    const newLengthTest = value.length >= this.minLength;
    if(longEnough !== newLengthTest)
      this.setState({longEnough: newLengthTest});
  }

  handlePrevious = () => { this.props.handleChange({ name: 'name', value: "" }); this.props.previousStep(); };
  handleNext = () => { this.props.nextStep(); };

  render() {
    // State is NOT stored in this wizard tab, but in the parent (wizard component)
    const { state, classes } = this.props;
    const { name } = state;
    const { longEnough } = this.state;
    
    return (

      <div className={"flex-max-height flex-direction-column"}>

        <WizPageTitle message={messages.title} />

        <FormControl className={"flex-max-height flex-direction-column huge-margin-down"}>

          <TextField
            id="name"
            value={name}
            onChange={this.handleTextChange}
            label={this.props.intl.formatMessage(messages.nameLabel)}
            helperText={this.props.intl.formatMessage(messages.name, {min: this.minLength})}
            error={name !== "" && !longEnough}
            fullWidth
            className={classes.inputs}
          />

        </FormControl>

        <WizNavBar onClickNext={this.handleNext.bind(this)} isNextDisabled={!longEnough} onClickPrevious={this.handlePrevious.bind(this)} />

      </div>

    );
  }
}


export default injectIntl(withStyles(styles)(NameForm));