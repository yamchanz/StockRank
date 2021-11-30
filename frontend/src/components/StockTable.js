import { axiosInstance as axios } from "../axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableFooter,
  Text,
} from "grommet";
import { Add } from "grommet-icons";
import React from "react";

const StockTable = React.memo(
  ({ stocks, watchlistId = null, watches = null, setWatches = null }) => {
    const handleAddButtonClick = (tickerSymbol) => () => {
      if (watchlistId === null || watches === null || setWatches === null)
        return;

      axios
        .post("watches/", {
          watchlistid: watchlistId,
          tickersymbol: tickerSymbol,
        })
        .then((res) => {
          let newWatches = [...watches];
          newWatches.unshift(res.data);
          setWatches(newWatches);
        });
    };

    return (
      <React.Fragment>
        {isEmpty(stocks) ? null : (
          <Table>
            <TableHeader>
              <TableRow>
                {watchlistId ? <TableCell>Action</TableCell> : null}
                <TableCell scope="col" border="bottom">
                  Ticker Symbol
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Year-Over-Year Revenue
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Price/Sales
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stocks.map((stock, idx) => {
                return (
                  <TableRow key={idx}>
                    {watchlistId ? (
                      <TableCell>
                        <Button
                          primary
                          icon={<Add />}
                          onClick={handleAddButtonClick(stock["tickersymbol"])}
                        />
                      </TableCell>
                    ) : null}
                    <TableCell scope="row">
                      <strong>{stock["tickersymbol"]}</strong>
                    </TableCell>
                    <TableCell>{stock["yoyrevenue"]}</TableCell>
                    <TableCell>{stock["ps"]}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter width="large">
              <TableRow>
                <TableCell>
                  <Text>Total: {stocks.length}</Text>
                </TableCell>
                <TableCell />
                <TableCell />
                {watchlistId ? <TableCell /> : null}
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </React.Fragment>
    );
  }
);

const isEmpty = (data) => {
  return data === undefined || Object.keys(data).length === 0;
};

export { StockTable };
