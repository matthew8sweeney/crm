import React, { useEffect } from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@material-ui/core";

import { authActions } from "./store/auth-slice";
import LoginSignup from "./pages/LoginSignup";
import MainNavigation from "./components/ui/MainNavigation";
import PageNotFound from "./pages/PageNotFound";
import Timeline from "./pages/Timeline";
import "./App.css";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false)
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!authChecked) {
      dispatch(authActions.checkInitialAuth());
    }
    setAuthChecked(true);
  }, [dispatch, authChecked]);

  return (
    <div className="app">
      {loggedIn && <MainNavigation />}
      <Container
        className="app-container"
        style={loggedIn ? { marginLeft: "56px" } : {}}
      >
        <Switch>
          <Route exact path="/">
            {loggedIn && <Redirect to="/dashboard" />}
            <p>This shall be a resplendant CRM system someday</p>
            <NavLink to="/login">Login or Sign Up</NavLink>
          </Route>
          <Route path="/login">
            {loggedIn && <Redirect to="/dashboard" />}
            <LoginSignup login linkTo="/signup" />
          </Route>
          <Route path="/signup">
            {loggedIn && <Redirect to="/dashboard" />}
            <LoginSignup signup linkTo="/login" />
          </Route>
          {!loggedIn && authChecked && <Redirect to="/" />}

          <Route exact path="/dashboard">
            {/* Dashboard */}
          </Route>
          <Route exact path="/timeline">
            <Timeline />
          </Route>
          <Route exact path="/account">
            {/* Account */}
          </Route>
          <Route exact path="/settings">
            {/* Settings */}
          </Route>

          <Route path="/">
            <PageNotFound />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
