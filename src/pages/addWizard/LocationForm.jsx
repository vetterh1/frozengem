import React from 'react';
import PropTypes from 'prop-types';
import { Context } from "../../data/ItemCharacteristicsStore";
import {SelectFromList, WizNavBar, WizPageTitle} from "../utils/WizUtilComponents";
import { defineMessages } from "react-intl";
// import { defineMessages } from 'react-intl.macro';

const messages = defineMessages({
  title: {
    id: 'add.location.title',
    defaultMessage: 'Where exactly do you store it?',
    description: 'Where exactly do you store it?',
  },
});


class LocationForm extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
  }

  handleClick = (id) => {
    const { handleChange, nextStep } = this.props;
    handleChange({ location: id });
    nextStep();
  };

  handlePrevious = () => { this.props.handleChange({ location: undefined }); this.props.previousStep(); };


  render() {
    // Get the locations to display from the context
    // and the (possibly) already selected location from the props.state (state from parent)
    let { locations: items } = this.context;
    const { location: itemInState } = this.props.state;
    return (
      <div className={"flex-max-height flex-direction-column"}>
        <WizPageTitle message={messages.title} />
        <SelectFromList items={items} itemInState={itemInState} itemInStateIsAnArray={false} handleClick={this.handleClick} />
        <WizNavBar onClickNext={null} onClickPrevious={this.handlePrevious.bind(this)} />
      </div>

    )
  };
}
LocationForm.contextType = Context;

export default LocationForm;