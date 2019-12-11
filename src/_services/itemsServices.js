import qs from 'qs';
import axios from 'axios';
import config from '../data/config'
import {Months} from '../i18n/i18nDates';
import { ExpirationLevel } from "../data/ItemCharacteristicsStore";

export const itemsServices = {
  addUtilityFieldsToItem,
  fetchItems,
  ExpirationLevel
};



function _computeExpirationLevel(dateInMs) {
  const nowInMs = Date.now();
  const oneMonthInMs = 1 * 30 * 24 * 60 * 60 * 1000;
  if( dateInMs < nowInMs ) return ExpirationLevel.EXPIRATION_PASSED;
  if( dateInMs < nowInMs + 1 * oneMonthInMs ) return ExpirationLevel.EXPIRATION_NEXT_30_DAYS;
  if( dateInMs < nowInMs + 3 * oneMonthInMs ) return ExpirationLevel.EXPIRATION_WITHIN_3_MONTHS;
  return ExpirationLevel.EXPIRATION_LATER;
}



  /*
      Adds:
      __detailsArray
      __expirationLevel
      __avatarBackgroundColor
      __cardBackgroundColor
      NO __iconExpiration ==> react component, should not be created here !
      __expirationText
      __categoryText
      __containerText
      __colorText
      __freezerText
      __locationText
      __nameOrCategory
      __sizeInText
      __detailsNames
      __imageExists
      __yearExpiration
      __monthExpirationAsText
  */

//  function addUtilityFieldsToItem(item, language, theme) {

// TODO P1!  deal with itemCharacteristics

 function addUtilityFieldsToItem(item, language) {
    item.__detailsArray = item.details ? item.details.split(",") : [];
    item.__expirationLevel = _computeExpirationLevel(item.expirationDate);
    switch (item.__expirationLevel) {
      case ExpirationLevel.EXPIRATION_PASSED:
        // item.__avatarBackgroundColor = theme.palette.itemCard.avatarBackgroundColor.expired;
        // item.__cardBackgroundColor = theme.palette.itemCard.cardBackgroundColor.expired;
        // item.__iconExpiration = <PanToolIcon />;
        item.__expirationText = {id: 'expiration.message.passed'};
        break;
      case ExpirationLevel.EXPIRATION_NEXT_30_DAYS:
        // item.__avatarBackgroundColor = theme.palette.itemCard.avatarBackgroundColor.next_30_days;
        // item.__cardBackgroundColor = theme.palette.itemCard.cardBackgroundColor.next_30_days;
        // item.__iconExpiration = <PriorityHighIcon />;
        item.__expirationText = {id: 'expiration.message.next_30_days'};
        break;
      case ExpirationLevel.EXPIRATION_WITHIN_3_MONTHS:
        // item.__avatarBackgroundColor = theme.palette.itemCard.avatarBackgroundColor.within_3_months;
        // item.__cardBackgroundColor = theme.palette.itemCard.cardBackgroundColor.within_3_months;
        // item.__iconExpiration = <TimerIcon />;
        item.__expirationText = {id: 'expiration.message.within_3_months'};
        break;
      default:
        // item.__avatarBackgroundColor = theme.palette.itemCard.avatarBackgroundColor.later;
        // item.__cardBackgroundColor = theme.palette.itemCard.cardBackgroundColor.later;
        // item.__iconExpiration = <DoneIcon />;
        item.__expirationText = {id: 'expiration.message.later'};
        break;
    } 

    
    // item.__categoryText = itemCharacteristics.getCategoryName(item.category, language);
    // item.__containerText = itemCharacteristics.getContainerName(item.container, language);
    // item.__colorText = itemCharacteristics.getColorName(item.color, language);
    // item.__freezerText = itemCharacteristics.getFreezerName(item.freezer, language);
    // item.__locationText = itemCharacteristics.getLocationName(item.location, language);
    // item.__nameOrCategory = item.name && item.name.length > 0 ? item.name : item.__categoryText;
    // item.__sizeInText = itemCharacteristics.getSizeLabel(item.size, language);
    // const detailsNamesArray = itemCharacteristics.getDetailsNamesArray(item.__detailsArray, language);
    // item.__detailsNames = detailsNamesArray ? detailsNamesArray.join( ', ') : null;
    item.__imageExists = item.pictureName || item.thumbnailName;

    const expirationAsDate = new Date(item.expirationDate);
    item.__yearExpiration = expirationAsDate.getFullYear();
    const monthExpiration = expirationAsDate.getMonth();
    item.__monthExpirationAsText = Months[language][monthExpiration];
  }


          

//
// Fetch items from Server
//


  async function fetchItems(language, removed = false) {
    console.info('|--- SERVER CALL ---|--- GET ---| itemsServices.fetchItems');
 
    // No token, no fetchItems!
    const token = localStorage.getItem('accessToken');
    if(!token) throw { error: "no token!" };
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user) throw { error: "no user!" };
  
    const params = { 'access_token': token, 'user': user };
    const removedOption = removed ? "/removed" : "";
    const options = {
      method: 'GET',
      url: `${config.boUrl}/items${removedOption}?${qs.stringify(params)}`,
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    };
  
    try {
      const response = await axios(options);
      response.data.forEach(item => {
          addUtilityFieldsToItem(item, language);
        });
      // console.log('fetchItems response: ' , response.data);
      return response.data;
    }
    catch(error) {
      // console.error('fetchItems error: ' , error);
      throw error;
    }
  }
  
  
// const ExpirationLevel = {
//   EXPIRATION_PASSED: 0,
//   EXPIRATION_NEXT_30_DAYS: 1,
//   EXPIRATION_WITHIN_3_MONTHS: 2,
//   EXPIRATION_LATER: 3,
// };
