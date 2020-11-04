/**
 * Combines/merges Material UI styles so that they may be used on a single
 * component with the "withStyles" HOC.
 *
 * @see {@link https://github.com/mui-org/material-ui/issues/11517#issuecomment-407509327}
 * @see {@link https://material-ui.com/customization/css-in-js/}
 *
 * Usage:
 *
 *   import { combineStyles } from '/path/to/thisFile';
 *
 *   import { style1 } from '/path/to/style1';
 *   import { style2 } from '/path/to/style1';
 *
 *   const style3 = theme => ({
 *     toolbar: {
 *       backgroundColor: theme.palette.primary.main,
 *       color: '#fff',
 *       ...theme.mixins.toolbar,
 *     }
 *   });
 *
 *   const combinedStyles = combineStyles(style1, style2, style3);
 *
 *   export default withStyles(combinedStyles)(MyComponent);
 *
 * @param {...Object|Function} styles The objects and functions that should be
 *   merged.
 * @return {!Function} The merged styles function to pass to "withStyles".
 */
function combineStyles(...styles) {
    return function CombineStyles(theme) {
      const outStyles = styles.map((arg) => {
        // Apply the "theme" object for style functions.
        if (typeof arg === 'function') {
          return arg(theme);
        }
        // Objects need no change.
        return arg;
      });
  
      return outStyles.reduce((acc, val) => Object.assign(acc, val));
    };
  }
  
  export default combineStyles;