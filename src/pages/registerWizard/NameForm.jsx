import React from 'react';
import { TextField } from '@material-ui/core';
import { injectIntl } from "react-intl";
// import { defineMessages } from 'react-intl.macro';
import { WizNavBar, WizPageTitle} from "../utils/WizUtilComponents";


class NameForm extends React.Component {
  static propTypes = {
  }


  constructor(props) {
    super(props);
    this.state = {
    };
    this.minLength = 4;
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleNext = this.handleNext.bind(this)
  }


  handleTextChange(event) {
    if(!this.props.isActive) return;
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

  handleNext = (e) => {
    //e.preventDefault should always be the first thing in the function
    e.preventDefault();

    this.props.nextStep(); 
  };

  render() {
    // State is NOT stored in this wizard tab, but in the parent (wizard component)
    const { state, classes } = this.props;
    const { name } = state;
    const { longEnough } = this.state;
    
    return (

      <div className={"flex-normal-height flex-direction-column"}>

        <WizPageTitle message={this.props.intl.formatMessage({id: 'register.name.title'})} />

        <form onSubmit={this.handleNext} className={"flex-normal-height flex-direction-column"} noValidate>

          <div className={"flex-normal-height flex-direction-column"}>

            <TextField
              id="name"
              autoComplete="username"
              autoFocus
              value={name}
              onChange={this.handleTextChange}
              label={this.props.intl.formatMessage({id: 'register.name.label'})}
              helperText={this.props.intl.formatMessage({id: 'register.name.help'}, {min: this.minLength})}
              error={name !== "" && !longEnough}
              fullWidth
              className={classes.inputs}
            />
     
          </div>

          <WizNavBar nextIsSubmit isNextDisabled={!longEnough} />
        </form>

      </div>

    );
  }
}


export default injectIntl(NameForm);