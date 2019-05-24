import React from 'react';
// import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IntlProvider, addLocaleData } from "react-intl";
import translations from '../i18n/locales';
import frLocaleData from "react-intl/locale-data/fr";
import withMyTheme from '../withMyTheme';
import Container from '@material-ui/core/Container';
import Auth from '../auth/Auth';
import Callback from '../auth/Callback';
import About from './About';
import Header from '../navigation/Header';
import Footer from '../navigation/Footer';
import MainPageContent from './MainPageContent';
import AddWizard from './addWizard/AddWizard';
import RegisterWizard from './registerWizard/RegisterWizard';
import LoginWizard from './loginWizard/LoginWizard';
import Pusher from 'pusher-js';

import { ItemCharacteristicsStore } from "../data/ItemCharacteristicsStore";
import { UserInfoStore, UserInfoConsumer } from "../data/UserInfoStore";


//
// i18n
// 

addLocaleData(frLocaleData);



//
// Auth init
//

const auth = new Auth();

const handleAuthentication = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};



//
// Pusher socket init
//

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

const pusher = new Pusher('e5759208f6ccb0542038', {
  cluster: 'eu',
  forceTLS: true
});

const channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
  alert(JSON.stringify(data));
});
pusher.disconnect();




const NotFound = () => <h2>404 error - This page has not been found!</h2>;




class App extends React.Component {

  render() {
    const divStyle = {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    };
    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    };


    return (
      <UserInfoStore>
        <UserInfoConsumer>
          {({ language }) => {
              return (
                <IntlProvider
                  locale={language}
                  defaultLocale="en"
                  key={language}
                  messages={translations[language]}
                >      
                  <ItemCharacteristicsStore>
                    <Router basename={process.env.PUBLIC_URL}>

                      <div style={divStyle}>

                        <Header auth={auth} />

                        <Container maxWidth="md"  style={containerStyle}>

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
                              component={props => <AddWizard auth={auth} {...props} />}
                            />
                            <Route
                              exact path="/register"
                              component={props => <RegisterWizard auth={auth} {...props} />}
                            />
                            <Route
                              exact path="/login"
                              component={props => <LoginWizard auth={auth} {...props} />}
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
                        </Container>

                        <Footer location={this.props.location} />
                      </div>
                    </Router>
                  </ItemCharacteristicsStore>
                </IntlProvider>
              );
            }}                
          </UserInfoConsumer>        
        </UserInfoStore>
    );
  }
}

// App.propTypes = {
//     // auth: PropTypes.instanceOf(Auth).isRequired,
//     // classes: PropTypes.object.isRequired,
// };

export default withMyTheme(App);
