import React from 'react';
import PropTypes from 'prop-types';
import { Context } from "../../data/ItemCharacteristicsStore";
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {ItemsList, WizNavBar} from "./WizUtilComponents";


class DetailsFormOld extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
  }

  handleTextChange(event) { this.props.handleChange({name:'name', value: event.target.value});  }
  handleClick = (id) => { this.props.handleArrayToggle({name:'details', value: id}); };
  handlePrevious = () => { this.props.handleChange({ name: 'details', value: [] }); this.props.previousStep(); };
  handleNext = () => { this.props.nextStep(); };


  render() {
    // State is NOT stored in this wizard tab, but in the parent (wizard component)
    const { state } = this.props;
    const parentId = state.category;
    // Get the categories to display from the context
    // and the (possibly) already selected category from the props.state (state from parent)
    let { details } = this.context;
    const { details: itemInState } = this.props.state;    
    const items = !details || !parentId ? [] : details.filter(detail => detail.parentIds.find(oneParentId => oneParentId === 'all' || oneParentId === parentId));
    return (
      <div className={"flex-max-height flex-direction-column"}>

        <div className={"flex-normal-height flex-direction-column margin-down"}>
          <Typography variant="h5">
            Details
          </Typography>
          <Typography>
            Enter a name and some details...
          </Typography>
        </div>

        <FormControl className={"flex-normal-height flex-direction-column big-margin-down"}>
          <InputLabel htmlFor="name">Name (optional)</InputLabel>
          <Input
            id="name"
            value={state.name}
            onChange={this.handleTextChange.bind(this)}
            aria-describedby="name-text"
            fullWidth
          />
          <FormHelperText id="name-text">To help you remember what it is</FormHelperText>
        </FormControl>

        <ItemsList items={items} itemInState={itemInState} itemInStateIsAnArray={true} handleClick={this.handleClick} />

        <WizNavBar onClickNext={this.handleNext.bind(this)} onClickPrevious={this.handlePrevious.bind(this)} />
        
      </div>

    )
  };
}
DetailsFormOld.contextType = Context;

export default DetailsFormOld;