
// import { REQUEST_CHARACTERISTICS, RECEIVE_CHARACTERISTICS, ERROR_REQUESTING_CHARACTERISTICS } from "../constants/action-types";


// function requestCharacteristics() { return { type: REQUEST_CHARACTERISTICS }; }

// function receiveCharacteristics(json) { return { type: RECEIVE_CHARACTERISTICS, categories: json.categories }; }

//   // Add the All to the list <-- not done in the store, but in the GUIs
//   // const categories = [{ _id: 0, name: 'All' }, ...json.categories];
//   // return {
//   //   type: RECEIVE_CHARACTERISTICS,
//   //   categories,
//   // };

// function errorRequestingCharacteristics(message) { return { type: ERROR_REQUESTING_CHARACTERISTICS, error: message }; }


// export function fetchCharacteristics() { // eslint-disable-line import/prefer-default-export
//   return (dispatch) => {
//     dispatch(requestCharacteristics()); // advertise we are starting a server request
//     return fetch(`${process.env.GATEWAY}/api/categories`)
//       .then(response => response.json())
//       .then(json => dispatch(receiveCharacteristics(json)))
//       .catch(error => dispatch(errorRequestingCharacteristics(error.message)));
//   };
// }
