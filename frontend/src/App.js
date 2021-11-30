import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { customTheme } from "./style/theme";
import { Grommet, Main } from "grommet";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { Watchlist } from "./components/Watchlist";
import { WatchListDetail } from "./components/WatchlistDetail";
import { Logout } from "./components/Logout";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import { Profile } from "./components/Settings";
import { AbnormalTable } from "./components/AbnormalTable";

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
            <Route exact path="/watchlist">
              <Watchlist />
            </Route>
            <Route
              exact
              path="/watchlist/:watchlistId"
              component={WatchListDetail}
            ></Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/settings">
              <Profile />
            </Route>
            <Route path="/abnormal">
              <AbnormalTable />
            </Route>
          </Switch>
        </Router>
      </Main>
    </Grommet>
  );
}

export default App;
