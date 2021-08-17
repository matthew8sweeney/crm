import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { TextField } from "@material-ui/core";

import { dataActions, initialNoteState } from "../../../store/data-slice";
import { uiActions } from "../../../store/ui-slice";
import ValidTextField from "../../ui/ValidTextField";
import { isValidText } from "../../../lib/text";

const EditNoteForm = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const titleRef = useRef();
  const textRef = useRef();
  const [textError, setTextError] = useState("");
  const pathSegments = useLocation().pathname.split("/");
  const customerType = pathSegments[2];
  const customerId = pathSegments[3];
  const { notes } = useSelector(
    (state) => state.data[customerType][customerId]
  );
  let note = initialNoteState;
  if (props.id) note = notes[props.id];

  const textChangeHandler = (event) => {
    const newTitle = event.target.value;
    if (isValidText(newTitle)) setTextError("");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let inputsAreValid = true;
    // make sure there is at least some text content
    if (
      !isValidText(titleRef.current.value) &&
      !isValidText(textRef.current.value)
    ) {
      setTextError("Enter some text for the note");
      titleRef.current.focus();
      inputsAreValid = false;
    }

    if (inputsAreValid) {
      dispatch(
        dataActions.editNote(customerType, customerId, props.id, {
          title: titleRef.current.value,
          text: textRef.current.value,
        })
      );
      dispatch(uiActions.hideEditItemDialog());
    }
  };

  const deleteHandler = (event) => {
    event.preventDefault();

    dispatch(dataActions.deleteNote(customerType, customerId, props.id));
    dispatch(uiActions.hideEditItemDialog());
  };

  return (
    <>
      <form onSubmit={submitHandler} ref={ref} className={props.className}>
        <ValidTextField
          defaultValue={note.title}
          label="Note Title"
          inputRef={titleRef}
          errorText={textError}
          onChange={textChangeHandler}
        />
        <TextField
          defaultValue={note.text}
          label="Note Text"
          inputRef={textRef}
          onChange={textChangeHandler}
          multiline
        />
      </form>
      <form onSubmit={deleteHandler} ref={props.deleteRef} />
    </>
  );
});

export default EditNoteForm;
