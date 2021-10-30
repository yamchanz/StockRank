import React from "react";
import { Header, Button, Menu } from "grommet";
import { useHistory } from "react-router-dom";

function NavBar() {
  const history = useHistory();

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

  return (
    <Header background="dark-1" pad={{ left: "small" }}>
      <Button
        plain={true}
        color="white"
        onClick={goHomePageHandler}
        label="StockRank"
      ></Button>
      <Menu
        label="Account"
        items={[
          { label: "Sign Up", onClick: goSignUpHandler },
          { label: "Login", onClick: goLoginPageHandler },
          { label: "Logout", onClick: goLogoutPageHandler },
        ]}
      />
    </Header>
  );
}

export { NavBar };
