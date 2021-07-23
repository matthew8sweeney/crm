import {
  TextField,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { dataActions } from "../../../store/data-slice";
import { uiActions } from "../../../store/ui-slice";

import ValidTextField from "../../ui/ValidTextField";
import IndustrySelect from "../IndustrySelect";

const isValidName = (str) => str.length > 0;

const NewAccountForm = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const accountNameRef = useRef();
  const websiteRef = useRef();
  const addressRef = useRef();
  const industryRef = useRef();
  const [accountNameError, setAccountNameError] = useState("");

  const accountNameChangeHandler = (event) => {
    const newAccountName = accountNameRef.current.value;
    if (isValidName(newAccountName)) setAccountNameError("");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let inputsAreValid = true;
    if (!isValidName(accountNameRef.current.value)) {
      setAccountNameError("Enter a valid account name");
      accountNameRef.current.focus();
      inputsAreValid = false;
    }

    if (inputsAreValid) {
      // dispatch(dataActions.CreateNewAccount({name: accountNameRef.current.value}))
      dispatch(uiActions.hideNewItemDialog());
    }
  };

  return (
    <form onSubmit={submitHandler} ref={ref} className={props.className}>
      <ValidTextField
        label="Account Name"
        inputRef={accountNameRef}
        errorText={accountNameError}
        onChange={accountNameChangeHandler}
      />
      <TextField label="Website" inputRef={websiteRef} />
      <TextField label="Address" inputRef={addressRef} />
      <IndustrySelect ref={industryRef} />
    </form>
  );
});

export default NewAccountForm;
