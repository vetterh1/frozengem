import React, { useEffect } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import config from "../data/config";
import { itemsActions } from "../_actions/itemsActions";
import { userActions } from "../_actions/userActions";
import { Redirect } from "react-router";
import { injectIntl, FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import { Button, Divider, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Person from "@material-ui/icons/Person";
import PersonOutline from "@material-ui/icons/PersonOutline";
import HelpIcon from "@material-ui/icons/Help";
import PictureSelection from "./utils/PictureSelection";
import CategoryButton from "./utils/CategoryButton";
import RemoveButton from "./utils/RemoveButton";
import { gtmPush } from "../utils/gtmPush";
import SectionBlock from "./utils/SectionBlock";
import ScrollToTop from "./utils/ScrollToTop";
import ItemImage from "./utils/ItemImage";
import Joyride, { STATUS } from "react-joyride";
// import { it } from "date-fns/esm/locale";

const styles = theme => ({
  card: {
    margin: -theme.spacing(2)
  },

  details_image_section: {
    display: "flex",
    position: "relative",
    flexDirection: "column"
  },
  details_image_media: {
    height: "25vh"
  },
  details_image_close: {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "5px 10px",
    color: "white"
  },
  details_image_code: {
    position: "absolute",
    right: "30px",
    top: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "10px",
    color: "white"
  },
  details_image_camera: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "10px",
    color: "white"
  },
  details_image_category: {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "5px 10px",
    color: "white"
  },
  details_remove: {
    position: "absolute",
    top: "-12px",
    left: "-8px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white"
  },
  details_help: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    zLayer: "2000"
  }
});

