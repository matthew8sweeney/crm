import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Badge,
  IconButton,
  Paper,
  Tab,
  Tabs,
  useScrollTrigger,
} from "@material-ui/core";
import FilterIcon from "@material-ui/icons/FilterList";

// import classes from "./SelectPanel.module.css";

/**
 * A panel with tabs accross the top.
 * The `tabs` prop holds an array of tab names.
 * The `bodies` prop holds holds an array of coresponding bodies.
 * `filterMenuComponent` prop can specify a menu component for the filter button.
 * `hideFilterBadge` prop controls visibilty of filter badge
 */
const SelectPanel = (props) => {
  const [tab, setTab] = useState(0); // really initialized in useEffect
  const handleTabChange = (event, index) => {
    setTab(index);
  };

  const scrollRef = useRef();
  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true, // false by default, Mui example sets to true
    threshold: 0,
    target: scrollRef.current,
  });
  // re-create scrollTrigger once scroll target is in the DOM
  useEffect(() => {
    setTab(props.activeTab || 0);
  }, [props.activeTab]);

  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState(null);
  const filterMenuIsOpen = !!filterMenuAnchorEl;
  const FilterMenuComponent = props.filterMenuComponent;

  const filterClickHandler = (event) => {
    filterMenuAnchorEl
      ? setFilterMenuAnchorEl(null)
      : setFilterMenuAnchorEl(event.currentTarget);
  };

  const filterCloseHandler = (event) => {
    setFilterMenuAnchorEl(null);
  };

  return (
    <div
      className={props.className}
      style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
    >
      <AppBar elevation={scrollTrigger ? 4 : 0}>
        <Tabs value={tab} onChange={handleTabChange}>
          {props.tabs.map((label, i) => (
            <Tab label={label} key={i} />
          ))}
        </Tabs>
        {FilterMenuComponent && (
          <>
            <IconButton
              title="filter"
              onClick={filterClickHandler}
              style={{ borderRadius: 0 }}
              color={filterMenuIsOpen ? "primary" : undefined}
            >
              <Badge
                invisible={props.hideFilterBadge}
                variant="dot"
                color="primary"
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <FilterIcon />
              </Badge>
            </IconButton>
            <FilterMenuComponent
              open={filterMenuIsOpen}
              anchorEl={filterMenuAnchorEl}
              onClose={filterCloseHandler}
            />
          </>
        )}
      </AppBar>

      <Paper square style={{ flexGrow: 1, overflowY: "auto" }} ref={scrollRef}>
        {props.bodies[tab]}
      </Paper>
    </div>
  );
};

export default SelectPanel;
