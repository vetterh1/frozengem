
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ItemCard from './ItemCard'



// const useStyles = makeStyles(theme => ({
//   button: {
//     margin: theme.spacing(1),
//   },
// }));


// const messages = defineMessages({ 
//   column_category: {
//     id: 'dashboard.category',
//     defaultMessage: 'Category',
//     description: 'Category',
//   },
//   column_expiration: {
//     id: 'dashboard.expiration',
//     defaultMessage: 'Expires',
//     description: 'Expires',
//   },
//   column_name: {
//     id: 'dashboard.name',
//     defaultMessage: 'Name',
//     description: 'Name',
//   },
//   column_code: {
//     id: 'dashboard.code',
//     defaultMessage: 'Code',
//     description: 'Code',
//   },
// });


const styles = theme => ({
  layout: {
    display: "flex",
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: 'auto',
    padding: `${theme.spacing(2)}px 0`,
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
  },
});





const intItemsList = ({arrayItems, onSavePicture, onRemoveItem, classes}) => {
  console.debug('[--- FC ---] Functional component: ItemsList -  arrayItems: ', arrayItems);

  const handleSavePicture = (item, pictureData, thumbnailData) => onSavePicture(item, pictureData, thumbnailData);
  const handleItemRemoved = (item) => onRemoveItem(item);

  return (
    <>
      <div className={classes.layout}>
        {arrayItems.map(item => <ItemCard  key={item.id} item={item} onRemoveItem={handleItemRemoved} onSavePicture={handleSavePicture} /> )}
      </div>
    </>
  );
}

export const ItemsList = (withStyles(styles)(intItemsList));
