import React from 'react';
import PropTypes from 'prop-types';
import { Context } from "../../data/ItemCharacteristicsStore";
import Typography from '@material-ui/core/Typography';
import {ItemsList, WizNavBar} from "./WizUtilComponents";


class DetailsForm extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
  }

  handleClick = (id) => { this.props.handleArrayToggle({name:'details', value: id}); };
  handlePrevious = () => { this.props.handleChange({ name: 'details', value: [] }); this.props.previousStep(); };
  handleNext = () => { this.props.nextStep(); };


  render() {
    // State is NOT stored in this wizard tab, but in the parent (wizard component)
    const { state } = this.props;
    const parentId = state.category;
    // Get the details & categories to display from the context
    // and the (possibly) already selected category from the props.state (state from parent)
    let { details, categories } = this.context;
    const { details: itemInState } = this.props.state;    
    const items = !details || !parentId ? [] : details.filter(detail => detail.parentIds.find(oneParentId => oneParentId === 'all' || oneParentId === parentId));
    const parentName = !categories || !parentId  ? "item" : categories.find(category => category.id === parentId).name;
    return (
      <div className={"flex-max-height flex-direction-column"}>

        <div className={"flex-normal-height flex-direction-column margin-down"}>
          <Typography variant="h6">
            Tell us a little bit more about your {parentName.toLowerCase()}...
          </Typography>
        </div>

        <ItemsList items={items} itemInState={itemInState} itemInStateIsAnArray={true} handleClick={this.handleClick} />

        <WizNavBar onClickNext={this.handleNext.bind(this)} onClickPrevious={this.handlePrevious.bind(this)} />

      </div>

    )
  };
}
DetailsForm.contextType = Context;

export default DetailsForm;