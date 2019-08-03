import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { injectIntl, defineMessages, FormattedMessage } from "react-intl";
// import { defineMessages, FormattedMessage } from 'react-intl.macro';
import { DatePicker } from "@material-ui/pickers";
import PictureSelection from '../utils/PictureSelection';


const messages = defineMessages({
  name: {
    id: 'add.results.name.help',
    defaultMessage: 'To help you remember what it is',
    description: 'To help you remember what it is',
  },
  date: {
    id: 'add.results.date.label',
    defaultMessage: 'Change expiration date (optional)',
    description: 'Change expiration date (optional)',
  },
  cameraAdd: {
    id: 'camera.add',
    defaultMessage: 'Add picture',
  },
});



const styles = theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    textAlign: 'center',
    // marginLeft: theme.spacing(2),
  },  
});


class Results extends React.Component {
  static propTypes = {
    isActive: PropTypes.bool,
  }


  defaultState = {
    dirty: false,
  };

  resetState = () => {
    this.setState({...this.defaultState});
  }

  constructor(props) {
    super(props);
    this.state = {...this.defaultState, name: "", date: null};

  }





  handleAddNew() { this.props.resetState(); this.props.firstStep();}
  
  handleNameChange(event) {
    // Update the parent (as this is the value used in this render)
    // but does not save on server yet
    this.props.handleChange({name: event.target.value}, false);  
    // Raise the dirty flag so we propose an "Update" button
    this.setState({name: event.target.value, dirty: true});
  }

  handleDateChange(expirationDate) {
    // Update the parent (as this is the value used in this render)
    // but does not save on server yet
    this.props.handleChange({expirationDate}, false);  
    // Raise the dirty flag so we propose an "Update" button
    this.setState({expirationDate, dirty: true});
  }




  handleUpdates () {
    const updates = {};
    if(this.state.name) updates.name = this.state.name;
    if(this.state.expirationDate) updates.expirationDate = this.state.expirationDate;
    this.props.handleChange(updates, true); 
    this.resetState();
  }


  handleAddPicture () {
    this.props.handleAddPicture();
  }


  componentDidMount() {
    console.log('Results.componentDidMount');
  }


  render() {
    if(!this.props.isActive) return null;
    
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6, 1);


    // State is NOT stored in this wizard tab, but in the parent (wizard component)
    const { classes, state, intl } = this.props;

    return (
      <div className={"flex-max-height flex-direction-column"}>

        <div className={"flex-normal-height flex-direction-column"}>
          <div className={"flex-normal-height flex-direction-column margin-down margin-top"}>
            <Typography variant="h4" className={"margin-down"}>
              {state.code}
            </Typography>
            <Typography variant="subtitle1">
              <ul>
                <li><FormattedMessage id="add.results.explanation1" defaultMessage="Write down this code on a sticker" /></li>
                <li><FormattedMessage id="add.results.explanation2" defaultMessage="Stick it to your container" /></li>
              </ul>
              <FormattedMessage id="add.results.explanation3" defaultMessage="We'll send you a reminder in {expirationInMonth} months" values={{expirationInMonth: state.expirationInMonth}} />
            </Typography>
          </div>

          <FormControl className={"flex-normal-height flex-direction-column huge-margin-down"}>
            <InputLabel htmlFor="name"><FormattedMessage id="add.results.name.label" defaultMessage="Name (optional)" /></InputLabel>
            <Input
              id="name"
              value={state.name}
              onChange={this.handleNameChange.bind(this)}
              aria-describedby="name-text"
              fullWidth
            />
            <FormHelperText id="name-text">{this.props.intl.formatMessage(messages.name)}</FormHelperText>
          </FormControl>

          <div className={"flex-normal-height flex-direction-column huge-margin-down"}>
            <DatePicker
              views={["year", "month"]}
              value={state.expirationDate}
              onChange={this.handleDateChange.bind(this)}
              label={this.props.intl.formatMessage(messages.date)}
              minDate={sixMonthsAgo}
              autoOk
              clearable
            />
          </div>

          { this.state.dirty && 
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={this.handleUpdates.bind(this)} 
              className={clsx(classes.layout, 'huge-margin-down')}
            >
              <FormattedMessage id="action.update" defaultMessage="Update" />
            </Button> 
          }

          <PictureSelection 
            onPicture={this.props.handleAddPicture.bind(this)}
            label={intl.formatMessage(messages.cameraAdd)}
          />

        </div>

        <div className={"flex-normal-height flex-direction-row flex-justifiy-between margin-down huge-margin-top"}>
          <Button variant="contained" color="secondary" onClick={this.handleAddNew.bind(this)} className={classes.button}>
            <FormattedMessage id="button.addnew" defaultMessage="Add a new item" />
          </Button> 
          <Button variant="contained" color="primary" component={Link} to="/" className={classes.button}>
            <FormattedMessage id="button.backhome" defaultMessage="Back Home" />
          </Button>   
        </div>

      </div>

    );
  }
}


export default injectIntl(withStyles(styles)(Results));