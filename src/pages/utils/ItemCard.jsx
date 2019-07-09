import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, FormattedMessage } from "react-intl";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


import WebcamCapture from './WebcamCapture';

// const useStyles = makeStyles(theme => ({
//   button: {
//     margin: theme.spacing(1),
//   },
// }));


// const messages = defineMessages({ 
//   column_category: {
//     id: 'dashboard.category',
//     defaultMessage: 'Category',
//     description: 'Category',
//   },
//   column_expiration: {
//     id: 'dashboard.expiration',
//     defaultMessage: 'Expires',
//     description: 'Expires',
//   },
//   column_name: {
//     id: 'dashboard.name',
//     defaultMessage: 'Name',
//     description: 'Name',
//   },
//   column_code: {
//     id: 'dashboard.code',
//     defaultMessage: 'Code',
//     description: 'Code',
//   },
// });


const styles = theme => ({
  layout: {
    width: 'auto',
    padding: `${theme.spacing(2)}px 0`,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  largeIcon: {
    width: 48,
    height: 48,
    marginBottom: theme.spacing(2),
  },
});





const intItemCard = ({item, classes, intl}) => {
  const [cameraDialogState, setCameraDialogState] = React.useState(false);

  const handleAddPicture = () => {
    setCameraDialogState(true);
  }

  const onPicture = (data) => {
    setCameraDialogState(false);
  }

  const closeCameraDialog = () => {
  console.log('closeCameraDialog');
  setCameraDialogState(false);
  }

  return (
    <React.Fragment>>

      <WebcamCapture
        open={cameraDialogState}
        onClose={() => closeCameraDialog()}
        onPicture={(data) => onPicture(data)}
      />

      <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {item.category}
        </Typography>
        <Typography variant="h5" component="h2">
          {item.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {item.details}
        </Typography>
        <Typography variant="body2" component="p">
          {item.code}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => handleAddPicture()} size="small"><FormattedMessage id="camera.add" defaultMessage="Add picture" /></Button>
      </CardActions>
      </Card>
    </React.Fragment>
      );
}
export default injectIntl(withStyles(styles)(intItemCard));
