import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";

import { dataActions } from "../../../store/data-slice";
import { uiActions } from "../../../store/ui-slice";
import ValidTextField from "../../ui/ValidTextField";
import CustomerAutocomplete from "./CustomerAutocomplete";
import { isValidText } from "../../../lib/text";

const NewNoteForm = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const customerRef = useRef();
  const titleRef = useRef();
  const textRef = useRef();
  const [customer, setCustomer] = useState(null);
  const [customerError, setCustomerError] = useState("");
  const [textError, setTextError] = useState("");

  const customerChangeHandler = (event, newValue) => {
    if (newValue != null) {
      setCustomer(newValue);
      setCustomerError("");
    }
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
    if (customer == null) {
      setCustomerError("Select a contact");
      customerRef.current.focus();
      inputsAreValid = false;
    }

    if (inputsAreValid) {
      dispatch(
        dataActions.createNote(
          { title: titleRef.current.value, text: textRef.current.value },
          customer.type,
          customer.id
        )
      );
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
        label="Note Title"
        inputRef={titleRef}
        errorText={textError}
        onChange={textChangeHandler}
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
