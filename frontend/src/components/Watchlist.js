import { axiosInstance as axios } from "../axios";
import React, { useState, useEffect, memo } from "react";
import { useHistory, Link } from "react-router-dom";
import { Box, Button, List, TextInput, Heading, Main, Text } from "grommet";

const Watchlist = memo(() => {
  const history = useHistory();
  const [watchlists, setWatchlists] = useState([]);
  const [newWatchlistName, setNewWatchlistName] = useState("");
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("watchlist/")
      .then((res) => {
        setWatchlists(res.data);
        setAuth(true);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setAuth(false);
        }
        setLoading(false);
      });
  }, []);

  const onNewWatchlistNameChangeHandler = (event) => {
    setNewWatchlistName(event.target.value);
  };

  const onCreateClickHandler = () => {
    if (newWatchlistName.length > 0) {
      axios
        .post("watchlist/", { watchlistname: newWatchlistName })
        .then((res) => {
          let nextWatchlists = [...watchlists];
          nextWatchlists.unshift(res.data);
          setWatchlists(nextWatchlists);
          setNewWatchlistName("");
        });
    }
  };

  /**
   * @abstract Handler returns a function that handles view button click
   * @param {int} watchlistId
   * @returns
   */
  const onViewClickHandler = (watchlistId) => () => {
    console.log(watchlistId);
    history.push("/watchlist/" + watchlistId);
  };

  const onDeleteClickHandler = (watchlistId, index) => () => {
    console.log(watchlistId);
    axios
      .delete("watchlist/", { data: { watchlistId: watchlistId } })
      .then((_res) => {
        let nextWatchlists = [...watchlists];
        nextWatchlists.splice(index, 1);
        setWatchlists(nextWatchlists);
      });
  };

  const list = (
    <React.Fragment>
      <Heading>Your Watchlists</Heading>
      <Box
        margin={{ bottom: "medium" }}
        direction="row"
        align="center"
        gap="medium"
      >
        <TextInput
          placeholder="Type watchlist name here"
          value={newWatchlistName}
          onChange={onNewWatchlistNameChangeHandler}
        ></TextInput>
        <Button primary label="Create" onClick={onCreateClickHandler} />
      </Box>
      <List
        primaryKey={(item) => (
          <Box key={item.watchlistId} direction="row" gap="large">
            <Text weight="bold">{item.watchlistname}</Text>
            <Text weight="lighter">{item.datecreated}</Text>
          </Box>
        )}
        data={watchlists}
        action={(item, index) => {
          return (
            <Box direction="row" gap="medium" key="item.watchlistid">
              <Button
                primary
                label="View"
                onClick={onViewClickHandler(item.watchlistid)}
              />
              <Button
                secondary
                label="Delete"
                onClick={onDeleteClickHandler(item.watchlistid, index)}
              />
            </Box>
          );
        }}
      />
    </React.Fragment>
  );

  const unauthorized = (
    <Text>
      Please <Link to="/login"> login </Link> first
    </Text>
  );

  let content = null;
  if (!loading) {
    content = auth ? list : unauthorized;
  }

  return <Main pad={{ left: "large", right: "large" }}>{content}</Main>;
});

export { Watchlist };
