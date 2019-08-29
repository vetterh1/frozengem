import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from "react-intl";
import ItemCard from './ItemCard'


const styles = theme => ({
  layout: {
    display: "flex",
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: 'auto',
    padding: `${theme.spacing(2)}px 0`,
  },
});




const intItemsList = ({arrayItems, onShowDetails, classes}) => {
  console.debug('[--- FC Render ---] ItemsList -  arrayItems: ', arrayItems);

  const nbItems = arrayItems.length;

  return (
    <>
      <div className={classes.layout}>
        {arrayItems.map(item => 
          <ItemCard  
            key={item.id} item={item} 
            onShowDetails={onShowDetails} 
          />
        )}
        {nbItems <= 0 &&
            <div className="huge-margin-top">
              <Typography color="primary" align="center">
                <FormattedMessage id="dashboard.empty.category.title" defaultMessage="You don't have any product from this category in your freezer yet." />
              </Typography>
            </div>
        }
      </div>
    </>
  );
}


intItemsList.propTypes = {
  // Props from caller
  arrayItems: PropTypes.array.isRequired,
  onShowDetails: PropTypes.func.isRequired,
  // Props from other HOC
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(intItemsList);
