
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
  const [dataDetails, setDataDetails] = React.useState([]);

  
  const dataCategories = categories.map(category => {
    const name = category.name[language]
    return {key: category.id2, label: name, selected: false}
  });

   const getDetailsFromSelectedCategories = (categoryKeys) => {
    let detailsForSelectedCategories = [];
    if(categoryKeys.length === 1) {
      detailsForSelectedCategories = detailsAll.filter(detail => detail.parents.find(oneParent => oneParent === 'all' || oneParent === categoryKeys[0]));
    }
    // console.log('Filter: detailsForSelectedCategories=', detailsForSelectedCategories);

    const dataDetailsToStoreInState = detailsForSelectedCategories
    .map(detail => {
      const name = detail.name[language]
      return {key: detail.id2, label: name, selected: false}
    });    
    // console.log('Filter: dataDetailsToStoreInState=', dataDetailsToStoreInState);
    setDataDetails(dataDetailsToStoreInState);
    return dataDetailsToStoreInState;
  }




  const onCategoriesChange = (selectedKeys) => {
    const dataDetails = getDetailsFromSelectedCategories(selectedKeys);
    const newFilters = {...filters, categories: selectedKeys, details:dataDetails};
    setFilters(newFilters);
    // console.log('Filter.onCategoriesChange: newFilters=', newFilters, " - selectedKeys=", selectedKeys);
    onFilterChange(newFilters);
  };

  const onDetailsChange = (selectedKeys) => {
    const newFilters = {...filters, details: selectedKeys};
    setFilters(newFilters);
    console.log('Filter.onDetailsChange: newFilters=', newFilters, " - selectedKeys=", selectedKeys);
    onFilterChange(newFilters);
  };
  

  // console.log('Filter: dataCategories=', dataCategories, ' - dataDetails=', dataDetails);
  return (
    <React.Fragment>
      <ChipsArray data={dataCategories} title="Categories" multipleEnabled={false} allEnabled={false} onFilterChange={onCategoriesChange} />
      <ChipsArray data={dataDetails} title="Details" multipleEnabled allEnabled onFilterChange={onDetailsChange} />
    </React.Fragment>
  );
}

export default injectIntl(withItemCharacteristics(intFilters));
