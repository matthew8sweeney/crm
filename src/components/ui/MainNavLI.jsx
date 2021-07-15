import React from "react";
import { NavLink } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import classes from "./MainNavLI.module.css";

const MainNavLI = (props) => {
  return (
    <ListItem button component={NavLink} to={props.to} className={classes.root}>
      <ListItemIcon>
        <props.icon />
      </ListItemIcon>
      <ListItemText primary={props.primary} className={classes.text} />
    </ListItem>
  );
};

export default MainNavLI;
