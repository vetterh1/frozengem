
import React, { useState, useEffect } from "react";
import { withItemCharacteristics } from '../with/withItemCharacteristics';
import { injectIntl, defineMessages } from "react-intl";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { getIcon } from "../data/Icons";




const messages = defineMessages({
  all: {
    id: 'filter.all',
    defaultMessage: 'All',
  },
  latest: {
    id: 'filter.latest',
    defaultMessage: 'Latest',
  },
  removed: {
    id: 'filter.removed',
    defaultMessage: 'Removed',
  },
})

const intFilters = ({language, category, onCategoryChange, size, onSizeChange, itemCharacteristics, intl}) => {
  if(!itemCharacteristics.categories) return null;
  if(!itemCharacteristics.sizes) return null;

  const [sortedCategories] = useState(
    itemCharacteristics.categories.sort((a, b) => (a.name[language] > b.name[language]) ? 1 : -1)
  );

  const [selectedCategory, setSelectedCategory] = useState(null);

  // Restore tab used in previous session:
  useEffect(() => {
    if(!selectedCategory) {
      let sel = localStorage.getItem('selectedCategory');
      if(!sel) 
        sel = sortedCategories[0].id2;
      if(sel === 'removed')
        sel = 'all';
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
          icon={getIcon("all")} 
        />
        <Tab
          key={'latest'}
          label={intl.formatMessage(messages.latest)}
          value={'latest'}
          icon={getIcon("latest")} 
        />
        {sortedCategories.map(category => <Tab
          key={category.id2}
          label={category.name[language]}
          value={category.id2}
          icon={getIcon("category"+category.id2)} 
        />)}
        <Tab
          key={'removed'}
          label={intl.formatMessage(messages.removed)}
          value={'removed'}
          icon={getIcon("removed")} 
        />
      </Tabs>      

    </React.Fragment>
  );
}

export default injectIntl(withItemCharacteristics(intFilters));
