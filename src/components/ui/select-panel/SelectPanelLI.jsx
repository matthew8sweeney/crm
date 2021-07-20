import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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

  const toggleHandler = (event) => {
    setOpen((openState) => !openState);
  };

  return (
    <>
      <ListItem
        button
        component={NavLink}
        ContainerComponent="div"
        to={props.to}
        selected={props.selected}
        key={props.key}
      >
        <ListItemText primary={props.primary} secondary={props.secondary} />
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
      <Collapse in={open} unmountOnExit timeout="auto">
        {props.children}
      </Collapse>
    </>
  );
};

export default SelectPanelLI;
