import React from 'react';
import PropTypes from 'prop-types';
import { Context } from "../../data/ItemCharacteristicsStore";
import {ItemsList, WizPageTitle} from "../utils/WizUtilComponents";
import { defineMessages } from "react-intl";
// import { defineMessages } from 'react-intl.macro';

const messages = defineMessages({
  title: {
    id: 'add.category.title',
    defaultMessage: 'What are you storing?',
    description: 'What are you storing?',
  },
});

class CategoryForm extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
  }

  handleClick = (id) => {
    const { handleChange, nextStep } = this.props;
    handleChange({ category: id });
    nextStep();
  };


  render() {
    // Get the categories to display from the context
    // and the (possibly) already selected category from the props.state (state from parent)
    let { categories: items } = this.context;
    const { category: itemInState } = this.props.state;
    return (
      <div className={"flex-max-height flex-direction-column"}>
        <WizPageTitle message={messages.title} />
        <ItemsList items={items} itemInState={itemInState} itemInStateIsAnArray={false} handleClick={this.handleClick} />
      </div>

    )
  };
}
CategoryForm.contextType = Context;

export default CategoryForm;