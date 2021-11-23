import { axiosInstance as axios } from "../axios";
import React, { useState } from "react";
import { Box, TextInput, Text, Button } from "grommet";
import { StockTable } from "./StockTable";

const SearchStock = React.memo(
  ({ watchlistId = null, watches = null, setWatches = null }) => {
    const [tickerSymbol, setTickerSymbol] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const tickerSymbolOnChangeHandler = (event) => {
      setTickerSymbol(event.target.value);
    };

    const onSearchClickHandler = () => {
      const searchURL = createSearchURL(tickerSymbol);
      axios.get("/stocks/?" + searchURL).then((res) => {
        console.log(res.data);
        setSearchResult(res.data);
      });
    };

    return (
      <Box pad="large" gap="medium">
        <Box gap="small">
          <Text>Ticker Symbol</Text>
          <TextInput
            placeholder="Starts with or Exact"
            value={tickerSymbol}
            onChange={tickerSymbolOnChangeHandler}
          />
        </Box>
        <Button label="Search" onClick={onSearchClickHandler}></Button>
        <StockTable
          stocks={searchResult}
          watchlistId={watchlistId}
          watches={watches}
          setWatches={setWatches}
        />
      </Box>
    );
  }
);

const createSearchURL = (tickerSymbol) => {
  let searchURL = "";
  if (tickerSymbol.length > 0) {
    searchURL += "tickersymbol=" + tickerSymbol.toUpperCase();
  }
  return searchURL;
};

export { SearchStock };
