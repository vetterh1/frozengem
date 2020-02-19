import axios from "axios";


export const openfoodfactsServices = {
  fetchProductFromOpenfoodfactsServer,
};

//
// Fetch product info from openfoodfacts Server
//

async function fetchProductFromOpenfoodfactsServer(code) {
  console.debug(
    "|--- SERVER CALL ---|--- GET ---| openfoodfactsServices.fetchProductFromOpenfoodfactsServer"
  );
  const options = {
    method: "GET",
    url: `https://world.openfoodfacts.org/api/v0/product/${code}.json`,
    crossdomain: true,
    headers: { "content-type": "application/x-www-form-urlencoded" }
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error('fetchProductFromOpenfoodfactsServer error: ' , error);
    throw error;
  }
}
