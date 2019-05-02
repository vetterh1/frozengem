import React from 'react';
import PropTypes from 'prop-types';
import { Context } from "../../data/ItemCharacteristicsStore";
import Typography from '@material-ui/core/Typography';
import {ItemsList, PreviousButton} from "./WizUtilComponents";



class ContainerForm extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
  }

  handleClick = (id) => {
    const { handleChange, currentStep, nextStep, goToStep } = this.props;
    let { colors } = this.context;

    // Update the wizard with the container id
    handleChange({ name: 'container', value: id });

    // Look if this chosen container supports colors
    const containerHasColors = colors.filter(color => color.parentIds.find(oneParentId => oneParentId === id)).length > 0;
    if(containerHasColors) {
      nextStep();
    }
    else {
      goToStep(currentStep + 2);
    }
  };

  handlePrevious = () => { this.props.handleChange({ name: 'container', value: undefined }); this.props.previousStep(); };



  render() {
    // Get the containers to display from the context
    // and the (possibly) already selected container from the props.state (state from parent)
    let { containers: items } = this.context;
    const { container: itemInState } = this.props.state;
    return (
      <div className={"flex-max-height flex-direction-column"}>

        <div className={"flex-normal-height flex-direction-column margin-down"}>
          <Typography variant="h5">
            Container
          </Typography>
          <Typography>
            Select a container...
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
ContainerForm.contextType = Context;

export default ContainerForm;