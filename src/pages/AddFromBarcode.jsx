// React
import React from "react";
import { Redirect } from "react-router";
// Redux
import { connect } from "react-redux";
import { itemsActions } from "_actions/itemsActions";
// HOC
import { injectIntl } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
// MUI
// Components
import ScrollToTop from 'pages/utils/ScrollToTop';
import Scanner from 'pages/utils/Scanner';
// Utilities
import { openfoodfactsServices } from '_services/openfoodfactsServices';
// Configuration
// Styles




const styles = theme => ({

  card: {
    margin: -theme.spacing(2),
  },

});

const AddFromBarcode = ({
  // From Redux:
  characteristics,
  classes,
  loggedIn
  // From other HOC:  
//   intl,
//   history,
}) => {

  const [scanning, setScanning] = React.useState(true);
  const [code, setCode] = React.useState();
  const [product, setProduct] = React.useState();


  if (!loggedIn) {
    console.debug("[>>> AddFromBarcode ------>>>----- / >>>] Reason: not logged in");
    return <Redirect to="/" />;
  }

  if ( !characteristics) return null;
  console.debug(`[--- FC ---] Functional component: AddFromBarcode`);

//   const handleClose = () => {
//     console.debug("[<<< AddFromBarcode ------<<<----- / <<<] Reason: close details");

//     gtmPush({
//       event: "AddFromBarcode",
//       action: "Close"
//     });

//     history.goBack();

//     // Strangely, history.push/goBack works here...
//     // if not, should be replaced by a <redirect push> tag in render
//     // but it would redisplay / and dispay from the top of the page
//     // (better use back that goes back at the right place)
//   };




  const _onDetected = async (scannedCode) => {
    console.debug("AddFromBarcode._onDetected - scannedCode=", scannedCode);
    setCode(scannedCode);
    setScanning(false);

    const product = await openfoodfactsServices.fetchProductFromOpenfoodfactsServer(scannedCode);
    console.debug("AddFromBarcode._onDetected - product=", product);
    setProduct(product.product);

    // handleClose();
  };






  return (
    <div className={classes.card}>

        <ScrollToTop />
        {scanning ? <Scanner onDetected={_onDetected}/> : null}

        Code: {code}
        Name: {product && product.product_name}
        Image: <img src={product && product.image_url} alt=""></img>

    </div>
  );
};



function mapStateToProps(state) {
  return {
    characteristics: state.characteristics,
    loggedIn: state.user.loggedIn
  };
}

const mapDispatchToProps = {
  updateItem: itemsActions.updateItem,
  savePicture: itemsActions.savePicture
};

const connectedAddFromBarcode = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddFromBarcode)
);

export default injectIntl(
  withStyles(styles, { withTheme: true })(connectedAddFromBarcode)
);
