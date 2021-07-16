import React, { useState } from "react";
import ReactDOM from "react-dom";
import { IconButton, Paper, Tab, Tabs } from "@material-ui/core";
import FilterIcon from "@material-ui/icons/FilterList";

import classes from "./WidgetSelectPanel.module.css";

const WidgetSelectPanel = (props) => {
  const items = "This will be a list of items for the selected customer"
  
  const [tab, setTab] = useState(0);

  const handleChange = (event, index) => {
    setTab(index);
  };

  // wait for target divs to load in the DOM
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
          <Tab label="Interactions" />
          <Tab label="Tasks" />
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
      <Paper>{items}</Paper>
    </>
  );
};

export default WidgetSelectPanel;
