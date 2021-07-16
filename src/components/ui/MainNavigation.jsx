import React, { useState } from "react";
import { Divider, Drawer, IconButton, List } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import WebIcon from "@material-ui/icons/Web";
import BorderIcon from "@material-ui/icons/BorderAll";
import TimelineIcon from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";
import AccountIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";

import MainNavLI from "./MainNavLI";
import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  const [open, setOpen] = useState(false);
  const toggleClass = open ? classes.open : classes.closed;

  const toggleHandler = (event) => {
    setOpen(() => !open);
  };

  return (
    <Drawer
      // open={open}
      variant="permanent"
      PaperProps={{ className: `${classes.drawer__paper} ${toggleClass}` }}
    >
      <IconButton
        onClick={toggleHandler}
        title={`${open ? "Close" : "Open"} main navigation drawer`}
        className={`${classes["toggle-button"]} ${
          open ? classes["toggle-button--flipped"] : ""
        }`}
        style={{ borderRadius: 0 }}
      >
        <ChevronRight />
      </IconButton>
      <Divider />
      <List style={{ paddingTop: 0 }}>
        <MainNavLI to="/dashboard" primary="Dashboard" icon={BorderIcon} />
        <MainNavLI to="/timeline" primary="Timeline" icon={TimelineIcon} />
        <Divider component="li" />
        <MainNavLI to="/account" primary="Account" icon={AccountIcon} />
        <MainNavLI to="/settings" primary="Settings" icon={SettingsIcon} />
      </List>
    </Drawer>
  );
};

export default MainNavigation;
