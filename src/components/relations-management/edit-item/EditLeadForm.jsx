import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@material-ui/core";
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

  const lead = useSelector((state) => state.data.leads[props.id]);
  const { industries } = useSelector((state) => state.data);
  let initialIndustry = null;
  if (lead.industryId in industries)
    initialIndustry = industries[lead.industryId];
  const [industry, setIndustry] = useState(initialIndustry);

  const leadNameChangeHandler = (event) => {
    const newLeadName = leadNameRef.current.value;
    if (isValidName(newLeadName)) setLeadNameError("");
  };

  const industryChangeHandler = (event, newValue) => {
    setIndustry(newValue);
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
      // update existing lead

      // dispatch(
      //   dataActions.createLead({
      //     name: leadNameRef.current.value,
      //     website: websiteRef.current.value,
      //     address: addressRef.current.value,
      //     industryId,
      //   })
      // );
      dispatch(uiActions.hideEditItemDialog());
    }
  };

  const deleteHandler = (event) => {
    event.preventDefault();

    // delete this lead from database and remove from state
    console.log("lead should be deleted");
  };

  return (
    <>
      <form onSubmit={submitHandler} ref={ref} className={props.className}>
        <ValidTextField
          label="Lead Name"
          defaultValue={lead.name}
          inputRef={leadNameRef}
          errorText={leadNameError}
          onChange={leadNameChangeHandler}
        />
        <TextField
          label="Website"
          defaultValue={lead.website}
          inputRef={websiteRef}
        />
        <TextField
          label="Address"
          defaultValue={lead.address}
          inputRef={addressRef}
        />
        <IndustrySelect value={industry} onChange={industryChangeHandler} />
      </form>
      <form onSubmit={deleteHandler} ref={props.deleteRef} />
    </>
  );
});

export default NewLeadForm;
