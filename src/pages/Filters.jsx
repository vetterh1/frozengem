/* eslint-disable react-hooks/rules-of-hooks */

// React
import React, { useState, useLayoutEffect } from "react";
// Redux
import { connect } from 'react-redux';
import { itemsFilterActions } from "_actions/itemsFilterActions";
// HOC
import { makeStyles } from '@material-ui/core/styles';
import { injectIntl } from "react-intl";
// MUI
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Badge from "@material-ui/core/Badge";
// Utilities
import { filterCounts } from "_selectors/itemsSelector";
import gtmPush from "utils/gtmPush";
// Styles
import { getIconComponent } from "data/Icons";
















const useTabsStyles = makeStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  indicator: {
    backgroundColor: theme.palette.filters.indicator.backgroundColor,
  },
  scrollButtons: {
    [theme.breakpoints.down("xs")]: {
      width: (density) => `${(density * 5) + 20}px`,
    },
    [theme.breakpoints.up("sm")]: {
      width: (density) => `${(density * 8) + 25}px`,
    },
    [theme.breakpoints.up("lg")]: {
      width: (density) => `${(density * 12) + 30}px`,
    },    
  }
}));


const FilterTabs = (props) => {
const classes = useTabsStyles(props?.density);
return <Tabs classes={classes} {...props} />;
}












const useTabStyles = makeStyles(theme => ({
    root: {
      [theme.breakpoints.down("xs")]: {
        minWidth: (density) => `${(density * 15) + 50}px`,
        padding: (density) => `${theme.spacing(density) / 2}px 0px`,
      },
      [theme.breakpoints.up("sm")]: {
        minWidth: (density) => `${(density * 15) + 65}px`,
        padding: (density) => `${theme.spacing(density) / 2}px 0px`,
      },
      [theme.breakpoints.up("lg")]: {
        minWidth: (density) => `${(density * 15) + 70}px`,
        padding: (density) => `${theme.spacing(density) / 2}px 0px`,
      },
      textTransform: "none",
      color: theme.palette.text.primary,
      "&:hover": {
        backgroundColor: theme.palette.filters.selected.backgroundColor,
      },
    },
    "selected": {
      color: theme.palette.filters.selected.color,
      backgroundColor: theme.palette.filters.selected.backgroundColor,
    },
}));


const FilterTab = (props) => {
  const classes = useTabStyles(props?.density);
  return <Tab classes={classes} {...props} />;
}











const useBadgeStyles = makeStyles(theme => ({
    root: {
      position: "absolute",
      [theme.breakpoints.down("xs")]: {
        right: (density) => density === 1 ? 10 : (density === 2 ? 15 : 20),
        top: (density) => density === 1 ? 13 : 15,
      },
      [theme.breakpoints.up("sm")]: {
        right: (density) => density === 1 ? 15 : (density === 2 ? 20 : 28),
        top: (density) => density === 1 ? 13 : 15,
      },
      [theme.breakpoints.up("lg")]: {
        right: (density) => density === 1 ? 18 : (density === 2 ? 25 : 30),
        top: (density) => density === 1 ? 13 : 15,
      }
    },
    badge: {
      backgroundColor: theme.palette.filters.badge.backgroundColor,
    }
}));


const StyledCountBadge = (props) => {
  const classes = useBadgeStyles(props?.density);
  return <Badge classes={classes} {...props} />;
}








function intFilters({
  // From Redux:
  language,
  density,
  filter,
  categories,
  filterItems,
  counts,
  // From other HOC:
  intl
}) {
  const [sortedCategories] = useState(
    categories &&
      categories.sort((a, b) => (a.name[language] > b.name[language] ? 1 : -1))
  );

  const [selectedCategory, setSelectedCategory] = useState(null);

  // Restore tab used in previous session:
  useLayoutEffect(() => {
    console.debug("[Filters] useLayoutEffect (should run only once!)");

    if (!selectedCategory) {
      let sel = localStorage.getItem("selectedCategory");
      if (!sel) sel = sortedCategories[0].id2;
      if (sel === "removed") sel = "all";
      setSelectedCategory(sel);
      filterItems(sel);

      gtmPush({
        event: "Filter",
        action: "Init",
        value: sel
      });
    }
  }, 
  // eslint-disable-next-line
  [sortedCategories, filterItems]);

  if (!categories) return null;

  function handleChange(event, newValue) {
    gtmPush({
      event: "Filter",
      action: "Change",
      value: newValue
    });

    localStorage.setItem("selectedCategory", newValue);
    setSelectedCategory(newValue);
    filterItems(newValue);
  }

  if (!selectedCategory) return null;

  const IconCategoryAll = getIconComponent("all");
  const IconCategoryLatest = getIconComponent("latest");
  const IconCategoryIncomplete = getIconComponent("incomplete");
  const IconCategoryRemoved = getIconComponent("removed");

  return (
    <React.Fragment>
      <FilterTabs
        density={density}
        value={selectedCategory}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="on"
        indicatorColor="primary"
      >
        <FilterTab
          id="filter.all"
          key={"all"}
          density={density}
          label={intl.formatMessage({ id: "filter.all" })}
          value={"all"}
          icon={
            <div>
              <IconCategoryAll fontSize="default" />
              <StyledCountBadge density={density} badgeContent={counts["all"]} />
            </div>
          }
        />
        <FilterTab
          id="filter.latest"
          key={"latest"}
          density={density}
          label={intl.formatMessage({ id: "filter.latest" })}
          value={"latest"}
          icon={
            <div>
              <IconCategoryLatest fontSize="default" />
              <StyledCountBadge density={density} badgeContent={counts["latest"]} />
            </div>
          }
        />
        {sortedCategories.map(category => {
          const IconCategory = getIconComponent("category"+category.id2);
          return (
            <FilterTab
              id={"filter." + category.name["en"].toLowerCase()}
              key={category.id2}
              density={density}
              label={category.name[language]}
              value={category.id2}
              icon={
                <div>
                  <IconCategory fontSize="default" />
                  <StyledCountBadge density={density} badgeContent={counts[category.id2]} />
                </div>
              }
            />
          )
        })}
        <FilterTab
          id="filter.incomplete"
          key={"incomplete"}
          density={density}
          label={intl.formatMessage({ id: "filter.incomplete" })}
          value={"incomplete"}
          icon={
            <div>
              <IconCategoryIncomplete fontSize="default" />
              <StyledCountBadge density={density} badgeContent={counts["incomplete"]} />
            </div>
          }
        />
        <FilterTab
          id="filter.removed"
          key={"removed"}
          density={density}
          label={intl.formatMessage({ id: "filter.removed" })}
          value={"removed"}
          icon={
            <div>
              <IconCategoryRemoved fontSize="default" />
              <StyledCountBadge density={density} badgeContent={counts["removed"]} />
            </div>
          }
        />
      </FilterTabs>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  const {
    user: { language, density },
    itemsFilter: { filter },
    characteristics: { categories }
  } = state;

  let counts = {};
  if (state) counts = filterCounts(state);

  return {
    language,
    density,
    filter,
    categories,
    counts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    filterItems: filter => dispatch(itemsFilterActions.filterItems(filter))
  };
}

const connectedFilters = connect(
  mapStateToProps,
  mapDispatchToProps
)(intFilters);

export default injectIntl(connectedFilters);
