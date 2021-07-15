import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";

import { uiActions } from "../../store/ui-slice";
import { authActions } from "../../store/auth-slice";
import ValidTextField from "../ui/ValidTextField";
import classes from "./AuthForm.module.css";

const isValidEmail = (str) => str.length > 5 && str.includes("@") && str.includes(".");
const isValidPassword = (str) => str.length >= 6;

/**
 * Form with auto-validated email and password inputs, and submit button.
 */
const AuthForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const emailError = useSelector((state) => state.ui.emailError);
  const passwordError = useSelector((state) => state.ui.passwordError);
  const dispatch = useDispatch();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const emailChangeHandler = (event) => {
    const newEmail = emailRef.current.value;
    setEnteredEmail(newEmail);

    if (isValidEmail(newEmail)) {
      // remove error message is new value is valid
      dispatch(uiActions.clearEmailError());
    }
  };

  const passwordChangeHandler = (event) => {
    const newPassword = passwordRef.current.value;
    setEnteredPassword(newPassword);

    if (isValidPassword(newPassword)) {
      // remove error message is new value is valid
      dispatch(uiActions.clearPasswordError());
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let inputsAreValid = true;
    if (isValidPassword(enteredPassword)) {
      dispatch(uiActions.clearPasswordError());
    } else {
      // password too short
      dispatch(uiActions.showPasswordError("Password must be at least 6 characters"));
      passwordRef.current.focus();
      inputsAreValid = false;
    }

    if (isValidEmail(enteredEmail)) {
      dispatch(uiActions.clearEmailError());
    } else {
      // not even close to an email addr
      dispatch(uiActions.showEmailError("Enter a valid email address"));
      emailRef.current.focus();
      inputsAreValid = false;
    }

    if (inputsAreValid) {
      dispatch(authActions.requestLogin(enteredEmail, enteredPassword));
    }
  };

  return (
    <form onSubmit={submitHandler} className={classes.root}>
      <ValidTextField
        value={enteredEmail}
        label="email"
        inputRef={emailRef}
        errorText={emailError}
        onChange={emailChangeHandler}
        className={classes.child}
        fullWidth
      />
      <ValidTextField
        value={enteredPassword}
        type="password"
        label="password"
        inputRef={passwordRef}
        errorText={passwordError}
        onChange={passwordChangeHandler}
        className={classes.child}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" className={classes.child}>
        Submit
      </Button>
    </form>
  );
};

export default AuthForm;
