import TagManager from 'react-gtm-module'

export default args => {
  const tagManagerArgs = { gtmId: "GTM-TFF4FK9", ...args };
  TagManager.initialize(tagManagerArgs);
};
