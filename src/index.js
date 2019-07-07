import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import * as serviceWorker from './serviceWorker';


// ------------------  i18n  ---------------------
// Polyfill for Intl, not supported on old browsers
// like IE10 or Safari.
function ensureIntlSupport() {
    if (window.Intl) return Promise.resolve();
    return new Promise((resolve) => {
      resolve(require('intl'));
    })
    .then(() => Promise.all([
      require('intl/locale-data/jsonp/en.js'),
      require('intl/locale-data/jsonp/fr.js'),
    ]));
  }
  

ensureIntlSupport().then(
    ReactDOM.render(<App />, document.getElementById('root'))
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
