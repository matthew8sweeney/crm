import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";

import { uiActions } from "../../../store/ui-slice";
import CustomerAutocomplete from "./CustomerAutocomplete";
import ValidTextField from "../../ui/ValidTextField";

const isValidText = (str) => typeof str === "string" && str.length > 0;

const NewTaskForm = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const customerRef = useRef();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [customerError, setCustomerError] = useState("");
  const [nameError, setNameError] = useState("");
  // const [descriptionError, setDescriptionError] = useState("");

  const customerChangeHandler = (event, newValue) => {
    if (newValue == null) return;
    if (isValidText(newValue.name)) setCustomerError("");
  };

  const nameChangeHandler = (event) => {
    const newName = event.target.value;
    if (isValidText(newName)) setNameError("");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let inputsAreValid = true;
    // make sure there is some text for the name
    if (!isValidText(nameRef.current.value)) {
      setNameError("Enter a name for this task");
      nameRef.current.focus();
      inputsAreValid = false;
    }
    // task must be associated w/ a lead or account
    if (!isValidText(customerRef.current.value)) {
      setCustomerError("Select a contact");
      customerRef.current.focus();
      inputsAreValid = false;
    }

    if (inputsAreValid) {
      // create new task

      dispatch(uiActions.hideNewItemDialog());
    }
  };

  return (
    <form onSubmit={submitHandler} ref={ref} className={props.className}>
      <CustomerAutocomplete
        onChange={customerChangeHandler}
        errorText={customerError}
        inputRef={customerRef}
      />
      <ValidTextField
        label="Task Name"
        inputRef={nameRef}
        errorText={nameError}
        onChange={nameChangeHandler}
      />
      <TextField
        label="Task Description"
        inputRef={descriptionRef}
        multiline
      />
    </form>
  );
});

export default NewTaskForm;
