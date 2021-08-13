import React from "react";
import { useSelector } from "react-redux";
import SelectPanelLI from "../../../ui/select-panel/SelectPanelLI";

const ActionLI = (props) => {
  const interactionTypes = useSelector((state) => state.data.interactionTypes);

  const data = props.data;
  const actionTypeNote = data.actionType + ": ";
  let primaryText = "";
  let secondaryText = "";
  switch (data.actionType) {
    case "Interaction":
      primaryText = "Interaction";
      const typeId = data.interactionTypeId;
      if (typeId in interactionTypes)
        primaryText = interactionTypes[typeId].name;
      secondaryText = data.description;
      break;
    case "Task":
      primaryText = actionTypeNote + data.title;
      secondaryText = data.description;
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
