import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { uiActions } from "../../../store/ui-slice";
import ValidTextField from "../../ui/ValidTextField";
import CustomerAutocomplete from "./CustomerAutocomplete";

const isValidText = (str) => typeof str === "string" && str.length > 0;

const NewNoteForm = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const customerRef = useRef();
  const titleRef = useRef();
  const textRef = useRef();
  const [textError, setTextError] = useState("");
  const [customerError, setCustomerError] = useState("");

  const customerChangeHandler = (event, newValue) => {
    if (newValue == null) return;
    if (isValidText(newValue.name)) setCustomerError("");
  };

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
    // note must be associated w/ a lead or account
    if (!isValidText(customerRef.current.value)) {
      setCustomerError("Select a contact");
      customerRef.current.focus();
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
      <CustomerAutocomplete
        onChange={customerChangeHandler}
        errorText={customerError}
        inputRef={customerRef}
      />
      <ValidTextField
        label="Note Title"
        inputRef={titleRef}
        errorText={textError}
        onChange={textChangeHandler}
        fullwidth
      />
      <ValidTextField
        label="Note Text"
        inputRef={textRef}
        errorText={textError}
        onChange={textChangeHandler}
        multiline
      />
    </form>
  );
});

export default NewNoteForm;
