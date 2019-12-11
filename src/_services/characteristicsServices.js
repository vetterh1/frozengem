import qs from 'qs';
import axios from 'axios';
import config from '../data/config'


export const characteristicsServices = {
  fetchCharacteristics,
};


//
// Fetch characteristics from Server
//


  async function fetchCharacteristics() {
    console.info('|--- SERVER CALL ---|--- GET ---| characteristicsServices.fetchCharacteristics');
 
    // No token, no fetchCharacteristics!
    const token = localStorage.getItem('accessToken');
    if(!token) throw { error: "no token!" };
  
    const params = { 'access_token': token };
    const options = {
      method: 'GET',
      url: `${config.boUrl}/characteristics?${qs.stringify(params)}`,
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    };
  
    try {
      const response = await axios(options);
      console.log('fetchCharacteristics response: ' , response.data);
      return response.data;
    }
    catch(error) {
      console.error('fetchCharacteristics error: ' , error);
      throw error;
    }
  }
