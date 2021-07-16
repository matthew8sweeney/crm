import { createTheme } from "@material-ui/core";

const theme = createTheme({
  overrides: {
    MuiAppBar: {
      root: {
        display: "flex",
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
  },
  props: {
    MuiAppBar: {
      color: "default",
      height: 50,
    },
    MuiTabs: {
      variant: "scrollable",
      scrollButtons: "auto",
      indicatorColor: "primary",
      textColor: "primary",
    },
  },
});

export default theme;
