import React from "react";
import { useLocation } from "react-router-dom";
import { List } from "@material-ui/core";

import CustomerLI from "./CustomerLI";
//  import classes from"./CustomerList.module.css"

const CustomerList = (props) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");

  return (
    <List component="nav">
      {Object.keys(props.data).map((customerKey) => (
        <CustomerLI
          customerKey={customerKey}
          type={props.type}  // customer type (lead/account)
          selected={customerKey === pathSegments[3]}
        />
      ))}
    </List>
  );
};

export default CustomerList;
