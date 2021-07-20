import React from "react";
import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";

import SelectPanelLI from "../../ui/select-panel/SelectPanelLI";
import classes from "./CustomerLI.module.css";

const CustomerLI = (props) => {
  const data = useSelector(
    (state) => state.data[props.type + "s"][props.customerKey]
  );

  let websiteUrl = data.website
  if(!websiteUrl.startsWith("https://")){
    websiteUrl = websiteUrl.replace(/^(http:\/\/)|(https:\/\/)|/, "https://")
  }
  
  return (
    <SelectPanelLI
      to={`/timeline/${props.type}/${props.customerKey}`}
      primary={data.name}
      secondary={data.latestAction}
      selected={props.selected}
      key={props.customerKey}
    >
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Website
            </TableCell>
            <TableCell>
              <a href={websiteUrl} target="_blank" className={classes.link}>
                {data.website}
              </a>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">
              Address
            </TableCell>
            <TableCell>
              <a
                href={`https://www.google.com/maps/search/${data.address}`}
                target="_blank"
                className={classes.link}
              >
                {data.address}
              </a>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row">
              Industry
            </TableCell>
            <TableCell>{data.industry}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </SelectPanelLI>
  );
};

export default CustomerLI;
