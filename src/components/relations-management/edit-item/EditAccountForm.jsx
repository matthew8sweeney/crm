import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@material-ui/core";

import { dataActions, initialCustomerState } from "../../../store/data-slice";
import { uiActions } from "../../../store/ui-slice";
import ValidTextField from "../../ui/ValidTextField";
import IndustrySelect from "../IndustrySelect";

const isValidName = (str) => str.length > 0;

const EditAccountForm = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { accounts, industries } = useSelector((state) => state.data);
  const accountNameRef = useRef();
  const websiteRef = useRef();
  const addressRef = useRef();
  const [accountNameError, setAccountNameError] = useState("");

  let account = initialCustomerState();
  if (props.id) account = accounts[props.id];

  let initialIndustry = null;
  if (account.industryId in industries)
    initialIndustry = industries[account.industryId];
  const [industry, setIndustry] = useState(initialIndustry);

  const accountNameChangeHandler = (event) => {
    const newAccountName = accountNameRef.current.value;
    if (isValidName(newAccountName)) setAccountNameError("");
  };

  const industryChangeHandler = (event, newValue) => {
    setIndustry(newValue);
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
      let industryId = "";
      if (industry != null) industryId = industry.id;
      // update existing account
      dispatch(
        dataActions.editAccount(props.id, {
          name: accountNameRef.current.value,
          website: websiteRef.current.value,
          address: addressRef.current.value,
          industryId,
        })
      );
      dispatch(uiActions.hideEditItemDialog());
    }
  };

  const deleteHandler = (event) => {
    event.preventDefault();

    // delete this account from database and remove from state
    dispatch(dataActions.deleteAccount(props.id));
    dispatch(uiActions.hideEditItemDialog());
  };

  return (
    <>
      <form onSubmit={submitHandler} ref={ref} className={props.className}>
        <ValidTextField
          label="Account Name"
          defaultValue={account.name}
          inputRef={accountNameRef}
          errorText={accountNameError}
          onChange={accountNameChangeHandler}
        />
        <TextField
          label="Website"
          defaultValue={account.website}
          inputRef={websiteRef}
        />
        <TextField
          label="Address"
          defaultValue={account.address}
          inputRef={addressRef}
        />
        <IndustrySelect value={industry} onChange={industryChangeHandler} />
      </form>
      <form onSubmit={deleteHandler} ref={props.deleteRef} />
    </>
  );
});

export default EditAccountForm;
