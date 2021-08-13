import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";

// import {dataActions}
import { autocompleteOptionObjectCompare } from "../../lib/autocomplete";
import ValidTextField from "../ui/ValidTextField";

const IndustrySelect = React.forwardRef((props, ref) => {
  // const dispatch = useDispatch();  // for "add whatever" option
  const industries = useSelector((state) => state.data.industries);
  // const [enteredValue, setEnteredValue] = useState(null);
  const filter = createFilterOptions();

  const optionsArray = [];
  for (const id in industries) {
    optionsArray.push({ name: industries[id].name, id });
  }

  const changeHandler = (event, newValue) => {
    // console.log(newValue);
    if (props.onChange) props.onChange(event, newValue);
  };

  const filterOptions = (options, params) => {
    const filtered = filter(options, params);
    const industryNames = new Set(optionsArray.map((option) => option.name));
    const val = params.inputValue;

    // suggest new type if non-empty and unique
    if (val !== "" && !industryNames.has(val)) {
      filtered.push({
        name: `Add "${val}"`,
        inputValue: val,
      });
    }
    return filtered;
  };

  return (
    <Autocomplete
      value={props.value}
      options={optionsArray}
      getOptionLabel={(option) => option.name}
      getOptionSelected={autocompleteOptionObjectCompare}
      // filterOptions={filterOptions}  // enable the "add whatever" option
      onChange={changeHandler}
      onInputChange={props.onInputChange}
      renderInput={(AcProps) => (
        <ValidTextField
          label="Industry"
          // autoComplete="new-password"  // keep browser from suggesting autofill options
          {...props}
          {...AcProps}
        />
      )}
      style={{ flexGrow: 1 }}
    />
  );
});

export default IndustrySelect;
