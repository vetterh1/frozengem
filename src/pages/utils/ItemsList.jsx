import React from 'react';
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




const intItemsList = ({arrayItems, onSavePicture, onRemoveItem, onShowDetails, classes}) => {
  console.debug('[--- FC Render ---] ItemsList -  arrayItems: ', arrayItems);

  const handleSavePicture = (item, pictureData, thumbnailData) => onSavePicture(item, pictureData, thumbnailData);
  const handleItemRemoved = (item, size) => onRemoveItem(item, size);

  const nbItems = arrayItems.length;

  return (
    <>
      <div className={classes.layout}>
        {arrayItems.map(item => 
          <ItemCard  
            key={item.id} item={item} 
            onRemoveItem={handleItemRemoved} 
            onShowDetails={onShowDetails} 
            onSavePicture={handleSavePicture} 
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

export default withStyles(styles)(intItemsList);
