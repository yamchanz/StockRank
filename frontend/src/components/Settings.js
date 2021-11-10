import React, { useState, useEffect } from "react";
import { axiosInstance as axios } from "../axios";
import { Link, useHistory } from "react-router-dom";
import { Avatar, Box, Button, Heading, Main, Text, TextInput } from "grommet";
import { Trash } from "grommet-icons";

function Profile() {
  const history = useHistory();

  const [userProfile, setUserProfile] = useState({
    firstname: "A",
  });

  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  const [newFirstName, setNewFirstName] = useState({
    firstname: "",
  });

  const [newPassword, setnewPassword] = useState({
    password: "",
  });

  useEffect(() => {
    axios
      .get("users/")
      .then((res) => {
        // capitalize first character
        res.data["firstname"] =
          res.data["firstname"][0].toUpperCase() +
          res.data["firstname"].substr(1);
        setUserProfile(res.data);
        setAuth(true);
      })
      .catch((err) => {
        if (err.status === 401) {
          setUserProfile({ firstname: "You are unauthorized" });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleFirstNameOnChange = (event) => {
    let nextNewFirstName = {};
    nextNewFirstName["firstname"] = event.target.value;
    setNewFirstName(nextNewFirstName);
  };

  const handleFirtNameUpdate = () => {
    axios.put("users/", newFirstName).then((res) => {
      const currUserProfile = { ...userProfile };
      currUserProfile["firstname"] = res.data["firstname"];
      setUserProfile(currUserProfile);
    });
  };

  const handlePasswordOnChange = (event) => {
    let nextNewPassword = {};
    nextNewPassword["password"] = event.target.value;
    setnewPassword(nextNewPassword);
  };

  const handlePasswordUpdate = () => {
    axios.put("users/", newPassword).then((_res) => {
      console.log("success");
    });
  };

  const handleDeleteAccount = () => {
    axios.delete("users/").then((_res) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      axios.defaults.headers["Authorization"] = null;
      console.log("success");
      history.push("/");
    });
  };

  const settings = (
    <React.Fragment>
      <Heading>Account Settings</Heading>
      <Box
        border={{
          color: "brand",
          side: "bottom",
          size: "medium",
        }}
      >
        <Box
          margin={{ bottom: "medium" }}
          direction="row"
          align="center"
          gap="medium"
        >
          <Avatar background="brand">
            {userProfile.firstname[0].toUpperCase()}
          </Avatar>
          <Text>
            {userProfile.firstname[0].toUpperCase() +
              userProfile.firstname.substr(1)}
          </Text>
        </Box>
      </Box>
      <Box pad={{ top: "large", bottom: "medium" }} gap="medium" width="large">
        <Text truncate={true}>First Name</Text>
        <Box direction="row" gap="medium">
          <TextInput type="text" onChange={handleFirstNameOnChange}></TextInput>
          <Button label="Update" onClick={handleFirtNameUpdate}></Button>
        </Box>
      </Box>
      <Box pad={{ bottom: "large" }} gap="medium" width="large">
        <Text truncate={true}>Password</Text>
        <Box direction="row" gap="medium">
          <TextInput
            type="password"
            onChange={handlePasswordOnChange}
          ></TextInput>
          <Button label="Update" onClick={handlePasswordUpdate}></Button>
        </Box>
      </Box>
      <Box pad={{ bottom: "large" }} gap="medium" width="fit-content">
        <Button
          primary
          label="Delete Account"
          onClick={handleDeleteAccount}
          icon={<Trash color="status-critical" />}
        ></Button>
      </Box>
    </React.Fragment>
  );

  const unauthorized = (
    <Text>
      Please <Link to="/login"> login </Link> first
    </Text>
  );

  let content = null;
  if (!loading) {
    content = auth ? settings : unauthorized;
  }

  return <Main pad={{ left: "large", right: "large" }}>{content}</Main>;
}

export { Profile };
