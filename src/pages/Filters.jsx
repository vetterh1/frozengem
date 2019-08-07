
import React, { useState, useEffect } from "react";
import { withItemCharacteristics } from '../auth/withItemCharacteristics';
import { injectIntl, defineMessages } from "react-intl";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { getIcon } from "../data/Icons";




const messages = defineMessages({
  all: {
    id: 'button.all',
    defaultMessage: 'All',
  },
})

const intFilters = ({language, category, onCategoryChange, size, onSizeChange, itemCharacteristics, intl}) => {
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
        <Tab
          key={'all'}
          label={intl.formatMessage(messages.all)}
          value={'all'}
          icon={getIcon("categoryAll")} 
        />        
        {sortedCategories.map(category => <Tab
          key={category.id2}
          label={category.name[language]}
          value={category.id2}
          icon={getIcon("category"+category.id2)} 
        />)}
      </Tabs>      

    </React.Fragment>
  );
}

export default injectIntl(withItemCharacteristics(intFilters));
