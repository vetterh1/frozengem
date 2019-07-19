
import React, { useState, useEffect } from "react";
import { withItemCharacteristics } from '../auth/withItemCharacteristics';
import { injectIntl } from "react-intl";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { B, V, F, S, M, H, D, I } from "../data/Icons";
import Fastfood from '@material-ui/icons/Fastfood';


// const messages = defineMessages({ 
//   column_category: {
//     id: 'dashboard.category',
//     defaultMessage: 'Category',
//     description: 'Category',
//   },
// });





const intFilters = ({language, category, onCategoryChange, size, onSizeChange, itemCharacteristics, intl}) => {
  // console.log('Filter: itemCharacteristics=', itemCharacteristics);
  if(!itemCharacteristics.categories) return null;
  if(!itemCharacteristics.sizes) return null;

  const [sortedCategories] = useState(
    itemCharacteristics.categories.sort((a, b) => (a.name[language] > b.name[language]) ? 1 : -1)
  );

  const [selectedCategory, setSelectedCategory] = useState(null);


  useEffect(() => {
    if(!selectedCategory) {
      let sel = localStorage.getItem('selectedCategory');
      if(!sel) 
        sel = sortedCategories[0].id2;
      setSelectedCategory( sel );
      onCategoryChange(sel);
    }
  }, []);





  function handleChange(event, newValue) {
    localStorage.setItem('selectedCategory', newValue);
    setSelectedCategory( newValue );
    onCategoryChange(newValue);
  }


  const categoryIcons = {
    "B": <B fontSize="default" />,
    "V": <V fontSize="default" />,
    "F": <F fontSize="default" />,
    "S": <S fontSize="default" />,
    "P": <Fastfood fontSize="default" />,
    "M": <M fontSize="default" />,
    "H": <H fontSize="default" />,
    "D": <D fontSize="default" />,
    "I": <I fontSize="default" />,
  }

  if(!selectedCategory) return null;
  
  return (
    <React.Fragment>

      <Tabs
        value={selectedCategory}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="on"
        indicatorColor="primary"
        textColor="primary"
      >
        {sortedCategories.map(category => <Tab
          key={category.id2}
          label={category.name[language]}
          value={category.id2}
          icon={categoryIcons[category.id2]} 
        />)}
      </Tabs>      

    </React.Fragment>
  );
}

export default injectIntl(withItemCharacteristics(intFilters));
