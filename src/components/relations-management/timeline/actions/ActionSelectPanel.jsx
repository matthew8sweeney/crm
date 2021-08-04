import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import SelectPanel from "../../../ui/select-panel/SelectPanel";
import ActionFilterMenu from "./ActionFilterMenu";
import ActionList from "./ActionList";
import ActionLI from "./ActionLI";
import InteractionLI from "./InteractionLI";
import TaskLI from "./TaskLI";
import NoteLI from "./NoteLI";
import classes from "./ActionSelectPanel.module.css";

const filterActionData = (actionData, searchStr) => {
  const filteredKeys = Object.keys(actionData).filter((actionKey) => {
    let result = false;
    const criterionTerms = searchStr.split(" ");
    const criterion = new RegExp(`(${criterionTerms.join(").*(")})`, "i");
    for (const property in actionData[actionKey]) {
      const dataVal = actionData[actionKey][property];
      if (typeof dataVal.match !== "undefined")
        result = result || dataVal.match(criterion);
    }
    return result;
  });
  return Object.fromEntries(filteredKeys.map((key) => [key, actionData[key]]));
};

const ActionSelectPanel = (props) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");

  const params = new URLSearchParams(location.search.toString());
  const searchStr = params.has("actionSearch")
    ? params.get("actionSearch")
    : "";
  const filterIsActive = !!searchStr;

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
    interactionData = filterActionData(data.interactions, searchStr);
    taskData = filterActionData(data.tasks, searchStr);
    noteData = filterActionData(data.notes, searchStr);
    // TODO fit different action types into same object
    // allData = [...data.interactions, ...data.tasks, ...data.notes];
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
      filterMenuComponent={ActionFilterMenu}
      hideFilterBadge={!filterIsActive}
      className={classes.body}
    />
  );
};

export default ActionSelectPanel;
