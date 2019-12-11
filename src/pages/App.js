import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { userActions } from '../_actions/userActions';
import { IntlProvider, addLocaleData } from "react-intl";
import { SnackbarProvider } from 'notistack';
import Notifier from './utils/Notifier';
import translations from '../i18n/locales';
import frLocaleData from "react-intl/locale-data/fr";
import enLocaleData from "react-intl/locale-data/en";
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


//
// ------------------------  i18n  -------------------------
//

addLocaleData(frLocaleData);
addLocaleData(enLocaleData);



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

  //
  // -------------------- Init -------------------- 
  //

  // Run only once
  // Try to auto-login
  useEffect(() => props.autologin(), []);

  
  if(!props.language) return null;

  console.log("/ 0 - props:", props, ", loggedIn:", props.loggedIn, ", home: ", props.home, ", language: ", props.language);

  return (
    <SnackbarProvider 
      maxSnack={3}
      hideIconVariant
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <IntlProvider
            locale={props.language}
            defaultLocale="en"
            key={props.language}
            messages={translations[props.language]}
          >     
            <> 
            <Notifier />
            <ItemCharacteristicsStore>
              <Router basename={process.env.PUBLIC_URL}>

                <div style={divStyle}>

                  <Header />

                  {/* <Container maxWidth="md"  style={containerStyle}> */}

                    <Switch>
                      <Route
                        exact path="/details/:id"
                        component={props => <Container><Details /></Container>}
                      />
                      <Route
                        exact path="/add"
                        component={props => <Container><AddWizard /></Container>}
                      />
                      <Route
                        exact path="/register"
                        component={props => <Container><RegisterWizard /></Container>}
                      />
                      <Route
                        exact path="/login"
                        component={props => <Container><LoginWizard /></Container>}
                      />
                      <Route
                        exact path="/logout"
                        component={props => <Logout />}
                      />
                      <Route
                        exact path="/about"
                        component={() => <Container><About /></Container>}
                      />
                      <Route
                        exact path="/"
                        render={() => { 
                          console.log("/ 1 - props:", props, ", loggedIn:", props.loggedIn, ", home: ", props.home, ", language: ", props.language);
                          if(props.loggedIn) {

                            // Token exists, but no name --> in userinfo loading process:
                            if(!props.name) return <LoadingUserInfo /> ;

                            // User exists but has not chosen his home yet: ask him to choose!
                            if(!props.home) return <Container><ChooseHome /></Container>;
                            
                            // Authenticated users see their dashboard:
                            return <Dashboard />;

                          } else {
                            // Non logged users see generic page:
                            return <Container><MainPageContent /></Container>;
                          }
                        }}
                      />
                      <Route
                        exact path="*"
                        component={NotFound}
                      
                      />
                    </Switch>          
                  {/* </Container> */}

                  { !props.loggedIn && <Footer location={props.location} />}
                  { props.loggedIn && props.navigationStyle === NavigationStyle.NAVIGATION_BOTTOMNAV && 
                    <BottomNav style={stickToBottom} /> }
                  { props.loggedIn && props.navigationStyle === NavigationStyle.NAVIGATION_FLOATING && 
                    <FloatingNav /> }                              

                </div>
              </Router>
            </ItemCharacteristicsStore>
            </>
          </IntlProvider>              
        </MuiPickersUtilsProvider>
      </SnackbarProvider>
  );
}

function mapStateToProps(state) {
  console.log("mapStateToProps: ", state);
  if(!state.user)
    return {
      loggedIn: false,
      language: "en",
      name: null,
      home: null,
      navigationStyle: null,
    };
  return {
    loggedIn: state.user.loggedIn,
    language: state.user.language,
    name: state.user.name,
    home: state.user.home,
    navigationStyle: state.user.navigationStyle,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autologin: () => dispatch(userActions.autologin())
  }
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(intApp);

export default withMyTheme(connectedApp);