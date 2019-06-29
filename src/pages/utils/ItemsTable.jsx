
import React from 'react';
import MaterialTable from 'material-table'
// import { makeStyles } from '@material-ui/core/styles';
// import { withItems } from '../../auth/withItems';
// import { withUserInfo } from '../../auth/withUserInfo';

// import { useSnackbar } from 'notistack';
import { injectIntl } from "react-intl";
import { defineMessages } from 'react-intl.macro';




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



const intItemsTable = ({arrayItems, intl}) => {
  console.log('ItemsTable arrayItems: ', arrayItems);

  return (
      <MaterialTable
        columns={[
          { title: intl.formatMessage(messages.column_category), field: 'category' },
          { title: intl.formatMessage(messages.column_expiration), field: 'expirationDate', defaultSort: 'asc' },
          { title: intl.formatMessage(messages.column_name), field: 'name' },
          { title: intl.formatMessage(messages.column_code), field: 'code' },
        ]}
        data={arrayItems}
        options={{
          pageSize: 10,
          search: false,
          toolbar: false,
          showTitle: false,
          sorting: true,
        }}
      />
  );
}

// export const ItemsTable = withUserInfo(withItems(injectIntl(intItemsTable)));
export const ItemsTable = injectIntl(intItemsTable);
