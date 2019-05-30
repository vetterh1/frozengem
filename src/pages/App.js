import React from 'react';
// import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IntlProvider, addLocaleData } from "react-intl";
import translations from '../i18n/locales';
import frLocaleData from "react-intl/locale-data/fr";
import withMyTheme from '../withMyTheme';
import Container from '@material-ui/core/Container';
import Auth from '../auth/Auth';
import Logout from '../auth/Logout';
import About from './About';
import Header from '../navigation/Header';
import Footer from '../navigation/Footer';
import BottomNav from '../navigation/BottomNav';
import MainPageContent from './MainPageContent';
import Dashboard from './Dashboard';
import AddWizard from './addWizard/AddWizard';
import RegisterWizard from './registerWizard/RegisterWizard';
import LoginWizard from './loginWizard/LoginWizard';
// import Pusher from 'pusher-js';
import { SnackbarProvider } from 'notistack';


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




//
// Pusher socket init
//

// Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;

// const pusher = new Pusher('e5759208f6ccb0542038', {
//   cluster: 'eu',
//   forceTLS: true
// });

// const channel = pusher.subscribe('my-channel');
// channel.bind('my-event', function(data) {
//   alert(JSON.stringify(data));
// });
// pusher.disconnect();




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
    const stickToBottom = {
    };


    return (
      <SnackbarProvider maxSnack={3}>
        <UserInfoStore>
          <UserInfoConsumer>
            {({ language }) => {
                if(!language) return null;
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
                                exact path="/logout"
                                component={props => <Logout auth={auth} {...props} />}
                              />
                              <Route
                                exact path="/about"
                                component={() => <About />}
                              />
                              <Route
                                exact path="/"
                                component={props => { return( auth.authenticated ?  <Dashboard auth={auth} {...props} /> : <MainPageContent auth={auth} {...props} />) }}
                              />
                              <Route
                                exact path="*"
                                component={NotFound}
                                auth={auth}
                              />
                            </Switch>          
                          </Container>

                          <Footer location={this.props.location} />
                          {auth.authenticated && <BottomNav style={stickToBottom} auth={auth} />}
                        </div>
                      </Router>
                    </ItemCharacteristicsStore>
                  </IntlProvider>
                );
              }}                
            </UserInfoConsumer>        
          </UserInfoStore>
        </SnackbarProvider>
    );
  }
}

// App.propTypes = {
//     // auth: PropTypes.instanceOf(Auth).isRequired,
//     // classes: PropTypes.object.isRequired,
// };

export default withMyTheme(App);
