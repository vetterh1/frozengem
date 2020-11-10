// React
import React, { useEffect, useMemo } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { withRouter, Redirect } from "react-router";
// Redux
import { connect } from "react-redux";
import { itemsActions } from "_actions/itemsActions";
import { userActions } from "_actions/userActions";
// HOC
import { injectIntl, FormattedMessage } from "react-intl";
// MUI
import { Button, Divider } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Link from '@material-ui/core/Link';
// Components
import Joyride, { ACTIONS } from "react-joyride";
import PictureSelection from "pages/utils/PictureSelection";
// import CategoryButton from "pages/utils/CategoryButton";
import RemoveButton from "pages/utils/RemoveButton";
import PictureModalSelection from "pages/utils/PictureModalSelection";
import DuplicateButton from "pages/utils/DuplicateButton";
import SectionBlock from "pages/utils/SectionBlock";
import ScrollToTop from "pages/utils/ScrollToTop";
// import ItemImage from "pages/utils/ItemImage";
import Picture from "pages/utils/Picture";
import BorderLinearProgress from "pages/utils/BorderLinearProgress";
import SizeInIcons from "pages/utils/SizeInIcons";
// Utilities
import clsx from "clsx";
import gtmPush from "utils/gtmPush";
// Configuration
import config from "data/config";
import getHelpSteps from "./helpStepsDetails";
// Styles
import useStyles from "./stylesDetails";


