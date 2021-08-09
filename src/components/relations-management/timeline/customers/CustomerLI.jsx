import React from "react";
import { useSelector } from "react-redux";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import SelectPanelLI from "../../../ui/select-panel/SelectPanelLI";
import classes from "./CustomerLI.module.css";

const MaybeLink = (props) => {
  if (props.href) {
    return (
      <a
        href={props.href}
        target="_blank"
        rel="noreferrer"
        className={classes.link}
      >
        {props.children}
      </a>
    );
  } else {
    return <>{props.children}</>;
  }
};

const InfoRow = (props) => (
  <TableRow>
    <TableCell component="th" scope="row">
      {props.name}
    </TableCell>
    <TableCell>
      <MaybeLink href={props.href}>{props.value}</MaybeLink>
    </TableCell>
    {/* <TableCell align="right">
      <IconButton size="small">
        <EditIcon />
      </IconButton>
    </TableCell> */}
  </TableRow>
);

const CustomerLI = (props) => {
  const data = useSelector(
    (state) => state.data[props.type][props.customerKey]
  );

  let websiteUrl = data.website;
  if (!websiteUrl.startsWith("https://")) {
    websiteUrl = websiteUrl.replace(/^(http:\/\/)|(https:\/\/)|/, "https://");
  }

  const mapSearchUrl = "https://www.google.com/maps/search/";

  return (
    <SelectPanelLI
      to={`/timeline/${props.type}/${props.customerKey}`}
      primary={data.name}
      secondary={data.latestAction}
      selected={props.selected}
    >
      <Table size="small">
        <TableBody>
          <InfoRow name="Website" value={data.website} href={websiteUrl} />
          <InfoRow
            name="Address"
            value={data.address}
            href={mapSearchUrl + data.address}
          />
          <InfoRow name="Industry" value={data.industry} />
          {/* <InfoRow name="Owner" value={data.owner}  /> */}
        </TableBody>
      </Table>
    </SelectPanelLI>
  );
};

export default CustomerLI;
