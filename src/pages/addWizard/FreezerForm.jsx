import React from 'react';
import PropTypes from 'prop-types';
import { Context } from "../../data/ItemCharacteristicsStore";
import {WizNavBar, WizPageTitle} from "../utils/WizUtilComponents";
import SelectFromMatrix from "../utils/SelectFromMatrix";
import { defineMessages } from "react-intl";
// import { defineMessages } from 'react-intl.macro';

const messages = defineMessages({
  title: {
    id: 'add.freezer.title',
    defaultMessage: 'In which freezer are you storing it?',
    description: 'In which freezer are you storing it?',
  },
});
class FreezerForm extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
  }

  handleClick = (id) => {
    const { handleChange, nextStep } = this.props;
    handleChange({ freezer: id });
    nextStep();
  };

  handlePrevious = () => { this.props.handleChange({ freezer: undefined }); this.props.previousStep(); };


  render() {
    // Get the freezers to display from the context
    // and the (possibly) already selected freezer from the props.state (state from parent)
    let { freezers: items } = this.context;
    const { freezer: itemInState } = this.props.state;
    return (
      <div className={"flex-max-height flex-direction-column"}>
        <WizPageTitle message={messages.title} />
        <SelectFromMatrix name="freezer" items={items} itemInState={itemInState} itemInStateIsAnArray={false} handleClick={this.handleClick} />
        <WizNavBar onClickNext={null} onClickPrevious={this.handlePrevious.bind(this)} />
      </div>

    )
  };
}
FreezerForm.contextType = Context;

export default FreezerForm;