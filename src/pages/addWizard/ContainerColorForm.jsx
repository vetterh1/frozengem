import React from 'react';
import PropTypes from 'prop-types';
import { Context } from "../../data/ItemCharacteristicsStore";
import Typography from '@material-ui/core/Typography';
import {ItemsList, WizNavBar} from "./WizUtilComponents";



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
    let { colors, containers } = this.context;
    const { color: itemInState } = this.props.state;    
    const items = !colors || !parentId ? [] : colors.filter(color => color.parentIds.find(oneParentId => oneParentId === parentId));
    const parentName = !containers || !parentId  ? "item" : containers.find(container => container.id === parentId).name;
    return (
      <div className={"flex-max-height flex-direction-column"}>

        <div className={"flex-normal-height flex-direction-column margin-down"}>
          <Typography variant="h6">
            What color is your {parentName.toLowerCase()}?
          </Typography>
        </div>

        <ItemsList items={items} itemInState={itemInState} itemInStateIsAnArray={false} handleClick={this.handleClick} />

        <WizNavBar onClickNext={null} onClickPrevious={this.handlePrevious.bind(this)} />

      </div>

    )
  };
}
ContainerColorForm.contextType = Context;

export default ContainerColorForm;