const Details = ({
  isNew = false,
  item,
  characteristics,
  removeItem,
  updateItem,
  duplicateItem,
  savePicture,
  classes,
  intl,
  history,
  loggedIn,
  detailsHelpCompleted,
  setDetailsHelpCompleted
}) => {
  useEffect(() => {
    if (isNew && item) {
      const idInput = `input-${item.id}`;
      document.getElementById(idInput).click();
      console.debug("simulate click on ", idInput);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if (!loggedIn || !characteristics) {
    console.debug(
      "[>>> Details ------>>>----- / >>>] Reason: not logged in or empty characteristics"
    );
    return <Redirect to="/" />;
  }
  const createNewItem = item ? false : true;

  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  console.debug(
    "[--- FC ---] Functional component: Details - createNewItem = ",
    createNewItem, 
    " - item = ",
    item ? item : "N/A"
  );

  const handleClose = () => {
    console.debug("[<<< Details ------<<<----- / <<<] Reason: close details");

    gtmPush({
      event: "Details",
      action: "Close"
    });

    history.goBack();

    // Strangely, history.push/goBack works here...
    // if not, should be replaced by a <redirect push> tag in render
    // but it would redisplay / and dispay from the top of the page
    // (better use back that goes back at the right place)
  };

  const _handleRemove = async () => {
    removeItem(item.id, 0);
    handleClose();
  };

  const _handleUpdateQuantity = async ({ size }) => {
    removeItem(item.id, size);
    if (size === "0") handleClose();
  };

  const _handleUpdateCharacteristic = async update => {
    console.debug("ItemCard._handleUpdateCharacteristic: ", item.id, update);
    if (update) updateItem(item.id, update);
    return null;
  };

  const _handleSavePicture = (pictureData, thumbnailData) => {
    savePicture(item.id, pictureData, thumbnailData);
  };

  const _handleDuplicate = async () => {
    // Duplicate the current item 
    const duplicatedItem = await duplicateItem(item.id);
    // Then go to the new item!
    history.push(`/details/${duplicatedItem.id}`);
  };

  //
  // Create Size icon array
  //

  const sizeInIcons = [];
  if (item) {
    for (let i = 0; i < item.size; i++) {
      sizeInIcons.push(<Person style={{ fontSize: 20 }} key={i.toString()} />);
    }
    if (item.size > 1)
      sizeInIcons.push(
        <PersonOutline style={{ fontSize: 20 }} key={item.size.toString()} />
      );
  }

  //
  // Add "remove / 0" option to the quantity list
  //

  const zero = {
    id2: "0",
    label: {
      en: intl.formatMessage({ id: "item.remove.from_freezer" }),
      fr: intl.formatMessage({ id: "item.remove.from_freezer" })
    },
    name: {
      en: intl.formatMessage({ id: "item.remove.nothing" }),
      fr: intl.formatMessage({ id: "item.remove.nothing" })
    }
  };
  const sizesWith0 = [zero, ...characteristics.sizes];

  const dateToDisplay = item
    ? `${item.__monthExpirationAsText} ${item.__yearExpiration}`
    : null;

  //
  // Misc string / help text configuration
  //
  const dialogHelpName = intl.formatMessage({ id: "add.name.help" });
  const dialogHelpDate = intl.formatMessage({ id: "add.date.help" });

  //
  // Help setup
  //

  const helpSteps = [
    {
      target: "body",
      title: intl.formatMessage({ id: "action.edit" }),
      content: intl.formatMessage({ id: "help.details.welcome" }),
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      placement: "center",
    },
    {
      target: "body",
      title: intl.formatMessage({ id: "action.edit" }),
      content: intl.formatMessage({ id: "help.details.edit" }),
      // disableBeacon: true,
      // disableOverlayClose: true,
      // hideCloseButton: true,
      placement: "center",
    },
    {
      target: ".cam_icon",
      title: intl.formatMessage({ id: "action.edit" }),
      content: intl.formatMessage({ id: "help.details.camera" }),
      // disableBeacon: true,
      // disableOverlayClose: true,
      // hideCloseButton: true
    },
    {
      target: "#tile_details_update_name",
      title: intl.formatMessage({ id: "action.edit" }),
      content: intl.formatMessage({ id: "help.details.name" }),
      // disableBeacon: true,
      // disableOverlayClose: true,
      // hideCloseButton: true
    },
    {
      target: "#tile_details_update_details",
      title: intl.formatMessage({ id: "action.edit" }),
      content: intl.formatMessage({ id: "help.details.details" }),
      // disableBeacon: true,
      // disableOverlayClose: true,
      // hideCloseButton: true
    },
    {
      target: "#tile_details_update_location",
      title: intl.formatMessage({ id: "action.edit" }),
      content: intl.formatMessage({ id: "help.details.location" }),
      // disableBeacon: true,
      // disableOverlayClose: true,
      // hideCloseButton: true
    },
    // {
    //   target: "#tile_details_update_container",
    //   content: intl.formatMessage({ id: "help.details.incomplete" }),
    //   // disableBeacon: true,
    //   // disableOverlayClose: true,
      // hideCloseButton: true,
    // },
    {
      target: ".MuiCardMedia-root ",
      title: intl.formatMessage({ id: "help.details.image.title" }),
      content: intl.formatMessage({ id: "help.details.image" }),
      // disableBeacon: true,
      // disableOverlayClose: true,
      // hideCloseButton: true
    },
    {
      target: ".code_id",
      title: intl.formatMessage({ id: "help.details.important" }),
      content: intl.formatMessage({ id: "help.details.code" }),
      // disableBeacon: true,
      // disableOverlayClose: true,
      // hideCloseButton: true
    },
    {
      target: "#tile_details_update_size",
      title: intl.formatMessage({ id: "help.details.important" }),
      content: intl.formatMessage({ id: "help.details.quantity" }),
      // disableBeacon: true,
      // disableOverlayClose: true,
      // hideCloseButton: true
    },
    {
      target: ".MuiFab-root",
      title: intl.formatMessage({ id: "help.details.important" }),
      content: intl.formatMessage({ id: "help.details.remove" }),
      // disableBeacon: true,
      // disableOverlayClose: true,
      // hideCloseButton: true
    },
    {
      target: ".help_btn",
      title: intl.formatMessage({ id: "action.help" }),
      content: intl.formatMessage({ id: "help.details.help" }),
      // disableBeacon: true,
      // disableOverlayClose: true,
      // hideCloseButton: true,
    },
  ];
  const handleJoyrideCallback = data => {
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
      console.debug("handleJoyrideCallback: detailsHelpCompleted --> true!");
      setDetailsHelpCompleted(true);
    }
  };
  const _handleHelp = async () => {
    console.debug("handleJoyrideCallback: detailsHelpCompleted --> true!");
    setDetailsHelpCompleted(!detailsHelpCompleted);
    return null;
  };



  //
  // RENDER
  //

  return (
    <div className={classes.card}>
      <ScrollToTop />
      {!detailsHelpCompleted && (
        <Joyride
          steps={helpSteps}
          callback={handleJoyrideCallback}
          disableScrolling={true}
          debug={true}
          continuous={true}
          showProgress={true}
          scrollToFirstStep={true}
          locale={{
            back: intl.formatMessage({ id: "button.previous" }),
            close: intl.formatMessage({ id: "button.close" }),
            last: intl.formatMessage({ id: "button.end" }),
            next: intl.formatMessage({ id: "button.continue" }),
            skip: intl.formatMessage({ id: "button.skip" })
          }}
          run={true}
          styles={{
            options: {
              primaryColor: "#303f9f"
            }
          }}
        />
      )}
      {/*
      ********************************************************************
                Picture section with Return and Picture buttons
      ********************************************************************
      */}
      <section
        className={clsx(
          classes.details_image_section,
          (!item || !item.pictureName) && "stitched"
        )}
      >
        {item && (
          <ItemImage
            item={item}
            style={{
              height: "25vh"
            }}
          />
        )}
        <Button
          color="primary"
          component={Link}
          to="/"
          className={classes.details_image_close}
        >
          &lt; &nbsp; <FormattedMessage id="button.backtolist" />
        </Button>
        {item && (
          <Typography
            className={clsx(classes.details_image_code, "code_id")}
            variant="h4"
            color="textSecondary"
            component="p"
          >
            {item ? item.code : "-"}
          </Typography>
        )}
        <CategoryButton
          categoryText={item ? item.__categoryText : ""}
          dialogTitle={intl.formatMessage({ id: "characteristics.category" })}
          dialogItems={characteristics.categories}
          dialogPreselectedItems={item ? item.category : null}
          onOk={_handleUpdateCharacteristic}
          className={clsx(
            classes.details_image_category,
            (!item || !item.category) && "stitched"
          )}
        />
        <PictureSelection
          className={clsx(
            classes.details_image_camera,
            (!item || !item.pictureName) && "stitched",
            "cam_icon"
          )}
          itemId={item ? item.id : null}
          iconOnlyButton
          onPicture={_handleSavePicture}
          label={intl.formatMessage({
            id: (item && item.__imageExists) ? "camera.replace" : "camera.add"
          })}
        />
        <IconButton
          component="span"
          color="primary"
          aria-label="Help"
          className={clsx(classes.details_help, "help_btn")}
          onClick={_handleHelp}
        >
          <HelpIcon />
        </IconButton>
      </section>
      <div className={"medium-padding"}>
        {/*
        ********************************************************************
                        Name section
        ********************************************************************
        */}
        <section className={"flex-direction-column"}>
          <SectionBlock
            characteristicName="name"
            isText={true}
            main={item ? item.name : "-"}
            mainTypography="h2"
            secondary={null}
            dialogTitle={intl.formatMessage({ id: "characteristics.name" })}
            dialogHelp={dialogHelpName}
            dialogItems={sizesWith0}
            dialogPreselectedItems={item ? item.name : null}
            onOk={_handleUpdateCharacteristic}
            showOkBtn={true}
          />
          <Divider className={"margin-top margin-down"}></Divider>
          {/*
          ********************************************************************
                          Details section
          ********************************************************************
          */}
          <SectionBlock
            characteristicName="details"
            main={item ? item.__detailsNames : "-"}
            dialogTitle={intl.formatMessage({ id: "characteristics.details" })}
            dialogItems={characteristics.details}
            dialogPreselectedItems={item ? item.__detailsArray : null}
            multiselection={true}
            dialogDefaultIconName={item ? "category" + item.category : null}
            onOk={_handleUpdateCharacteristic}
          />
        </section>
        <Divider className={"margin-top margin-down"}></Divider>
        {/*
        ********************************************************************
                        Quantity and Date section
        ********************************************************************
        */}
        <section className={"flex-direction-row flex-justify-between"}>
          <SectionBlock
            characteristicName="size"
            main={sizeInIcons}
            secondary={item ? item.__sizeInText : "-"}
            dialogTitle={intl.formatMessage({ id: "characteristics.size" })}
            dialogItems={sizesWith0}
            dialogPreselectedItems={(item && item.size) ? item.size.toString() : null}
            onOk={_handleUpdateQuantity}
            additionalButton={<RemoveButton onOk={_handleRemove} />}
          />
          {config.details_use_clickable_tiles && (
            <RemoveButton onOk={_handleRemove} isFAB={true} showLabel={false} />
          )}
          <SectionBlock
            characteristicName="expirationDate"
            isDate={true}
            main={dateToDisplay}
            secondary={(item && item.__expirationText) ? intl.formatMessage(item.__expirationText) : "-"}
            dialogTitle={intl.formatMessage({ id: "characteristics.date" })}
            dialogHelp={dialogHelpDate}
            dialogPreselectedItems={item ? item.expirationDate : null}
            onOk={_handleUpdateCharacteristic}
            showOkBtn={true}
          />
        </section>
        <Divider className={"margin-top margin-down"}></Divider>
        {/*
        ********************************************************************
                        Container and Color section
        ********************************************************************
        */}
        <section className={"flex-direction-row flex-justify-between"}>
          <SectionBlock
            characteristicName="container"
            main={(item && item.__containerText) ? item.__containerText : "-"}
            secondary={intl.formatMessage({ id: "characteristics.container" })}
            dialogTitle={intl.formatMessage({
              id: "characteristics.container"
            })}
            dialogItems={characteristics.containers}
            dialogPreselectedItems={item ? item.container : null}
            onOk={_handleUpdateCharacteristic}
          />
          <SectionBlock
            characteristicName="color"
            main={(item && item.__colorText) ? item.__colorText : "-"}
            secondary={intl.formatMessage({ id: "characteristics.color" })}
            dialogTitle={intl.formatMessage({ id: "characteristics.color" })}
            dialogItems={characteristics.colors}
            dialogPreselectedItems={(item && item.color) ? item.color : null}
            onOk={_handleUpdateCharacteristic}
          />
        </section>
        <Divider className={"margin-top margin-down"}></Divider>
        {/*
        ********************************************************************
                        Freezer and Location section
        ********************************************************************
        */}
        <section className={"flex-direction-row flex-justify-between"}>
          <SectionBlock
            characteristicName="freezer"
            main={(item && item.__freezerText) ? item.__freezerText : "-"}
            secondary={intl.formatMessage({ id: "characteristics.freezer" })}
            dialogTitle={intl.formatMessage({ id: "characteristics.freezer" })}
            dialogItems={characteristics.freezers}
            dialogPreselectedItems={(item && item.freezer) ? item.freezer : null}
            onOk={_handleUpdateCharacteristic}
          />
          <SectionBlock
            characteristicName="location"
            main={(item && item.__locationText) ? item.__locationText : "-"}
            secondary={intl.formatMessage({ id: "characteristics.location" })}
            dialogTitle={intl.formatMessage({ id: "characteristics.location" })}
            dialogItems={characteristics.locations}
            dialogPreselectedItems={(item && item.location) ? item.location : null}
            onOk={_handleUpdateCharacteristic}
          />
        </section>
        {/*
        ********************************************************************
                        Bottom buttons (add, duplicate,...)
        ********************************************************************
        */}
        <Divider className={"margin-top margin-down"}></Divider>
        <section className={"flex-normal-height flex-direction-row flex-justify-between margin-down"}>
            {/* <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/"
              className={classes.button}
            >
              <FormattedMessage id="button.backhome" />
            </Button> */}
            <Button
              variant="contained"
              color="secondary"
              onClick={_handleDuplicate}
              className={`flex-direction-column  flex-align-center text-center flex-basis-48 small-padding-top small-padding-bottom`}
            >
              <FormattedMessage id="button.duplicate" />
            </Button>
            {isNew && (
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/add"
                className={`flex-direction-column  flex-align-center text-center flex-basis-48 small-padding-top small-padding-bottom`}
              >
                <FormattedMessage id="button.addnew" />
              </Button>
            )}
        </section>
      </div>
    </div>
  );
};

// Details.propTypes = {
//   // Props from caller
//   sizes: PropTypes.array,

//   // Props from redux
//   item: PropTypes.object,

//   // Props from other HOC
//   classes: PropTypes.object.isRequired,
//   intl: PropTypes.object.isRequired,
// }

function mapStateToProps(state, ownProps) {
  console.debug(
    "Details.mapStateToProps - ownProps, match, params=",
    ownProps,
    ownProps.match,
    ownProps.match.params
  );
  const id = ownProps.match.params.id;
  const isNew = ownProps.match.path.startsWith("/new/");
  return {
    isNew: isNew,
    item: id ? state.items.list.find(item => item.id === id) : null,
    characteristics: state.characteristics,
    loggedIn: state.user.loggedIn,
    detailsHelpCompleted: state.user.detailsHelpCompleted
  };
}

const mapDispatchToProps = {
  updateItem: itemsActions.updateItem,
  removeItem: itemsActions.removeItem,
  savePicture: itemsActions.savePicture,
  duplicateItem: itemsActions.duplicateItem,
  setDetailsHelpCompleted: userActions.setDetailsHelpCompleted
};

const connectedDetails = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Details)
);

export default injectIntl(
  withStyles(styles, { withTheme: true })(connectedDetails)
);
