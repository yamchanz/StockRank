import { axiosInstance as axios } from "../axios";
import React, { memo, useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Meter,
} from "grommet";

const WatchlistTierView = memo(({ watches }) => {
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
      setLists(await generateLists(watches));
      setLoading(false);
    };
    fetchTiers();
  }, [watches]);

  return (
    <React.Fragment>
      {loading ? null : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell align="center" scope="col" border="bottom">
                Tier
              </TableCell>
              <TableCell align="center" scope="col" border="bottom">
                Ticker Symbol
              </TableCell>
              <TableCell align="center" scope="col" border="bottom">
                Percentage
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell align="center" scope="row">
                SS
              </TableCell>
              <TableCell align="center" scope="row">
                {lists["SS"].join(",")}
              </TableCell>
              <TableCell align="center" scope="row">
                <Meter
                  values={[
                    {
                      value: calculatePercentage(
                        lists["SS"].length,
                        watches.length
                      ),
                    },
                  ]}
                  aria-label="meter"
                ></Meter>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" scope="row">
                S+
              </TableCell>
              <TableCell align="center" scope="row">
                {lists["S+"].join(",")}
              </TableCell>
              <TableCell align="center" scope="row">
                <Meter
                  values={[
                    {
                      value: calculatePercentage(
                        lists["S+"].length,
                        watches.length
                      ),
                    },
                  ]}
                  aria-label="meter"
                ></Meter>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" scope="row">
                S
              </TableCell>
              <TableCell align="center" scope="row">
                {lists["S"].join(",")}
              </TableCell>
              <TableCell align="center" scope="row">
                <Meter
                  values={[
                    {
                      value: calculatePercentage(
                        lists["S"].length,
                        watches.length
                      ),
                    },
                  ]}
                  aria-label="meter"
                ></Meter>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" scope="row">
                S-
              </TableCell>
              <TableCell align="center" scope="row">
                {lists["S-"].join(",")}
              </TableCell>
              <TableCell align="center" scope="row">
                <Meter
                  values={[
                    {
                      value: calculatePercentage(
                        lists["S-"].length,
                        watches.length
                      ),
                    },
                  ]}
                  aria-label="meter"
                ></Meter>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" scope="row">
                A+
              </TableCell>
              <TableCell align="center" scope="row">
                {lists["A+"].join(",")}
              </TableCell>
              <TableCell align="center" scope="row">
                <Meter
                  values={[
                    {
                      value: calculatePercentage(
                        lists["A+"].length,
                        watches.length
                      ),
                    },
                  ]}
                  aria-label="meter"
                ></Meter>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" scope="row">
                A
              </TableCell>
              <TableCell align="center" scope="row">
                {lists["A"].join(",")}
              </TableCell>
              <TableCell align="center" scope="row">
                <Meter
                  values={[
                    {
                      value: calculatePercentage(
                        lists["A"].length,
                        watches.length
                      ),
                    },
                  ]}
                  aria-label="meter"
                ></Meter>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" scope="row">
                A-
              </TableCell>
              <TableCell align="center" scope="row">
                {lists["A-"].join(",")}
              </TableCell>
              <TableCell align="center" scope="row">
                <Meter
                  values={[
                    {
                      value: calculatePercentage(
                        lists["A-"].length,
                        watches.length
                      ),
                    },
                  ]}
                  aria-label="meter"
                ></Meter>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" scope="row">
                B+
              </TableCell>
              <TableCell align="center" scope="row">
                {lists["B+"].join(",")}
              </TableCell>
              <TableCell align="center" scope="row">
                <Meter
                  values={[
                    {
                      value: calculatePercentage(
                        lists["B+"].length,
                        watches.length
                      ),
                    },
                  ]}
                  aria-label="meter"
                ></Meter>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" scope="row">
                B
              </TableCell>
              <TableCell align="center" scope="row">
                {lists["B"].join(",")}
              </TableCell>
              <TableCell align="center" scope="row">
                <Meter
                  values={[
                    {
                      value: calculatePercentage(
                        lists["B"].length,
                        watches.length
                      ),
                    },
                  ]}
                  aria-label="meter"
                ></Meter>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" scope="row">
                B-
              </TableCell>
              <TableCell align="center" scope="row">
                {lists["B-"].join(",")}
              </TableCell>
              <TableCell align="center" scope="row">
                <Meter
                  values={[
                    {
                      value: calculatePercentage(
                        lists["B-"].length,
                        watches.length
                      ),
                    },
                  ]}
                  aria-label="meter"
                ></Meter>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" scope="row">
                C+
              </TableCell>
              <TableCell align="center" scope="row">
                {lists["C+"].join(",")}
              </TableCell>
              <TableCell align="center" scope="row">
                <Meter
                  values={[
                    {
                      value: calculatePercentage(
                        lists["C+"].length,
                        watches.length
                      ),
                    },
                  ]}
                  aria-label="meter"
                ></Meter>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" scope="row">
                C
              </TableCell>
              <TableCell align="center" scope="row">
                {lists["C"].join(",")}
              </TableCell>
              <TableCell align="center" scope="row">
                <Meter
                  values={[
                    {
                      value: calculatePercentage(
                        lists["C"].length,
                        watches.length
                      ),
                    },
                  ]}
                  aria-label="meter"
                ></Meter>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" scope="row">
                C-
              </TableCell>
              <TableCell align="center" scope="row">
                {lists["C-"].join(",")}
              </TableCell>
              <TableCell align="center" scope="row">
                <Meter
                  values={[
                    {
                      value: calculatePercentage(
                        lists["C-"].length,
                        watches.length
                      ),
                    },
                  ]}
                  aria-label="meter"
                ></Meter>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" scope="row">
                D+
              </TableCell>
              <TableCell align="center" scope="row">
                {lists["D+"].join(",")}
              </TableCell>
              <TableCell align="center" scope="row">
                <Meter
                  values={[
                    {
                      value: calculatePercentage(
                        lists["D+"].length,
                        watches.length
                      ),
                    },
                  ]}
                  aria-label="meter"
                ></Meter>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" scope="row">
                D
              </TableCell>
              <TableCell align="center" scope="row">
                {lists["D"].join(",")}
              </TableCell>
              <TableCell align="center" scope="row">
                <Meter
                  values={[
                    {
                      value: calculatePercentage(
                        lists["D"].length,
                        watches.length
                      ),
                    },
                  ]}
                  aria-label="meter"
                ></Meter>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" scope="row">
                D-
              </TableCell>
              <TableCell align="center" scope="row">
                {lists["D-"].join(",")}
              </TableCell>
              <TableCell align="center" scope="row">
                <Meter
                  values={[
                    {
                      value: calculatePercentage(
                        lists["D-"].length,
                        watches.length
                      ),
                    },
                  ]}
                  aria-label="meter"
                ></Meter>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" scope="row">
                F
              </TableCell>
              <TableCell align="center" scope="row">
                {lists["F"].join(",")}
              </TableCell>
              <TableCell align="center" scope="row">
                <Meter
                  values={[
                    {
                      value: calculatePercentage(
                        lists["F"].length,
                        watches.length
                      ),
                    },
                  ]}
                  aria-label="meter"
                ></Meter>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" scope="row">
                NA
              </TableCell>
              <TableCell align="center" scope="row">
                {lists["NA"].join(",")}
              </TableCell>
              <TableCell align="center" scope="row">
                <Meter
                  values={[
                    {
                      value: calculatePercentage(
                        lists["NA"].length,
                        watches.length
                      ),
                    },
                  ]}
                  aria-label="meter"
                ></Meter>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
});

const calculatePercentage = (tierLength, watchesLength) => {
  if (tierLength === 0) return 0;
  return (tierLength / watchesLength) * 100;
};

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
