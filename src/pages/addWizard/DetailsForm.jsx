import React from 'react';
import PropTypes from 'prop-types';
import { Context } from "../../data/ItemCharacteristicsStore";
import {WizNavBar, WizPageTitle} from "../utils/WizUtilComponents";
import SelectFromMatrix from "../utils/SelectFromMatrix";
import { defineMessages } from "react-intl";
// import { defineMessages } from 'react-intl.macro';
import stringifyOnce from '../../utils/stringifyOnce.js'

const messages = defineMessages({
  title: {
    id: 'add.details.title',
    defaultMessage: 'Tell us a little bit more about your {category}...',
    description: 'Tell us a little bit more about your...',
  },
});

class DetailsForm extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
  }

  handleClick = (id) => { this.props.handleArrayToggle({name:'details', value: id}); };
  handlePrevious = () => { this.props.handleChange({ details: [] }); this.props.previousStep(); };
  handleNext = () => { this.props.nextStep(); };


  componentWillUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(([key, val]) =>
      prevProps[key] !== val && console.log(`Prop '${key}' changed from ${stringifyOnce(prevProps[key])} to ${stringifyOnce(val)}`)
    );
    // Object.entries(this.state).forEach(([key, val]) =>
    //   prevState[key] !== val && console.log(`State '${key}' changed`)
    // );
  }



  render() {
    if(!this.props.isActive || this.props.isActive === false  ) {console.log("DetailsForm no render 1 "); return null;}
    if(!this.props.currentStep || this.props.currentStep !== 2 ) {console.log("DetailsForm no render 2 "); return null;}
    
    console.log("DetailsForm render ", this.props.isActive, this.props.currentStep)

    // State is NOT stored in this wizard tab, but in the parent (wizard component)
    const { state, language } = this.props;
    const parentId = state.category;
    // Get the details & categories to display from the context
    // and the (possibly) already selected category from the props.state (state from parent)
    let { details, categories } = this.context;
    const { details: itemInState } = this.props.state;    
    const items = !details || !parentId ? [] : details.filter(detail => detail.parents.find(oneParent => oneParent === 'all' || oneParent === parentId));
    const parentName = !categories || !parentId  ? "item" : categories.find(category => category.id2 === parentId).name[language];
    return (
      <div className={"flex-normal-height flex-direction-column"}>
        <WizPageTitle message={messages.title} values={{category: parentName.toLowerCase()}} />
        <SelectFromMatrix name="details" defaultIconName={"category"+parentId} items={items} itemInState={itemInState} itemInStateIsAnArray={true} handleClick={this.handleClick} />
        <WizNavBar onClickNext={this.handleNext.bind(this)} onClickPrevious={this.handlePrevious.bind(this)} />
      </div>
    )
  };
}
DetailsForm.contextType = Context;

export default DetailsForm;