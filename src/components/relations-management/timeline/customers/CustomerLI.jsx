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

const MAP_SEARCH_URL = "https://www.google.com/maps/search/";

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
  const customer = useSelector(
    (state) => state.data[props.type][props.customerId]
  );
  const industries = useSelector((state) => state.data.industries);
  let industryName = "";
  if (customer.industryId in industries)
    industryName = industries[customer.industryId].name;

  let websiteUrl = customer.website;
  if (!websiteUrl.startsWith("https://")) {
    websiteUrl = websiteUrl.replace(/^(http:\/\/)|(https:\/\/)|/, "https://");
  }

  return (
    <SelectPanelLI
      to={`/timeline/${props.type}/${props.customerId}`}
      primary={customer.name}
      secondary={customer.latestAction}
      selected={props.selected}
    >
      <Table size="small">
        <TableBody>
          <InfoRow name="Website" value={customer.website} href={websiteUrl} />
          <InfoRow
            name="Address"
            value={customer.address}
            href={MAP_SEARCH_URL + customer.address}
          />
          <InfoRow name="Industry" value={industryName} />
          {/* <InfoRow name="Owner" value={data.owner}  /> */}
        </TableBody>
      </Table>
    </SelectPanelLI>
  );
};

export default CustomerLI;
