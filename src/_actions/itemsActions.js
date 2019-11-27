import { defineMessages } from "react-intl";

import qs from 'qs';
import axios from 'axios';
import config from '../data/config'
import {Months} from '../i18n/i18nDates';
import { ExpirationLevel } from "../data/ItemCharacteristicsStore";



import { REQUEST_ITEMS, RECEIVE_ITEMS, ERROR_REQUESTING_ITEMS } from "../_constants/action-types";







const messages = defineMessages({ 
  expirationMessagePassed: {
    id: 'expiration.message.passed',
    defaultMessage: 'Expired!',
  },
  expirationMessageNext_30_days: {
    id: 'expiration.message.next_30_days',
    defaultMessage: 'Expires in a few days!',
  },
  expirationMessageWithin_3_months: {
    id: 'expiration.message.within_3_months',
    defaultMessage: 'Expires withing 3 months',
  },
  expirationMessageLater: {
    id: 'expiration.message.later',
    defaultMessage: 'Expires in more than 3 months',
  },
});







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

 function addUtilityFieldsToItem(item, itemCharacteristics, userInfo, theme) {
    item.__detailsArray = item.details ? item.details.split(",") : [];
    item.__expirationLevel = itemCharacteristics.computeExpirationLevel(item.expirationDate);
    switch (item.__expirationLevel) {
      case ExpirationLevel.EXPIRATION_PASSED:
        item.__avatarBackgroundColor = theme.palette.itemCard.avatarBackgroundColor.expired;
        item.__cardBackgroundColor = theme.palette.itemCard.cardBackgroundColor.expired;
        // item.__iconExpiration = <PanToolIcon />;
        item.__expirationText = messages.expirationMessagePassed;
        break;
      case ExpirationLevel.EXPIRATION_NEXT_30_DAYS:
        item.__avatarBackgroundColor = theme.palette.itemCard.avatarBackgroundColor.next_30_days;
        item.__cardBackgroundColor = theme.palette.itemCard.cardBackgroundColor.next_30_days;
        // item.__iconExpiration = <PriorityHighIcon />;
        item.__expirationText = messages.expirationMessageNext_30_days;
        break;
      case ExpirationLevel.EXPIRATION_WITHIN_3_MONTHS:
        item.__avatarBackgroundColor = theme.palette.itemCard.avatarBackgroundColor.within_3_months;
        item.__cardBackgroundColor = theme.palette.itemCard.cardBackgroundColor.within_3_months;
        // item.__iconExpiration = <TimerIcon />;
        item.__expirationText = messages.expirationMessageWithin_3_months;
        break;
      default:
        item.__avatarBackgroundColor = theme.palette.itemCard.avatarBackgroundColor.later;
        item.__cardBackgroundColor = theme.palette.itemCard.cardBackgroundColor.later;
        // item.__iconExpiration = <DoneIcon />;
        item.__expirationText = messages.expirationMessageLater;
        break;
    } 

    
    item.__categoryText = itemCharacteristics.getCategoryName(item.category, userInfo.language);
    item.__containerText = itemCharacteristics.getContainerName(item.container, userInfo.language);
    item.__colorText = itemCharacteristics.getColorName(item.color, userInfo.language);
    item.__freezerText = itemCharacteristics.getFreezerName(item.freezer, userInfo.language);
    item.__locationText = itemCharacteristics.getLocationName(item.location, userInfo.language);
    item.__nameOrCategory = item.name && item.name.length > 0 ? item.name : item.__categoryText;
    item.__sizeInText = itemCharacteristics.getSizeLabel(item.size, userInfo.language);
    const detailsNamesArray = itemCharacteristics.getDetailsNamesArray(item.__detailsArray, userInfo.language);
    item.__detailsNames = detailsNamesArray ? detailsNamesArray.join( ', ') : null;
    item.__imageExists = item.pictureName || item.thumbnailName;

    const expirationAsDate = new Date(item.expirationDate);
    item.__yearExpiration = expirationAsDate.getFullYear();
    const monthExpiration = expirationAsDate.getMonth();
    item.__monthExpirationAsText = Months[userInfo.language][monthExpiration];
  }


          

//
// Fetch items from Server to Redux store (in Action)
//

// "private" actions, meaning called by other actions below
function _requestItems(dispatch) { dispatch({ type: REQUEST_ITEMS }); }
function _onSuccess(dispatch, json) { dispatch({ type: RECEIVE_ITEMS, items: json.items }); return json.items; }
function _onError(dispatch, error) { dispatch({ type: ERROR_REQUESTING_ITEMS, error }); return error; }


export function fetchItems(token, user, itemCharacteristics, userInfo, theme, removed = false) { // eslint-disable-line import/prefer-default-export
  return async dispatch => {

    console.info('|--- SERVER CALL ---|--- GET ---| fetchItems() loads items from server');

    _requestItems(dispatch); // advertise we are starting a server request

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
            addUtilityFieldsToItem(item, itemCharacteristics, userInfo, theme);
          });
        console.log('fetchItems() response: ', response.data);
        return _onSuccess(dispatch, response);
      }
      catch(error) {
        console.error('fetchItems() error: ', error);
        return _onError(dispatch, error);
      }
    }
}
