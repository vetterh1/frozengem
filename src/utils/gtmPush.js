import TagManager from 'react-gtm-module'

const enableGtmString = localStorage.getItem('enableGtm');
const enableGtm = !enableGtmString || enableGtmString === "1";
console.debug("[GTM] enableGtm (from local storage):", enableGtm);

export function gtmInit (args) {
  const tagManagerArgs = { gtmId: "GTM-TFF4FK9", ...args };
  if(enableGtm){
    console.debug("[GTM] gtmInit", tagManagerArgs);
    TagManager.initialize(tagManagerArgs);
  }
};

function gtmPush (args) {
  const tagManagerArgs = { dataLayer: { ...args }};
  if(enableGtm){
    console.debug("[GTM] gtmPush", tagManagerArgs);
    TagManager.dataLayer(tagManagerArgs);
  }
};

export default gtmPush;

