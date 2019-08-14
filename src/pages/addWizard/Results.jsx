import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { injectIntl, defineMessages, FormattedMessage } from "react-intl";
import PictureSelection from '../utils/PictureSelection';
import ItemImage from '../utils/ItemImage';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


function isEmpty(str) {
  return (!str || 0 === str.length);
}


const messages = defineMessages({
  cameraReplace: {
    id: 'camera.replace',
    defaultMessage: 'Retake picture',
  },  
  cameraAdd: {
    id: 'camera.add',
    defaultMessage: 'Add picture',
  },
  addSuccess: {
    id: 'item.add.success',
    defaultMessage: 'Your product has been added!',
  },  
});



const styles = theme => ({
  centerFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: theme.spacing(4),
  },
  centerColumnFlex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: theme.spacing(4),
  },
  button: {
    textAlign: 'center',
    // marginLeft: theme.spacing(2),
  },  
  leftIcon: {
    marginRight: theme.spacing(2),
  },
});



const Results = ({item, onResetState, handleAddPicture, isActive, firstStep, intl, classes}) => {

  if(isActive === false) return null;

  const _handleAddNew = () => {
    onResetState(); 
    firstStep();
  }

  const imageExists = item.pictureName || item.thumbnailName;

  return (
    <div className={"flex-normal-height flex-direction-column"}>

      <div className={"flex-normal-height flex-direction-column"}>
        <div className={"flex-normal-height flex-direction-column"}>
          <div className={classes.centerFlex}>
            <CheckCircleOutlineIcon  className={classes.leftIcon} style={{ fontSize: 96 }} />
            <Typography variant="h5" className={"small-margin-down"}>
              <FormattedMessage id="item.add.success" defaultMessage="Successfully added {name}" values={{name: isEmpty(item.name) ? item.categoryName : item.name}} />
            </Typography>
          </div>
          <Typography variant="h4" className={"small-margin-down"}>
            <FormattedMessage id="add.results.code" defaultMessage="Code" />: {item.code}
          </Typography>
          <Typography variant="subtitle1" className={"small-margin-down"}>
            <ul>
              <li><FormattedMessage id="add.results.explanation1" defaultMessage="Write down this code on a sticker" /></li>
              <li><FormattedMessage id="add.results.explanation2" defaultMessage="Stick it to your container" /></li>
            </ul>
            <FormattedMessage id="add.results.explanation3" defaultMessage="We'll send you a reminder in {expirationInMonth} months" values={{expirationInMonth: item.expirationInMonth}} />
          </Typography>
        </div>
        <div className={classes.centerColumnFlex}>
          <ItemImage item={item} />
          <PictureSelection 
            onPicture={handleAddPicture}
            hugeIcon={!imageExists}
            label={intl.formatMessage(imageExists ? messages.cameraReplace : messages.cameraAdd)}
          />
        </div>
      </div>

      <div className={"flex-normal-height flex-direction-row flex-justifiy-between margin-down"}>
        <Button variant="contained" color="secondary" onClick={_handleAddNew} className={classes.button}>
          <FormattedMessage id="button.addnew" defaultMessage="Add a new item" />
        </Button> 
        <Button variant="contained" color="primary" component={Link} to="/" className={classes.button}>
          <FormattedMessage id="button.backhome" defaultMessage="Back Home" />
        </Button>   
      </div>

    </div>

  );
}

Results.propTypes = {
  item: PropTypes.object.isRequired,
  onResetState: PropTypes.func.isRequired,
  handleAddPicture: PropTypes.func.isRequired,
  // Props for StepWizard, cannot be null as always called from StepWizard:
  hashKey: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  firstStep: PropTypes.func.isRequired,
  // Props from other HOC
  intl: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,  
}

export default injectIntl(withStyles(styles)(Results));