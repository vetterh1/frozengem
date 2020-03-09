import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";
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
import HelpIcon from '@material-ui/icons/Help';
import PictureSelection from "./utils/PictureSelection";
import CategoryButton from "./utils/CategoryButton";
import RemoveButton from "./utils/RemoveButton";
import { gtmPush } from "../utils/gtmPush";
import SectionBlock from "./utils/SectionBlock";
import ScrollToTop from "./utils/ScrollToTop";
import ItemImage from "./utils/ItemImage";
import Joyride, { STATUS } from 'react-joyride';

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
    right: "10px",
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
    bottom: "50px",
    right: "-6px",
  },
});

const Details = ({
  item,
  characteristics,
  removeItem,
  updateItem,
  savePicture,
  classes,
  intl,
  history,
  loggedIn,
  detailsHelpCompleted,
  setDetailsHelpCompleted
}) => {
  if (!loggedIn) {
    console.debug("[>>> Details ------>>>----- / >>>] Reason: not logged in");
    return <Redirect to="/" />;
  }

  if (!item) {
    console.debug("[>>> Details ------>>>----- / >>>] Reason: item not found");
    return <Redirect push to="/" />;
  }

  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (!item || !characteristics) return null;
  console.debug(`[--- FC ---] Functional component: Details - id=${item.id}`);

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

  const handleSavePicture = (pictureData, thumbnailData) => {
    savePicture(item.id, pictureData, thumbnailData);
  };

  const sizeInIcons = [];
  for (let i = 0; i < item.size; i++) {
    sizeInIcons.push(<Person style={{ fontSize: 20 }} key={i.toString()} />);
  }
  if (item.size > 1)
    sizeInIcons.push(
      <PersonOutline style={{ fontSize: 20 }} key={item.size.toString()} />
    );

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

  const dateToDisplay = `${item.__monthExpirationAsText} ${item.__yearExpiration}`;

  const dialogTitle = intl.formatMessage(
    { id: "item.edit" },
    { category: item.__categoryText }
  );
  const dialogHelpName = intl.formatMessage({ id: "add.name.help" });
  const dialogHelpDate = intl.formatMessage({ id: "add.date.help" });

  const helpSteps = [
    {
      target: ".MuiFab-root",
      content: intl.formatMessage({ id: "help.details.remove" })
    },
    {
      target: "#tile_details_update_container",
      content: intl.formatMessage({ id: "help.details.tiles" })
    },
    {
      target: ".code_id",
      content: intl.formatMessage({ id: "help.details.code" })
    },
    {
      target: ".cam_icon",
      content: intl.formatMessage({ id: "help.details.camera" })
    },
    {
      target: ".MuiCardMedia-root ",
      content: intl.formatMessage({ id: "help.details.image" })
    }
  ];


  const handleJoyrideCallback = data => {
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
      console.debug("handleJoyrideCallback: detailsHelpCompleted --> true!")
      setDetailsHelpCompleted(true);
    }
  };
  
  const _handleHelp = async () => {
    console.debug("handleJoyrideCallback: detailsHelpCompleted --> true!")
    setDetailsHelpCompleted(!detailsHelpCompleted);
    return null;
  };  


  return (
    <div className={classes.card}>
      <ScrollToTop />
      {!detailsHelpCompleted &&
        <Joyride
          steps={helpSteps}
          callback={handleJoyrideCallback}
          debug={true}
          continuous={true}
          showProgress={true}
          locale={{
            back: intl.formatMessage({ id: "button.previous" }),
            close: intl.formatMessage({ id: "button.close" }),
            last: intl.formatMessage({ id: "button.end" }),
            next: intl.formatMessage({ id: "button.continue" }),
            skip: intl.formatMessage({ id: "button.skip" }),
          }}
          styles={{
            options: {
              primaryColor: '#303f9f',
            }
          }}        
        />
      }
      {/*
      ********************************************************************
                Picture section with Return and Picture buttons
      ********************************************************************
      */}
      <section
        className={clsx(
          classes.details_image_section,
          !item.pictureName && "stitched"
        )}
      >
        <ItemImage
          item={item}
          style={{
            height: "25vh"
          }}
        />
        <Button
          onClick={handleClose}
          color="primary"
          className={classes.details_image_close}
        >
          &lt; &nbsp; <FormattedMessage id="button.back" />
        </Button>
        <Typography
          className={clsx(classes.details_image_code, "code_id")}
          variant="h4"
          color="textSecondary"
          component="p"
        >
          {item.code}
        </Typography>
        <CategoryButton
          categoryText={item.__categoryText}
          dialogTitle={intl.formatMessage({ id: "characteristics.category" })}
          dialogItems={characteristics.categories}
          dialogPreselectedItems={item.category}
          onOk={_handleUpdateCharacteristic}
          className={clsx(
            classes.details_image_category,
            !item.category && "stitched"
          )}
        />
        <PictureSelection
          className={clsx(
            classes.details_image_camera,
            !item.pictureName && "stitched",
            "cam_icon"
          )}
          itemId={item.id}
          iconOnlyButton
          onPicture={handleSavePicture}
          label={intl.formatMessage({
            id: item.__imageExists ? "camera.replace" : "camera.add"
          })}
        />
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
            main={item.name}
            mainTypography="h2"
            secondary={null}
            dialogTitle={intl.formatMessage({ id: "characteristics.name" })}
            dialogHelp={dialogHelpName}
            dialogItems={sizesWith0}
            dialogPreselectedItems={item.name}
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
            main={item.__detailsNames}
            dialogTitle={intl.formatMessage({ id: "characteristics.details" })}
            dialogItems={characteristics.details}
            dialogPreselectedItems={item.__detailsArray}
            multiselection={true}
            dialogDefaultIconName={"category" + item.category}
            onOk={_handleUpdateCharacteristic}
          />
        </section>
        <Divider className={"margin-top margin-down"}></Divider>
        {/*
        ********************************************************************
                        Quantity and Date section
        ********************************************************************
        */}
        <section className={"flex-direction-row flex-justify-around"}>
          <SectionBlock
            characteristicName="size"
            main={sizeInIcons}
            secondary={item.__sizeInText}
            dialogTitle={intl.formatMessage({ id: "characteristics.size" })}
            dialogItems={sizesWith0}
            dialogPreselectedItems={item.size.toString()}
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
            secondary={intl.formatMessage(item.__expirationText)}
            dialogTitle={intl.formatMessage({ id: "characteristics.date" })}
            dialogHelp={dialogHelpDate}
            dialogPreselectedItems={item.expirationDate}
            onOk={_handleUpdateCharacteristic}
            showOkBtn={true}
          />
        </section>
        <Divider className={"margin-top margin-down"}></Divider>
        {/*
        ********************************************************************
                        Freezer and Location section
        ********************************************************************
        */}
        <section className={"flex-direction-row flex-justify-around"}>
          <SectionBlock
            characteristicName="freezer"
            main={item.__freezerText}
            secondary={intl.formatMessage({ id: "characteristics.freezer" })}
            dialogTitle={intl.formatMessage({ id: "characteristics.freezer" })}
            dialogItems={characteristics.freezers}
            dialogPreselectedItems={item.freezer}
            onOk={_handleUpdateCharacteristic}
          />
          <SectionBlock
            characteristicName="location"
            main={item.__locationText}
            secondary={intl.formatMessage({ id: "characteristics.location" })}
            dialogTitle={intl.formatMessage({ id: "characteristics.location" })}
            dialogItems={characteristics.locations}
            dialogPreselectedItems={item.location}
            onOk={_handleUpdateCharacteristic}
          />
        </section>
        <Divider className={"margin-top margin-down"}></Divider>
        {/*
        ********************************************************************
                        Container and Color section
        ********************************************************************
        */}
        <section className={"flex-direction-row flex-justify-around"}>
          <SectionBlock
            characteristicName="container"
            main={item.__containerText}
            secondary={intl.formatMessage({ id: "characteristics.container" })}
            dialogTitle={intl.formatMessage({
              id: "characteristics.container"
            })}
            dialogItems={characteristics.containers}
            dialogPreselectedItems={item.container}
            onOk={_handleUpdateCharacteristic}
          />
          <SectionBlock
            characteristicName="color"
            main={item.__colorText}
            secondary={intl.formatMessage({ id: "characteristics.color" })}
            dialogTitle={intl.formatMessage({ id: "characteristics.color" })}
            dialogItems={characteristics.colors}
            dialogPreselectedItems={item.color}
            onOk={_handleUpdateCharacteristic}
          />
        </section>
        <section>
          <IconButton
            component="span"
            color="primary"
            aria-label="Help"
            className={clsx(classes.details_help)}
            onClick={_handleHelp}
          >
            <HelpIcon />
          </IconButton>
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
  const id = ownProps.match.params.id;
  if (!id) return { item: null };

  return {
    item: state.items.list.find(item => item.id === id),
    characteristics: state.characteristics,
    loggedIn: state.user.loggedIn,
    detailsHelpCompleted: state.user.detailsHelpCompleted,
  };
}

const mapDispatchToProps = {
  updateItem: itemsActions.updateItem,
  removeItem: itemsActions.removeItem,
  savePicture: itemsActions.savePicture,
  setDetailsHelpCompleted: userActions.setDetailsHelpCompleted,
};

const connectedDetails = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Details)
);

export default injectIntl(
  withStyles(styles, { withTheme: true })(connectedDetails)
);
