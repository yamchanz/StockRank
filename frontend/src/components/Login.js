import { axiosInstance as axios } from "../axios";
import React, { useState } from "react";
import { TextInput, Text, Box, Button, Main, Heading } from "grommet";
import { LinkNext } from "grommet-icons";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [accountName, setAccountName] = useState("");
  const [password, setPassWord] = useState("");

  const inputAccountNameHandler = (event) => {
    setAccountName(event.target.value);
  };

  const inputPasswordHandler = (event) => {
    setPassWord(event.target.value);
  };

  const loginHandler = (event) => {
    const user = {
      userlogin: accountName,
      password: password,
    };

    axios
      .post("token/", user)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axios.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        history.push("/settings");
      })
      .catch((err) => {
        if (err.status === 401) {
          console.log("failed to login");
        }
      });
  };

  return (
    <Main pad="large" align="center" justify="center" fill={true}>
      <Heading>Login</Heading>
      <Box width="medium" gap="small">
        <Text>Account Name</Text>
        <TextInput
          type="text"
          onChange={inputAccountNameHandler}
          value={accountName}
        ></TextInput>
        <Text>Password</Text>
        <TextInput
          type="password"
          onChange={inputPasswordHandler}
          value={password}
        ></TextInput>
        <Box pad={{ top: "small" }}>
          <Button
            primary
            reverse
            size="large"
            onClick={loginHandler}
            label="Login"
            width="medium"
            icon={<LinkNext />}
          ></Button>
        </Box>
      </Box>
    </Main>
  );
}

export { Login };
