import React from 'react';
import PropTypes from 'prop-types';

const Stepper = ({totalSteps, currentStep}) => {
    if(totalSteps === undefined || currentStep === undefined) return null;
    
    const dots = [];
    for (let i = 1; i <= totalSteps; i += 1) {
        const isActive = currentStep === i;
        dots.push((
            <span
                key={`step-${i}`}
                className={`stepper_dot ${isActive ? 'stepper_active' : ''}`}           
            >
                &bull;
            </span>
        ));
    }

    return (
        <div className='text-center small-margin-down'>{dots}</div>
    );
};


Stepper.propTypes = {
    totalSteps: PropTypes.number,
    currentStep: PropTypes.number,
}
  

// export default withStyles(styles, { withTheme: true })(Stepper);
export default Stepper;