/* eslint-disable react-hooks/rules-of-hooks */ 
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { itemsFilterActions } from '../_actions/itemsFilterActions';
import { injectIntl } from "react-intl";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { getIcon } from "../data/Icons"; 
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TagManager from 'react-gtm-module'




/* eslint-disable no-dupe-keys */
const useStyles = makeStyles(theme => ({
  tabs: {
    backgroundColor: theme.palette.primary.light,
  },
}));



const FilterTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
    '&$selected': {
      color: theme.palette.primary.dark,
    },
    '&:focus': {
      color: theme.palette.primary.dark,
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);




// WIP
// see https://material-ui.com/components/tabs/#tabs
// and https://material-ui.com/api/tab/


function intFilters ({language, filter, categories, filterItems, intl}) {
  
  const classes = useStyles();

  
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
        className={classes.tabs} 
      >
        <FilterTab
          id='filter.all'
          key={'all'}
          label={intl.formatMessage({id: "filter.all"})}
          value={'all'}
          icon={getIcon("all")} 
          className={classes.tab} 
          />
        <FilterTab
          id='filter.latest'
          key={'latest'}
          label={intl.formatMessage({id: "filter.latest"})}
          value={'latest'}
          icon={getIcon("latest")} 
          className={classes.tab} 
        />
        {sortedCategories.map(category => <FilterTab
          id={'filter.' + category.name['en'].toLowerCase()}
          key={category.id2}
          label={category.name[language]}
          value={category.id2}
          icon={getIcon("category"+category.id2)} 
          className={classes.tab} 
        />)}
        <FilterTab
          id='filter.removed'
          key={'removed'}
          label={intl.formatMessage({id: "filter.removed"})}
          value={'removed'}
          icon={getIcon("removed")} 
          className={classes.tab} 
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


