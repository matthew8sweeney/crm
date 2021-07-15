import React, { useState } from "react";
import { Divider, Drawer, IconButton, List } from "@material-ui/core";
import { ChevronRight, ChevronLeft } from "@material-ui/icons";
import WebIcon from "@material-ui/icons/Web";
import TimelineIcon from "@material-ui/icons/Timeline";
import SettingsIcon from "@material-ui/icons/Settings";
import WidgetsIcon from "@material-ui/icons/Widgets";
import BorderIcon from "@material-ui/icons/BorderAll";

import classes from "./MainNavigation.module.css";
import MainNavLI from "./MainNavLI";

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
        className={classes["toggle-button"]}
        style={{ borderRadius: 0 }}
      >
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
      <Divider />
      <List>
        <MainNavLI to="/dashboard" primary="Dashboard" icon={BorderIcon} />
        <MainNavLI to="/timeline" primary="Timeline" icon={TimelineIcon} />
        <MainNavLI to="/settings" primary="Settings" icon={SettingsIcon} />
      </List>
    </Drawer>
  );
};

export default MainNavigation;
