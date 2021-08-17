import React from "react";
import { useSelector } from "react-redux";
import ActionLI from "./ActionLI";

const actionTypeNotes = {
  interactions: "Interaction",
  tasks: "Task: ",
  notes: "Note: ",
};

const AllActionsLI = (props) => {
  const interactionTypes = useSelector((state) => state.data.interactionTypes);

  const data = props.data;
  const actionTypeNote = actionTypeNotes[data.actionType];
  let primaryText = "";
  let secondaryText = "";
  switch (data.actionType) {
    case "interactions":
      primaryText = actionTypeNote;
      const typeId = data.interactionTypeId;
      if (typeId in interactionTypes)
        primaryText = interactionTypes[typeId].name;
      secondaryText = data.description;
      break;
    case "tasks":
      primaryText = actionTypeNote + data.title;
      secondaryText = data.description;
      break;
    case "notes":
      primaryText = actionTypeNote + data.title;
      secondaryText = data.text;
      break;
    default:
      // log if something was not handled
      console.log("data:");
      console.log(data);
  }

  return (
    <ActionLI
      component={props.component}
      primary={primaryText}
      secondary={secondaryText}
      data={props.data}
    />
  );
};

export default AllActionsLI;
