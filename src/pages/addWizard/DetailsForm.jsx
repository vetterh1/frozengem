import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Context } from "../../data/ItemCharacteristicsStore";
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import ItemsList from "./ItemsList";


class DetailsForm extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
  }

  handleTextChange(event) { this.props.handleChange({name:'name', value: event.target.value});  }
  handleClick = (id) => { this.props.handleArrayToggle({name:'details', value: id}); };
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

        <div className={"flex-normal-height flex-direction-column"}>
          <Typography variant="h5">
            Details
          </Typography>
          <Typography>
            Select a category...
          </Typography>
        </div>

        <FormControl className={"flex-normal-height flex-direction-column"}>
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

        <div className={"flex-normal-height flex-right"}>
          <Typography variant="h5" >
            <Button color="primary" component={Link} to="/">
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={this.handleNext.bind(this)} className={"margin-left"}>
              Continue
            </Button>
          </Typography>
        </div>
      </div>

    )
  };
}
DetailsForm.contextType = Context;

export default DetailsForm;