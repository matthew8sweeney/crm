import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Slide,
} from "@material-ui/core";

import { uiActions } from "../../../store/ui-slice";
import NewLeadForm from "./NewLeadForm";
import NewAccountForm from "./NewAccountForm";
import NewInteractionForm from "./NewInteractionForm";
import NewTaskForm from "./NewTaskForm";
import NewNoteForm from "./NewNoteForm";
import classes from "./NewItemDialog.module.css";

const Transition = React.forwardRef((props, ref) => (
  <Slide ref={ref} direction="up" unmountOnExit {...props} />
));

const newItemForms = [
  NewLeadForm,
  NewAccountForm,
  NewInteractionForm,
  NewTaskForm,
  NewNoteForm,
];

const newItemNames = ["Lead", "Account", "Interaction", "Task", "Note"];

// const NewItemsMenu = (props) => {
//   const dispatch = useDispatch();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const isOpen = !!anchorEl;

//   const openHandler = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const closeHandler = (event, index) => {
//     if (typeof index !== "undefined") {
//       dispatch(uiActions.showNewItemDialog(index));
//     }
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <List>
//         <ListItem button onClick={openHandler}>
//           <ListItemText primary={props.currentItem} />
//         </ListItem>
//       </List>
//       <Menu open={isOpen} anchorEl={anchorEl} onClose={closeHandler}>
//         {newItemNames.map((name, i) => (
//           <MenuItem onClick={(e) => closeHandler(e, i)} key={i}>
//             {name}
//           </MenuItem>
//         ))}
//       </Menu>
//     </>
//   );
// };

const NewItemDialog = (props) => {
  const dispatch = useDispatch();
  const { isOpen, itemTypeIndex } = useSelector(
    (state) => state.ui.newItemDialog
  );
  const newItemName = newItemNames[itemTypeIndex];
  const NewItemForm = newItemForms[itemTypeIndex];
  const formRef = useRef();

  const cancelHandler = (event) => {
    dispatch(uiActions.hideNewItemDialog());
  };

  const submitHandler = () => {
    formRef.current.requestSubmit();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={cancelHandler}
      TransitionComponent={Transition}
      PaperProps={{ className: classes.dialog }}
    >
      <DialogTitle>
        {/* TODO menu to change what item you are adding? (lead/task/note/etc) /> */}
        Create New {newItemName}
      </DialogTitle>
      <DialogContent className={classes.content}>
        <NewItemForm ref={formRef} className={classes.form} />
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelHandler} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" onClick={submitHandler} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewItemDialog;