const Details = ({
  // From Redux:
  isNew = false,
  item,
  characteristics,
  loggedIn,
  density,
  showHelpDetails,
  removeItem,
  updateItem,
  duplicateItem,
  savePicture,
  setShowHelpDetails,
  // From other HOC:  
  intl,
  history,
}) => {

  const [showHugeCameraBtn, setShowHugeCameraBtn] = React.useState(false);
  useEffect(() => {
    // if (isNew && item) {
    if (isNew || (item && !item.__imageExists)) {
      setShowHugeCameraBtn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [displayProgress, setDisplayProgress] = React.useState(false);

  // Create Size icon array
  const sizeInIcons = useMemo(() => {console.debug( "[Details] Memo sizeInIcons: ", item?.size ); return SizeInIcons(item?.size)}, [item?.size]);

  const classes = useStyles(density);

  if (!loggedIn || !characteristics) {
    console.debug("[>>> Details ------>>>----- / >>>] Reason: not logged in or empty characteristics");
    return <Redirect to="/" />;
  }
  const createNewItem = item ? false : true;

  console.debug("[--- FC ---] Functional component: Details - createNewItem = ", createNewItem, " - item = ", item ? item : "N/A");

  const _handleClose = () => {
    console.debug("[<<< Details ------<<<----- / <<<] Reason: close details");

    gtmPush({
      event: "Details",
      action: "Close",
    });

    history.goBack();

    // Strangely, history.push/goBack works here...
    // if not, should be replaced by a <redirect push> tag in render
    // but it would redisplay / and dispay from the top of the page
    // (better use back that goes back at the right place)
  };

  const _handleRemove = async () => {
    removeItem(item.id, 0);
    _handleClose();
  };


  const _handleUpdateQuantity = async ({ size }) => {
    removeItem(item.id, size);
    if (size === "0") _handleClose();
  };

  const _handleUpdateCharacteristic = async (update) => {
    if (update) updateItem(item.id, update);
    return null;
  };

  const _handleSavePicture = (pictureData) => {
    savePicture(item.id, pictureData);
    setShowHugeCameraBtn(false);
  };

  const _handleDuplicate = async () => {
    // Simulate a wait for 3 seconds of progress indicator
    setDisplayProgress(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Duplicate the current item
    const duplicatedItem = await duplicateItem(item.id);

    // Then go to the new item!
    history.replace(`/details/${duplicatedItem.id}`);

    setDisplayProgress(false);
  };


  //
  // Add "remove / 0" option to the quantity list
  //

  const zero = {
    id2: "0",
    label: {
      en: intl.formatMessage({ id: "item.remove.from_freezer" }),
      fr: intl.formatMessage({ id: "item.remove.from_freezer" }),
    },
    name: {
      en: intl.formatMessage({ id: "item.remove.nothing" }),
      fr: intl.formatMessage({ id: "item.remove.nothing" }),
    },
  };
  const sizesWith0 = [zero, ...characteristics.sizes];

  const dateToDisplay = item
    ? `${item.__monthExpirationAsText} ${item.__yearExpiration}`
    : null;

  //
  // Misc string / help text configuration
  //
  const dialogHelpName = intl.formatMessage({ id: "add.description.help" });
  const dialogHelpDate = intl.formatMessage({ id: "add.date.help" });
  const dividerClassName = "small-margin-top small-margin-down";

  //
  // Help setup
  //

  const helpSteps = getHelpSteps(intl);
  const handleJoyrideCallback = (data) => {
    if ([ACTIONS.STOP, ACTIONS.CLOSE, ACTIONS.SKIP].includes(data.action)) {
      setShowHelpDetails(false);
    }
  };

  //
  // RENDER
  //

  return (
    <div className={classes.card}>
      <ScrollToTop />
      <Joyride
        steps={helpSteps}
        callback={handleJoyrideCallback}
        continuous={true}
        showProgress={true}
        scrollToFirstStep={true}
        locale={{
          back: intl.formatMessage({ id: "button.previous" }),
          close: intl.formatMessage({ id: "button.close" }),
          last: intl.formatMessage({ id: "button.end" }),
          next: intl.formatMessage({ id: "button.continue" }),
          skip: intl.formatMessage({ id: "button.skip" }),
        }}
        run={showHelpDetails}
        styles={{
          options: {
            primaryColor: "#303f9f",
          },
        }}
      />

      <Link variant="h4" onClick={_handleClose} className={classes.back_link}>
        <NavigateBeforeIcon className={classes.back_icon} />
        <FormattedMessage id="button.backtolist" />
      </Link>

      {displayProgress && <BorderLinearProgress />}

      <div className={clsx(
        classes.detailsUpperSection,
        density === 1 && classes.detailsUpperSectionDensity1,
        density >= 2 && classes.detailsUpperSectionDensity23,
      )}>
        <div className={clsx(
          classes.detailsImageBlock,
          density === 1 && classes.detailsImageBlockDensity1,
          density >= 2 && classes.detailsImageBlockDensity23,
        )}>
          <Picture
              imageUrl={item?.pictureName ?`${config.staticUrl}/custom-size-image/${item.pictureName}` : null}
              imageAlt={item?.__descriptionOrCategory}
              itemCategory={item?.category}
              maxResolution={250}
          />
          <PictureSelection
            btnClassName={clsx(
              classes.detailsPictureSelectionButton,
              density === 1 && classes.detailsPictureSelectionButtonDensity1,
              density >= 2 && classes.detailsPictureSelectionButtonDensity23,
              (!item || !item.pictureName) && "stitched",
              "cam_icon"
            )}
            rootClassName={classes.detailsPictureSelection}
            iconStyle={{ fontSize: 16, marginRight: 6 }}
            itemId={item ? item.id : null}
            iconOnlyButton={false}
            onPicture={_handleSavePicture}
            label={intl.formatMessage({
              id: item && item.__imageExists ? "camera.replace" : "camera.add",
            })}
          />

          {
            //  isNew && item &&
            <PictureModalSelection
              onPicture={_handleSavePicture}
              onCancel={() => setShowHugeCameraBtn(false)}
              open={showHugeCameraBtn}
            />
          }     
        </div>
        <div>
          {/*
          ********************************************************************
                          Description section
          ********************************************************************
          */}
          <section className={"flex-direction-column"}>
            <SectionBlock
              characteristicName="description"
              isText={true}
              main={item ? item.description : "-"}
              mainTypography="h2"
              secondary={null}
              dialogTitle={intl.formatMessage({
                id: "characteristics.description",
              })}
              dialogHelp={dialogHelpName}
              dialogPreselectedItems={item ? item.description : null}
              onOk={_handleUpdateCharacteristic}
              showOkBtn={true}
            />
            {/* <Divider className={dividerClassName}></Divider> */}
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
          {/* <Divider className={dividerClassName}></Divider> */}
        </div>
      </div>

      {/*
      ********************************************************************
                Picture section with Return and Picture buttons
      ********************************************************************

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
              height: "25vh",
              opacity: "0.8",
              borderRadius: "10px 10px 0px 0px",
            }}
          />
        )}
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
          btnClassName={clsx(
            classes.details_image_category,
            (!item || !item.category) && "stitched"
          )}
        />
        <PictureSelection
          btnClassName={clsx(
            classes.details_image_camera,
            (!item || !item.pictureName) && "stitched",
            "cam_icon"
          )}
          itemId={item ? item.id : null}
          iconOnlyButton
          onPicture={_handleSavePicture}
          label={intl.formatMessage({
            id: item && item.__imageExists ? "camera.replace" : "camera.add",
          })}
        />

        {
          //  isNew && item &&
          <PictureModalSelection
            onPicture={_handleSavePicture}
            onCancel={() => setShowHugeCameraBtn(false)}
            open={showHugeCameraBtn}
          />
        }
      </section>
      */}      
      <div className={"medium-padding"}>
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
            dialogPreselectedItems={
              item && item.size ? item.size.toString() : null
            }
            onOk={_handleUpdateQuantity}
            additionalButton={<RemoveButton onOk={_handleRemove} />}
          />
          <SectionBlock
            characteristicName="expirationDate"
            isDate={true}
            main={dateToDisplay}
            secondary={
              item && item.__expirationText
                ? intl.formatMessage(item.__expirationText)
                : "-"
            }
            dialogTitle={intl.formatMessage({ id: "characteristics.date" })}
            dialogHelp={dialogHelpDate}
            dialogPreselectedItems={item ? item.expirationDate : null}
            onOk={_handleUpdateCharacteristic}
            showOkBtn={true}
          />
        </section>
        <Divider className={dividerClassName}></Divider>
        {/*
        ********************************************************************
                        Container and Color section
        ********************************************************************
        */}
        <section className={"flex-direction-row flex-justify-between"}>
          <SectionBlock
            characteristicName="container"
            main={item && item.__containerText ? item.__containerText : "-"}
            secondary={intl.formatMessage({ id: "characteristics.container" })}
            dialogTitle={intl.formatMessage({
              id: "characteristics.container",
            })}
            dialogItems={characteristics.containers}
            dialogPreselectedItems={item ? item.container : null}
            onOk={_handleUpdateCharacteristic}
          />
          <SectionBlock
            characteristicName="color"
            main={item && item.__colorText ? item.__colorText : "-"}
            secondary={intl.formatMessage({ id: "characteristics.color" })}
            dialogTitle={intl.formatMessage({ id: "characteristics.color" })}
            dialogItems={characteristics.colors}
            dialogPreselectedItems={item && item.color ? item.color : null}
            onOk={_handleUpdateCharacteristic}
          />
        </section>
        <Divider className={dividerClassName}></Divider>
        {/*
        ********************************************************************
                        Freezer and Location section
        ********************************************************************
        */}
        <section className={"flex-direction-row flex-justify-between"}>
          <SectionBlock
            characteristicName="freezer"
            main={item && item.__freezerText ? item.__freezerText : "-"}
            secondary={intl.formatMessage({ id: "characteristics.freezer" })}
            dialogTitle={intl.formatMessage({ id: "characteristics.freezer" })}
            dialogItems={characteristics.freezers}
            dialogPreselectedItems={item && item.freezer ? item.freezer : null}
            onOk={_handleUpdateCharacteristic}
          />
          <SectionBlock
            characteristicName="location"
            main={item && item.__locationText ? item.__locationText : "-"}
            secondary={intl.formatMessage({ id: "characteristics.location" })}
            dialogTitle={intl.formatMessage({ id: "characteristics.location" })}
            dialogItems={characteristics.locations}
            dialogPreselectedItems={
              item && item.location ? item.location : null
            }
            onOk={_handleUpdateCharacteristic}
          />
        </section>
        {/*
        ********************************************************************
                        Bottom buttons (add, duplicate,...)
        ********************************************************************
        */}
        {isNew && (
          <>
            <Divider className={dividerClassName}></Divider>
            <section
              className={
                "flex-normal-height flex-direction-row flex-justify-between margin-down"
              }
            >
              <Button
                variant="contained"
                color="secondary"
                component={RouterLink}
                to="/add"
                replace
                className={
                  "flex-direction-column  flex-align-center text-center flex-basis-48 small-padding-top small-padding-bottom"
                }
              >
                <FormattedMessage id="button.addnew" />
              </Button>
            </section>
          </>
        )}
        <Divider className={dividerClassName}></Divider>
        <section
          className={
            "flex-normal-height flex-direction-row flex-justify-between margin-down"
          }
        >
          {config.details_use_clickable_tiles && (
            <RemoveButton
              onOk={_handleRemove}
              isFAB={false}
              showLabel={true}
              btnClassName="flex-direction-column  flex-align-center text-center flex-basis-48 small-padding-top small-padding-bottom"
              propsBtn={{
                variant: "contained",
                size: "medium",
                color: "secondary",
              }}
            />
          )}
          <DuplicateButton
            onOk={_handleDuplicate}
            btnClassName="flex-direction-column  flex-align-center text-center flex-basis-48 small-padding-top small-padding-bottom"
            propsBtn={{
              variant: "contained",
              size: "medium",
              color: "secondary",
            }}
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
  // console.debug("Details.mapStateToProps - ownProps, match, params=", ownProps, ownProps.match, ownProps.match.params );
  const id = ownProps.match.params.id;
  const isNew = ownProps.match.path.startsWith("/new/");
  return {
    isNew: isNew,
    item: id ? state.items.list.find((item) => item.id === id) : null,
    characteristics: state.characteristics,
    loggedIn: state.user.loggedIn,
    density: state.user.density,
    showHelpDetails: state.user.showHelpDetails,
  };
}

const mapDispatchToProps = {
  updateItem: itemsActions.updateItem,
  removeItem: itemsActions.removeItem,
  savePicture: itemsActions.savePicture,
  duplicateItem: itemsActions.duplicateItem,
  setShowHelpDetails: userActions.setShowHelpDetails,
};

const connectedDetails = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Details)
);

export default injectIntl(connectedDetails);
