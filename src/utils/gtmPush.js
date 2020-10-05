import TagManager from 'react-gtm-module'

const enableGtm = true;

export function gtmInit (args) {
  const tagManagerArgs = { gtmId: "GTM-TFF4FK9", ...args };
  if(enableGtm)
    TagManager.initialize(tagManagerArgs);
};

export function gtmPush (args) {
  const tagManagerArgs = { dataLayer: { ...args }};
  if(enableGtm){
    console.debug("gtmPush", tagManagerArgs);
    TagManager.dataLayer(tagManagerArgs);
  }
};
