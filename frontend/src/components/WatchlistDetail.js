import { axiosInstance as axios } from "../axios";
import React, { memo, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Main, Heading, Tab, Tabs, Text } from "grommet";
import { SearchCompany } from "./SearchCompany";
import { SearchStock } from "./SearchStock";
import { WatchlistTierView } from "./WatchlistTierView";

const WatchListDetail = memo(() => {
  let { watchlistId } = useParams();
  const [watchListInfo, setWatchListInfo] = useState({
    watchlistname: "Not Found",
  });
  const [watches, setWatches] = useState([]);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
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

  const detail = (
    <React.Fragment>
      <Heading>{watchListInfo.watchlistname}</Heading>
      <Tabs>
        <Tab title="Stocks in this List">
          <Box pad="large" gap="medium">
            <WatchlistTierView watches={watches} />
          </Box>
        </Tab>
        <Tab title="Search Stock by Company">
          <SearchCompany />
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
