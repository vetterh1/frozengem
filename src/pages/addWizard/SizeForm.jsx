import React from 'react';
import PropTypes from 'prop-types';
import { Context } from "../../data/ItemCharacteristicsStore";
import Typography from '@material-ui/core/Typography';
import {ItemsList, PreviousButton} from "./WizUtilComponents";



class SizeForm extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
  }

  handleClick = (id) => {
    const { handleChange, nextStep } = this.props;
    handleChange({ name: 'size', value: id });
    nextStep();
  };

  handlePrevious = () => {
    // Clear current value when return to previous page
    this.props.handleChange({ name: 'size', value: undefined }); 

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

        <div className={"flex-normal-height flex-direction-column margin-down"}>
          <Typography variant="h5">
            Size
          </Typography>
          <Typography>
            Select a size...
          </Typography>
        </div>

        <ItemsList items={items} itemInState={itemInState} itemInStateIsAnArray={false} handleClick={this.handleClick} />

        <div className={"flex-normal-height flex-right"}>
          <PreviousButton onClick={this.handlePrevious.bind(this)}/>
        </div>
      </div>

    )
  };
}
SizeForm.contextType = Context;

export default SizeForm;