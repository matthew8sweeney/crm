import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";

import { dataActions } from "../../../store/data-slice";
import { uiActions } from "../../../store/ui-slice";
import CustomerAutocomplete from "./CustomerAutocomplete";
import InteractionTypeAutoComplete from "../InteractionTypeAutoComplete";
import { isValidText } from "../../../lib/text";

const NewInteractionForm = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const customerRef = useRef();
  const customerValueRef = useRef();
  const typeRef = useRef();
  const descriptionRef = useRef();
  const [customerError, setCustomerError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [type, setType] = useState(null);

  const customerChangeHandler = (event, newValue) => {
    if (newValue != null) setCustomerError("");
  };

  const typeChangeHandler = (event, newValue) => {
    if (newValue != null) {
      setType(newValue);
      setTypeError("");
    }
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
    const customer = customerValueRef.current.value;
    if (customer == null) {
      setCustomerError("Select a contact");
      customerRef.current.focus();
      inputsAreValid = false;
    }

    if (inputsAreValid) {
      dispatch(
        dataActions.createInteraction(
          {
            interactionTypeId: type.id,
            description: descriptionRef.current.value,
          },
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
        ref={customerValueRef}
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
