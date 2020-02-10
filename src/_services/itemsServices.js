import qs from "qs";
import axios from "axios";
import config from "../data/config";
import { Months } from "../i18n/i18nDates";
import { characteristicsServices } from "./characteristicsServices";

const ExpirationLevel = {
  EXPIRATION_PASSED: 0,
  EXPIRATION_NEXT_30_DAYS: 1,
  EXPIRATION_WITHIN_3_MONTHS: 2,
  EXPIRATION_LATER: 3
};

export const itemsServices = {
  computeItemUtilityFields,
  computeAllItemsUtilityFields,
  fetchItemsFromServer,
  addItemToServer,
  updateItemToServer,
  updatePictureItemToServer,
  removeItemOnServer,
  ExpirationLevel
};

function _computeExpirationLevel(dateInMs) {
  const nowInMs = Date.now();
  const oneMonthInMs = 1 * 30 * 24 * 60 * 60 * 1000;
  if (dateInMs < nowInMs) return ExpirationLevel.EXPIRATION_PASSED;
  if (dateInMs < nowInMs + 1 * oneMonthInMs)
    return ExpirationLevel.EXPIRATION_NEXT_30_DAYS;
  if (dateInMs < nowInMs + 3 * oneMonthInMs)
    return ExpirationLevel.EXPIRATION_WITHIN_3_MONTHS;
  return ExpirationLevel.EXPIRATION_LATER;
}

function _isComplete(item) {
  let isComplete = true;
  if (!item.name || !item.location || !item.freezer || !item.container)
    isComplete = false;

  return isComplete;
}

