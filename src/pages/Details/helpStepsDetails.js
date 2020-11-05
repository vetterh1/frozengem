 //
// Help setup
//

const getHelpSteps = (intl) => [
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
        placement: "center",
    },
    {
        target: ".cam_icon",
        title: intl.formatMessage({ id: "action.edit" }),
        content: intl.formatMessage({ id: "help.details.camera" }),
    },
    {
        target: "#tile_details_update_description",
        title: intl.formatMessage({ id: "action.edit" }),
        content: intl.formatMessage({ id: "help.details.description" }),
    },
    {
        target: "#tile_details_update_details",
        title: intl.formatMessage({ id: "action.edit" }),
        content: intl.formatMessage({ id: "help.details.details" }),
    },
    {
        target: "#tile_details_update_location",
        title: intl.formatMessage({ id: "action.edit" }),
        content: intl.formatMessage({ id: "help.details.location" }),
    },
    {
        target: ".MuiCardMedia-root ",
        title: intl.formatMessage({ id: "help.details.image.title" }),
        content: intl.formatMessage({ id: "help.details.image" }),
    },
    {
        target: ".code_id",
        title: intl.formatMessage({ id: "help.details.important" }),
        content: intl.formatMessage({ id: "help.details.code" }),
    },
    {
        target: "#tile_details_update_size",
        title: intl.formatMessage({ id: "help.details.important" }),
        content: intl.formatMessage({ id: "help.details.quantity" }),
    },
    {
        target: "#btn_details_remove_item",
        title: intl.formatMessage({ id: "help.details.important" }),
        content: intl.formatMessage({ id: "help.details.remove" }),
    },
    {
        target: ".help_icon",
        title: intl.formatMessage({ id: "action.help" }),
        content: intl.formatMessage({ id: "help.details.help" }),
    },
  ];

  export default getHelpSteps;