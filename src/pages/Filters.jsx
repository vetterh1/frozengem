
import React from 'react';
import { withItemCharacteristics } from '../auth/withItemCharacteristics';
import { injectIntl, defineMessages } from "react-intl";
import ChipsArray from './utils/ChipsArray'


const messages = defineMessages({ 
  column_category: {
    id: 'dashboard.category',
    defaultMessage: 'Category',
    description: 'Category',
  },
});





const intFilters = ({itemCharacteristics, language, intl}) => {
  const { categories } = itemCharacteristics;
  
  const data = categories.map(category => {
    const name = language === "EN" ? category.name : category.i18nName[language]
    return {key: category.id2, label: name, selected: false}
  });

  const onFilterChange = (filter) => {
    console.log('Filter: onFilterChange=', filter);
  };


  console.log('Filter: categories=', categories);
  return (
    <ChipsArray data={data} title="Category" multipleEnabled allEnabled onFilterChange={onFilterChange} />
  );
}

export default injectIntl(withItemCharacteristics(intFilters));
