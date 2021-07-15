import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "@material-ui/core";

import LoginSignup from "./pages/LoginSignup";
import MainNavigation from "./components/ui/MainNavigation";
import "./App.css";

function App() {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn) || true; // TODO remove true

  return (
    <div className="app">
      {loggedIn && <MainNavigation />}
      <Container
        className="app-container"
        style={loggedIn ? { marginLeft: "56px" } : {}}
      >
        <Switch>
          <Route exact path="/">
            <p>This shall be a resplendant CRM system someday</p>
          </Route>
          <Route path="/login">
            <LoginSignup login linkTo="/signup" />
          </Route>
          <Route path="/signup">
            <LoginSignup signup linkTo="/login" />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
