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


  render() {
    const { classes, userInfo } = this.props;
    const { filteredArrayItems, arrayItems } = this.state;

    if(!arrayItems || arrayItems.length === 0) return null;

    return (
      <React.Fragment>

        <div className={classes.layout}>
          <Filters language={userInfo.language} category={this.category} onCategoryChange={this.onCategoryChange} />
          <ItemsList arrayItems={filteredArrayItems} />
        </div>          

      </React.Fragment>
    );
  }
}

export default injectIntl(withItems(withUserInfo(withStyles(styles)(Dashboard))));