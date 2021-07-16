import React, { useState } from "react";
import ReactDOM from "react-dom";
import { IconButton, Paper, Tab, Tabs } from "@material-ui/core";
import FilterIcon from "@material-ui/icons/FilterList";

import classes from "./CustomerSelectPanel.module.css";

const CustomerSelectPanel = (props) => {
  const customers = "This will be a list of customers";

  const [tab, setTab] = useState(0);

  const handleChange = (event, index) => {
    setTab(index);
  };

  // wait for target divs to be loaded in the DOM
  let appBarContent;
  if (typeof props.anchorEl === "undefined") {
    appBarContent = null;
  } else {
    appBarContent = ReactDOM.createPortal(
      <>
        <Tabs
          value={tab}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
        >
          <Tab label="Leads" />
          <Tab label="Accounts" />
        </Tabs>
        <IconButton title="filter" style={{ borderRadius: 0 }}>
          <FilterIcon />
        </IconButton>
      </>,
      props.anchorEl
    );
  }

  return (
    <>
      {appBarContent}
      <Paper sqaure className={classes.body}>{customers}</Paper>
    </>
  );
};

export default CustomerSelectPanel;
