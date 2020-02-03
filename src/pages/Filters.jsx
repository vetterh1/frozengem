/* eslint-disable react-hooks/rules-of-hooks */ 
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { itemsFilterActions } from '../_actions/itemsFilterActions';
import { injectIntl } from "react-intl";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { getIcon } from "../data/Icons"; 
import { makeStyles } from '@material-ui/core/styles';
import TagManager from 'react-gtm-module'




const useStylesTabs = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
  }
}));



const useStylesTab = makeStyles(theme => ({
  root: {
    textTransform: 'none',
    '&$selected': {
      color: theme.palette.text.secondary,
    },
  },
}));



WIP
see https://material-ui.com/components/tabs/#tabs
and https://material-ui.com/api/tab/


function intFilters ({language, filter, categories, filterItems, intl}) {
  
  const classesTabs = useStylesTabs();
  const classesTab = useStylesTab();
  
  const [sortedCategories] = useState(
    categories && categories.sort((a, b) => (a.name[language] > b.name[language]) ? 1 : -1)
  );

  const [selectedCategory, setSelectedCategory] = useState(null);

  // Restore tab used in previous session:
  useEffect(() => {
    console.log('Filters.useEffect() - should run only once!');
    
    if(!selectedCategory) {
      let sel = localStorage.getItem('selectedCategory');
      if(!sel) 
        sel = sortedCategories[0].id2;
      if(sel === 'removed')
        sel = 'all';
      setSelectedCategory( sel );
      filterItems(sel);

      const tagManagerArgs = {
        gtmId: "GTM-TFF4FK9",
        events: {
          event: "Filter",
          action: "Init",
          value: sel
        }
      }    
      TagManager.initialize(tagManagerArgs);      
    }
  // },[]);  // ==> generates a warning on the console, but only way found to have it executed only once!
  },[selectedCategory, sortedCategories, filterItems]);

  if(!categories) return null;


  function handleChange(event, newValue) {

    const tagManagerArgs = {
      gtmId: "GTM-TFF4FK9",
      events: {
        event: "Filter",
        action: "Change",
        value: newValue
      }
    }    
    TagManager.initialize(tagManagerArgs);  

    localStorage.setItem('selectedCategory', newValue);
    setSelectedCategory( newValue );
    filterItems(newValue);
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
        // textColor="primary"
        className={classesTabs.root} 
      >
        <Tab
          id='filter.all'
          key={'all'}
          label={intl.formatMessage({id: "filter.all"})}
          value={'all'}
          icon={getIcon("all")} 
          className={classesTab.root} 
          />
        <Tab
          id='filter.latest'
          key={'latest'}
          label={intl.formatMessage({id: "filter.latest"})}
          value={'latest'}
          icon={getIcon("latest")} 
          className={classesTab.root} 
        />
        {sortedCategories.map(category => <Tab
          id={'filter.' + category.name['en'].toLowerCase()}
          key={category.id2}
          label={category.name[language]}
          value={category.id2}
          icon={getIcon("category"+category.id2)} 
          className={classesTab.root} 
        />)}
        <Tab
          id='filter.removed'
          key={'removed'}
          label={intl.formatMessage({id: "filter.removed"})}
          value={'removed'}
          icon={getIcon("removed")} 
          className={classesTab.root} 
        />
      </Tabs>      

    </React.Fragment>
  );
}



function mapStateToProps(state) {
  const { user: { language }, itemsFilter: { filter }, characteristics:{ categories } } = state;
  return {
    language,
    filter,
    categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    filterItems: (filter) => dispatch(itemsFilterActions.filterItems(filter))
  }
}

const connectedFilters = connect(mapStateToProps, mapDispatchToProps)(intFilters);

export default injectIntl(connectedFilters);


