import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import SelectPanel from "../../../ui/select-panel/SelectPanel";
import ActionList from "./ActionList";
import ActionLI from "./ActionLI";
import InteractionLI from "./InteractionLI";
import TaskLI from "./TaskLI";
import NoteLI from "./NoteLI";
import classes from "./ActionSelectPanel.module.css";

const ActionSelectPanel = (props) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");

  const customersData = useSelector((state) => state.data);
  let data;
  if (pathSegments.length >= 3) {
    data = customersData[pathSegments[2] + "s"][pathSegments[3]];
  }

  let interactionData = [];
  let taskData = [];
  let noteData = [];
  let allData = [];
  if (typeof data !== "undefined") {
    interactionData = data.interactions;
    taskData = data.tasks;
    noteData = data.notes;
    allData = [...data.interactions, ...data.tasks, ...data.notes];
  }

  let tab;
  switch (pathSegments[4]) {
    case "interactions":
      tab = 1;
      break;
    case "tasks":
      tab = 2;
      break;
    case "notes":
      tab = 3;
      break;
    default:
      tab = 0;
  }

  return (
    <SelectPanel
      tabs={["All", "Interactions", "Tasks", "Notes"]}
      activeTab={tab}
      bodies={[
        <ActionList component={ActionLI} data={allData} />,
        <ActionList component={InteractionLI} data={interactionData} />,
        <ActionList component={TaskLI} data={taskData} />,
        <ActionList component={NoteLI} data={noteData} />,
      ]}
      tabsAnchorEl={props.anchorEl}
      className={classes.body}
    />
  );
};

export default ActionSelectPanel;
