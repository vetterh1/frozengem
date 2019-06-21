import React from 'react';
import Box from '@material-ui/core/Box'; // ! must be at the end of the material-ui imports !
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormattedMessage } from 'react-intl.macro';



export default function LoadingUserInfo() {
  return (
    <Box mt={5} display="flex" flexDirection="column" alignItems="center">
      <CircularProgress />
      <br />
      <Typography variant="h5" align="center" gutterBottom >
        <FormattedMessage id="app.userinfo.loading" defaultMessage="loading your info..." />
      </Typography>
    </Box>
  );
}
