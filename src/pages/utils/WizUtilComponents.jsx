import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl.macro';
import { injectIntl } from "react-intl";


export const ItemsList = ({ items, itemInState, itemInStateIsAnArray, handleClick }) => (
  <List className={"flex-max-height flex-direction-column big-margin-down"}>
  {items && items.map((item, index, theArray) => (
    <React.Fragment key={`frag-${item.id2}`}>
      <ListItem 
        button 
        onClick={handleClick.bind(this, item.id2)} 
        selected={itemInStateIsAnArray ? itemInState.find(detail => detail === item.id2) !== undefined : itemInState === item.id2} 
        key={item.id2}
      >
        {/* <ListItemAvatar> <Avatar> {item.id2} </Avatar> </ListItemAvatar> */}
        <ListItemText primary={item.name} secondary={item.label} />
      </ListItem>
      {index < theArray.length-1 && <Divider />}
    </React.Fragment>
  ))}
  </List>
);


const WizPageTitleInt = ({message, values, intl}) => (
  <div className={"flex-normal-height flex-direction-column margin-down"}>
    <Typography variant="h6">
      {intl.formatMessage(message, values)}
    </Typography>
  </div>
);
export const WizPageTitle = injectIntl(WizPageTitleInt);




export const CancelButton = () => (
  <Button color="primary" component={Link} to="/">
    <FormattedMessage id="button.cancel" defaultMessage="Cancel" />
  </Button>
);

export const PreviousButton = ({onClick}) => (
  <Button color="primary" onClick={onClick}>
    <FormattedMessage id="button.back" defaultMessage="Back" />
  </Button>
);

export const NextButton = ({onClick, isDisabled}) => (
  <Button variant="contained" color="primary" onClick={onClick} disabled={isDisabled} type="submit">
    <FormattedMessage id="button.continue" defaultMessage="Continue" />
  </Button>
);

export const WizNavBar = ({onClickPrevious, onClickNext, isNextDisabled, nextIsSubmit}) => (
  <div className={"flex-normal-height flex-direction-row flex-justifiy-between margin-down"}>
    {onClickPrevious && <PreviousButton onClick={onClickPrevious}/>}
    {(onClickNext && !nextIsSubmit) && <NextButton onClick={onClickNext} isDisabled={isNextDisabled}/>}
    {(!onClickNext && nextIsSubmit) && <NextButton isDisabled={isNextDisabled}/>}
  </div>
);

