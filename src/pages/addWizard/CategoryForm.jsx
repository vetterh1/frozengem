import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Context } from "../../data/ItemCharacteristicsStore";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ItemsList from "./ItemsList";



class CategoryForm extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
  }

  handleClick = (id) => {
    const { handleChange, nextStep } = this.props;
    handleChange({ name: 'category', value: id });
    nextStep();
  };

  handleNext = () => { this.props.nextStep(); };


  render() {
    // Get the categories to display from the context
    // and the (possibly) already selected category from the props.state (state from parent)
    let { categories: items } = this.context;
    const { category: itemInState } = this.props.state;
    return (
      <div className={"flex-max-height flex-direction-column"}>

        <div className={"flex-normal-height flex-direction-column"}>
          <Typography variant="h5">
            Category
          </Typography>
          <Typography>
            Select a category...
          </Typography>
        </div>

        <ItemsList items={items} itemInState={itemInState} itemInStateIsAnArray={false} handleClick={this.handleClick} />
       
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
CategoryForm.contextType = Context;

export default CategoryForm;