import React, { useState, useImperativeHandle } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";

import { autocompleteOptionObjectCompare } from "../../../lib/autocomplete";
import ValidTextField from "../../ui/ValidTextField";

/**
 * A select input with typing autocomplete.
 * `dontCheckUrl` prop disables checking url for default option.
 * The ref can access the currently selected option with `.current.value`
 */
const CustomerAutocomplete = React.forwardRef((props, ref) => {
  const location = useLocation();
  const customerData = useSelector((state) => state.data);

  // get array of leads + accounts
  let optionsArray = [];
  for (const id in customerData.leads) {
    const lead = customerData.leads[id];
    optionsArray.push({ name: lead.name, type: "leads", id });
  }
  for (const id in customerData.accounts) {
    const account = customerData.accounts[id];
    optionsArray.push({ name: account.name, type: "accounts", id });
  }

  // try to pre-set appropriate default option
  let defaultValue = null;
  if (!props.dontCheckUrl) {
    const pathSegments = location.pathname.split("/");
    const type = pathSegments[2];
    const id = pathSegments[3];

    if (type in customerData)
      if (id in customerData[type])
        defaultValue = {
          name: customerData[type][id].name,
          type,
          id,
        };
  }

  const [value, setValue] = useState(defaultValue);

  useImperativeHandle(ref, () => ({ value }), [value]);

  return (
    <Autocomplete
      value={value}
      options={optionsArray}
      getOptionLabel={(option) => option.name}
      getOptionSelected={autocompleteOptionObjectCompare}
      groupBy={(option) => option.type}
      freeSolo={props.freesolo}
      onChange={(e, newVal) => {
        setValue(newVal);
        props.onChange(e, newVal);
      }}
      onInputChange={props.onInputChange}
      renderInput={(AcProps) => (
        <ValidTextField
          label="Customer"
          autoComplete="new-password" // prevent browser autofill
          {...props}
          {...AcProps}
        />
      )}
    />
  );
});

export default CustomerAutocomplete;
