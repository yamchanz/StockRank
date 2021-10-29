import { axiosInstance as axios } from "../axios";
import React, { useState } from "react";

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
    <div>
      <div>
        <p>Account Name</p>
        <input
          type="text"
          onChange={inputAccountNameHandler}
          value={accountName}
        ></input>
      </div>
      <div>
        <p>First Name</p>
        <input
          type="text"
          onChange={inputFirstNameHandler}
          value={firstName}
        ></input>
      </div>
      <div>
        <p>Password</p>
        <input
          type="password"
          onChange={inputPasswordHandler}
          value={password}
        ></input>
      </div>
      <button onClick={createAccountHandler}>Create Account</button>
    </div>
  );
}

export { SignUp };
