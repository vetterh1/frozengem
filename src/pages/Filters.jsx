/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { itemsFilterActions } from "_actions/itemsFilterActions";
import { filterCounts } from "_selectors/itemsSelector";
import { injectIntl } from "react-intl";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Badge from "@material-ui/core/Badge";

import { getIconComponent } from "data/Icons";
import { withStyles } from "@material-ui/core/styles";
import gtmPush from "utils/gtmPush";

const FilterTabs = withStyles(theme => ({
  root: {
    backgroundColor: theme.transparency ? "transparent" : theme.palette.main.backgroundColor,
    backdropFilter: theme.transparency ? "blur(8px) contrast(0.3) brightness(1.5)" : null,
    borderBottom: '1px solid #eee',

    // marginTop: -theme.spacing(2),
    // marginLeft: -theme.spacing(2),
    // marginRight: -theme.spacing(2),
  },
  indicator: {
    backgroundColor: theme.palette.primary.dark,
    height: "3px"
  }
}))(Tabs);

const FilterTab = withStyles(theme => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      minWidth: "75px"
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: "100px"
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: "150px"
    },
    textTransform: "none",
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.primary.dark
    },
    "&$selected": {
      color: theme.palette.primary.dark
    },
    "&:focus": {
      color: theme.palette.primary.dark
    }
  },
  selected: {}
}))(props => <Tab {...props} />);

const StyledCountBadge = withStyles(theme => ({
  root: {
    position: "absolute",
    [theme.breakpoints.down("xs")]: {
      right: 20,
      top: 16
    },
    [theme.breakpoints.up("sm")]: {
      right: 25,
      top: 16
    },
    [theme.breakpoints.up("lg")]: {
      right: 50,
      top: 16
    }
  },
  badge: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    color: "black",
    padding: "0 2px"
  }
}))(props => <Badge {...props} />);

function intFilters({
  // From Redux:
  language,
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
  useEffect(() => {
    console.log("Filters.useEffect() - should run only once!");

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
  }, [selectedCategory, sortedCategories, filterItems]);

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
        value={selectedCategory}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="on"
        indicatorColor="primary"
      >
        <FilterTab
          id="filter.all"
          key={"all"}
          label={intl.formatMessage({ id: "filter.all" })}
          value={"all"}
          icon={
            <div>
              <IconCategoryAll fontSize="default" />
              <StyledCountBadge badgeContent={counts["all"]} />
            </div>
          }
        />
        <FilterTab
          id="filter.latest"
          key={"latest"}
          label={intl.formatMessage({ id: "filter.latest" })}
          value={"latest"}
          icon={
            <div>
              <IconCategoryLatest fontSize="default" />
              <StyledCountBadge badgeContent={counts["latest"]} />
            </div>
          }
        />
        {sortedCategories.map(category => {
          const IconCategory = getIconComponent("category"+category.id2);
          return (
            <FilterTab
              id={"filter." + category.name["en"].toLowerCase()}
              key={category.id2}
              label={category.name[language]}
              value={category.id2}
              icon={
                <div>
                  <IconCategory fontSize="default" />
                  <StyledCountBadge badgeContent={counts[category.id2]} />
                </div>
              }
            />
          )
        })}
        <FilterTab
          id="filter.incomplete"
          key={"incomplete"}
          label={intl.formatMessage({ id: "filter.incomplete" })}
          value={"incomplete"}
          icon={
            <div>
              <IconCategoryIncomplete fontSize="default" />
              <StyledCountBadge badgeContent={counts["incomplete"]} />
            </div>
          }
        />
        <FilterTab
          id="filter.removed"
          key={"removed"}
          label={intl.formatMessage({ id: "filter.removed" })}
          value={"removed"}
          icon={
            <div>
              <IconCategoryRemoved fontSize="default" />
              <StyledCountBadge badgeContent={counts["removed"]} />
            </div>
          }
        />
      </FilterTabs>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  const {
    user: { language },
    itemsFilter: { filter },
    characteristics: { categories }
  } = state;

  let counts = {};
  if (state) counts = filterCounts(state);

  return {
    language,
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
