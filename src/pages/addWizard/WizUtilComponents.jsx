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


export const ItemsList = ({ items, itemInState, itemInStateIsAnArray, handleClick }) => (
  <List className={"flex-max-height flex-direction-column big-margin-down"}>
  {items && items.map((item, index, theArray) => (
    <React.Fragment key={`frag-${item.id}`}>
      <ListItem 
        button 
        onClick={handleClick.bind(this, item.id)} 
        selected={itemInStateIsAnArray ? itemInState.find(detail => detail === item.id) !== undefined : itemInState === item.id} 
        key={item.id}
      >
        {/* <ListItemAvatar> <Avatar> {item.id} </Avatar> </ListItemAvatar> */}
        <ListItemText primary={item.name} secondary={item.label} />
      </ListItem>
      {index < theArray.length-1 && <Divider />}
    </React.Fragment>
  ))}
  </List>
);




export const WizPageTitle = ({id, defaultMessage, variable1}) => (
  <div className={"flex-normal-height flex-direction-column margin-down"}>
    <Typography variant="h6">
      <FormattedMessage
        id={id}
        defaultMessage={defaultMessage}
        values={{variable1}}
      />    
    </Typography>
  </div>
);




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

export const NextButton = ({onClick}) => (
  <Button variant="contained" color="primary" onClick={onClick}>
    <FormattedMessage id="button.continue" defaultMessage="Continue" />
  </Button>
);

export const WizNavBar = ({onClickPrevious, onClickNext}) => (
  <div className={"flex-normal-height flex-direction-row flex-justifiy-between"}>
    {onClickPrevious && <PreviousButton onClick={onClickPrevious}/>}
    {onClickNext && <NextButton onClick={onClickNext}/>}
  </div>
);
