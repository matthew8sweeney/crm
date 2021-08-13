import { TextField } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { dataActions } from "../../../store/data-slice";
import { uiActions } from "../../../store/ui-slice";

import ValidTextField from "../../ui/ValidTextField";
import IndustrySelect from "../IndustrySelect";

const isValidName = (str) => str.length > 0;

const NewLeadForm = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const leadNameRef = useRef();
  const websiteRef = useRef();
  const addressRef = useRef();
  const [leadNameError, setLeadNameError] = useState("");
  const [industryId, setIndustryId] = useState("");

  const leadNameChangeHandler = (event) => {
    const newLeadName = leadNameRef.current.value;
    if (isValidName(newLeadName)) setLeadNameError("");
  };

  const industryChangeHandler = (event, newValue) => {
    setIndustryId(newValue.id);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let inputsAreValid = true;
    if (!isValidName(leadNameRef.current.value)) {
      setLeadNameError("Enter a valid lead name");
      leadNameRef.current.focus();
      inputsAreValid = false;
    }

    if (inputsAreValid) {
      dispatch(
        dataActions.createLead({
          name: leadNameRef.current.value,
          website: websiteRef.current.value,
          address: addressRef.current.value,
          industryId,
        })
      );
      dispatch(uiActions.hideNewItemDialog());
    }
  };

  return (
    <form onSubmit={submitHandler} ref={ref} className={props.className}>
      <ValidTextField
        label="Lead Name"
        inputRef={leadNameRef}
        errorText={leadNameError}
        onChange={leadNameChangeHandler}
      />
      <TextField label="Website" inputRef={websiteRef} />
      <TextField label="Address" inputRef={addressRef} />
      <IndustrySelect onChange={industryChangeHandler} />
    </form>
  );
});

export default NewLeadForm;
