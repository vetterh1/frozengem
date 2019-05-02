import React from 'react';
import PropTypes from 'prop-types';
import { Context } from "../../data/ItemCharacteristicsStore";
import Typography from '@material-ui/core/Typography';
import {ItemsList, PreviousButton} from "./WizUtilComponents";



class ContainerColorForm extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
  }

  handleClick = (id) => {
    const { handleChange, nextStep } = this.props;
    handleChange({ name: 'color', value: id });
    nextStep();
  };

  handlePrevious = () => { this.props.handleChange({ name: 'color', value: undefined }); this.props.previousStep(); };


  render() {
    // State is NOT stored in this wizard tab, but in the parent (wizard component)
    const { state } = this.props;
    const parentId = state.container;
    // Get the colors to display from the context
    // and the (possibly) already selected color from the props.state (state from parent)
    let { colors } = this.context;
    const { colors: itemInState } = this.props.state;    
    const items = !colors || !parentId ? [] : colors.filter(color => color.parentIds.find(oneParentId => oneParentId === parentId));
    return (
      <div className={"flex-max-height flex-direction-column"}>

        <div className={"flex-normal-height flex-direction-column margin-down"}>
          <Typography variant="h5">
            Color
          </Typography>
          <Typography>
            Select a color...
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
ContainerColorForm.contextType = Context;

export default ContainerColorForm;