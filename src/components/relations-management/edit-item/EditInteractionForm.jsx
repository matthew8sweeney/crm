import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { TextField } from "@material-ui/core";

import {
  dataActions,
  initialInteractionState,
} from "../../../store/data-slice";
import { uiActions } from "../../../store/ui-slice";
import InteractionTypeAutoComplete from "../InteractionTypeAutoComplete";
import { isValidText } from "../../../lib/text";

const EditInteractionForm = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const typeRef = useRef();
  const descriptionRef = useRef();
  const [typeError, setTypeError] = useState("");
  const pathSegments = useLocation().pathname.split("/");
  const customerType = pathSegments[2];
  const customerId = pathSegments[3];
  const { interactions } = useSelector(
    (state) => state.data[customerType][customerId]
  );
  let interaction = initialInteractionState;
  if (props.id) interaction = interactions[props.id];

  const { interactionTypes } = useSelector((state) => state.data);
  let initialType = null;
  if (interaction.interactionTypeId in interactionTypes)
    initialType = {
      ...interactionTypes[interaction.interactionTypeId],
      id: interaction.interactionTypeId,
    };
  const [type, setType] = useState(initialType);

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
    if (type == null) {
      setTypeError("Enter a type for this interaction");
      typeRef.current.focus();
      inputsAreValid = false;
    }

    if (inputsAreValid) {
      dispatch(
        dataActions.editInteraction(customerType, customerId, props.id, {
          interactionTypeId: type.id,
          description: descriptionRef.current.value,
        })
      );
      dispatch(uiActions.hideEditItemDialog());
    }
  };

  const deleteHandler = (event) => {
    event.preventDefault();

    dispatch(dataActions.deleteInteraction(customerType, customerId, props.id));
    dispatch(uiActions.hideEditItemDialog());
  };

  return (
    <>
      <form onSubmit={submitHandler} ref={ref} className={props.className}>
        <InteractionTypeAutoComplete
          value={type}
          onChange={typeChangeHandler}
          errorText={typeError}
          inputRef={typeRef}
        />
        {/* TODO more flexible form structure based on interaction type? */}
        <TextField
          defaultValue={interaction.description}
          label="Interaction Description"
          inputRef={descriptionRef}
          multiline
        />
      </form>
      <form onSubmit={deleteHandler} ref={props.deleteRef} />
    </>
  );
});

export default EditInteractionForm;
