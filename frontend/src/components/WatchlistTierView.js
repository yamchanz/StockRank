import { axiosInstance as axios } from "../axios";
import React, { memo, useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "grommet";

const WatchlistTierView = memo(({ tickerSymbols }) => {
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState({
    SS: [],
    "S+": [],
    S: [],
    "S-": [],
    "A+": [],
    A: [],
    "A-": [],
    "B+": [],
    B: [],
    "B-": [],
    "C+": [],
    C: [],
    "C-": [],
    "D+": [],
    D: [],
    "D-": [],
    F: [],
    NA: [],
  });
  useEffect(() => {
    const fetchTiers = async () => {
      setLists(await generateLists(tickerSymbols));
      setLoading(false);
    };
    fetchTiers();
  }, [tickerSymbols]);

  return (
    <React.Fragment>
      {loading ? null : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom">
                Tier
              </TableCell>
              <TableCell scope="col" border="bottom">
                Ticker Symbol
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell scope="col" border="bottom">
                SS
              </TableCell>
              <TableCell scope="col" border="bottom">
                {lists["SS"].join(",")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="col" border="bottom">
                S+
              </TableCell>
              <TableCell scope="col" border="bottom">
                {lists["S+"].join(",")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="col" border="bottom">
                S
              </TableCell>
              <TableCell scope="col" border="bottom">
                {lists["S"].join(",")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="col" border="bottom">
                S-
              </TableCell>
              <TableCell scope="col" border="bottom">
                {lists["S-"].join(",")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="col" border="bottom">
                A+
              </TableCell>
              <TableCell scope="col" border="bottom">
                {lists["A+"].join(",")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="col" border="bottom">
                A
              </TableCell>
              <TableCell scope="col" border="bottom">
                {lists["A"].join(",")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="col" border="bottom">
                A-
              </TableCell>
              <TableCell scope="col" border="bottom">
                {lists["A-"].join(",")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="col" border="bottom">
                B+
              </TableCell>
              <TableCell scope="col" border="bottom">
                {lists["B+"].join(",")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="col" border="bottom">
                B
              </TableCell>
              <TableCell scope="col" border="bottom">
                {lists["B"].join(",")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="col" border="bottom">
                B-
              </TableCell>
              <TableCell scope="col" border="bottom">
                {lists["B-"].join(",")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="col" border="bottom">
                C+
              </TableCell>
              <TableCell scope="col" border="bottom">
                {lists["C+"].join(",")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="col" border="bottom">
                C
              </TableCell>
              <TableCell scope="col" border="bottom">
                {lists["C"].join(",")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="col" border="bottom">
                C-
              </TableCell>
              <TableCell scope="col" border="bottom">
                {lists["C-"].join(",")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="col" border="bottom">
                D+
              </TableCell>
              <TableCell scope="col" border="bottom">
                {lists["D+"].join(",")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="col" border="bottom">
                D
              </TableCell>
              <TableCell scope="col" border="bottom">
                {lists["D"].join(",")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="col" border="bottom">
                D-
              </TableCell>
              <TableCell scope="col" border="bottom">
                {lists["D-"].join(",")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="col" border="bottom">
                F
              </TableCell>
              <TableCell scope="col" border="bottom">
                {lists["F"].join(",")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="col" border="bottom">
                NA
              </TableCell>
              <TableCell scope="col" border="bottom">
                {lists["NA"].join(",")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
});

const generateLists = async (watches) => {
  const lists = {
    SS: [],
    "S+": [],
    S: [],
    "S-": [],
    "A+": [],
    A: [],
    "A-": [],
    "B+": [],
    B: [],
    "B-": [],
    "C+": [],
    C: [],
    "C-": [],
    "D+": [],
    D: [],
    "D-": [],
    F: [],
    NA: [],
  };

  for await (const watch of watches) {
    await axios
      .get("/stocks/?tickersymbol=" + watch["tickersymbol"])
      .then((res) => {
        lists[res.data[0]["tier"]].push(watch["tickersymbol"]);
      });
  }

  return lists;
};

export { WatchlistTierView };
