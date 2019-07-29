import React from 'react';
import PropTypes from 'prop-types';
import { Context } from "../../data/ItemCharacteristicsStore";
import {SelectFromList, WizNavBar, WizPageTitle} from "../utils/WizUtilComponents";
import { defineMessages } from "react-intl";
// import { defineMessages } from 'react-intl.macro';

const messages = defineMessages({
  title: {
    id: 'add.size.title',
    defaultMessage: 'How much quantity are you storing?',
    description: 'How much quantity are you storing?',
  },
});


class SizeForm extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
  }

  handleClick = (id) => {
    const { handleChange, nextStep } = this.props;
    handleChange({ size: id });
    nextStep();
  };

  handlePrevious = () => {
    // Clear current value when return to previous page
    this.props.handleChange({ size: undefined }); 

    const { state, currentStep, goToStep, previousStep } = this.props;

    console.log(state.color);
    if(state.color)
      previousStep(); 
    else
      goToStep(currentStep-2);
  };


  render() {
    // Get the sizes to display from the context
    // and the (possibly) already selected size from the props.state (state from parent)
    let { sizes: items } = this.context;
    const { size: itemInState } = this.props.state;
    return (
      <div className={"flex-max-height flex-direction-column"}>
        <WizPageTitle message={messages.title} />
        <SelectFromList items={items} itemInState={itemInState} itemInStateIsAnArray={false} handleClick={this.handleClick} />
        <WizNavBar onClickNext={null} onClickPrevious={this.handlePrevious.bind(this)} />
      </div>

    )
  };
}
SizeForm.contextType = Context;

export default SizeForm;