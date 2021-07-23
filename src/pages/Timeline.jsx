import React from "react";
import { Divider } from "@material-ui/core";

import CustomerSelectPanel from "../components/relations-management/timeline/customers/CustomerSelectPanel";
import ActionSelectPanel from "../components/relations-management/timeline/actions/ActionSelectPanel";
import useTitle from "../hooks/use-title";
import NewItemFab from "../components/relations-management/new-item/NewItemFab";
import classes from "./Timeline.module.css";

const Timeline = (props) => {
  useTitle("Timeline");

  return (
    <div className={classes.container}>
      <CustomerSelectPanel />
      <Divider orientation="vertical" />
      <ActionSelectPanel />

      <NewItemFab />
    </div>
  );
};

export default Timeline;
