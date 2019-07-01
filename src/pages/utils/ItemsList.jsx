
import React from 'react';
import MaterialTable from 'material-table'
// import { makeStyles } from '@material-ui/core/styles';
// import { withItems } from '../../auth/withItems';
// import { withUserInfo } from '../../auth/withUserInfo';

// import { useSnackbar } from 'notistack';
import { injectIntl } from "react-intl";
import { defineMessages } from 'react-intl.macro';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


// const useStyles = makeStyles(theme => ({
//   button: {
//     margin: theme.spacing(1),
//   },
// }));


const messages = defineMessages({ 
  column_category: {
    id: 'dashboard.category',
    defaultMessage: 'Category',
    description: 'Category',
  },
  column_expiration: {
    id: 'dashboard.expiration',
    defaultMessage: 'Expires',
    description: 'Expires',
  },
  column_name: {
    id: 'dashboard.name',
    defaultMessage: 'Name',
    description: 'Name',
  },
  column_code: {
    id: 'dashboard.code',
    defaultMessage: 'Code',
    description: 'Code',
  },
});






const intItemCard = ({item, intl}) => {
  console.log('ItemCard item: ', item);

  return (
<Card className={classes.card}>
<CardContent>
  <Typography className={classes.title} color="textSecondary" gutterBottom>
    item.category
  </Typography>
  <Typography variant="h5" component="h2">
    be
    {bull}
    nev
    {bull}o{bull}
    lent
  </Typography>
  <Typography className={classes.pos} color="textSecondary">
    adjective
  </Typography>
  <Typography variant="body2" component="p">
    well meaning and kindly.
    <br />
    {'"a benevolent smile"'}
  </Typography>
</CardContent>
<CardActions>
  <Button size="small">Learn More</Button>
</CardActions>
</Card>
  );
}
const ItemCard = injectIntl(intItemCard);



const intItemsList = ({arrayItems, intl}) => {
  console.log('ItemsList arrayItems: ', arrayItems);

  return (
    arrayItems.map(item => <ItemCard item={item} /> )
      // <MaterialTable
      //   columns={[
      //     { title: intl.formatMessage(messages.column_category), field: 'category' },
      //     { title: intl.formatMessage(messages.column_expiration), field: 'expirationDate', defaultSort: 'asc' },
      //     { title: intl.formatMessage(messages.column_name), field: 'name' },
      //     { title: intl.formatMessage(messages.column_code), field: 'code' },
      //   ]}
      //   data={arrayItems}
      //   options={{
      //     pageSize: 10,
      //     search: false,
      //     toolbar: false,
      //     showTitle: false,
      //     sorting: true,
      //   }}
      // />
  );
}

// export const ItemsList = withUserInfo(withItems(injectIntl(intItemsList)));
export const ItemsList = injectIntl(intItemsList);