/*
      Adds:
      __isComplete
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

function computeItemUtilityFields(item, language, characteristics) {
  // NOT PURE !!!
  // Changes item

  item.__detailsArray = item.details ? item.details.split(",") : [];
  item.__expirationLevel = _computeExpirationLevel(item.expirationDate);
  switch (item.__expirationLevel) {
    case ExpirationLevel.EXPIRATION_PASSED:
      item.__avatarBackgroundColor = "expired";
      item.__cardBackgroundColor = "expired";
      // item.__iconExpiration = <PanToolIcon />;
      item.__expirationText = { id: "expiration.message.passed" };
      break;
    case ExpirationLevel.EXPIRATION_NEXT_30_DAYS:
      item.__avatarBackgroundColor = "next_30_days";
      item.__cardBackgroundColor = "next_30_days";
      // item.__iconExpiration = <PriorityHighIcon />;
      item.__expirationText = { id: "expiration.message.next_30_days" };
      break;
    case ExpirationLevel.EXPIRATION_WITHIN_3_MONTHS:
      item.__avatarBackgroundColor = "within_3_months";
      item.__cardBackgroundColor = "within_3_months";
      // item.__iconExpiration = <TimerIcon />;
      item.__expirationText = { id: "expiration.message.within_3_months" };
      break;
    default:
      item.__avatarBackgroundColor = "later";
      item.__cardBackgroundColor = "later";
      // item.__iconExpiration = <DoneIcon />;
      item.__expirationText = { id: "expiration.message.later" };
      break;
  }

  const rawFields = {
    category: item.category,
    container: item.container,
    color: item.color,
    freezer: item.freezer,
    location: item.location,
    size: item.size,
    detailsArray: item.__detailsArray
  };

  const characteristicsUtilityFields = characteristicsServices.getCharacteristicsUtilityFields(
    rawFields,
    language,
    characteristics
  );

  item.__categoryText = characteristicsUtilityFields.category;
  item.__containerText = characteristicsUtilityFields.container;
  item.__colorText = characteristicsUtilityFields.color;
  item.__freezerText = characteristicsUtilityFields.freezer;
  item.__locationText = characteristicsUtilityFields.location;
  item.__nameOrCategory =
    item.name && item.name.length > 0 ? item.name : item.__categoryText;
  item.__sizeInText = item.removed ? "-" : characteristicsUtilityFields.size;
  const detailsNamesArray = characteristicsUtilityFields.detailsArray;
  item.__detailsNames = detailsNamesArray ? detailsNamesArray.join(", ") : null;
  item.__imageExists = item.pictureName || item.thumbnailName;

  const expirationAsDate = new Date(item.expirationDate);
  item.__yearExpiration = expirationAsDate.getFullYear();
  const monthExpiration = expirationAsDate.getMonth();
  item.__monthExpirationAsText = Months[language][monthExpiration];

  item.__isComplete = _isComplete(item);
}

function computeAllItemsUtilityFields(items, language, characteristics) {
  // NOT PURE !!!
  // Changes items

  items.forEach(item =>
    computeItemUtilityFields(item, language, characteristics)
  );
  return items;
}

//
// Fetch items from Server
//

async function fetchItemsFromServer(user, characteristics, removed = false) {
  console.debug(
    "|--- SERVER CALL ---|--- GET ---| itemsServices.fetchItemsFromServer"
  );

  // No token, no fetchItemsFromServer!
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error({ error: "no token!" });
  if (!user) throw new Error({ error: "no user!" });

  const params = { access_token: token, user: user };
  const removedOption = removed ? "/removed" : "";
  const options = {
    method: "GET",
    url: `${config.boUrl}/items${removedOption}?${qs.stringify(params)}`,
    crossdomain: true,
    headers: { "content-type": "application/x-www-form-urlencoded" }
  };

  try {
    const response = await axios(options);
    return computeAllItemsUtilityFields(
      response.data,
      user.language,
      characteristics
    );
  } catch (error) {
    // console.error('fetchItemsFromServer error: ' , error);
    throw error;
  }
}

async function addItemToServer(item, user) {
  console.debug(
    "|--- SERVER CALL ---|--- POST ---| Items.addItemToServer: ",
    item
  );
  const data = { access_token: user.accessToken, ...item };
  data.details = item.detailsArray.join();
  const options = {
    method: "POST",
    url: `${config.boUrl}/items`,
    crossdomain: true,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(data)
  };

  try {
    // console.debug('addItemToServer options: ' , options);
    const response = await axios(options);
    // console.debug('addItemToServer OK: ' , response.data);
    return response.data;
  } catch (error) {
    console.error("register error: ", error);
    throw error;
  }
}

async function updateItemToServer(id, updates, user) {
  const data = { access_token: user.accessToken, ...updates };
  const options = {
    method: "PUT",
    url: `${config.boUrl}/items/${id}`,
    crossdomain: true,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(data)
  };
  console.debug(
    "|--- SERVER CALL ---|--- PUT ---| Items.updateItemToServer: ",
    options
  );

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error("register error: ", error);
    throw error;
  }
}

async function updatePictureItemToServer(id, picture, thumbnail, user) {
  console.debug(
    "|--- SERVER CALL ---|--- PUT ---| Items.updatePictureItemToServer: ",
    id
  );

  //
  // Prepare the multipart parameters for the form-data
  // with the id, the token and the 2 images (picture and thumbnail)
  //
  // (!) the name of the images MUST be setup here and will be used as filename
  // on the server side
  //
  let formData = new FormData(); // instantiate it
  formData.set("id", id);
  formData.set("access_token", user.accessToken);
  formData.append("picture", picture, `${id}-picture-${Date.now()}.jpg`);
  formData.append("picture", thumbnail, `${id}-thumbnail-${Date.now()}.jpg`);

  const options = {
    method: "POST",
    url: `${config.boUrl}/items/picture`,
    crossdomain: true,
    headers: { "content-type": "multipart/form-data" },
    data: formData
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error("updatePictureItemToServer error: ", error);
    throw error;
  }
}

async function removeItemOnServer(id, user, size) {
  console.debug(
    "|--- SERVER CALL ---|--- POST ---| Items.removeItemOnServer: ",
    id,
    size
  );
  const data = { access_token: user.accessToken };
  if (size && size !== "0") data["size"] = size;
  const options = {
    method: "POST",
    url: `${config.boUrl}/items/remove/${id}`,
    crossdomain: true,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(data)
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error("removeItemOnServer error: ", error);
    throw error;
  }
}
