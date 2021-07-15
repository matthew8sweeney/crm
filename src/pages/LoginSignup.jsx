import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, Grid, Link, Typography } from "@material-ui/core";

import AuthForm from "../components/auth/AuthForm";
import classes from "./LoginSignup.module.css";

/**
 * Page showing a card for login/signup.
 * Give the `login` prop for login mode, otherwise signup.
 * `linkTo` specifies the opposite url (signup/login).
 */
const LoginSignup = (props) => {
  const modeInfo = props.login
    ? { mainText: "Login", linkText: "Or Sign Up" }
    : { mainText: "Sign Up", linkText: "Or Login" };

  return (
    <Card raised className={classes.root}>
      <Grid container direction="column" justifyContent="space-evenly">
        <Grid item>
          <Typography className={classes["main-text"]}>{modeInfo.mainText}</Typography>
        </Grid>
        <Grid item>
          <AuthForm />
        </Grid>
        <Grid item className={classes["link__grid-item"]}>
          <Link component={RouterLink} to={props.linkTo}>
            {modeInfo.linkText}
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
};

export default LoginSignup;
