/* eslint-disable react-hooks/rules-of-hooks */ 
import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router'
import { connect, useDispatch } from 'react-redux';
import { userActions } from '../_actions/userActions';
import { IntlProvider } from "react-intl";
import { SnackbarProvider } from 'notistack';
import Notifier from './utils/Notifier';
import translations from '../i18n/locales';
import withMyTheme from '../theme/withMyTheme';
import { withStyles } from '@material-ui/core/styles';
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
import Typography from './utils/Typography';
import AddFromBarcode from './AddFromBarcode';



// Date util library (moment like) & date picker:
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';




//
// ------------------------  404 minimal page  -------------------------
//

const NotFound = () => <h2>404 error - This page has not been found!</h2>;




const styles = theme => ({
  divStyle: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    // backgroundColor: theme.palette.primary.superlight,

  },
  containerStyle: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    backgroundColor: theme.palette.primary.superlight,
    padding: theme.spacing(2),
  },
  stickToBottom: {
  },
});




const App = ({autologin, classes, ...props}) => {



  //
  // -------------------- Init -------------------- 
  //

  // Run only once
  // Try to auto-login
  const dispatch = useDispatch();
  useEffect(
    () => dispatch(autologin()),
    [dispatch, autologin] // ==> generates a warning on the console, but only way found to have it executed only once!
  );
  
  if(!props.language){ console.log('app.js - no language');  return null; }

  console.debug("App 0 - props:", props, ", loggedIn:", props.loggedIn, ", home: ", props.home, ", language: ", props.language);

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
              <Router basename={process.env.PUBLIC_URL}>

                <div className={classes.divStyle}>

                  <Header {...props}/>
                  <Container maxWidth="md"  className={classes.containerStyle}>

                    <Switch>
                      <Route
                        exact path="/details/:id"
                        component={Details}
                      />
                      <Route
                        exact path="/add_old"
                        component={AddWizard}
                      />
                      <Route
                        exact path="/add"
                        component={Details}
                      />
                      <Route
                        exact path="/addFromBarcode"
                        component={AddFromBarcode}
                      />
                      <Route
                        exact path="/typography"
                        component={Typography}
                      />                      
                      <Route
                        exact path="/register"
                        component={RegisterWizard}
                      />
                      <Route
                        exact path="/choosehome"
                        component={ChooseHome}
                      />                      
                      <Route
                        exact path="/login"
                        component={LoginWizard}
                      />
                      <Route
                        exact path="/logout"
                        component={Logout}
                      />
                      <Route
                        exact path="/about"
                        component={About}
                      />
                      <Route
                        exact path="/"
                        render={() => { 
                          console.debug("App route / - props:", props, ", loggedIn:", props.loggedIn, ", home: ", props.home, ", language: ", props.language);
                          if(props.loggedIn) {

                            // User exists but has not chosen his home yet: ask him to choose!
                            // if(!props.home) return <Container><ChooseHome /></Container>;
                            if(!props.home){
                              console.debug('[>>> App ------>>>----- choosehome >>>] Reason: no home defined');
                              return <Redirect to='/choosehome'/>
                            }

                            // Token exists, but no name --> in userinfo loading process:
                            if(!props.name) return <LoadingUserInfo /> ;
                            
                            // Authenticated users see their dashboard:
                            return <Dashboard />;

                          } else {
                            // Non logged users see generic page:
                            return <MainPageContent />;
                          }
                        }}
                      />
                      <Route
                        exact path="*"
                        component={NotFound}
                      
                      />
                    </Switch>          
                  </Container>

                  { !props.loggedIn && <Footer location={props.location} />}
                  { props.loggedIn && props.navigationStyle === NavigationStyle.NAVIGATION_BOTTOMNAV && 
                    <BottomNav className={classes.stickToBottom} /> }
                  { props.loggedIn && props.navigationStyle === NavigationStyle.NAVIGATION_FLOATING && 
                    <FloatingNav /> }                              

                </div>
              </Router>
            </>
          </IntlProvider>              
        </MuiPickersUtilsProvider>
      </SnackbarProvider>
  );
}

function mapStateToProps(state) {
  // console.debug("mapStateToProps: ", state);
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

function mapDispatchToProps() {
  return {
    autologin: userActions.autologin
  }
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default withMyTheme(withStyles(styles)(connectedApp));