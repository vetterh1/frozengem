import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { itemsActions } from "../_actions/itemsActions";
import { Redirect } from "react-router";
import { injectIntl } from "react-intl";
// import { injectIntl, FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
// import { Button, Divider, Typography } from "@material-ui/core";
// import Person from "@material-ui/icons/Person";
// import PersonOutline from "@material-ui/icons/PersonOutline";
// import PictureSelection from "./utils/PictureSelection";
// import CategoryButton from "./utils/CategoryButton";
// import RemoveButton from "./utils/RemoveButton";
// import { gtmPush } from "../utils/gtmPush";
// import SectionBlock from "./utils/SectionBlock";
import ScrollToTop from './utils/ScrollToTop';
// import ItemImage from "./utils/ItemImage";
// import clsx from "clsx";

import Scanner from './utils/Scanner';
import { openfoodfactsServices } from '../_services/openfoodfactsServices';


const styles = theme => ({

  card: {
    margin: -theme.spacing(2),
  },

});

const AddFromBarcode = ({
  characteristics,
  classes,
//   intl,
//   history,
  loggedIn
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
        Image: <img src={product && product.image_url} alt="product image"></img>

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
