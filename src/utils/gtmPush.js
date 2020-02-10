import TagManager from 'react-gtm-module'

export function gtmInit (args) {
  const tagManagerArgs = { gtmId: "GTM-TFF4FK9", ...args };
  TagManager.initialize(tagManagerArgs);
};

export function gtmPush (args) {
  const tagManagerArgs = { dataLayer: { ...args }};
  console.debug("gtmPush", tagManagerArgs);
  TagManager.dataLayer(tagManagerArgs);
};
