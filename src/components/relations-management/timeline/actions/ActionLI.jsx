import React from "react";
import SelectPanelLI from "../../../ui/select-panel/SelectPanelLI";

const ActionLI = (props) => {
  const data = props.data;
  const actionTypeNote = data.actionType + ": ";
  let primaryText = "";
  let secondaryText = "";
  switch (data.actionType) {
    case "Interaction":
      primaryText = data.interactionType;
      secondaryText = data.subject;
      break;
    case "Task":
      primaryText = actionTypeNote + data.title;
      secondaryText = data.taskType;
      break;
    case "Note":
      primaryText = actionTypeNote + data.title;
      secondaryText = data.text;
      break;
    default:
      console.log("data:");
      console.log(data);
  }

  return (
    <SelectPanelLI
      component={props.component}
      primary={primaryText}
      secondary={secondaryText}
    ></SelectPanelLI>
  );
};

export default ActionLI;
