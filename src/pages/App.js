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
import Logout from '../navigation/Logout';
import About from './About';
import Header from '../navigation/Header';
import Footer from '../navigation/Footer';
import BottomNav from '../navigation/BottomNav';
import FloatingNav from '../navigation/FloatingNav';
import MainPageContent from './MainPageContent';
import Dashboard from './Dashboard';
import Details from './Details';
import ChooseHome from './ChooseHome';
import LoadingUserInfo from './LoadingUserInfo';
import AddWizard from './addWizard/AddWizard';
import RegisterWizard from './registerWizard/RegisterWizard';
import LoginWizard from './loginWizard/LoginWizard';
import { NavigationStyle } from '../navigation/configNavigation'



// Date util library (moment like) & date picker:
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// Stores
import { ItemCharacteristicsStore } from "../data/ItemCharacteristicsStore";
import { UserInfoStore, UserInfoConsumer  } from "../data/UserInfoStore";
import { Items } from "../data/ItemsStore";


//
// ------------------------  i18n  -------------------------
//

addLocaleData(frLocaleData);



//
// ------------------------  404 minimal page  -------------------------
//

const NotFound = () => <h2>404 error - This page has not been found!</h2>;





const intApp = (props) => {

  const divStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: indigo[50],

  };
  // const containerStyle = {
  //   display: "flex",
  //   flexDirection: "column",
  //   flexGrow: 1,
  //   padding: '14px',
  // };
  const stickToBottom = {
  };



  return (
    <SnackbarProvider 
      maxSnack={3}
      hideIconVariant
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <UserInfoStore>
          <Items>
            <UserInfoConsumer>
              {({ language, isAuthenticated, getHome, name, navigationStyle }) => {
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

                            {/* <Container maxWidth="md"  style={containerStyle}> */}

                              <Switch>
                                <Route
                                  exact path="/details/:id"
                                  component={props => <Container><Details {...props} /></Container>}
                                />
                                <Route
                                  exact path="/add"
                                  component={props => <Container><AddWizard {...props} /></Container>}
                                />
                                <Route
                                  exact path="/register"
                                  component={props => <Container><RegisterWizard {...props} /></Container>}
                                />
                                <Route
                                  exact path="/login"
                                  component={props => <Container><LoginWizard {...props} /></Container>}
                                />
                                <Route
                                  exact path="/logout"
                                  component={props => <Logout {...props} />}
                                />
                                <Route
                                  exact path="/about"
                                  component={() => <Container><About /></Container>}
                                />
                                <Route
                                  exact path="/"
                                  component={props => { 
                                    if(isAuthenticated()) {

                                      // Token exists, but no name --> in userinfo loading process:
                                      if(!name) return <LoadingUserInfo /> ;

                                      // User exists but has not chosen his home yet: ask him to choose!
                                      const home = getHome();
                                      console.log("home: ", home)
                                      if(!home) return <Container><ChooseHome {...props} /></Container>;
                                      
                                      // Authenticated users see their dashboard:
                                      return <Dashboard {...props} />;

                                    } else {
                                      // Non logged users see generic page:
                                      return <Container><MainPageContent {...props} /></Container>;
                                    }
                                  }}
                                />
                                <Route
                                  exact path="*"
                                  component={NotFound}
                                
                                />
                              </Switch>          
                            {/* </Container> */}

                            { !isAuthenticated() && <Footer location={props.location} />}
                            { isAuthenticated() && navigationStyle === NavigationStyle.NAVIGATION_BOTTOMNAV && 
                              <BottomNav style={stickToBottom} /> }
                            { isAuthenticated() && navigationStyle === NavigationStyle.NAVIGATION_FLOATING && 
                              <FloatingNav /> }                              

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

export default withMyTheme(intApp);
