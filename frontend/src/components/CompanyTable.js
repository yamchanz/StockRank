import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableFooter,
  Text,
} from "grommet";
import React from "react";

const CompanyTable = React.memo(({ companies }) => {
  return (
    <React.Fragment>
      {isEmpty(companies) ? null : (
        <Table>
          <TableHeader>
            <TableRow>
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
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </React.Fragment>
  );
});

const isEmpty = (data) => {
  return data === undefined || Object.keys(data).length === 0;
};

export { CompanyTable };
