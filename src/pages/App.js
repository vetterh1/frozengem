/* eslint-disable react-hooks/rules-of-hooks */ 
import React, { useEffect, Suspense, lazy } from 'react';
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
import { NavigationStyle } from '../navigation/configNavigation'
// Date util library (moment like) & date picker:
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';





// ------------ Navigation -----------

// const Header = lazy(() => import('../navigation/Header'));
import Header from '../navigation/Header';
// const Footer = lazy(() => import('../navigation/Footer'));
import Footer from '../navigation/Footer';
// const BottomNav = lazy(() => import('../navigation/BottomNav'));
import BottomNav from '../navigation/BottomNav';
// const Logout = lazy(() => import('../navigation/Logout'));
import Logout from '../navigation/Logout';
// const FloatingNav = lazy(() => import('../navigation/FloatingNav'));
import FloatingNav from '../navigation/FloatingNav';


// ------------ Main Pages -----------

// const Details = lazy(() => import('./Details'));
import Details from './Details';
// const LoadingUserInfo = lazy(() => import('./LoadingUserInfo'));
import LoadingUserInfo from './LoadingUserInfo';
// const MainPageContent = lazy(() => import('./MainPageContent'));
import MainPageContent from './MainPageContent';


// ------------ Main Pages - Lazy loading -----------

const Dashboard = lazy(() => import('./Dashboard'));
// import Dashboard from './Dashboard';
const AddWizard = lazy(() => import('./addWizard/AddWizard'));
// import AddWizard from './addWizard/AddWizard';
const AddFromBarcode = lazy(() => import('./AddFromBarcode'));
// import AddFromBarcode from './AddFromBarcode';


// ------------ Login / Register Pages - Lazy loading -----------

const LoginForm = lazy(() => import('./LoginForm'));
// import LoginForm from './LoginForm';
const ChooseHome = lazy(() => import('./ChooseHome'));
// import ChooseHome from './ChooseHome';
const RegisterWizard = lazy(() => import('./registerWizard/RegisterWizard'));
// import RegisterWizard from './registerWizard/RegisterWizard';


// ------------ Misc Pages - Lazy loading -----------

const Typography = lazy(() => import('./utils/Typography'));
// import Typography from './utils/Typography';
const About = lazy(() => import('./About'));
// import About from './About';



//
// ------------------------  404 minimal page  -------------------------
//

const NotFound = () => <h2>404 error - This page has not been found!</h2>;




const styles = theme => ({
  divStyle: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  containerStyle: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: 0,
  },
  stickToBottom: {
  },


  fixedBackground: {
    zIndex: -1,
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",

    backgroundImage: theme.transparency ? "url(bg-snow.jpg)" : null,
    backgroundSize: theme.transparency ? "cover" : null,
    backgroundPosition: theme.transparency ? "center center" : null,
    backgroundColor: theme.transparency ? null : theme.palette.primary.light,
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
            <div className={classes.fixedBackground}></div>

            <Notifier />

              {/* process.env.PUBLIC_URL is defined in package.json / homepage.
                  here, it's either "" (dev) or "." (prod)
               */}
              <Router basename={process.env.PUBLIC_URL}>
              <Suspense fallback={<div>Loading...</div>}>

                <div className={classes.divStyle}>

                  <Header {...props}/>
                  <Container maxWidth="md"  className={classes.containerStyle}>

                    <Switch>
                    <Route
                        exact path="/details/:id"
                        component={Details}
                      />
                      <Route
                        exact path="/new/:id"
                        component={Details}
                      />
                      <Route
                        exact path="/add"
                        component={AddWizard}
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
                        component={LoginForm}
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
              </Suspense>
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