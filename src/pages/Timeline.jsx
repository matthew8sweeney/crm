import React from "react";
import { Divider } from "@material-ui/core";

import CustomerSelectPanel from "../components/relations-management/timeline/CustomerSelectPanel";
import ActionSelectPanel from "../components/relations-management/timeline/ActionSelectPanel";
import useTitle from "../hooks/use-title";

import classes from "./Timeline.module.css";

const Timeline = (props) => {
  useTitle("Timeline");

  return (
    <div className={classes.container}>
      <CustomerSelectPanel />
      <Divider orientation="vertical" />
      <ActionSelectPanel />
    </div>
  );
};

export default Timeline;
