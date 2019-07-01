import React from 'react';
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
});



const styles = theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    textAlign: 'center',
    marginLeft: theme.spacing(2),
  },  
  divWizard: {
    marginTop: theme.spacing(2),
  },
  iconButton: {
    padding: 10,
  },
});


class Results extends React.Component {
  static propTypes = {
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
  
  handleTextChange(event) {
    console.log('Results.handleTextChange: ', event.target.value);
    this.setState({name: event.target.value, dirty: true});
  }

  handleDateChange(expirationDate) {
    console.log('Results.handleexpirationDateChange: ', expirationDate);
    this.setState({expirationDate, dirty: true});
  }

  
  handleSaveName() {
    console.log('Results.handleSaveName: ', this.state.name);
    this.props.handleChange({name: this.state.name}, true);  
    this.resetState();
  }

  handleSaveDate() {
    console.log('Results.handleSaveDate: ', this.state.expirationDate);
    this.props.handleChange({expirationDate: this.state.expirationDate}, true);  
    this.resetState();
  }

  handleUpdates () {
    const updates = {};
    if(this.state.name) updates.name = this.state.name;
    if(this.state.expirationDate) updates.expirationDate = this.state.expirationDate;
    this.props.handleChange(updates, true); 
    this.resetState();
  }


  componentDidMount() {
    console.log('Results.componentDidMount');
  }


  render() {
    // State is NOT stored in this wizard tab, but in the parent (wizard component)
    const { classes, state } = this.props;

    return (
      <div className={"flex-max-height flex-direction-column"}>

        <div className={"flex-max-height flex-direction-column"}>
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

          <FormControl className={"flex-normal-height flex-direction-column big-margin-down"}>
            <InputLabel htmlFor="name"><FormattedMessage id="add.results.name.label" defaultMessage="Name (optional)" /></InputLabel>
            <Input
              id="name"
              value={this.state.name}
              onChange={this.handleTextChange.bind(this)}
              aria-describedby="name-text"
              fullWidth
            />
            <FormHelperText id="name-text">{this.props.intl.formatMessage(messages.name)}</FormHelperText>
            {/* <IconButton className={classes.iconButton} aria-label="Save name" onClick={this.handleSaveName.bind(this)}>
              <CheckIcon />
            </IconButton> */}
          </FormControl>

          <div className={"flex-normal-height flex-direction-column big-margin-down"}>
            <DatePicker
              views={["year", "month"]}
              value={this.state.expirationDate}
              onChange={this.handleDateChange.bind(this)}
              label={this.props.intl.formatMessage(messages.date)}
              minDate={new Date()}
              autoOk
              clearable
            />
            {/* <IconButton className={classes.iconButton} aria-label="Save date" onClick={this.handleSaveDate.bind(this)}>
              <CheckIcon />
            </IconButton> */}
          </div>

          { this.state.dirty && 
            <Button variant="outlined" color="primary" onClick={this.handleUpdates.bind(this)} className={classes.button}>
              <FormattedMessage id="action.update" defaultMessage="Update" />
            </Button> 
          }

{/* 
          <div className={"flex-max-height flex-direction-column"}>
            &nbsp;
          </div> 
*/}

        </div>

        <div className={"flex-normal-height flex-direction-row flex-justifiy-between margin-down"}>
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