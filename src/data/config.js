/* eslint-disable no-unused-vars */
import merge from 'lodash/merge'

const locationWithoutPort = 
  window.location.protocol
  + "//"
  + window.location.hostname;

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    masterKey: 'S9EqDPByR2z5mnCMaRFk7b552RWaFcnn',
    version: process.env.REACT_APP_VERSION,
    details_use_clickable_tiles: true,
  },
  test: { },
  development: {
    boUrl: `${locationWithoutPort}:9000`,
    staticUrl: `${locationWithoutPort}:9000`,
  },
  production: {
    boUrl: `${locationWithoutPort}/frozenbo`,
    staticUrl: `${locationWithoutPort}/frozenbo`,
  }
}

const merged = merge(config.all, config[config.all.env])
console.debug("merged:", merged);
export default merged;
