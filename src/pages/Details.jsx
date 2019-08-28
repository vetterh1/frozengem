import * as log from 'loglevel';
import React from 'react';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import { injectIntl, defineMessages } from "react-intl";
// import { defineMessages } from 'react-intl.macro';
import { withStyles } from '@material-ui/core/styles';
import { withUserInfo } from '../../with/withUserInfo';
import { withItemCharacteristics } from '../../with/withItemCharacteristics';
import { withItems } from '../../with/withItems';
import { withSnackbar } from 'notistack';


const styles = theme => ({
  button: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },  
  divDetailsPage: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto", 
  },
  maxHeight: {
    display: "flex",
    flexGrow: 1,
  },
  normalHeight: {
    display: "flex",
    flexGrow: 0,
  },  
});

const logDetails = log.getLogger('logDetails');
// loglevelServerSend(logDetails); // a setLevel() MUST be run AFTER this!
logDetails.setLevel('debug');
logDetails.debug('--> entering Details.jsx');



const messages = defineMessages({ 
  titleLocation: {
    id: 'add.location.title',
    defaultMessage: 'Where exactly do you store it?',
  },
});



const Details = ({item, userInfo, items, itemCharacteristics, intl, enqueueSnackbar, closeSnackbar, classes}) => {

  // const [item, setItemValues] = React.useState(emptyEmpty);







  const { isAuthenticated, language } = userInfo;

  if (!isAuthenticated()) return <Redirect to='/' />;

  console.log("----------> item : ", item);


  return (
      <div className={classes.divDetailsPage}>
        item code: {item.code}
      </div>
    );
}


Details.propTypes = {
  // Props from caller
  item: PropTypes.object.isRequired,
  // Props from other HOC
  userInfo: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired,
  itemCharacteristics: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default injectIntl(withSnackbar(withItems(withItemCharacteristics(withUserInfo(withStyles(styles, { withTheme: true })(Details))))));







  