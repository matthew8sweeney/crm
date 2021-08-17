import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Collapse,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import ExpandIcon from "@material-ui/icons/ExpandMore";

import classes from "./SelectPanelLI.module.css";

const SelectPanelLI = (props) => {
  const [open, setOpen] = useState(false);
  const expandable = !!props.children;

  // get query string to avoid changing it
  const search = useLocation().search;

  const toggleHandler = (event) => {
    setOpen((openState) => !openState);
  };

  return (
    <>
      <ListItem
        button
        onClick={props.onClick}
        component={props.component || NavLink}
        ContainerComponent="div"
        to={props.to ? props.to + search : undefined}
        selected={props.selected}
        divider
        className={classes.item}
      >
        <ListItemText primary={props.primary} secondary={props.secondary} />
        {props.extraSecondaryAction}
        {expandable && (
          <ListItemSecondaryAction>
            <IconButton
              onClick={toggleHandler}
              className={`${classes["toggle-button"]} ${
                open ? classes["toggle-button--flipped"] : ""
              }`}
              label={open ? "expand-more" : "expand-less"}
              edge="end"
            >
              <ExpandIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {props.children}
      </Collapse>
    </>
  );
};

export default SelectPanelLI;
