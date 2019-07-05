import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box'; // ! must be at the end of the material-ui imports !
import Typography from '@material-ui/core/Typography';
// import { FormattedMessage } from 'react-intl.macro';
import { injectIntl, FormattedMessage } from "react-intl";
import { withStyles } from '@material-ui/core/styles';
import { withUserInfo } from '../auth/withUserInfo';
import { withItems } from '../auth/withItems';
import { ItemsList } from './utils/ItemsList'
import Filters from './Filters'



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





class Dashboard extends React.Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {arrayItems:[], arrayFilters:[], filteredArrayItems:[]};

    this.onFilterChange = this.onFilterChange.bind(this);
  }



  getItems = async () => {
    const {items, userInfo} = this.props;

    const result = await items.get(userInfo.accessToken, userInfo.id);
    if(!result) {
      console.error('ItemsList: could not retrieve items' );
    }
    // console.log('ItemsList data: ', result.data);
    this.setState({arrayItems: result.data});
  }

  componentDidMount() {
    this.getItems();
  }


  onFilterChange = (arrayFilters) => {
    const { arrayItems } = this.state;
    const filteredArrayItems = arrayItems
      .filter(item => arrayFilters.categories.indexOf(item.category)!== -1)
      // all the details in the filter must be in the item:
      .filter(item => arrayFilters.details.every(oneFilter => item.detailsArray.indexOf(oneFilter)!== -1))

    this.setState({filters: arrayFilters, filteredArrayItems: filteredArrayItems});
  }


  render() {
    const { classes, userInfo } = this.props;
    const { filteredArrayItems } = this.state;

    // if(!filteredArrayItems || filteredArrayItems.length === 0) return null;

    return (
      <React.Fragment>

        <Box mt={5} display="flex" flexDirection="column" >
          <Typography component="h1" variant="h4" color="primary" align="center" gutterBottom>
            <FormattedMessage id="dashboard.title" defaultMessage="Your dashboard" />
          </Typography>
          <Typography variant="h6" align="center" gutterBottom >
            <FormattedMessage id="dashboard.subtitle" defaultMessage="Here is what you have in your freezer" />
          </Typography>
        </Box>

        <div className={classes.layout}>
          <Filters language={userInfo.language} onFilterChange={this.onFilterChange} />
          <ItemsList arrayItems={filteredArrayItems} />
        </div>          

      </React.Fragment>
    );
  }
}

export default injectIntl(withItems(withUserInfo(withStyles(styles)(Dashboard))));