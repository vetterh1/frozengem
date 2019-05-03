import React from 'react';
import PropTypes from 'prop-types';
import { Context } from "../../data/ItemCharacteristicsStore";
import Typography from '@material-ui/core/Typography';
import {ItemsList} from "./WizUtilComponents";



class CategoryForm extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
  }

  handleClick = (id) => {
    const { handleChange, nextStep } = this.props;
    handleChange({ name: 'category', value: id });
    nextStep();
  };


  render() {
    // Get the categories to display from the context
    // and the (possibly) already selected category from the props.state (state from parent)
    let { categories: items } = this.context;
    const { category: itemInState } = this.props.state;
    return (
      <div className={"this-is-a-step flex-max-height flex-direction-column"}>

        <div className={"flex-normal-height flex-direction-column margin-down"}>
          <Typography variant="h6">
            What are you storing?
          </Typography>
        </div>

        <ItemsList items={items} itemInState={itemInState} itemInStateIsAnArray={false} handleClick={this.handleClick} />

      </div>

    )
  };
}
CategoryForm.contextType = Context;

export default CategoryForm;