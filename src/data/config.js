/* eslint-disable no-unused-vars */
import merge from 'lodash/merge'

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    masterKey: 'S9EqDPByR2z5mnCMaRFk7b552RWaFcnn',
    version: process.env.REACT_APP_VERSION,
  },
  test: { },
  development: {
    boUrl: 'http://localhost:9000',
    staticUrl: 'http://localhost:9000',
  },
  production: {
    boUrl: 'https://frozengem.com/frozenbo',
    staticUrl: 'https://frozengem.com/frozenbo',
  }
}

const merged = merge(config.all, config[config.all.env])
console.log("merged:", merged);
export default merged;
