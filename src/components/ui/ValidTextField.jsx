import React from "react";
import { TextField } from "@material-ui/core";

import CollapsingDiv from "./CollapsingDiv";

/**
 * Mui TextField with animation for showing helperText.
 * `errorText` prop should hold error msg, or "" otherwise.
 */
const ValidTextField = (props) => {
  return (
    <CollapsingDiv
      in={!!props.errorText}
      inHeight={props.inHeight || 75}
      outHeight={props.outHeight || 56}
      inWidth={props.inWidth}
      outWidth={props.outWidth}
      transition={props.transition}
      className={props.className}
      style={{ display: "flex", ...props.style }}
    >
      <TextField
        type={props.type}
        value={props.value}
        label={props.label}
        error={!!props.errorText}
        helperText={props.errorText}
        onChange={props.onChange}
        inputRef={props.inputRef}
        inputProps={props.inputProps}
        fullWidth={props.fullWidth}
        {...props}
        style={{ flexGrow: 1 }}
      />
    </CollapsingDiv>
  );
};

export default ValidTextField;
