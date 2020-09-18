import React from 'react';
import { Redirect } from 'react-router'
import { TextField } from '@material-ui/core';
import { injectIntl } from "react-intl";
import { WizNavBar, WizPageTitle} from "../utils/WizUtilComponents";
import validateEmail from "../../utils/validateEmail";
import { withFormik } from "formik";
import * as Yup from 'yup';

const EmailForm = props => {
  const {
    // From React: 
    classes,
    // From Wizard:
    isActive,
    nextStep,
    // From intl:
    intl,
    // From Formik: 
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;



  // handleTextChange(event) {
  //   if(!this.props.isActive) return;
  //   const {value} = event.target;
  //   if(value === this.props.state.email) return;
  //   // Verify if email is valid (Next btn only if valid!)
  //   if(validateEmail(value) !== this.state.validData)
  //     this.setState((state) => { return {validData: !state.validData}; })
  //   // Save in parent
  //   this.props.handleChange({name: 'email', value});
  // }
  
  // handleNext = (e) => {
  //   //e.preventDefault should always be the first thing in the function
  //   e.preventDefault();

  //   nextStep(); 
  // };

    // const {name} = this.props.state;
    // if(this.props.isActive && name === "") {
    //   console.debug('[>>> Login:EmailForm ------>>>----- / >>>] Reason: name is empty');
    //   return <Redirect to='/' />
    // }

    // // State is NOT stored in this wizard tab, but in the parent (wizard component)
    // const { state } = this.props;
    // const { email } = state;
    // const {validData} = this.state;
    
  return (

      <div className={"flex-normal-height flex-direction-column"}>

        <WizPageTitle message={intl.formatMessage({id: 'register.email.title'})} />

        <form onSubmit={handleSubmit} className={"flex-normal-height flex-direction-column"}>

          <div className={"flex-normal-height flex-direction-column"}>

            <TextField
                id="email"
                autoComplete="email"
                value={values.email}
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                label={intl.formatMessage({id: 'register.email.label'})}
                helperText={intl.formatMessage({ id: Boolean(errors.email) ? 'register.email.error' : 'register.email.help'})}
                error={touched.email && Boolean(errors.email)}
                fullWidth
                // inputRef={textInput} 
              />
      
          </div>

          <WizNavBar nextIsSubmit isNextDisabled={Boolean(errors.email)} />

        </form>

      </div>

  );
}


const EmailFormikForm = withFormik({
  mapPropsToValues: ({
    email,
  }) => {
    return {
      email: email || "",
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
  }),

  handleSubmit: (values, { setSubmitting }) => {
    // nextStep();
    // setTimeout(() => {
    //   // submit to the server
    //   alert(JSON.stringify(values, null, 2));
    //   setSubmitting(false);
    // }, 1000);
  }
})(EmailForm);

// export default withStyles(styles)(Form);

export default injectIntl(EmailFormikForm);