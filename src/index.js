import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
// import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import combinedReducer from './_reducers/combinedReducer';
// import { fetchItems } from './_actions/itemsActions';

import './index.css';
import App from './pages/App';
import * as serviceWorker from './serviceWorker';



//
// --------------- Init Redux actions & reducers ---------------
//

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const reduxMiddleware = applyMiddleware(thunk, createLogger());
const reduxMiddleware = applyMiddleware(thunk);

const store = createStore(
  combinedReducer,
  composeEnhancers(reduxMiddleware));


//
// --------------- Init Redux store with Server data ---------------
//

// store.dispatch(fetchItems());   ==> not here, only possible when user is signed in!
// store.dispatch(fetchItemCharacteristics());



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
  


//
// --------------- MAIN RENDER ---------------
//

ensureIntlSupport().then(
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')));



//
// ---------------------------- PWA -------------------------------
//
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
