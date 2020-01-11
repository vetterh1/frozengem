import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from "react-intl";


const intSelectFromList = ({ items, itemInState, multiselection, handleClick, language }) => (
  <List className={"flex-normal-height flex-direction-column big-margin-down"}>
  {items && items.map((item, index, theArray) => {
    const name = item.name[language]
    const label = item.label[language]
    return <React.Fragment key={`frag-${item.id2}`}>
      <ListItem 
        button 
        onClick={handleClick.bind(this, item.id2)} 
        selected={multiselection ? itemInState.find(detail => detail === item.id2) !== undefined : itemInState === item.id2} 
        key={item.id2}
      >
        <ListItemText 
          primary={name}
          secondary={label} />
      </ListItem>
      {index < theArray.length-1 && <Divider />}
    </React.Fragment>
  })}
  </List>
);
const mapStateToProps = (state) => {return { language: state.user.language }};
export const SelectFromList = connect(mapStateToProps, null)(intSelectFromList);






export const WizPageTitle = ({message}) => (
  <div className={"flex-normal-height flex-direction-column margin-down"}>
    <Typography variant="h6">
      {message}
    </Typography>
  </div>
);



export const CancelButton = () => (
  <Button color="primary" component={Link} to="/">
    <FormattedMessage id="button.cancel" />
  </Button>
);

export const PreviousButton = ({onClick}) => (
  <Button color="primary" onClick={onClick}>
    <FormattedMessage id="button.back" />
  </Button>
);

export const NextButton = ({onClick, isDisabled}) => (
  <Button variant="contained" color="primary" onClick={onClick} disabled={isDisabled} type="submit">
    <FormattedMessage id="button.continue" />
  </Button>
);

export const WizNavBar = ({onClickPrevious, onClickNext, isBackDisabled = false, isNextDisabled, nextIsSubmit}) => (
  <div className={"flex-normal-height flex-direction-row flex-justifiy-between big-margin-down big-margin-top"}>
    {(onClickPrevious && !isBackDisabled) && <PreviousButton onClick={onClickPrevious}/>}
    {!(onClickPrevious && !isBackDisabled) && <span>&nbsp;</span>}
    {(onClickNext && !nextIsSubmit) && <NextButton onClick={onClickNext} isDisabled={isNextDisabled}/>}
    {(!onClickNext && nextIsSubmit) && <NextButton isDisabled={isNextDisabled}/>}
  </div>
);

