import { axiosInstance as axios } from "../axios";
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "grommet";
const AbnormalTable = React.memo(() => {
  const [abnormalStocks, setAbnormalStocks] = useState([]);
  useEffect(() => {
    axios.get("procedure/").then((res) => {
      setAbnormalStocks(res.data);
    });
  }, [setAbnormalStocks]);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom">
            Ticker Symbol
          </TableCell>
          <TableCell scope="col" border="bottom">
            Abnormal Status
          </TableCell>
        </TableRow>
      </TableHeader>
      {abnormalStocks.length === 0 ? null : (
        <TableBody>
          {abnormalStocks.map((stock, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell scope="row">
                  <strong>{stock.tickersymbol}</strong>
                </TableCell>
                <TableCell>{stock.abnormalstatus}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      )}
    </Table>
  );
});

export { AbnormalTable };
