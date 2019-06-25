
import React from 'react';
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles';
// import { useSnackbar } from 'notistack';
import { injectIntl } from "react-intl";
import { defineMessages, FormattedMessage } from 'react-intl.macro';




const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));


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



const intItemsTable = ({homeCode, intl}) => {
  const classes = useStyles();
  // const { enqueueSnackbar } = useSnackbar();

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        columns={[
          { title: intl.formatMessage(messages.column_category), field: 'category' },
          { title: intl.formatMessage(messages.column_expiration), field: 'expiration' },
          { title: intl.formatMessage(messages.column_name), field: 'name' },
          { title: intl.formatMessage(messages.column_code), field: 'code' },
        ]}
        data={[
          { category: 'T', expiration: '1/1/2020', name: null, code: 'T00' },
          { category: 'T', expiration: '2/2/2020', name: 'Truc', code: 'T01' },
          { category: 'T', expiration: '1/3/2020', name: 'Autre truc', code: 'T02' },
          { category: 'V', expiration: '1/4/2020', name: 'Carottes', code: 'V00' },
        ]}
        // title="Demo Title"
        options={{
          search: false,
          showTitle: false,
        }}
      />
    </div> );
}

export const ItemsTable = injectIntl(intItemsTable);
