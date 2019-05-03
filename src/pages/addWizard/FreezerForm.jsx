import React from 'react';
import PropTypes from 'prop-types';
import { Context } from "../../data/ItemCharacteristicsStore";
import Typography from '@material-ui/core/Typography';
import {ItemsList, WizNavBar} from "./WizUtilComponents";



class FreezerForm extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
  }

  handleClick = (id) => {
    const { handleChange, nextStep } = this.props;
    handleChange({ name: 'freezer', value: id });
    nextStep();
  };

  handlePrevious = () => { this.props.handleChange({ name: 'freezer', value: undefined }); this.props.previousStep(); };


  render() {
    // Get the freezers to display from the context
    // and the (possibly) already selected freezer from the props.state (state from parent)
    let { freezers: items } = this.context;
    const { freezer: itemInState } = this.props.state;
    return (
      <div className={"flex-max-height flex-direction-column"}>

        <div className={"flex-normal-height flex-direction-column margin-down"}>
          <Typography variant="h6">
            In which freezer are you storing it?
          </Typography>
        </div>

        <ItemsList items={items} itemInState={itemInState} itemInStateIsAnArray={false} handleClick={this.handleClick} />

        <WizNavBar onClickNext={null} onClickPrevious={this.handlePrevious.bind(this)} />

      </div>

    )
  };
}
FreezerForm.contextType = Context;

export default FreezerForm;