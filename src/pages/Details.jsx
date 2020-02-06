import React from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { itemsActions } from "../_actions/itemsActions";
import { Redirect } from "react-router";
import { injectIntl, FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import config from "../data/config";
import {
  Button,
  CardMedia,
  Divider,
  Typography
} from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import PersonOutline from "@material-ui/icons/PersonOutline";
import { getIcon, IconRemove } from "../data/Icons";
import PictureSelection from "./utils/PictureSelection";
import ButtonToModal from "./utils/ButtonToModal";
import CharacteristicsSelection from "./utils/CharacteristicsSelection";
import DateSelection from "./utils/DateSelection";
import TextSelection from "./utils/TextSelection";
import DialogMinimal from "./utils/DialogMinimal";
import TagManager from 'react-gtm-module'

const styles = theme => ({
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
    padding: "5px",
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
});

const CharacteristicsButton = ({
  characteristicName,
  isText = false,
  isDate = false,
  btnLabelId,
  dialogTitle,
  dialogHelp,
  dialogItems,
  dialogPreselectedItems,
  multiselection = false,
  onOk
}) => {
  // console.debug("CharacteristicsButton : characteristicName, isText, isDate = ", characteristicName, isText, isDate);
  return (
    <ButtonToModal
      btnLabelId={btnLabelId}
      onOk={onOk}
    >
      {(!isText && !isDate) ?
        <CharacteristicsSelection
          id={"details_update_" + characteristicName}
          name={characteristicName}
          title={dialogTitle}
          handleChange={null} // filled by parent (when cloning this component)
          items={dialogItems}
          initialValue={dialogPreselectedItems}
          multiselection={multiselection}
        />
      : 
      (
        (isText && !isDate) ?
          <TextSelection
            id={"details_update_" + characteristicName}
            name={characteristicName}
            title={dialogTitle}
            help={dialogHelp}
            initialValue={dialogPreselectedItems}
          />
        :
          <DateSelection
            id={"details_update_" + characteristicName}
            name={characteristicName}
            title={dialogTitle}
            help={dialogHelp}
            parentUpdateValue={() => {}} // filled by parent (when cloning this component)
            initialValue={dialogPreselectedItems}
          />
      )}
    </ButtonToModal>
  );
};

const RemoveButton = ({
  onOk
}) => {
  return (
    <ButtonToModal
      btnLabelId="action.remove"
      onOk={onOk}
      alternateBtnIcon={
        <IconRemove style={{ fontSize: "15px", display: "flex" }} />
      }
    >
      <DialogMinimal id="details_remove_item" idTitle="item.remove.from_freezer" idSubtitle="item.remove.confirmation.title" idBody="item.remove.confirmation.text" />
    </ButtonToModal>
  );
};


const SectionBlock = ({
  characteristicName,
  isText = false,
  isDate = false,
  main,
  secondary,
  dialogTitle,
  dialogHelp,
  dialogItems,
  dialogPreselectedItems,
  onOk,
  additionalButton = null
}) => {
  const classUncomplete = main ? null : "stitched"
  console.debug("test")
  return (
    <div className={`flex-direction-column  flex-align-center flex-basis-50 ${classUncomplete}`}>
      <Typography variant="h6">{main || "-"}</Typography>
      <Typography variant="body2">{secondary}</Typography>
      <div className={"flex-direction-row"}>
        <CharacteristicsButton
          characteristicName={characteristicName}
          isText={isText}
          isDate={isDate}
          dialogTitle={dialogTitle}
          dialogHelp={dialogHelp}
          dialogItems={dialogItems}
          dialogPreselectedItems={dialogPreselectedItems}
          onOk={onOk}
        />
        {additionalButton && <div className={"small-margin-left"}>{additionalButton}</div>}
      </div>
    </div>
  );
};

const Details = ({
  item,
  characteristics,
  removeItem,
  updateItem,
  savePicture,
  classes,
  intl,
  history,
  loggedIn
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

    const tagManagerArgs = {
      gtmId: "GTM-TFF4FK9",
      events: {
        event: "Details",
        action: "Close",
      }
    }    
    TagManager.initialize(tagManagerArgs);

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
    if(size === '0')
      handleClose();
  };

  const _handleUpdateCharacteristic = async update => {
    console.debug("ItemCard._handleUpdateCharacteristic: ", item.id, update);
    if(update)
      updateItem(item.id, update);
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

  const dialogTitle = intl.formatMessage({ id: "action.edit" });
  const dialogHelpName = intl.formatMessage({ id: "add.name.help" });
  const dialogHelpDate = intl.formatMessage({ id: "add.date.help" });
  const removeTitle = intl.formatMessage({ id: "action.remove" });

  return (
    <div className={classes.card}>
      {/*
      ********************************************************************
                Picture section with Return and Picture buttons
      ********************************************************************
      */}
      <section className={classes.details_image_section}>
        <CardMedia
          image={`${config.staticUrl}/static/pictures/items/${item.pictureName}`}
          title={item.name}
          className={classes.details_image_media}
        />
        <Button
          onClick={handleClose}
          color="primary"
          className={classes.details_image_close}
        >
          &lt; &nbsp; <FormattedMessage id="button.back" />
        </Button>
        <Typography
          className={classes.details_image_code}
          variant="h4"
          color="textSecondary"
          component="p"
        >
          {item.code}
        </Typography>
        <PictureSelection
          className={classes.details_image_camera}
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
                        Name + Category + Details section
        ********************************************************************
        */}
        <section className={"flex-direction-column"}>
          <div className={"flex-direction-row small-margin-down"}>
            <Typography
              variant="h2"
              component="h1"
              className={"small-margin-right"}
            >
              {item.__nameOrCategory}
            </Typography>
            <CharacteristicsButton
              characteristicName="name"
              isText={true}
              dialogTitle={dialogTitle}
              dialogHelp={dialogHelpName}
              dialogPreselectedItems={item.name}
              onOk={_handleUpdateCharacteristic}
              showOkBtn={true}
            />
          </div>
          <div
            className={"flex-direction-row flex-align-end small-margin-down"}
          >
            {getIcon("category" + item.category)}
            <Typography
              variant="h4"
              className={"small-margin-left small-margin-right"}
            >
              {item.__categoryText}
            </Typography>
            <CharacteristicsButton
              characteristicName="category"
              dialogTitle={dialogTitle}
              dialogItems={characteristics.categories}
              dialogPreselectedItems={item.category}
              onOk={_handleUpdateCharacteristic}
            />
          </div>
          <div className={"flex-direction-row flex-align-end"}>
            <Typography variant="h5" className={"small-margin-right"}>
              ({item.__detailsNames})
            </Typography>
            <CharacteristicsButton
              characteristicName="details"
              dialogTitle={dialogTitle}
              dialogItems={characteristics.details}
              dialogPreselectedItems={item.__detailsArray}
              multiselection={true}
              onOk={_handleUpdateCharacteristic}
            />
          </div>
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
            dialogTitle={removeTitle}
            dialogItems={sizesWith0}
            dialogPreselectedItems={item.size}
            onOk={_handleUpdateQuantity}
            additionalButton={<RemoveButton onOk={_handleRemove}/>}
          />
          <SectionBlock
            characteristicName="expirationDate"
            isDate={true}
            main={dateToDisplay}
            secondary={intl.formatMessage(item.__expirationText)}
            dialogTitle={dialogTitle}
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
            dialogTitle={dialogTitle}
            dialogItems={characteristics.freezers}
            dialogPreselectedItems={item.freezer}
            onOk={_handleUpdateCharacteristic}
          />
          <SectionBlock
            characteristicName="location"
            main={item.__locationText}
            secondary={intl.formatMessage({ id: "characteristics.location" })}
            dialogTitle={dialogTitle}
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
            dialogTitle={dialogTitle}
            dialogItems={characteristics.containers}
            dialogPreselectedItems={item.container}
            onOk={_handleUpdateCharacteristic}
          />
          <SectionBlock
            characteristicName="color"
            main={item.__colorText}
            secondary={intl.formatMessage({ id: "characteristics.color" })}
            dialogTitle={dialogTitle}
            dialogItems={characteristics.colors}
            dialogPreselectedItems={item.color}
            onOk={_handleUpdateCharacteristic}
          />
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
    loggedIn: state.user.loggedIn
  };
}

const mapDispatchToProps = {
  updateItem: itemsActions.updateItem,
  removeItem: itemsActions.removeItem,
  savePicture: itemsActions.savePicture
};

const connectedDetails = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Details)
);

export default injectIntl(
  withStyles(styles, { withTheme: true })(connectedDetails)
);
