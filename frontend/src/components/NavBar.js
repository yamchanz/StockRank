import React, { useEffect, useState } from "react";
import { Header, Button, Menu } from "grommet";
import { useHistory, useLocation } from "react-router-dom";

function NavBar() {
  const history = useHistory();
  const location = useLocation();
  const [auth, setAuth] = useState(false);

  const goHomePageHandler = () => {
    history.push("/");
  };

  const goLoginPageHandler = () => {
    history.push("/login");
  };

  const goSignUpHandler = () => {
    history.push("/signup");
  };

  const goLogoutPageHandler = () => {
    history.push("/logout");
  };

  const goSettingsPageHandler = () => {
    history.push("/settings");
  };

  const goWatchlistPageHandler = () => {
    history.push("/watchlist");
  };

  // check auth every time address changes
  useEffect(() => {
    setAuth(localStorage.getItem("access_token") !== null);
  }, [location.pathname]);

  let options = determineOptions(
    goSignUpHandler,
    goLoginPageHandler,
    goLogoutPageHandler,
    goSettingsPageHandler,
    goWatchlistPageHandler,
    auth
  );

  return (
    <Header background="dark-1" pad={{ left: "small" }}>
      <Button
        plain={true}
        color="white"
        onClick={goHomePageHandler}
        label="StockRank"
      ></Button>
      <Menu label="Account" items={options} />
    </Header>
  );
}

const determineOptions = (
  goSignUpHandler,
  goLoginPageHandler,
  goLogoutPageHandler,
  goSettingsPageHandler,
  goWatchlistPageHandler,
  auth
) => {
  if (auth) {
    return [
      { label: "Watchlist", onClick: goWatchlistPageHandler },
      { label: "Settings", onClick: goSettingsPageHandler },
      { label: "Logout", onClick: goLogoutPageHandler },
    ];
  } else {
    return [
      { label: "Sign Up", onClick: goSignUpHandler },
      { label: "Login", onClick: goLoginPageHandler },
    ];
  }
};

export { NavBar };
