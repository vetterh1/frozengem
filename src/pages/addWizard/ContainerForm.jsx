import React from 'react';
import PropTypes from 'prop-types';
import { Context } from "../../data/ItemCharacteristicsStore";
import {WizNavBar, WizPageTitle} from "../utils/WizUtilComponents";
import SelectFromMatrix from "../utils/SelectFromMatrix";
import { defineMessages } from "react-intl";
// import { defineMessages } from 'react-intl.macro';

const messages = defineMessages({
  title: {
    id: 'add.container.title',
    defaultMessage: 'What container are you using?',
    description: 'What container are you using?',
  },
});


class ContainerForm extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
  }

  handleClick = (id) => {
    const { handleChange, currentStep, nextStep, goToStep } = this.props;
    let { colors } = this.context;

    // Update the wizard with the container id
    handleChange({ container: id });

    // Look if this chosen container supports colors
    const containerHasColors = colors.filter(color => color.parents.find(oneParent => oneParent === id)).length > 0;
    if(containerHasColors) {
      nextStep();
    }
    else {
      goToStep(currentStep + 2);
    }
  };

  handlePrevious = () => { this.props.handleChange({ container: undefined }); this.props.previousStep(); };



  render() {
    if(!this.props.isActive) return null;
    
    // Get the containers to display from the context
    // and the (possibly) already selected container from the props.state (state from parent)
    let { containers: items } = this.context;
    const { container: itemInState } = this.props.state;
    return (
      <div className={"flex-max-height flex-direction-column"}>
        <WizPageTitle message={messages.title} />
        <SelectFromMatrix name="container" defaultIconName={"containerDefault"} items={items} itemInState={itemInState} itemInStateIsAnArray={false} handleClick={this.handleClick} />
        <WizNavBar onClickNext={null} onClickPrevious={this.handlePrevious.bind(this)} />
      </div>

    )
  };
}
ContainerForm.contextType = Context;

export default ContainerForm;