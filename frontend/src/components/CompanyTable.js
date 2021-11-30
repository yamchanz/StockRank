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

const CompanyTable = React.memo(
  ({ companies, watchlistId = null, watches = null, setWatches = null }) => {
    const handleAddButtonClick = (companyId) => () => {
      if (watchlistId === null || watches === null || setWatches === null)
        return;

      axios.get("stocks/?companyid=" + companyId).then((res) => {
        const tickerSymbol = res.data[0]["tickersymbol"];
        console.log(tickerSymbol);
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
      });
    };

    return (
      <React.Fragment>
        {isEmpty(companies) ? null : (
          <Table>
            <TableHeader>
              <TableRow>
                {watchlistId ? <TableCell>Action</TableCell> : null}
                <TableCell scope="col" border="bottom">
                  Name
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Sector
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Industry
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies["entries"].map((company, idx) => {
                return (
                  <TableRow key={idx}>
                    {watchlistId ? (
                      <TableCell>
                        <Button
                          primary
                          icon={<Add />}
                          onClick={handleAddButtonClick(company["companyid"])}
                        />
                      </TableCell>
                    ) : null}
                    <TableCell scope="row">
                      <strong>{company["companyname"]}</strong>
                    </TableCell>
                    <TableCell>{company["sector"]}</TableCell>
                    <TableCell>{company["industry"]}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter width="large">
              <TableRow>
                <TableCell>
                  <Text>
                    Total:{" "}
                    {companies["count"] === -1
                      ? companies["entries"].length
                      : companies["count"]}
                  </Text>
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

export { CompanyTable };
