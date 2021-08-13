import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";

import { isValidText } from "../../../lib/text";
import { uiActions } from "../../../store/ui-slice";
import CustomerAutocomplete from "./CustomerAutocomplete";
import InteractionTypeAutoComplete from "../InteractionTypeAutoComplete";

const NewInteractionForm = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const customerRef = useRef();
  const typeRef = useRef();
  const descriptionRef = useRef();
  const [customerError, setCustomerError] = useState("");
  const [typeError, setTypeError] = useState("");

  const customerChangeHandler = (event, newValue) => {
    if (newValue == null) return;
    if (isValidText(newValue.name)) setCustomerError("");
  };

  const typeChangeHandler = (event, newValue) => {
    console.log(newValue);
    // if custom type
    if (typeof newValue === "undefined") {
      console.log(typeRef.current.value);
      setTypeError("");
    }
    // if empty
    if (newValue == null) return;
    // if one of the provided options
    if (isValidText(newValue.name)) setTypeError("");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let inputsAreValid = true;
    // interaction must have a type
    if (!isValidText(typeRef.current.value)) {
      setTypeError("Enter a type for this interaction");
      typeRef.current.focus();
      inputsAreValid = false;
    }
    // interaction must be associated w/ a lead or account
    if (!isValidText(customerRef.current.value)) {
      setCustomerError("Select a contact");
      customerRef.current.focus();
      inputsAreValid = false;
    }

    if (inputsAreValid) {
      // create a new interaction

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
      <InteractionTypeAutoComplete
        onChange={typeChangeHandler}
        errorText={typeError}
        inputRef={typeRef}
      />
      {/* TODO more flexible form structure based on interaction type */}
      <TextField
        label="Interaction Description"
        inputRef={descriptionRef}
        multiline
      />
    </form>
  );
});

export default NewInteractionForm;
