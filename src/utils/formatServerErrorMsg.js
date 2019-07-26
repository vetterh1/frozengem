/* eslint-disable no-useless-escape */

export default function formatServerErrorMsg(exception, msg, location) {
    console.error(`|--- SERVER CALL ---|!!! ERROR !!!| ${location} : ` , exception);

    let errorStatus = '?';

    if (exception.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error data: ', exception.response.data);
      console.error('Error status: ', exception.response.status);
      console.error('Error headers: ', exception.response.headers);
      errorStatus = exception.response.status;
    } else if (exception.request) {
      // The request was made but no response was received
      // `exception.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('Error request: ', exception.request);
      errorStatus = exception.response.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error unknown: ', exception.message);
      errorStatus = exception.response.message;
    }

    return `${msg} - ${errorStatus}`;
}