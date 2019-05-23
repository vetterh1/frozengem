import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { injectIntl } from "react-intl";
import { defineMessages, FormattedMessage } from 'react-intl.macro';
import { WizPageTitle} from "../utils/WizUtilComponents";



const messages = defineMessages({
  title: {
    id: 'register.password.title',
    defaultMessage: 'What do you want to do...',
    description: 'What do you want to do...',
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


class HomeJoinOrCreate extends React.Component {
  static propTypes = {
  }


  constructor(props) {
    super(props);
    this.state = {
    };
  }
  

  render() {
    // State is NOT stored in this wizard tab, but in the parent (wizard component)
    return (

      <div className={"flex-max-height flex-direction-column"}>

        <WizPageTitle message={messages.title} />

        <FormControl className={"flex-max-height flex-direction-column huge-margin-down"}>

          <div className={"flex-max-height flex-direction-column flex-justifiy-around"}>
            <Button variant="contained" color="primary" component={Link} to="/home/new">
              <FormattedMessage id="button.home.new" defaultMessage="Add a new home" />
            </Button>  
            <Button variant="contained" color="primary" component={Link} to="/home/join">
              <FormattedMessage id="button.home.join" defaultMessage="Join and existing home" />
            </Button>  
          </div>
        </FormControl>

      </div>

    );
  }
}


export default injectIntl(withStyles(styles)(HomeJoinOrCreate));