import React from 'react';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from "react-intl";
import Button from '@material-ui/core/Button';
import { defineMessages, FormattedMessage } from 'react-intl.macro';
import { WizPageTitle} from "../utils/WizUtilComponents";



const messages = defineMessages({
  title: {
    id: 'register.registered.title',
    defaultMessage: 'Registration in progress...',
    description: 'Registration in progress...',
  },
  registered: {
    id: 'register.registered.registered',
    defaultMessage: 'You are registered!',
    description: 'You are registered!',
  },  
  failed: {
    id: 'register.registered.failed',
    defaultMessage: 'Registeration failed :/',
    description: 'Registeration failed :/',
  },
});



const styles = theme => ({
});


class NameForm extends React.Component {
  static propTypes = {
  }


  constructor(props) {
    super(props);
    this.state = {
    };
  }



  onClickRegister = () => { this.props.onClickRegister(); };

  render() {
    const { classes, state } = this.props;

    // Return to the 1st page if all the previous infos are not filled in
    // (ex: return on this exact page)
    const {name, email, password} = state;
    if(this.props.isActive && ( name === "" || email === "" || password === "")) {
      return <Redirect to='/' />
    }    

    return (

      <div className={"flex-max-height flex-direction-column"}>

        <div className={"flex-max-height flex-direction-column"}>
          <WizPageTitle message={messages.title} />

          <Button variant="contained" color="primary" onClick={this.onClickRegister.bind(this)}>
            <FormattedMessage id="register.registered.button" defaultMessage="Register!" />
          </Button>          

        </div>

        <div className={"flex-max-height flex-direction-column"}>
            &nbsp;
        </div>

        <div className={"flex-normal-height flex-direction-row flex-justifiy-between"}>
          <Button variant="contained" color="primary" component={Link} to="/" className={classes.button}>
            <FormattedMessage id="button.backhome" defaultMessage="Back Home" />
          </Button>   
        </div>

      </div>

    );
  }
}


export default injectIntl(withStyles(styles)(NameForm));