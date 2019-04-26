import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import withMyTheme from '../withMyTheme';
import Auth from '../auth/Auth';
import Callback from '../auth/Callback';
import About from './About';
import MainAppBar from '../navigation/MainAppBar';
import MainPageContent from './MainPageContent';
import AddContainer from './AddContainer';

const auth = new Auth();

const handleAuthentication = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

const NotFound = () => <h2>404 error - This page has not been found!</h2>;


class App extends React.Component {

  render() {
    return (
      <Router>

        <MainAppBar auth={auth} />

        <Switch>
          <Route
            exact path="/callback"
            component={(props) => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
          <Route
            exact path="/add"
            component={props => <AddContainer auth={auth} {...props} />}
          />
          <Route
            exact path="/about"
            component={() => <About />}
          />
          <Route
            exact path="/"
            component={props => <MainPageContent auth={auth} {...props} />}
          />
          <Route
            exact path="*"
            component={NotFound}
            auth={auth}
          />
        </Switch>          

      </Router>
    );
  }
}

App.propTypes = {
    // auth: PropTypes.instanceOf(Auth).isRequired,
    classes: PropTypes.object.isRequired,
};

export default withMyTheme(App);


//         <footer className="page-footer amber lighten-3">
//           <div className="container">
//             <div className="row">
//               <div className="col l6 s12">
//                 <h5 className="black-text">Why?</h5>
//                 <p className="black-text text-lighten-4">This project was started out of despair. Despair everytime we discard food because we don't remember what it is, when it was added. Despair every other night when we don't know what to cook... even though we know we have put so many good homemade leftovers in the freezer... but not / badly labelled!</p>
//               </div>
//             </div>
//           </div>
//           <div className="footer-copyright">
//             <div className="container black-text text-lighten-3">
//             Made by <a className="black-text text-lighten-3" href="https://food-maniac.com/about">Laurent Vetterhoeffer</a>
//             </div>
//           </div>
//         </footer>
