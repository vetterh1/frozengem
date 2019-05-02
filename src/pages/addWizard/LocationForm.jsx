import React from 'react';
import PropTypes from 'prop-types';
import { Context } from "../../data/ItemCharacteristicsStore";
import Typography from '@material-ui/core/Typography';
import {ItemsList, PreviousButton} from "./WizUtilComponents";



class LocationForm extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
  }

  handleClick = (id) => {
    const { handleChange, nextStep } = this.props;
    handleChange({ name: 'location', value: id });
    nextStep();
  };

  handlePrevious = () => { this.props.handleChange({ name: 'location', value: undefined }); this.props.previousStep(); };


  render() {
    // Get the locations to display from the context
    // and the (possibly) already selected location from the props.state (state from parent)
    let { locations: items } = this.context;
    const { location: itemInState } = this.props.state;
    return (
      <div className={"flex-max-height flex-direction-column"}>

        <div className={"flex-normal-height flex-direction-column margin-down"}>
          <Typography variant="h5">
            Location
          </Typography>
          <Typography>
            Select a location...
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
LocationForm.contextType = Context;

export default LocationForm;