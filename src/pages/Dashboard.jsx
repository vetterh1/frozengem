import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'; // ! must be at the end of the material-ui imports !
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
    items: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {arrayItems:[], arrayFilters:[], filteredArrayItems:[]};

    this.onCategoryChange = this.onCategoryChange.bind(this);
  }



  getItems = async () => {
    const {items, userInfo} = this.props;

    const result = await items.get(userInfo.accessToken, userInfo.id);
    if(!result) {
      console.error('ItemsList: could not retrieve items' );
    }
    const sortedItems = result.data.sort((a, b) => (a.expirationDate > b.expirationDate) ? 1 : -1)
    this.setState({arrayItems: sortedItems});
  }

  componentDidMount() {
    this.getItems();
  }


  onCategoryChange = (category) => {
    const { arrayItems } = this.state;
    const filteredArrayItems = arrayItems.filter(item => item.category === category);
    this.setState({category: category, filteredArrayItems: filteredArrayItems});
  }

  onItemChange = (item) => {
    const { filteredArrayItems } = this.state;

    // Find the updated item in array:
    let indexItem = filteredArrayItems.findIndex(({id}) => id === item.id);
    const newArray = [
      ...filteredArrayItems.slice(0, indexItem),
      item,
      ...filteredArrayItems.slice(indexItem + 1)
    ];

    this.setState({filteredArrayItems: newArray});
  }


  render() {
    const { classes, userInfo } = this.props;
    const { filteredArrayItems, arrayItems } = this.state;

    if(!arrayItems || arrayItems.length === 0) return (
      <Box mt={4} display="flex" flexDirection="column" >
        <Typography component="h1" variant="h4" color="primary" align="center" gutterBottom>
          <FormattedMessage id="dashboard.empty.title" defaultMessage="You'll found here the content of your freezer." />
        </Typography>
        <Typography variant="h6" align="center" gutterBottom >
          <FormattedMessage id="dashboard.empty.subtitle" defaultMessage="Use the Add button below to start..." />
        </Typography>
      </Box>      
    );

    return (
      <React.Fragment>

        <div className={classes.layout}>
          <Filters language={userInfo.language} category={this.category} onCategoryChange={this.onCategoryChange} />
          <ItemsList arrayItems={filteredArrayItems} onItemChange={this.onItemChange} />
        </div>          

      </React.Fragment>
    );
  }
}

export default injectIntl(withItems(withUserInfo(withStyles(styles)(Dashboard))));