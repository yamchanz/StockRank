import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { customTheme } from "./style/theme";
import { Grommet, Main } from "grommet";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { Watchlist } from "./components/Watchlist";
import { Logout } from "./components/Logout";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import { Profile } from "./components/Settings";

function App() {
  return (
    <Grommet theme={customTheme}>
      <Main>
        <Router>
          <NavBar></NavBar>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/watchlist">
              <Watchlist />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/settings">
              <Profile />
            </Route>
          </Switch>
        </Router>
      </Main>
    </Grommet>
  );
}

export default App;
