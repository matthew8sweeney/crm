import React from "react";
import { useDispatch } from "react-redux";
import { IconButton, ListItemSecondaryAction } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { uiActions } from "../../../../store/ui-slice";
import SelectPanelLI from "../../../ui/select-panel/SelectPanelLI";

const ActionLI = (props) => {
  const dispatch = useDispatch();

  const editHandler = (event) => {
    dispatch(
      uiActions.showEditItemDialog({
        itemType: props.data.actionType,
        itemId: props.data.id,
      })
    );
  };

  return (
    <SelectPanelLI
      {...props}
      extraSecondaryAction={
        <ListItemSecondaryAction>
          <IconButton onClick={editHandler} label="edit">
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      }
    >
      {props.children}
    </SelectPanelLI>
  );
};

export default ActionLI;
