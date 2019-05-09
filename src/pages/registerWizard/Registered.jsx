import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from "react-intl";
import Button from '@material-ui/core/Button';
import { defineMessages, FormattedMessage } from 'react-intl.macro';
import { WizPageTitle} from "../utils/WizUtilComponents";



const messages = defineMessages({
  title: {
    id: 'register.registered.title',
    defaultMessage: 'You are registered!',
    description: 'You are registered!',
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
});


class NameForm extends React.Component {
  static propTypes = {
  }


  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes } = this.props;
    return (

      <div className={"flex-max-height flex-direction-column"}>

        <div className={"flex-max-height flex-direction-column"}>
          <WizPageTitle message={messages.title} />
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