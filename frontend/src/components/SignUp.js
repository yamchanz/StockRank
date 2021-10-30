import { axiosInstance as axios } from "../axios";
import React, { useState } from "react";
import { TextInput, Text, Box, Button, Main, Heading } from "grommet";

function SignUp() {
  const [accountName, setAccountName] = useState("");
  const [password, setPassWord] = useState("");
  const [firstName, setFirstName] = useState("");

  const inputAccountNameHandler = (event) => {
    setAccountName(event.target.value);
  };

  const inputPasswordHandler = (event) => {
    setPassWord(event.target.value);
  };

  const inputFirstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const createAccountHandler = (event) => {
    const user = {
      userlogin: accountName,
      password: password,
      firstname: firstName,
    };

    axios.post("users/registration/", user);
  };

  return (
    <Main pad="large" align="center" justify="center" fill={true}>
      <Heading>Sign Up</Heading>
      <Box width="medium" gap="small">
        <Text>Account Name</Text>
        <TextInput
          type="text"
          onChange={inputAccountNameHandler}
          value={accountName}
        ></TextInput>

        <Text>First Name</Text>
        <TextInput
          type="text"
          onChange={inputFirstNameHandler}
          value={firstName}
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
            size="large"
            onClick={createAccountHandler}
            label="Create Account"
            width="medium"
          ></Button>
        </Box>
      </Box>
    </Main>
  );
}

export { SignUp };
