import React from "react";
import { useLocation } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import classes from "./MainNavLI.module.css";
import LinkLI from "./LinkLI";

const MainNavLI = (props) => {
  const location = useLocation();

  return (
    <ListItem
      button
      component={LinkLI}
      to={props.to}
      selected={"/" + location.pathname.split("/")[1] === props.to}
      className={classes.root}
    >
      <ListItemIcon>
        <props.icon />
      </ListItemIcon>
      <ListItemText primary={props.primary} className={classes.text} />
    </ListItem>
  );
};

export default MainNavLI;
