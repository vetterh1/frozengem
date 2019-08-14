import React from 'react';
import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import { withStyles } from '@material-ui/core/styles';


// const styles = theme => ({
//     stepper: {
//         marginBottom: '15px',
//         textAlign: 'center',
//     },
    
//     dot: {
//         color: 'black',
//         cursor: 'pointer',
//         fontSize: '36px',
//         lineHeight: 1,
//         margin: '0 15px',
//         opacity: '.4',
//         textShadow: 'none',
//     },
    
//     active: {
//         color: 'red',
//         opacity: 1,
//         textShadow: '0 0px 8px',
//     }    
// });


const Stepper = (props, classes) => {
    const dots = [];
    for (let i = 1; i <= props.totalSteps; i += 1) {
        const isActive = props.currentStep === i;
        dots.push((
            <span
                key={`step-${i}`}
                className={`stepper_dot ${isActive ? 'stepper_active' : ''}`}
                // className={clsx(classes.dot, {
                //     [classes.active]: isActive,
                //   })}                
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
    totalSteps: PropTypes.number.isRequired,
    currentStep: PropTypes.number.isRequired,
    // classes: PropTypes.object.isRequired,
}
  

// export default withStyles(styles, { withTheme: true })(Stepper);
export default Stepper;