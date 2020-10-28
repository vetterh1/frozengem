/* eslint-disable react-hooks/rules-of-hooks */ 
import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import clsx from "clsx";
import { Redirect } from 'react-router'
import { connect, useDispatch } from 'react-redux';
import { userActions } from '../_actions/userActions';
import { IntlProvider } from "react-intl";
import { SnackbarProvider } from 'notistack';
import Notifier from './utils/Notifier';
import translations from '../i18n/locales';
import withMyTheme from '../theme/withMyTheme';
import { withStyles } from '@material-ui/core/styles';
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
// const Dashboard = lazy(() => import('./Dashboard'));
import Dashboard from './Dashboard';



import Typography from './utils/Typography';


// ------------ Main Pages - Lazy loading -----------

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

// const Typography = lazy(() => import('./utils/Typography'));
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
    paddingBottom: 0,
  },

  containerStyleDensity1: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(1),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1),
    },
  },

  containerStyleDensity2: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(2),
    },
  },

  containerStyleDensity3: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(3),
    },
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
    backgroundColor: theme.transparency ? null : theme.palette.main.backgroundColor,
    // backgroundColor: theme.transparency ? null : theme.palette.primary.light,
  },
});




const App = ({
  autologin,
  classes,
  name,
  language,
  home,
  loggedIn,
  location,
  density,
  navigationStyle
}) => {



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
  
  if(!language){ console.log('app.js - no language');  return null; }

  console.debug("App 0: loggedIn:", loggedIn, ", home: ", home, ", language: ", language);

  return (
    <SnackbarProvider 
      maxSnack={3}
      hideIconVariant
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <IntlProvider
            locale={language}
            defaultLocale="en"
            key={language}
            messages={translations[language]}
          >     
            <> 
              <div className={classes.fixedBackground} />
              <Notifier />

              {/* process.env.PUBLIC_URL is defined in package.json / homepage.
                  here, it's either "" (dev) or "." (prod)
               */}
              <Router basename={process.env.PUBLIC_URL}>
              <Suspense fallback={<div>Loading...</div>}>

                <div className={classes.divStyle}>

                  <Header 
                    classes
                    loggedIn 
                    language 
                    navigationStyle 
                    setLanguage
                  />
                  {/* <Container maxWidth="md"  className={classes.containerStyle}> */}
                  <div className={clsx(
                    classes.containerStyle, 
                    density === 1 && classes.containerStyleDensity1,
                    density === 2 && classes.containerStyleDensity2,
                    density === 3 && classes.containerStyleDensity3,
                  )}>
                    <Switch>
                      <Route
                        exact path="/dashboard"
                        component={Dashboard}
                      />
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
                          console.debug("App route / - loggedIn:", loggedIn, ", home: ", home, ", language: ", language);
                          if(loggedIn) {

                            // User exists but has not chosen his home yet: ask him to choose!
                            // if(!home) return <Container><ChooseHome /></Container>;
                            if(!home){
                              console.debug('[>>> App ------>>>----- choosehome >>>] Reason: no home defined');
                              return <Redirect to='/choosehome'/>
                            }

                            // Token exists, but no name --> in userinfo loading process:
                            if(!name) return <LoadingUserInfo /> ;
                            
                            // Authenticated users see their dashboard:
                            // return <Dashboard />;
                            console.debug('[>>> App ------>>>----- dashboard >>>] Reason: Authenticated user');
                            return <Redirect to='/dashboard'/>


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
                  {/* </Container> */}
                  </div>

                  { !loggedIn && <Footer location={location} />}
                  { loggedIn && navigationStyle === NavigationStyle.NAVIGATION_BOTTOMNAV && 
                    <BottomNav className={classes.stickToBottom} /> }
                  { loggedIn && navigationStyle === NavigationStyle.NAVIGATION_FLOATING && 
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
      density: 2,
    };
  return {
    loggedIn: state.user.loggedIn,
    language: state.user.language,
    name: state.user.name,
    home: state.user.home,
    navigationStyle: state.user.navigationStyle,
    density: state.user.density,
  };
}

function mapDispatchToProps() {
  return {
    autologin: userActions.autologin
  }
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default withMyTheme(withStyles(styles)(connectedApp));