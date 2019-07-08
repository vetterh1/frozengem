
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import { injectIntl, defineMessages } from "react-intl";
import { injectIntl } from "react-intl";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


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
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
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
  // console.log('ItemCard item: ', item);

  return (
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
      <Button size="small">edit</Button>
    </CardActions>
    </Card>
      );
}
export default injectIntl(withStyles(styles)(intItemCard));
