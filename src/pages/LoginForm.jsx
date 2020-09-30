import React from 'react';
import { Redirect } from 'react-router'
import { TextField, Button } from '@material-ui/core';
import { injectIntl } from "react-intl";
import { bindActionCreators } from 'redux';
import { connect  } from 'react-redux';
import { userActions } from '../_actions/userActions';
import { WizPageTitle} from "./utils/WizUtilComponents";
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from "react-intl";
import { withFormik } from "formik";
import * as Yup from 'yup';



const styles = theme => ({
  divWizardPage: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto", 
  },
});



  //  curl -X POST http://0.0.0.0:9000/auth -i -u 123@123.com:123456 -d "access_token=S9EqDPByR2z5mnCMaRFk7b552RWaFcnn"





const LoginForm = props => {
  const {
    // From React: 
    classes,
    isAuthenticated,
    // From intl:
    intl,
    // From Formik: 
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  // Once we are logged-in, let's redirect to the dashboard!
  if (isAuthenticated) { 
    console.debug('[>>> LoginWizard ------>>>----- /dashboard >>>] Reason: authenticated');
    return <Redirect to='/dashboard' />
  };
    
  return (

    <div className={classes.divWizardPage}>

      <div className={"flex-normal-height flex-direction-column"}>

        <WizPageTitle message={intl.formatMessage({id: 'register.title'})} />

        <form onSubmit={handleSubmit} className={"flex-normal-height flex-direction-column"}>

          <div className={"flex-normal-height flex-direction-column"}>

            <div className={"margin-down big-margin-top"}>

              <TextField
                  id="email"
                  autoComplete="email"
                  value={values.email}
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label={intl.formatMessage({id: 'register.email.label'})}
                  helperText={touched.email ? errors.email : ""}
                  // helperText={intl.formatMessage({ id: Boolean(errors.email) ? 'register.email.error' : 'register.email.help'})} // only for register
                  error={touched.email && Boolean(errors.email)}
                  fullWidth
              />
      
            </div>
            
            <div className={"margin-down margin-top"}>

              <TextField
                id="password"
                autoComplete="password"
                value={values.password}
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                label={props.intl.formatMessage({id: 'register.password.label'})}
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
                fullWidth
              />
            
            </div>

          </div>

          <div className={"flex-normal-height flex-direction-row-reverse flex-justify-between big-margin-down big-margin-top"}>
            <Button variant="contained" color="primary" disabled={Boolean(errors.email)} type="submit">
              <FormattedMessage id={"button.ok"} />
            </Button>
          </div>

        </form>

        </div>

      </div>

  );
}


const formikLoginForm = withFormik({
  mapPropsToValues: ({
    email,
    password,
  }) => {
    return {
      email: email || "",
      password: password || "",
    };
  },

  validationSchema: (props) => { 
    console.debug("LoginForm.login - props in validationSchema:", props);  

    return Yup.object().shape({
      email: Yup.string()
        .required(props.intl.formatMessage({id: 'register.email.required'}))
        .email(props.intl.formatMessage({id: 'register.email.error'})),
      password: Yup.string()
        .required(props.intl.formatMessage({id: 'register.password.required'}))
        .min(6, props.intl.formatMessage({id: 'register.password.help'}, {min: 6})),
    });
  },

  handleSubmit: async (values, { props, setSubmitting }) => {
    // console.debug("props:", props);  

    const {email, password} = values;
    await props.login(email, password );
    console.debug("LoginForm.login - after dispatch - email:", email);  

    setSubmitting(false);
  }
})(LoginForm);

const mapStateToProps = state => ({isAuthenticated: state.user.loggedIn});
const connectedFormikLoginForm = connect(
  mapStateToProps, 
  dispatch => bindActionCreators(userActions, dispatch)
)(formikLoginForm);

export default withStyles(styles)(injectIntl(connectedFormikLoginForm));