import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { TextField } from "@material-ui/core";

import { dataActions, initialTaskState } from "../../../store/data-slice";
import { uiActions } from "../../../store/ui-slice";
import ValidTextField from "../../ui/ValidTextField";
import { isValidText } from "../../../lib/text";

const EditTaskForm = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [nameError, setNameError] = useState("");
  const pathSegments = useLocation().pathname.split("/");
  const customerType = pathSegments[2];
  const customerId = pathSegments[3];
  const { tasks } = useSelector(
    (state) => state.data[customerType][customerId]
  );
  let task = initialTaskState;
  if (props.id) task = tasks[props.id];

  const nameChangeHandler = (event) => {
    const newTitle = event.target.value;
    if (isValidText(newTitle)) setNameError("");
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

    if (inputsAreValid) {
      dispatch(
        dataActions.editTask(customerType, customerId, props.id, {
          title: nameRef.current.value,
          description: descriptionRef.current.value,
        })
      );
      dispatch(uiActions.hideEditItemDialog());
    }
  };

  const deleteHandler = (event) => {
    event.preventDefault();

    dispatch(dataActions.deleteTask(customerType, customerId, props.id));
    dispatch(uiActions.hideEditItemDialog());
  };

  return (
    <>
      <form onSubmit={submitHandler} ref={ref} className={props.className}>
        <ValidTextField
          defaultValue={task.title}
          label="Task Name"
          inputRef={nameRef}
          errorText={nameError}
          onChange={nameChangeHandler}
        />
        <TextField
          defaultValue={task.description}
          label="Task Description"
          inputRef={descriptionRef}
          multiline
        />
      </form>
      <form onSubmit={deleteHandler} ref={props.deleteRef} />
    </>
  );
});

export default EditTaskForm;
