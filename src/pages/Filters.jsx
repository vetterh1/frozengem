
import React from 'react';
import { withItemCharacteristics } from '../auth/withItemCharacteristics';
import { injectIntl } from "react-intl";
// import { injectIntl, defineMessages } from "react-intl";
import ChipsArray from './utils/ChipsArray'


// const messages = defineMessages({ 
//   column_category: {
//     id: 'dashboard.category',
//     defaultMessage: 'Category',
//     description: 'Category',
//   },
// });





const intFilters = ({language, onFilterChange, itemCharacteristics, intl}) => {
  // console.log('Filter: itemCharacteristics=', itemCharacteristics);
  if(!itemCharacteristics.categories) return null;

  const { categories, details: detailsAll } = itemCharacteristics;
  const [filters, setFilters] = React.useState({});
  // const [details, setDetails] = React.useState([]);
  const [details] = React.useState([]);

  
  const dataCategories = categories.map(category => {
    const name = category.name[language]
    return {key: category.id2, label: name, selected: false}
  });
  
  let detailsForSelectedCategory = [];
  if(dataCategories.length === 1)
    detailsForSelectedCategory = detailsAll.filter(detail => detail.parents.find(oneParent => oneParent === 'all' || oneParent === dataCategories[0].id2));
  console.log('Filter: detailsForSelectedCategory=', detailsForSelectedCategory);

  const dataDetails = detailsForSelectedCategory
    .map(detail => {
      const name = detail.name[language]
      return {key: detail.id2, label: name, selected: false}
    });

  const onCategoryChange = (filter) => {
    const newFilters = {...filters, category: filter, details:[]};
    setFilters(newFilters);
    console.log('Filter.onCategoryChange: newFilters=', newFilters, " - filter=", filter);
    onFilterChange(newFilters);
    // setDataDetails([]);
  };

  const onDetailsChange = (filter) => {
    console.log('Filter: onFilterChange=', filter);
    onFilterChange(filter);
  };
  

  console.log('Filter: categories=', categories, ' - details=', details);
  return (
    <React.Fragment>
      <ChipsArray data={dataCategories} title="Category" multipleEnabled={false} allEnabled={false} onFilterChange={onCategoryChange} />
      <ChipsArray data={dataDetails} title="Details" multipleEnabled allEnabled onFilterChange={onDetailsChange} />
    </React.Fragment>
  );
}

export default injectIntl(withItemCharacteristics(intFilters));
