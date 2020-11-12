import qs from 'qs';
import axios from 'axios';
import config from 'data/config'


export const characteristicsServices = {
  fetchCharacteristics,
  getCharacteristicsUtilityFields,
  getDefaultExpirationInMonths
};


//
// Fetch characteristics from Server
//


async function fetchCharacteristics() {
  console.debug('|--- SERVER CALL ---|--- GET ---| characteristicsServices.fetchCharacteristics');

  // No token, no fetchCharacteristics!
  const token = localStorage.getItem('accessToken');
  if(!token) throw new Error({ error: "no token!" });

  const params = { 'access_token': token };
  const options = {
    method: 'GET',
    url: `${config.boUrl}/characteristics?${qs.stringify(params)}`,
    crossdomain : true,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  };

  try {
    const response = await axios(options);
    console.debug('[CharacteristicsServices] Fetch characteristics response: ' , response.data);
    return response.data;
  }
  catch(error) {
    console.error('[CharacteristicsServices] Fetch characteristics error: ' , error);
    throw error;
  }
}



function getCharacteristicsUtilityFields(rawFields, language, characteristics) {
  const computatedFields = {};
  const { categories, details, containers, colors, freezers, locations, sizes } = characteristics;

  if(rawFields.category) {
    const foundCategory = categories.find(aCategory => aCategory.id2 === rawFields.category);
    computatedFields.category = foundCategory ? foundCategory.name[language] : null;
  }

  if(rawFields.container) {
    const foundContainer = containers.find(aContainer => aContainer.id2 === rawFields.container);
    computatedFields.container = foundContainer ? foundContainer.name[language] : null;
  }

  if(rawFields.color) {
    const foundColor = colors.find(aColor => aColor.id2 === rawFields.color);
    computatedFields.color = foundColor ? foundColor.name[language] : null;
  }

  if(rawFields.freezer) {
    const foundFreezer = freezers.find(aFreezer=> aFreezer.id2 === rawFields.freezer);
    computatedFields.freezer = foundFreezer? foundFreezer.name[language] : null;
  }

  if(rawFields.location) {
    const foundLocation = locations.find(aLocation => aLocation.id2 === rawFields.location);
    computatedFields.location = foundLocation ? foundLocation.name[language] : null;
  }

  if(rawFields.size) {
    const sizeInString = rawFields.size.toString();
    const foundSize = sizes.find(aSize => aSize.id2 === sizeInString);
    computatedFields.size = foundSize ? foundSize.label[language] : null;
  }

  if(rawFields.detailsArray) {
    computatedFields.detailsArray = rawFields.detailsArray.map(aPassedDetail => {
      const foundDetail = details.find(aDetail => aDetail.id2 === aPassedDetail)
      return foundDetail ? foundDetail.name[language] : null;
    })
  }

  if(rawFields.category && rawFields.details) {
    // Find the expiration & expiration exceptions for this category
    const aCategory = categories.find(aCategory => aCategory.id2 === rawFields.category);
    const {expiration, expirationMinusPlus} = aCategory;
    // console.debug('getDefaultExpirationInMonths: expiration=', expiration, " - expirationMinusPlus=", expirationMinusPlus);

    // Find the expiration by taking the category expiration value
    // then + or - the exceptions
    let expirationInMonth = parseInt(expiration);
    rawFields.details.forEach(detail => {
      const variation = expirationMinusPlus[detail];
      // console.debug('getDefaultExpirationInMonths: variation=', variation);

      if(variation) {
          const intVariation = parseInt(variation);
          expirationInMonth += intVariation
          // console.debug('getDefaultExpirationInMonths: intVariation=', intVariation, " - expirationInMonth=", expirationInMonth);
      }
    });
    console.debug("[CharacteristicsServices] getDefaultExpirationInMonths=" + expirationInMonth);
    computatedFields.expirationInMonth = expirationInMonth;
  }

  return computatedFields;
}


function getDefaultExpirationInMonths(category, detailsArray, characteristics) {
  console.debug('[CharacteristicsServices] getDefaultExpirationInMonths: category=', category, " - detailsArray=", detailsArray);
  console.debug('[CharacteristicsServices] getDefaultExpirationInMonths: this.state=', this.state);
  if(!category || !detailsArray) return null;

  // const { categories, detailsArray } = characteristics;
  const { categories } = characteristics;

  // Find the expiration & expiration exceptions for this category
  const aCategory = categories.find(aCategory => aCategory.id2 === category);
  const {expiration, expirationMinusPlus} = aCategory;
  // console.debug('getDefaultExpirationInMonths: expiration=', expiration, " - expirationMinusPlus=", expirationMinusPlus);

  // Find the expiration by taking the category expiration value
  // then + or - the exceptions
  let expirationInMonth = parseInt(expiration);
  detailsArray.forEach(detail => {
    const variation = expirationMinusPlus[detail];
    // console.debug('getDefaultExpirationInMonths: variation=', variation);

    if(variation) {
        const intVariation = parseInt(variation);
        expirationInMonth += intVariation
        // console.debug('getDefaultExpirationInMonths: intVariation=', intVariation, " - expirationInMonth=", expirationInMonth);
    }
  });

  console.debug("[CharacteristicsServices] getDefaultExpirationInMonths=" + expirationInMonth);
  return expirationInMonth;
}