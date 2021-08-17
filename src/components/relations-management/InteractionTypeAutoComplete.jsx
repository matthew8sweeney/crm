import React from "react";
import { useSelector } from "react-redux";
import { Autocomplete } from "@material-ui/lab";

import { autocompleteOptionObjectCompare } from "../../lib/autocomplete";
import ValidTextField from "../ui/ValidTextField";

/**
 * An autocomplete select input for choosing interaction type.
 */
const InteractionTypeAutoComplete = (props) => {
  const types = useSelector((state) => state.data.interactionTypes);

  const optionsArray = [];
  for (const id in types) {
    optionsArray.push({ name: types[id].name, id });
  }

  //TODO choose from types or specify own custom type
  return (
    <Autocomplete
    value={props.value}
      options={optionsArray}
      getOptionLabel={(option) => option.name}
      getOptionSelected={autocompleteOptionObjectCompare}
      onChange={props.onChange}
      onInputChange={props.onInputChange}
      renderInput={(AcProps) => (
        <ValidTextField
          label="Interaction Type"
          autoComplete="new-password"
          {...props}
          {...AcProps}
        />
      )}
    />
  );
};

export default InteractionTypeAutoComplete;
