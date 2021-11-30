import { axiosInstance as axios } from "../axios";
import React, { memo, useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  Box,
  Main,
  Heading,
  Tab,
  Tabs,
  Text,
  TextInput,
  Button,
} from "grommet";
import { Edit, Save, LinkPrevious } from "grommet-icons";
import { SearchCompany } from "./SearchCompany";
import { SearchStock } from "./SearchStock";
import { WatchlistTierView } from "./WatchlistTierView";

const WatchListDetail = memo(() => {
  const { watchlistId } = useParams();
  const history = useHistory();

  const [watchListInfo, setWatchListInfo] = useState({
    watchlistname: "Not Found",
  });
  const [watches, setWatches] = useState([]);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedListName, setUpdatedListName] = useState(
    watchListInfo.watchlistname
  );
  const unauthorized = (
    <Text>
      Please <Link to="/login"> login </Link> first
    </Text>
  );

  useEffect(() => {
    axios
      .get("watchlist/?watchlistid=" + watchlistId)
      .then((res) => {
        setWatchListInfo(res.data);
        setUpdatedListName(res.data.watchlistname);
        setAuth(true);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setAuth(false);
        }
        setLoading(false);
      });

    axios
      .get("watches/?watchlistid=" + watchlistId)
      .then((res) => {
        setWatches(res.data);
        setAuth(true);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setAuth(false);
        }
        setLoading(false);
      });
  }, [watchlistId]);

  const toggleEditModeHandler = () => {
    setEditMode(!editMode);
  };

  const editListNameHandler = (event) => {
    setUpdatedListName(event.target.value);
  };

  const updateListNameHandler = () => {
    axios
      .put("watchlist/", {
        watchlistid: watchlistId,
        watchlistname: updatedListName,
      })
      .then((res) => {
        console.log(res.data);
        setWatchListInfo(res.data);
      });
    toggleEditModeHandler();
  };

  const goWatchlistPageHandler = () => {
    history.push("/watchlist");
  };

  const detail = (
    <React.Fragment>
      <Box align="start">
        <Box direction="row" align="center" gap="medium">
          {editMode ? (
            <Box pad="medium">
              <TextInput
                placeholder={watchListInfo.watchlistname}
                value={updatedListName}
                onChange={editListNameHandler}
              />
            </Box>
          ) : (
            <Heading>{watchListInfo.watchlistname}</Heading>
          )}
          <Box>
            <Button
              primary
              icon={editMode ? <Save /> : <Edit />}
              onClick={editMode ? updateListNameHandler : toggleEditModeHandler}
            />
          </Box>
        </Box>
        <Button
          plain
          icon={<LinkPrevious />}
          label="Back to lists"
          onClick={goWatchlistPageHandler}
        />
      </Box>
      <Tabs>
        <Tab title="Stocks in this List">
          <Box pad="large" gap="medium">
            <WatchlistTierView watches={watches} />
          </Box>
        </Tab>
        <Tab title="Search Stock by Company">
          <SearchCompany
            watchlistId={watchlistId}
            watches={watches}
            setWatches={setWatches}
          />
        </Tab>
        <Tab title="Search Stock by Ticker Symbol">
          <SearchStock
            watchlistId={watchlistId}
            watches={watches}
            setWatches={setWatches}
          />
        </Tab>
      </Tabs>
    </React.Fragment>
  );

  let content = null;
  if (!loading) {
    content = auth ? detail : unauthorized;
  }

  return <Main pad={{ left: "large", right: "large" }}>{content}</Main>;
});

export { WatchListDetail };
