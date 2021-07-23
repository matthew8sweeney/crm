import React, { useRef, useState } from "react";
import { TextField } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import ValidTextField from "../../ui/ValidTextField";

const isValidText = (str) => str.length > 0;

const NewNoteForm = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const titleRef = useRef();
  const textRef = useRef();
  const [titleError, setTitleError] = useState("");

  const textChangeHandler = (event) => {
    const newTitle = event.target.value;
    if (isValidText(newTitle)) setTitleError("");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let inputsAreValid = true;
    if (
      !isValidText(titleRef.current.value) &&
      !isValidText(textRef.current.value)
    ) {
      setTitleError("Enter some text for the note");
      titleRef.current.focus();
      inputsAreValid = false;
    }

    if (inputsAreValid) {
      // create new note

      dispatch(uiActions.hideNewItemDialog());
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      ref={ref}
      className={props.className}
      style={{ width: 300, maxWidth: "calc(95vw-100px)" }}
    >
      <ValidTextField
        label="Note Title"
        inputRef={titleRef}
        errorText={titleError}
        onChange={textChangeHandler}
        fullwidth
      />
      <TextField
        label="Note Text"
        inputRef={textRef}
        onChange={textChangeHandler}
        multiline
      />
    </form>
  );
});

export default NewNoteForm;
