import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";

const IndustrySelect = React.forwardRef((props, ref) => {
  return (
    <FormControl variant={props.variant || "filled"}>
      <InputLabel htmlFor="industry-select">Industry</InputLabel>
      <Select
        value={props.value}
        labelId="industry-select"
        label="Industry"
        onChange={props.onChange}
        ref={ref}
      >
        <MenuItem value="">
          <i>None</i>
        </MenuItem>
        {["Placeholder Industry 1", "Placeholder Industry 2"].map(
          (name, idx) => (
            <MenuItem value={idx}>{name}</MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
});

export default IndustrySelect;
