import React from 'react';
// import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IntlProvider, addLocaleData } from "react-intl";
import { SnackbarProvider } from 'notistack';
import translations from '../i18n/locales';
import frLocaleData from "react-intl/locale-data/fr";
import withMyTheme from '../withMyTheme';
import { indigo } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import Logout from '../auth/Logout';
import About from './About';
import Header from '../navigation/Header';
import Footer from '../navigation/Footer';
import BottomNav from '../navigation/BottomNav';
import MainPageContent from './MainPageContent';
import Dashboard from './Dashboard';
import ChooseHome from './ChooseHome';
import LoadingUserInfo from './LoadingUserInfo';
import AddWizard from './addWizard/AddWizard';
import RegisterWizard from './registerWizard/RegisterWizard';
import LoginWizard from './loginWizard/LoginWizard';

// Date util library (moment like) & date picker:
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// Stores
import { ItemCharacteristicsStore } from "../data/ItemCharacteristicsStore";
import { UserInfoStore, UserInfoConsumer } from "../data/UserInfoStore";
import { Items } from "../data/ItemsStore";


//
// ------------------------  i18n  -------------------------
//

addLocaleData(frLocaleData);



//
// ------------------------  404 minimal page  -------------------------
//

const NotFound = () => <h2>404 error - This page has not been found!</h2>;






class App extends React.Component {

  render() {
    const divStyle = {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: indigo[50],

    };
    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      padding: '14px',
    };
    const stickToBottom = {
    };


    return (
      <SnackbarProvider maxSnack={3}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <UserInfoStore>
            <Items>
              <UserInfoConsumer>
                {({ language, isAuthenticated, getHome, name }) => {
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

                              <Header />

                              <Container maxWidth="md"  style={containerStyle}>

                                <Switch>
                                  <Route
                                    exact path="/add"
                                    component={props => <AddWizard {...props} />}
                                  />
                                  <Route
                                    exact path="/register"
                                    component={props => <RegisterWizard {...props} />}
                                  />
                                  <Route
                                    exact path="/login"
                                    component={props => <LoginWizard {...props} />}
                                  />
                                  <Route
                                    exact path="/logout"
                                    component={props => <Logout {...props} />}
                                  />
                                  <Route
                                    exact path="/about"
                                    component={() => <About />}
                                  />
                                  <Route
                                    exact path="/"
                                    component={props => { 
                                      if(isAuthenticated()) {

                                        // Token exists, but no name --> in userinfo loading process:
                                        if(!name) return <LoadingUserInfo /> ;

                                        // User exists but has not chosen his home yet: ask him to choose!
                                        const home = getHome();
                                        if(!home) return <ChooseHome {...props} />;
                                        
                                        // Authenticated users see their dashboard:
                                        return <Dashboard {...props} />;

                                      } else {
                                        // Non logged users see generic page:
                                        return <MainPageContent {...props} />;
                                      }
                                    }}
                                  />
                                  <Route
                                    exact path="*"
                                    component={NotFound}
                                  
                                  />
                                </Switch>          
                              </Container>

                              { !isAuthenticated() && <Footer location={this.props.location} />}
                              { isAuthenticated() && <BottomNav style={stickToBottom} /> }
                            </div>
                          </Router>
                        </ItemCharacteristicsStore>
                      </IntlProvider>
                    );
                  }}                
                </UserInfoConsumer>  
              </Items>      
            </UserInfoStore>
          </MuiPickersUtilsProvider>
        </SnackbarProvider>
    );
  }
}

export default withMyTheme(App);
