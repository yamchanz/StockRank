import { Table, TableBody, TableCell, TableHeader, TableRow } from "grommet";
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
            {companies.map((company, idx) => {
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
        </Table>
      )}
    </React.Fragment>
  );
});

const isEmpty = (data) => {
  console.log("refresh");
  return (
    data === undefined ||
    Object.keys(data).length === 0 ||
    Object.getPrototypeOf(data) === Object.prototype
  );
};

export { CompanyTable };
