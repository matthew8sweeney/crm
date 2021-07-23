import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  ClickAwayListener,
  Fab,
  MenuItem,
  MenuList,
  Popper,
  Slide,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { uiActions } from "../../../store/ui-slice";

const NewItemFab = (props) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const fabActions = [
    "New Lead",
    "New Account",
    "New Interaction",
    "New Task",
    "New Note",
  ];

  const openHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeHandler = (event, index) => {
    if (typeof index !== "undefined") {
      dispatch(uiActions.showNewItemDialog(index));
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Fab
        onClick={openHandler}
        label="Add Item"
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
      <Popper open={open} anchorEl={anchorEl} placement="top-end" transition>
        {({ TransitionProps }) => (
          <Slide
            {...TransitionProps}
            direction="left"
            timeout={100}
            unmountOnExit
          >
            <Card elevation={4}>
              <ClickAwayListener onClickAway={closeHandler}>
                <MenuList>
                  {fabActions.map((actionName, i) => (
                    <MenuItem onClick={(e) => closeHandler(e, i)} key={i}>
                      {actionName}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Card>
          </Slide>
        )}
      </Popper>
    </>
  );
};

export default NewItemFab;
