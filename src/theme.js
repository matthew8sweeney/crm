import { createTheme } from "@material-ui/core";

const theme = createTheme({
  overrides: {
    MuiContainer: {
      root: {
        width: "auto",
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: 0,
        padding: 0,
        "@media (min-width: 600px)": {
          padding: 0,
        },
        overflowX: "auto",
      },
    },
    MuiAppBar: {
      root: {
        display: "flex",
        width: "auto",
        flexDirection: "row",
        justifyContent: "flex-start",
      },
      positionFixed: {
        left: 56,
        height: 50,
      },
    },
    MuiTabs: {
      root: {
        flexGrow: 1,
      },
    },
    // MuiTab: {
    //   root: {
    //     "@media (min-width: 600px)": {
    //       minWidth: "auto",
    //     },
    //   },
    // },
  },
  props: {
    MuiContainer: {
      maxWidth: false,
    },
    MuiAppBar: {
      position: "static",
      color: "default",
      height: 50,
    },
    MuiTabs: {
      variant: "scrollable",
      scrollButtons: "auto",
      indicatorColor: "primary",
      textColor: "primary",
    },
    MuiList: {
      disablePadding: true,
    },
  },
});

export default theme;
