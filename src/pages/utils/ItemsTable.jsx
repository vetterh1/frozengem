
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
    id: 'table.column.category',
    defaultMessage: 'Category',
    description: 'Category',
  },
  column_expiration: {
    id: 'table.column.expiration',
    defaultMessage: 'Expires',
    description: 'Expires',
  },
  column_name: {
    id: 'table.column.name',
    defaultMessage: 'Name',
    description: 'Name',
  },
  column_code: {
    id: 'table.column.code',
    defaultMessage: 'Code',
    description: 'Code',
  },
});



const intItemsTable = ({arrayItems, intl}) => {
  console.log('ItemsTable arrayItems: ', arrayItems);

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        columns={[
          { title: intl.formatMessage(messages.column_category), field: 'category' },
          { title: intl.formatMessage(messages.column_expiration), field: 'expiration' },
          { title: intl.formatMessage(messages.column_name), field: 'name' },
          { title: intl.formatMessage(messages.column_code), field: 'code' },
        ]}
        data={arrayItems}
        options={{
          search: false,
          showTitle: false,
        }}
      />
    </div> );
}

// export const ItemsTable = withUserInfo(withItems(injectIntl(intItemsTable)));
export const ItemsTable = injectIntl(intItemsTable);
